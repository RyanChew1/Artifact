import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate, Link } from "react-router-dom";

const AuthLayout = () => {
  const { session } = useAuth();

  return (
    <>
      {session ? (
        <Navigate to="/" />
      ) : (
        <div className="flex flex-row w-full justify-center bg-off-white">
          <div className="flex flex-col justify-center font-[Work Sans] min-h-fit">
            <Link to="/">
              <img src="assets/Artifact Text Logo.png" className="h-[10vh] w-fit mt-20 mb-3"/>
            </Link>
            <Outlet/>
          </div>
          
        </div>
      )}
    </>
  );
};

export default AuthLayout;
