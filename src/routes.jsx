import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/signin-signup/SignIn";
import ForgotPassword from "./components/signin-signup/ForgotPassword";
import CreateNewPassword from "./components/signin-signup/CreateNewPassword";
import SignUp from "./components/signin-signup/SignUp";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SalesPage from "./pages/home-page/SalesPage";
import ProductPage from "./pages/products/ProductPage";
import ViewMember from "./pages/member/ViewMember";
import AdminList from "./pages/admin-page/AdminList";
import SalesTarget from "./pages/sales-target/SalesTarget";
import AnnouncementTable from "./pages/announcement/AnnouncementTable";
import AddAnnouncementForm from "./pages/announcement/AddAnnouncementForm";
import EditAnnouncementForm from "./pages/announcement/EditAnnouncementForm";
import Documents from "./pages/documents/Documents.jsx";
import ClubTable from "./pages/club/ClubTable.jsx";
import MinimumStockTable from "./pages/minimumstock/MinimumStockTable.jsx";
import EditRequestTable from "./pages/requests/EditRequestTable.jsx";
import DeleteRequestTable from "./pages/requests/DeleteRequestTable.jsx";
import ReportTable from "./pages/reports/ReportTable.jsx";
import UserProfile from "./pages/dashboard/UserProfile.jsx";
import EditUserProfile from "./pages/dashboard/EditUserProfile.jsx";
import EditProductForm from "./pages/products/EditProductForm.jsx";
import AddProductForm from "./pages/products/AddProductForm.jsx";
import AddMemberForm from "./components/sales-components/member-ado/AddMemberForm.jsx";
import EditMemberForm from "./components/sales-components/member-ado/EditMemberForm.jsx";
import DocumentForm from "./pages/documents/DocumentForm .jsx";
import EditDocumentForm from "./pages/documents/EditDocumentForm.jsx";
import AddUserForm from "./pages/admin-page/AddUserForm.jsx";
import EditUserForm from "./pages/admin-page/EditUserForm.jsx";
import AddSalesTargetForm from "./pages/sales-target/AddSalesTargetForm.jsx";
import AddMinimumStockForm from "./pages/minimumstock/AddMinimumStockForm.jsx";
import EditMinimumStockForm from "./pages/minimumstock/EditMinimumStockForm.jsx";
import AddClubForm from "./pages/club/AddClubForm.jsx";
import EditClubForm from "./pages/club/EditClubForm.jsx";

const RoutesConfig = () => (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreateNewPassword />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={<AdminDashboard />}>
          {/* home */}
          <Route path="*" element={<SalesPage />} />
          <Route path="products" element={<ProductPage />} />
          {/* member */}
          <Route path="profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditUserProfile />} />

          {/*  */}
          <Route path="members" element={<ViewMember />} />
          <Route path="announcement" element={<AnnouncementTable />} />
          <Route
            path="announcement/add-announcement"
            element={<AddAnnouncementForm />}
          />
          <Route
            path="announcement/edit-announcement"
            element={<EditAnnouncementForm />}
          />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/add-documents" element={<DocumentForm />} />
          <Route
            path="documents/edit-document"
            element={<EditDocumentForm />}
          />

          <Route path="report" element={<ReportTable />} />

          <Route path="members/add-members" element={<AddMemberForm />} />
          <Route path="members/edit-members" element={<EditMemberForm />} />

          <Route path="add-list" element={<AdminList />} />
          <Route path="add-list/add-user" element={<AddUserForm />} />
          <Route path="add-list/edit-user" element={<EditUserForm />} />

          <Route path="sales-target" element={<SalesTarget />} />
          <Route
            path="sales-target/add-sales-target"
            element={<AddSalesTargetForm />}
          />
          <Route
            path="sales-target/edit-sales-target"
            element={<AddSalesTargetForm />}
          />

          <Route path="club" element={<ClubTable />} />
          <Route path="club/add-club" element={<AddClubForm />} />
          <Route path="club/edit-club" element={<EditClubForm />} />

          <Route path="minimum-stock" element={<MinimumStockTable />} />
          <Route
            path="minimum-stock/add-minimum-stock"
            element={<AddMinimumStockForm />}
          />
          <Route
            path="minimum-stock/edit-minimum-stock"
            element={<EditMinimumStockForm />}
          />

          <Route path="edit-request" element={<EditRequestTable />} />
          <Route path="delete-request" element={<DeleteRequestTable />} />

          <Route path="products/edit-product" element={<EditProductForm />} />
          <Route path="products/add-product" element={<AddProductForm />} />
        </Route>
      </Routes>
    </Router>
  </div>
);

export default RoutesConfig;
