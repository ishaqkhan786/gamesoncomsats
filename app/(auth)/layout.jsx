export default function RootLayout({
    children,
  }) {
    return (
      <div className=" min-h-screen w-full grid place-items-center bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center ">
        <main className="">{children}</main>
      </div>
    );
  }