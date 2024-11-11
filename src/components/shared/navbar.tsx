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
      <Image src={icon} alt="Triangles Icon" height={28} />
      <nav
        className={cn(
          "fixed inset-0 z-50 h-full w-full items-center bg-white transition-transform duration-300 ease-in-out lg:relative lg:flex lg:h-auto lg:w-auto lg:bg-transparent",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center lg:h-auto lg:flex-row">
          {["Home", "About Us", "Events"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase().replace(" ", "-")}`}
              className="py-4 text-xl font-bold transition-colors hover:text-teal-600 lg:mx-6 lg:py-0 lg:text-base"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              {item}
            </a>
          ))}
          <Button
            size="lg"
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
