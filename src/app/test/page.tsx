"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarsIcon,
  CheckIcon,
  SpinnerIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

interface SidebarSectionProps {
  title: string;
  links: { id: string; label: string }[];
}

const Section = ({ title, children, id }: SectionProps) => (
  <section id={id} className="space-y-4 rounded-md bg-white p-4 shadow-md">
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="flex flex-wrap gap-4">{children}</div>
  </section>
);

const SidebarSection = ({ title, links }: SidebarSectionProps) => (
  <Accordion type="single" collapsible>
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger className="flex w-full cursor-pointer justify-between text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
      </AccordionTrigger>
      <AccordionContent className="ml-4 mt-2 space-y-2">
        {links.map(({ id, label }) => (
          <Button key={id} asChild className="block text-white" variant="link">
            <a href={`#${id}`}>{label}</a>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const buttonVariants: (
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  )[] = ["default", "destructive", "outline", "secondary", "ghost", "link"];

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (process.env.NODE_ENV !== "development") {
    router.replace("/");
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto bg-gray-800 text-white transition-transform md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-8">
          <h2 className="mb-4 text-2xl font-bold">UI Components</h2>
          <SidebarSection
            title="Buttons"
            links={[
              { id: "variants", label: "Variants" },
              { id: "sizes", label: "Sizes" },
              { id: "states", label: "States" },
              { id: "loading", label: "Loading" },
              { id: "icons", label: "With Icon" },
              { id: "animations", label: "Animations" },
            ]}
          />
          <SidebarSection
            title="Other Components"
            links={[{ id: "badge", label: "Badge" }]}
          />
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-md md:hidden">
          <Button
            className="bg-gray-800 p-2 text-white"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <BarsIcon />
          </Button>
        </header>

        <main className="h-[calc(100vh-64px)] overflow-y-auto bg-gray-100 md:h-screen">
          <div className="space-y-12 p-8">
            <h1 className="mb-8 text-3xl font-bold">
              UI Components Playground
            </h1>

            <Section title="Button Variants" id="variants">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </Section>

            <Section title="Disabled States" id="states">
              <Button>Default</Button>
              {buttonVariants.map((variant) => (
                <Button key={variant} disabled variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </Section>

            <Section title="Loading State" id="loading">
              <Button onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Click me"}
              </Button>
              <Button onClick={handleClick} disabled={isLoading}>
                {isLoading && <SpinnerIcon className="mr-2 animate-spin" />}
                {isLoading ? "Please wait" : "Click me"}
              </Button>
            </Section>

            <Section title="Button with Icon" id="icons">
              <Button>
                <CheckIcon className="mr-2" />
                Confirm
              </Button>
              <Button>
                Continue
                <ArrowRightIcon className="ml-2" />
              </Button>
              <Button size="icon">
                <CheckIcon size={16} />
              </Button>
            </Section>

            <Section
              title="Button Animations (on dif variants)"
              id="animations"
            >
              <Button
                animate="expandIcon"
                icon={<ArrowRightIcon size={14} />}
                iconPlacement="right"
              >
                Expand Icon
              </Button>

              <Button
                variant="secondary"
                animate="expandIcon"
                icon={<ArrowLeftIcon size={14} />}
                iconPlacement="left"
              >
                Expand Icon
              </Button>

              <Button animate="ringHover">Ring Hover</Button>

              <Button variant="ghost" animate="gooeyRight">
                Gooey Right
              </Button>

              <Button animate="gooeyLeft">Gooey Left</Button>

              <Button variant="ghost" animate="linkHover1">
                Link Hover 1
              </Button>

              <Button variant="secondary" animate="linkHover2">
                Link Hover 2
              </Button>
            </Section>

            <Section title="Badge Variants" id="badge">
              <Badge variant="default" className="mr-2">
                Default
              </Badge>
              <Badge variant="secondary" className="mr-2">
                Secondary
              </Badge>
              <Badge variant="outline" className="mr-2">
                Outline
              </Badge>
              <Badge variant="destructive" className="mr-2">
                Destructive
              </Badge>
            </Section>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
}
