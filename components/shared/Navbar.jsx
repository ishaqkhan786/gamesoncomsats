"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { RiMenu2Fill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NonAdminNavlinks from "./NonAdminNavlinks";
import Logout from "./Logout";
import { useEffect, useState } from "react";

const Navbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    // const navbar = document.getElementById("navbar");
    // if (navbar) {
    if (window.scrollY > 0) {
      // navbar.classList.add("scrolled");
      console.log("scrolled");
      setIsScrolled(true);
    } else {
      // navbar.classList.remove("scrolled");
      console.log("unnnnscrolled");
      setIsScrolled(false);
    }
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`${
        isScrolled
          ? " bg-gradient-to-br from-blue-950 to-blue-800 pb-3"
          : " bg-transparent"
      } transition-all navbar  flex pt-4  px-8 items-start justify-between gap-8`}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="block  md:hidden ">
          <Sheet>
            <SheetTrigger>
              <RiMenu2Fill className="text-2xl font-bold mt-4" />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex justify-between flex-col bg-white"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center justify-start">
                    <Image
                      src={"/comsats.png"}
                      alt="logo"
                      width={40}
                      height={40}
                      className=""
                    />
                    <h2 className="ml-4 text-primary font-semibold">
                      Games on Comsats
                    </h2>
                  </div>
                </SheetTitle>
                <Separator />

                <div className=" flex flex-col md:hidden mx-5 items-center gap-5 pt-12  ">
                  <NonAdminNavlinks />
                </div>
              </SheetHeader>
              <SheetDescription className="">
                <div className="flex  text-center flex-col-reverse gap-2 md:flex-row md:justify-between items-center justify-center text-slate-500">
                  <p className="text-xs font-semibold text-primary-100">
                    @2024 Asfar Munir Asfi.{" "}
                    <span className="font-normal text-slate-500">
                      All Rights Reserved
                    </span>
                  </p>
                </div>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>

        <Image
          src="/comsats.png"
          width={40}
          height={35}
          alt="Logo"
          className={`" w-[0px] transition-all ${
            isScrolled ? "md:w-[50px]" : "md:w-[100px]"
          } "`}
        />
      </div>
      <div className=" hidden md:flex mx-5 items-center gap-5 pt-3  ">
        <NonAdminNavlinks isScrolled={isScrolled} />
      </div>

      <div className="flex items-center pt-1.5 justify-end gap-3">
        {!user ? (
          <Button
            asChild
            className="rounded-full bg-primary hover:bg-primary-100 px-4  lg:px-6  focus:outline:primary-100 "
            size="sm"
          >
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <div href="#" className="inline-flex w-full space-x-3 items-start">
            <span>
              <Image
                className="rounded-full w-12 h-7"
                width={34}
                height={24}
                src={"/pp-black.png"}
                alt=""
              />
            </span>
            <div className="w-full">
              <p className="flex items-center justify-between w-full">
                <span
                  className={`text-sm md:text-base font-bold capitalize ${
                    isScrolled ? "text-white" : "text-slate-700"
                  } `}
                >
                  {user.name}
                </span>
                <Logout />
              </p>

              <span className="text-xs  block text-slate-400 capitalize">
                {user.role}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
