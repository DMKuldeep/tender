import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar    from "./components/Navbar/Navbar";
import Footer    from "./components/Footer/Footer";
import Landing   from "./pages/Landing/Landing";
import Listings  from "./pages/Listings/Listings";
import Detail    from "./pages/Detail/Detail";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login     from "./pages/Login/Login";
import Signup    from "./pages/Signup/Signup";

import "./styles/variables.css";

const NO_SHELL = ["/login", "/signup"];

function Protected({ user, children }: { user: boolean; children: JSX.Element }) {
  return user ? children : <Navigate to="/login" replace />;
}

function Shell({ user, setUser }: { user: boolean; setUser: (v: boolean) => void }) {
  const { pathname } = useLocation();
  const hideShell    = NO_SHELL.includes(pathname);
  return (
    <>
      {!hideShell && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/tenders"     element={<Listings />} />
        <Route path="/tenders/:id" element={<Detail />} />
        <Route path="/login"       element={<Login  setUser={setUser} />} />
        <Route path="/signup"      element={<Signup setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <Protected user={user}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideShell && <Footer />}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(false);
  return (
    <BrowserRouter>
      <Shell user={user} setUser={setUser} />
    </BrowserRouter>
  );
}
