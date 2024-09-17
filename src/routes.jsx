import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/signin-signup/SignIn';
import SignUp from './components/signin-signup/SignUp';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SalesPage from './pages/home-page/SalesPage';
import ProductPage from './pages/products/ProductPage';
import ViewMember from './pages/member/ViewMember';
import AddMember from './pages/member/AddMember';
import AdminList from './pages/admin-page/AdminList';
import SalesTarget from './pages/sales-target/SalesTarget';
import ProductCreateForm from './pages/products/product-creation/ProductCreateForm.jsx';



const RoutesConfig = () => (
  <div>
  <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={<AdminDashboard />}>
          {/* home */}
          <Route path="*" element={<SalesPage />} />
          <Route path="products" element={<ProductPage />} />
          {/* member */}
          <Route path="members" element={<ViewMember/>} />
          <Route path="add-members" element={<AddMember/>} />
          <Route path="add-list" element={<AdminList/>} />
          <Route path="sales-target" element={<SalesTarget/>} />
          <Route path="add-products" element={<ProductCreateForm/>} />
          <Route path="edit-product/:id" element={<ProductCreateForm />} />
          
        </Route>
      </Routes>
  </Router>
  </div>
);

export default RoutesConfig;
