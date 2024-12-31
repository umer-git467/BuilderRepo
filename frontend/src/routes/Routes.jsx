import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
// import * as ReactDOM from "react-dom/client";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import BuilderSignup from "../pages/BuilderSignup";
import Client from "../pages/ClientSignup";
import SignIn from "../pages/SignIn";
import BuilderLayout from "../pages/BuilderLayout";
import ClientLayout from "../pages/ClientLayout";
import ClientDashboard from "../pages/ClientDashboard";
import BuilderDashboard from "../pages/BuilderDashboard";
import ClientLogin from "../pages/ClientLogin";
import BuilderLogin from "../pages/BuilderLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Routes = () => {
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <RouterRoutes>
          {/* <Home /> */}
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-in-Client" element={<ClientLogin />} />
          <Route path="/sign-in-builder" element={<BuilderLogin />} />
          <Route path="/builder" element={<BuilderSignup />} />
          <Route path="/client" element={<Client />} />

          <Route element={<ClientDashboard />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
          </Route>

          <Route element={<BuilderLayout />}>
            <Route path="/builder/dashboard" element={<BuilderDashboard />} />
          </Route>
        </RouterRoutes>
      </BrowserRouter>
    </>
  );
};
