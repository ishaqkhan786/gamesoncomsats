// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image"

export default async function RootLayout({
  children,
}) {

  return (
    <div className=" h-screen flex  bg-slate-50 ">
      {/* <Navbar /> */}
      <Sidebar />
      <main className="flex-1 overflow-y-scroll">
        <div className=" hidden w-full sticky md:flex p-4 
         bg-white shadow items-center justify-center  text-3xl
          font-bold text-primary">
          <Image src={'/logo.png'} width={70} height={70} alt={'logo'} />
          <h2 className=" ">GAMES ON COMSATS</h2>
        </div>
        {children}
      </main>
      {/* <Footer />- */}
    </div>
  );
}