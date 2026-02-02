-- 1. Ensure the table exists (in case it wasn't created)
create table if not exists public.user_profiles (
  id uuid references auth.users not null primary key,
  display_name text,
  role text default 'user',
  avatar_url text,
  updated_at timestamp with time zone,
  constraint username_length check (char_length(display_name) >= 3)
);

-- 2. Enable RLS (safe to run multiple times)
alter table public.user_profiles enable row level security;

-- 3. Re-create policies (dropping first to avoid errors)
drop policy if exists "Public profiles are viewable by everyone." on public.user_profiles;
create policy "Public profiles are viewable by everyone." on public.user_profiles for select using (true);

drop policy if exists "Users can insert their own profile." on public.user_profiles;
create policy "Users can insert their own profile." on public.user_profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on public.user_profiles;
create policy "Users can update own profile." on public.user_profiles for update using (auth.uid() = id);

-- 4. BACKFILL: Insert profiles for ANY existing users that don't have one yet
insert into public.user_profiles (id, display_name, role)
select 
  id, 
  split_part(email, '@', 1), -- Use part of email as name
  'Production Manager'       -- Default role
from auth.users
where id not in (select id from public.user_profiles);
