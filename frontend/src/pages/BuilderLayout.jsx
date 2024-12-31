import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar";
import BuilderDashboard from "./BuilderDashboard";

const BuilderLayout = () => {
  return (
    <div className="builder-layout">
      {/* <aside className="sidebar">
        <Sidebar role="Builder" />
      </aside> */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default BuilderLayout;
