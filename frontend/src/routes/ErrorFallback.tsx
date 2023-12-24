import { useEffect, useRef } from "react";
import { FallbackProps } from "react-error-boundary";
import { useLocation } from "react-router-dom";

export default function ErrorFallback({ ...props }: FallbackProps) {
  const { pathname } = useLocation();
  const originalPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== originalPathname.current) {
      props.resetErrorBoundary();
    }
  }, [pathname, props.resetErrorBoundary]);
  return (
    <div className="grid place-content-center bg-white px-4">
      <div className="text-center">
        <pre className="mt-4 text-gray-500">{props.error.message}</pre>
        <button
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          onClick={() => props.resetErrorBoundary()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
