import { Outlet } from "react-router-dom"
import { useAuthentication } from "../context/AuthContext"

const AdminRoute = () => {
  const { token, user } = useAuthentication()

  console.log('User:', user) 
  console.log('Role:', user?.role) 


  if (!token) {
    return <Navigate to="/signIn" />
  }
  if (!user || user.role.toLowerCase() !== 'admin') {
    return <Navigate to="/not-authorized" />
  }

  return <Outlet />
}

export default AdminRoute
