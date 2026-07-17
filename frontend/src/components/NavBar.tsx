import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1>My App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
