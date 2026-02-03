import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="app">
      <nav className="nav">
        <NavLink to="/">Timer</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/subjects">Subjects</NavLink>
      </nav>

      
      <main className="route-container" key={location.pathname}>
        <Outlet />
      </main>
    </div>
  );
}
