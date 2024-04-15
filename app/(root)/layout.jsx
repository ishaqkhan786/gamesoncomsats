// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Header";

import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/shared/Navbar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const sessionUser = await getServerSession(authOptions);
  if (!sessionUser) {
    redirect("/login");
  }

  return (
    <div
      className={`h-screen flex ${
        sessionUser.user && sessionUser.user.role !== "admin"
          ? "flex-col"
          : "flex-row"
      } bg-slate-50 `}
    >
      {/* <Navbar /> */}
      {sessionUser.user.role === "admin" && <Sidebar />}
      {sessionUser.user.role !== "admin" && (
        <div className="sticky top-0 z-50 w-full">
          <Navbar user={{ ...sessionUser.user, id: undefined }} />
        </div>
      )}

      <main
        className={`flex-1 ${
          sessionUser.user && sessionUser.user.role === "admin"
            ? " overflow-y-scroll scroll-smooth "
            : null
        }  `}
      >
        {children}
      </main>
      {/* <Footer />- */}
    </div>
  );
}
