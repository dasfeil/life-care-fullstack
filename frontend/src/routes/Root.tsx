import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import ErrorFallback from "./ErrorFallback";
import useAuth from "../hooks/useAuth";

export default function Root() {
  const isCookieEnabled = navigator.cookieEnabled;
  const { auth } = useAuth();
  return (
    <>
      {isCookieEnabled ? (
        <div className="min-h-screen bg-[url('/abstract_gray_bg.jpg')] flex flex-col">
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
                    {auth?.roles.filter((role) => role == "ADMIN").length ==
                      1 && (
                      <Link
                        to="/manage/inquiry"
                        className="text-white hover:underline"
                      >
                        Inquiry
                      </Link>
                    )}

                    <Link
                      to="/user/profile"
                      className="text-white hover:underline"
                    >
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
          <div className="h-full flex m-auto flex-col justify-center w-full my-6 flex-grow">
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
      ) : (
        <div className="text-center h-screen flex justify-center items-center">
          <p>Please enable cookie and restart the webpage</p>
        </div>
      )}
    </>
  );
}
