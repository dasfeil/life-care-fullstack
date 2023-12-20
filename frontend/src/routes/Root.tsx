import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <div className="bg-black w-full h-12 flex justify-between">
        <Link className="text-white m-1 self-center" to="/">
          lifecare
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
