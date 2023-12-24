import {
  ErrorResponse,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

export default function Error() {
  let error = useRouteError();
  let errorRes = false;
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorRes = true;
    errorMessage = error.statusText;
  } else {
    errorMessage = "Unknown error occurred";
  }
  return (
    <>
      {errorRes && (
        <div className="grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            {errorRes && (
              <h1 className="text-9xl font-black text-gray-200">
                {(error as ErrorResponse).status}
              </h1>
            )}
            <p className="mt-4 text-gray-500">{errorMessage}</p>
            <Link
              to="/"
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
