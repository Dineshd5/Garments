import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import OrderManagement from "pages/order-management";
import ProductionWorkflow from "pages/production-workflow";
import CustomerManagement from "pages/customer-management";
import ProductCatalog from "pages/product-catalog";
import NotFound from "pages/NotFound";
import ProtectedRoute from "components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-management" 
            element={
              <ProtectedRoute>
                <OrderManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/production-workflow" 
            element={
              <ProtectedRoute>
                <ProductionWorkflow />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer-management" 
            element={
              <ProtectedRoute>
                <CustomerManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product-catalog" 
            element={
              <ProtectedRoute>
                <ProductCatalog />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
