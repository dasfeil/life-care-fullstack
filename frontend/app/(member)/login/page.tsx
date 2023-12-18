import PillButton from "@/app/component/PillButton";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-fit m-auto">
      <p className="text-center font-bold text-5xl mb-10">Log in</p>
      <PillButton type={"facebook"} className="mb-3" />
      <PillButton type={"google"} />
      <hr className="w-[24rem] max-w-full m-10" />
      <form className="flex flex-col justify-center items-center">
        <label htmlFor="userCred" className="flex flex-col">
          Email or ID
          <input type="text" id="userCred" />
        </label>
        <label htmlFor="pwd" className="flex flex-col">
          Password
          <input type="password" id="pwd" />
        </label>
      </form>
    </div>
  );
}
