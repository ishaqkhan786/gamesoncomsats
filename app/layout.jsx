import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthSessionProvider from "@/lib/AuthSession";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});
import NextTopLoader from 'nextjs-toploader';


export const metadata = {
  title: "Game On COMSATS",
  description: "Comsats Sports Portal",
  // icons: {
  //   icon: "/assets/images/logo.svg",
  // },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body className={poppins.variable}>
        <NextTopLoader />
          {children}
          <Toaster position="top-center" />
        </body>
      </AuthSessionProvider>
    </html>
  );
}