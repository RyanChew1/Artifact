import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <ThemeProvider  storageKey="vite-ui-theme">
      <div className="flex flex-col">

      <Navbar/>

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
