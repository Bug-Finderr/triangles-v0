"use client";

import { Button } from "@/components/ui/button";
import { BarsIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import icon from "@/public/Icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="py-3 px-4 lg:px-24 flex justify-between items-center z-50 sticky top-0 bg-white shadow-sm md:px-8">
      <Image src={icon} alt="Triangles Icon" height={28} />
      <nav
        className={cn(
          "fixed lg:relative inset-0 w-full h-full lg:w-auto lg:h-auto bg-white lg:bg-transparent z-50 lg:flex items-center transition-transform duration-300 ease-in-out",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center h-full lg:h-auto">
          {["Home", "About Us", "Events"].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase().replace(" ", "-")}`}
              className="text-xl lg:text-base font-bold text-teal-950 hover:text-teal-600 transition-colors py-4 lg:py-0 lg:mx-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button
            size="lg"
            className="mt-6 lg:hidden"
            onClick={() => router.push("/coming-soon")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="mt-6 lg:hidden"
            onClick={() => router.push("/coming-soon")}
          >
            Host
          </Button>
        </div>
      </nav>
      <div className="flex gap-2 lg:gap-4 items-center">
        <Button
          size="sm"
          className="hidden lg:inline-flex"
          onClick={() => router.push("/coming-soon")}
        >
          Login
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="hidden lg:inline-flex"
          onClick={() => router.push("/coming-soon")}
        >
          Host
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
};

export default Navbar;
