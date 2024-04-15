export default function RootLayout({ children }) {
  return (
    <div className=" min-h-screen w-full flex items-center justify-center flex-grow bg-gradient-to-tr from-blue-50 to-blue-300 bg-dotted-pattern bg-cover bg-fixed bg-center ">
      <main className="">{children}</main>
    </div>
  );
}
