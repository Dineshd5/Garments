
-- USER PROFILES (Extends auth.users)
create table public.user_profiles (
  id uuid references auth.users not null primary key,
  display_name text,
  role text default 'user',
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(display_name) >= 3)
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.user_profiles
  for select using (true);

create policy "Users can insert their own profile." on public.user_profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.user_profiles
  for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.user_profiles (id, display_name, role)
  values (new.id, split_part(new.email, '@', 1), 'Staff');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
