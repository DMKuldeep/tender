import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar    from "./components/Navbar/Navbar";
import Footer    from "./components/Footer/Footer";
import Home      from "./pages/Home/Home";
import Listings  from "./pages/Listings/Listings";
import Detail    from "./pages/Detail/Detail";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login     from "./pages/Login/Login";
import Signup    from "./pages/Signup/Signup";

import "./styles/variables.css";

// Simple protected-route wrapper
function Protected({ user, children }: { user: boolean; children: JSX.Element }) {
  return user ? children : <Navigate to="/login" replace />;
}

// Pages that don't show the footer
const NO_FOOTER = ["/login", "/signup"];

function Layout({ user, setUser }: { user: boolean; setUser: (v: boolean) => void }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/tenders"      element={<Listings />} />
        <Route path="/tenders/:id"  element={<Detail />} />
        <Route path="/login"        element={<Login  setUser={setUser} />} />
        <Route path="/signup"       element={<Signup setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <Protected user={user}>
              <Dashboard />
            </Protected>
          }
        />
        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer hidden on auth pages */}
      <ConditionalFooter />
    </>
  );
}

function ConditionalFooter() {
  // Check current path to hide footer on login/signup
  const hide = NO_FOOTER.some(p => window.location.pathname === p);
  return hide ? null : <Footer />;
}

export default function App() {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <Layout user={user} setUser={setUser} />
    </BrowserRouter>
  );
}
