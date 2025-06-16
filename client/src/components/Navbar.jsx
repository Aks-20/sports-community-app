import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Sports Community</Link>
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/skill-check">Skill Check</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
