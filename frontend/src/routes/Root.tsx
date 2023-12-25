import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import ErrorFallback from "./ErrorFallback";

export default function Root() {
  return (
    <div className="h-screen">
      <div className="bg-black border-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto w-screen-xl p-4">
          <Link
            className="text-white self-center text-2xl font-semibold whitespace-nowrap"
            to="/"
          >
            LifeCare
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              to="/login"
              className="text-sm text-white hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-full flex flex-col justify-center">
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
