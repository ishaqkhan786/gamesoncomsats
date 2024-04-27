"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { GiDatabase } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";
import { SiSecurityscorecard } from "react-icons/si";
import { GiShoppingBag } from "react-icons/gi";

const nonAdminLinks = [
  {
    text: "Home",
    description: "Sports portal",
    icon: <MdDashboard />,
    href: "/",
  },
  {
    text: "Equipments",
    description: "book equipments",
    icon: <GiDatabase />,
    href: "/inventory",
  },
  {
    text: "Events",
    description: "Check events",
    icon: <MdEmojiEvents />,
    href: "/events",
  },
  {
    text: "Playgrounds",
    description: "Book grounds",
    icon: <BiSolidCricketBall />,
    href: "/ground",
  },
  {
    text: "LiveScore",
    description: "Score card and results",
    icon: <SiSecurityscorecard />,
    href: "/livescore",
  },
  {
    text: "E Shop",
    description: "Get exciting merchendise",
    icon: <GiShoppingBag />,
    href: "/e-shop",
  },
];

const NonAdminNavlinks = ({ isScrolled }) => {
  const pathname = usePathname();

  return (
    <>
      {nonAdminLinks.map((link) => {
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
