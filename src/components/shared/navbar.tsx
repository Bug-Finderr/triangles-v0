"use client";

import { Button } from "@/components/ui/button";
import { BarsIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import icon from "@/public/icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

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
          {["Home", "Events", "About Us"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase().replace(" ", "-")}`}
              className="relative mx-6 py-4 text-xl font-bold lg:py-0 lg:text-base"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <span className="relative w-fit transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:text-cyan-600 hover:after:origin-bottom-left hover:after:scale-x-100">
                {item}
              </span>
            </a>
          ))}
          <Button
            size="lg"
            animate="gooeyLeft"
            className="mt-6 lg:hidden"
            onClick={() => {
              router.push("/coming-soon");
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            animate="gooeyLeft"
            className="mt-6 lg:hidden"
            onClick={() => {
              router.push("/coming-soon");
            }}
          >
            Host
          </Button>
        </div>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          size="sm"
          animate="gooeyLeft"
          className="hidden lg:inline-flex"
          onClick={() => {
            router.push("/coming-soon");
          }}
        >
          Login
        </Button>
        <Button
          variant="outline"
          size="sm"
          animate="gooeyLeft"
          className="hidden lg:inline-flex"
          onClick={() => {
            router.push("/coming-soon");
          }}
        >
          Host
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="z-50 lg:hidden"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <BarsIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </header>
  );
}
