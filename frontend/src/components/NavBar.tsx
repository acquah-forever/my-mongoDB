import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const NavBar = () => {
  const navigate = useNavigate()

  const { user, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()

      navigate("/login")

    } catch (error) {
      console.error("Log out failed:", error)
    }
  }

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <NavLink to="/" className="text-lg font-bold">My Notes App</NavLink>
      <nav>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <h1>Signed in as {user.username}</h1>
              <li className="text-lg"><button onClick={handleLogout}>Log Out</button></li>
            </>
          ) : (
            <>
              <li className="text-lg"><NavLink to="/login">Log In</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
export default NavBar
