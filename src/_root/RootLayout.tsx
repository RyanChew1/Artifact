import { ThemeProvider } from "@/components/theme-provider";
import NavbarProfile from "@/components/navbarProfile";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RootLayout = () => {
  const navigate = useNavigate();

  const { session } = useAuth();
  if (!session) {
    navigate("/");
  }
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="flex flex-col">
        <NavbarProfile />

        <section className="flex w-screen min-h-screen max-w-screen overflow-x-hidden">
          {/* Spacer for navbar */}
          <div className="w-full pt-[7.5rem] overflow-x-hidden">
            <Outlet />
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
