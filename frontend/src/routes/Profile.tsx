import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col items-center w-full sm:w-[80%] flex-grow bg-white rounded-md self-center drop-shadow-md">
      <div className="relative w-full rounded-md bg-[#4e3838] pb-10 h-40">
        <div className="absolute -bottom-1/2 w-full flex">
          <img
            src="/user_placeholder_img.jpg"
            className="rounded-full w-40 m-auto md:ml-5"
          />
        </div>
      </div>
      <div className="mt-24 flex w-full text-2xl sm:text-3xl px-2">
        <div className="flex-grow m-3 mt-10 w-full md:w-[80%] flex flex-col gap-5 border-2 drop-shadow-md rounded-md p-4">
          <div>
            <p>Your name</p>
          </div>
          <p>Your email is {auth?.email}</p>
          <div className="flex gap-2">
            <p>You have {auth?.roles.length} roles:</p>
            <ul>
              {auth?.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
