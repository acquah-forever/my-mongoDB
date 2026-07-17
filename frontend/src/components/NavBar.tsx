import { useQuery, useQueryClient } from "@tanstack/react-query"
import { NavLink, useNavigate } from "react-router-dom"
import { getUser, logout } from "../services/services"

const NavBar = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  })

  async function handleLogout() {
    try {
      await logout()

      queryClient.removeQueries({ queryKey: ["user"] })

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
