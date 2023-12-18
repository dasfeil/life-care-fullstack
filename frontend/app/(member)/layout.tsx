
export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-black w-screen h-12 flex">
        <a className="text-white m-1 self-center" href="/">
          lifecare
        </a>
      </div>
      {children}
    </>
  );
}
