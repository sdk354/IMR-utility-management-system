import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CustomerLogin from "./pages/CustomerLogin";
import Dashboard from "./pages/Dashboard";
import BillsList from "./pages/BillsList";
import BillDetails from "./pages/BillDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

/*
  App holds routes:
  /            -> portal selection landing
  /customer/login
  /customer/dashboard
  /customer/bills
  /customer/bills/:id
  /customer/profile
*/

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/customer/dashboard" element={<Dashboard />} />
      <Route path="/customer/bills" element={<BillsList />} />
      <Route path="/customer/bills/:id" element={<BillDetails />} />
      <Route path="/customer/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
