import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar    from "./components/Navbar/Navbar";
import Footer    from "./components/Footer/Footer";
import Landing   from "./pages/Landing/Landing";
import Listings  from "./pages/Listings/Listings";
import Detail    from "./pages/Detail/Detail";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin     from "./pages/Admin/Admin";
import Pricing   from "./pages/Pricing/Pricing";
import Login     from "./pages/Login/Login";
import Signup    from "./pages/Signup/Signup";
import NotFound  from "./pages/NotFound/NotFound";
import Companies from "./pages/Companies/Companies";

import "./styles/variables.css";

const NO_SHELL   = ["/login", "/signup"];
const NO_FOOTER  = ["/dashboard", "/admin"];

function ProtectedUser({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
function ProtectedAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function Shell() {
  const { pathname }   = useLocation();
  const hideShell      = NO_SHELL.some(p => pathname.startsWith(p));
  const hideFooter     = NO_FOOTER.some(p => pathname.startsWith(p));
  const { user, logout } = useAuth();

  return (
    <>
      {!hideShell && <Navbar user={!!user} userRole={user?.role} userName={user?.name} setUser={logout} />}
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/tenders"     element={<Listings />} />
        <Route path="/tenders/:id" element={<Detail />} />
        <Route path="/pricing"     element={<Pricing />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/signup"      element={<Signup />} />
        <Route path="/dashboard/*" element={<ProtectedUser><Dashboard /></ProtectedUser>} />
        <Route path="/admin/*"     element={<ProtectedAdmin><Admin /></ProtectedAdmin>} />
        <Route path="/404"         element={<NotFound />} />
        <Route path="*"            element={<Navigate to="/404" replace />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
      {!hideShell && !hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
