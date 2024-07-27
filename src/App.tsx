import "./globals.css";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import {
  Home,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";

function App() {
  return (
    <main className="flex h-screen bg-off-white dark:bg-dark-1 text-black dark:text-white">
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>

      {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>

    <Toaster />
  </main>
  );
}

export default App;
