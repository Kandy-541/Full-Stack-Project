import { Link } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="brand">PropSpace</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button className="btn-secondary link-button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
