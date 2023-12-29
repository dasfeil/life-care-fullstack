import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col items-center w-full sm:w-[80%] flex-grow bg-slate-100 rounded-md self-center drop-shadow-md">
      <div className="relative w-full rounded-md bg-slate-600 pb-10 h-40">
        <div className="absolute -bottom-1/2 w-full flex">
          <img
            src="/user_placeholder_img.jpg"
            className="rounded-full w-40 m-auto md:ml-5"
          />
        </div>
      </div>
      <div className="mt-24 flex w-full text-xl sm:text-3xl px-2 lg:self-start lg:gap-72 lg:mx-20">
        <div className="flex-grow m-3 mt-10 w-full md:w-[35rem] md:flex-grow-0 flex flex-col gap-5 border-2 drop-shadow-sm rounded-2xl p-4 bg-white">
          <div>
            <p className="text-[#696969]">Your Name</p>
            <div className="flex justify-between">
              <p className="self-center">{auth?.username}</p>
              <button
                type="button"
                className="text-gray-900 bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-[#696969]">Email</p>
            <div className="flex justify-between">
              <p className="self-center">{auth?.email}</p>
              <button
                type="button"
                className="text-gray-900 bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-[#696969]">Your Number</p>
            <div className="flex justify-between">
              <p className="self-center">{auth?.phoneNo}</p>
              <button
                type="button"
                className="text-gray-900 bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-[#696969]">Rank</p>
            <div className="flex justify-between">
              <p className="self-center">{auth?.userRank}</p>
              <button
                type="button"
                className="text-gray-900 bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
              >
                Change
              </button>
            </div>
          </div>
          <div>
            <p className="text-[#696969]">Roles:</p>
            <div>
              {auth?.roles.map((role, index) => (
                <span key={role}>
                  <span>{role}</span>
                  <span
                    className={index == auth.roles.length - 1 ? "hidden" : ""}
                  >
                    {", "}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex m-3 mt-10 w-[25rem] flex-col gap-5 border-2 drop-shadow-sm rounded-2xl p-4 bg-white">
          <p className="font-semibold">Your Interests</p>
          <div className="w-full flex flex-wrap">
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Mobile devices
            </button>
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Speakers
            </button>{" "}
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Keyboards
            </button>{" "}
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Sales
            </button>{" "}
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Specials
            </button>{" "}
            <button
              type="button"
              className="text-gray-900 h-8 self-center bg-[#ebebeb] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-3xl text-sm px-4 py-1.5 me-2 mb-2"
            >
              Headphones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
