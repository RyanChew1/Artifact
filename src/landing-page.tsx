import { Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { useAuth } from "@/context/AuthContext";


const LandingPage = () => {
  const { session } = useAuth();
  return (
     <>
     {session ? (
       <Navigate to="/home" />
     ) : (
      <ThemeProvider>
      <Navbar />
      <div className='flex justify-center align-center text-center w-screen'>
        <div className='flex flex-col justify-center text-center'>
        <h1 className="text-7xl font-bold font-[Lexend] self-center text-gray-700 dark:text-secondary-500">
        Welcome To
      </h1>
      <h1 className="text-9xl font-extrabold font-[Lexend] self-center text-primary-200 dark:text-primary-500">
        ARTIFACT
      </h1>
        </div>
      
      </div>
      
    </ThemeProvider>
     )}
   </>
  )
}

export default LandingPage
