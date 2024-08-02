import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@/components/ui/toaster";

import { Home } from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import LandingPage from "./landing-page";
import Browse from "./_root/pages/Browse";
import Sell from "./_root/pages/Sell";
import ProductDetail from "./_root/pages/ProductDetail";
import ProfilePage from "./_root/pages/Profile";
import Messages from "./_root/pages/Messages";
import MessageHome from "./_root/pages/MessageHome";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className="flex min-h-screen bg-off-white dark:bg-dark-5 text-black dark:text-white font-[Work Sans] overflow-x-hidden">
        <Routes>
          {/* public routes */}
          <Route index element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/messagehome" element={<MessageHome />} />
            <Route path="/message/:id" element={<Messages />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
    </QueryClientProvider>
  );
}

export default App;
