import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import ErrorFallback from "./ErrorFallback";
import useAuth from "../hooks/useAuth";

export default function Root() {
  const { auth } = useAuth();
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-black border-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto w-screen-xl p-4">
          <Link
            className="text-white self-center text-2xl font-medium whitespace-nowrap"
            to="/"
          >
            lifecare
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-xl">
            {auth?.username ? (
              <>
                <Link
                  to="/manage/inquiry"
                  className="text-white hover:underline"
                >
                  Inquiry
                </Link>
                <Link to="/user/profile" className="text-white hover:underline">
                  Profile
                </Link>
                <Link to="/logout" className="text-white hover:underline">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-full flex m-auto rounded-md bg-white flex-col justify-center w-full md:w-[90%] my-6 p-14 flex-grow">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover={false}
            pauseOnFocusLoss
            theme="light"
            limit={1}
          />
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
