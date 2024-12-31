import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar";

const ClientLayout = () => {
  return (
    <div className="builder-layout">
      {/* <aside className="sidebar">
        <Sidebar role="Client" />
      </aside>
      <main className="content">
        <Outlet />
      </main> */}
    </div>
  );
};

export default ClientLayout;
