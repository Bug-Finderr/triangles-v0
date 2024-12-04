"use client";

import { Button } from "@/components/ui/button";
import { BarsIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import icon from "@/public/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = Object.freeze([
  ["Home", "/#home"],
  ["Events", "/#events"],
  ["About Us", "/#about"],
]);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-sm md:px-8 lg:px-24">
      <Image src={icon} alt="Triangles Icon" height={28} className="ml-1" />
      <nav
        className={cn(
          "fixed inset-0 z-50 items-center justify-center bg-white transition-transform duration-300 ease-in-out lg:absolute lg:left-1/2 lg:flex lg:bg-transparent",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-[-50%]",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center lg:h-auto lg:flex-row">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative mx-6 py-4 text-xl font-bold lg:py-0 lg:text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="relative w-fit after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:text-cyan-700 hover:after:origin-bottom-left hover:after:scale-x-100">
                {label}
              </span>
            </a>
          ))}
          <Link href="/coming-soon" passHref>
            <Button size="lg" animate="gooeyLeft" className="mt-6 lg:hidden">
              Login
            </Button>
          </Link>
          <Link href="/coming-soon" passHref>
            <Button
              variant="outline"
              size="lg"
              animate="gooeyLeft"
              className="mt-6 lg:hidden"
            >
              Host
            </Button>
          </Link>
        </div>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        <Link href="/coming-soon" passHref>
          <Button
            size="sm"
            animate="gooeyLeft"
            className="hidden lg:inline-flex"
          >
            Login
          </Button>
        </Link>
        <Link href="/coming-soon" passHref>
          <Button
            variant="outline"
            size="sm"
            animate="gooeyLeft"
            className="hidden lg:inline-flex"
          >
            Host
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon size={20} /> : <BarsIcon size={20} />}
        </Button>
      </div>
    </header>
  );
}
