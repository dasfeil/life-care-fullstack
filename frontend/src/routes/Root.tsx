import { Link, Outlet } from "react-router-dom";
import AxiosErrorHandler from "../axios/AxiosErrorHandler";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./Error";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <AxiosErrorHandler>
        <div>
          <div className="bg-black w-full h-12 flex justify-between">
            <Link className="text-white m-1 self-center" to="/">
              lifecare
            </Link>
          </div>
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
        </div>
      </AxiosErrorHandler>
    </ErrorBoundary>
  );
}
