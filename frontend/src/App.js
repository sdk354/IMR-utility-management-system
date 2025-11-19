import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerPayments from "./pages/CustomerPayments";
import CustomerComplaints from "./pages/CustomerComplaints";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerPayments />} />
        <Route path="/complaints" element={<CustomerComplaints />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
