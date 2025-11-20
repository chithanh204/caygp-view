import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các Layout
import Layout from './components/Layout/Layout';
import AdminLayout from './components/AdminLayout/AdminLayout';

// Import các trang
import HomePage from './pages/Core/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import CreateTreePage from './pages/Core/CreateTreePage';
import ViewTreePage from './pages/Core/ViewTreePage';
import EditMemberPage from './pages/Core/EditMemberPage';
import EventPage from './pages/Core/EventPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/Core/ProfilePage';

// Import các trang Admin
import UserManagement from './pages/Admin/UserManagement';
import RoleManagement from './pages/Admin/RoleManagement';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventManagement from './pages/Admin/EventManagement';

function App() {
  return (
    <Routes>
      {/* Các trang công khai, không cần Layout */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Các trang cần đăng nhập, dùng Layout người dùng */}
      <Route element={<Layout />}>
        <Route path="/create-tree" element={<CreateTreePage />} />
        <Route path="/edit-member/:memberId" element={<EditMemberPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/view-tree" element={<ViewTreePage />} />
        <Route path="/view-tree/:treeId" element={<ViewTreePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Các trang Admin, dùng AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="roles" element={<RoleManagement />} />
        <Route path="events" element={<EventManagement />} />
        {/* <Route path="events" element={<AdminEventManagement />} /> */}
      </Route>

      {/* Route khi không tìm thấy trang */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;