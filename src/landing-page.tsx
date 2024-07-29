import { Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"


const LandingPage = () => {
  const isAuthenticated = false
  return (
     <>
     {isAuthenticated ? (
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
