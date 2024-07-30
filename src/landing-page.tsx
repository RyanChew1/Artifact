import { Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { useAuth } from "@/context/AuthContext";


const LandingPage = () => {
  const { session } = useAuth();
  return (
     <>
     {session ? (
       <Navigate to="/" />
     ) : (
      <ThemeProvider>
      <Navbar />
    </ThemeProvider>
     )}
   </>
  )
}

export default LandingPage
