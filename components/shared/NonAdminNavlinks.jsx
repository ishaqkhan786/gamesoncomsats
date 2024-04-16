"use client";
import React from "react";
import { adminLinks } from "./Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NonAdminNavlinks = ({ isScrolled }) => {
  const pathname = usePathname();

  return (
    <>
      {adminLinks.map((link) => {
        return (
          <div
            key={link.text}
            className="flex items-center justify-center gap-1"
          >
            {React.cloneElement(link.icon, {
              className: `w-6 h-6 mr-1 ${
                link.href === pathname
                  ? isScrolled
                    ? "text-white"
                    : "text-primary"
                  : isScrolled
                  ? "text-slate-300"
                  : "text-slate-300"
              }`,
            })}
            <Link
              href={link.href}
              className={` 
              ${
                link.href === pathname
                  ? isScrolled
                    ? "text-white font-semibold border-b border-white"
                    : "text-primary font-semibold border-b border-primary"
                  : isScrolled
                  ? "text-slate-200"
                  : "text-slate-700"
              }`}
            >
              {link.text}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default NonAdminNavlinks;
