import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="bg-black w-screen h-12 flex">
        <a className="text-white m-1 self-center" href="/">
          lifecare
        </a>
      </div>
      <div className="sm:w-full">
        <Outlet/>
      </div>
    </>
  );
}
