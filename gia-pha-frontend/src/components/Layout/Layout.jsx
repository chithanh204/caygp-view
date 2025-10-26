// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        {/* Outlet là nơi các trang con (Page) sẽ được render */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;