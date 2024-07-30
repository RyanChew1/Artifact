import { ThemeProvider } from "@/components/theme-provider"
import NavbarProfile from "@/components/navbarProfile"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext";

const RootLayout = () => {
  const navigate = useNavigate()

  const { session } = useAuth();
  if (!session){
    navigate('/landing')
  }
  return (
    <ThemeProvider  storageKey="vite-ui-theme">
      <div className="flex flex-col">

      <NavbarProfile/>

      <section className="flex w-screen min-h-screen">
        {/* Spacer for navbar */}
        <div className="w-full pt-[7.5rem] px-5"> 
        <Outlet/>
        </div>
      </section>
      </div>


      
    </ThemeProvider>
    
  )
}

export default RootLayout
