// App.jsx
// Entry point for the React application.
// Defines routing, layout structure, and access control logic.

import {
  BrowserRouter as Router, // Wraps the app with browser-based routing context
  Routes,                  // Container for all Route definitions
  Route,                   // Defines a single path-to-component mapping
  useLocation,             // Hook to read the current URL path
  Navigate,                // Component that triggers a programmatic redirect
} from "react-router-dom";

import { Home, Auth, Orders, Tables, Menu, Dashboard } from "./pages"; // All page-level components
import Header from "./components/shared/Header";  // Persistent header shown across all pages (except /auth)
import { useSelector } from "react-redux";        // Hook to read Redux global state
import useLoadData from "./hooks/useLoadData";     // Custom hook: fetches initial app data on mount
import FullScreenLoader from "./components/shared/FullScreenLoader"; // Full-page loading spinner shown during data fetch


// ─────────────────────────────────────────────────────────────
// Layout Component
// ─────────────────────────────────────────────────────────────
// Acts as the shared layout wrapper for the entire application.
// Responsibilities:
//   1. Show a full-screen loader while initial data is being fetched
//   2. Conditionally render the Header (hidden on the /auth page)
//   3. Render the appropriate page component based on the current route
function Layout() {
  const isLoading = useLoadData(); // Triggers data fetching; returns true while in progress
  const location = useLocation();  // Gives access to the current URL path (e.g. "/orders")

  // Routes where the Header should NOT be displayed.
  // Currently only the auth/login page — users shouldn't see the app header before logging in.
  const hideHeaderRoutes = ["/auth"];

  // Read authentication status from Redux store.
  // Used by ProtectedRoutes and the /auth redirect logic below.
  const { isAuth } = useSelector(state => state.user);

  // While initial app data is loading, show a full-screen spinner.
  // This prevents a flash of empty/broken UI before data is ready.
  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      {/* Render Header on all routes EXCEPT those in hideHeaderRoutes.
          This keeps the header persistently visible as users navigate
          between Home, Orders, Tables, etc., without remounting it. */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      {/* Route definitions.
          Only the content inside <Routes> changes on navigation —
          the Header above stays mounted and unaffected. */}
      <Routes>

        {/* Home Page — default route */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>  {/* Redirect to /auth if not logged in */}
              <Home />
            </ProtectedRoutes>
          }
        />

        {/* Auth Page — login/register.
            If the user is already authenticated, redirect them away to Home.
            Prevents logged-in users from accessing the login page. */}
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/" /> : <Auth />}
        />

        {/* Orders Page */}
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />

        {/* Tables Page */}
        <Route
          path="/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />

        {/* Menu Page */}
        <Route
          path="/menu"
          element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />

        {/* Dashboard Page — likely admin/manager only based on context */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        {/* Catch-all route — shown for any undefined/unknown paths */}
        <Route path="*" element={<div>Not Found</div>} />

      </Routes>
    </>
  );
}


// ─────────────────────────────────────────────────────────────
// ProtectedRoutes Component
// ─────────────────────────────────────────────────────────────
// A route guard wrapper used to restrict access to authenticated users only.
// Usage: wrap any <Route>'s element with <ProtectedRoutes> to protect it.
//
// Behavior:
//   - If the user is NOT authenticated → redirect to /auth (login page)
//   - If the user IS authenticated     → render the child component normally
function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user); // Read auth status from Redux

  if (!isAuth) {
    // User is not logged in — send them to the auth page.
    // <Navigate> performs an immediate redirect without rendering any UI.
    return <Navigate to="/auth" />;
  }

  // User is authenticated — render the intended page component.
  return children;
}


// ─────────────────────────────────────────────────────────────
// App Component
// ─────────────────────────────────────────────────────────────
// Root component of the application.
// Wraps everything in <Router> to enable routing context throughout the tree.
// <Layout> is rendered inside <Router> so it can use routing hooks (useLocation, etc.)
function App() {
  return (
    <Router>
      <Layout />  {/* All routing, layout, and auth logic lives inside Layout */}
    </Router>
  );
}

export default App;