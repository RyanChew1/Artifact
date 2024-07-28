import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from '@/components/mode-toggle'
import Navbar from "@/components/navbar"

const RootLayout = () => {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Navbar />
    </ThemeProvider>
    
  )
}

export default RootLayout
