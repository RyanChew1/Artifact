import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from '@/components/mode-toggle'

const RootLayout = () => {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      {/* Theme Switcher Toggle */}
      <div  className="m-5 absolute z-10 flex right-10">
        <ModeToggle/>
      </div>
      RootLayout
    </ThemeProvider>
    
  )
}

export default RootLayout
