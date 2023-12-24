import { useEffect } from "react";
import Instance from "./instance";
import { useErrorBoundary } from "react-error-boundary";
const AxiosErrorHandler = ({ children }: Props) => {
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const requestInterceptor = Instance.interceptors.request.use((request) => {
      return request;
    });

    const responseInterceptor = Instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          if (typeof error.response.data == "string") {
            return Promise.reject(error.response.data);
          } else {
            Promise.reject();
            showBoundary(error);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          return showBoundary(error);
        } else {
          Promise.reject();
          showBoundary(error);
        }
      }
    );

    return () => {
      Instance.interceptors.request.eject(requestInterceptor);
      Instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};

type Props = {
  children: React.JSX.Element;
};

export default AxiosErrorHandler;
