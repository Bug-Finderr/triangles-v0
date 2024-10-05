"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowRightIcon,
  BarsIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SpinnerIcon,
} from "@/components/ui/Icons";
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
  isOpen: boolean;
  onToggle: () => void;
}

const Section = ({ title, children, id }: SectionProps) => (
  <section id={id} className="space-y-4 p-4 bg-white rounded-md shadow-md">
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="flex flex-wrap gap-4">{children}</div>
  </section>
);

const SidebarSection = ({
  title,
  links,
  isOpen,
  onToggle,
}: SidebarSectionProps) => (
  <Collapsible open={isOpen} onOpenChange={onToggle}>
    <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer">
      <h3 className="text-lg font-semibold">{title}</h3>
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </CollapsibleTrigger>
    <CollapsibleContent className="space-y-2 ml-4 mt-2">
      {links.map((link) => (
        <Button
          key={link.id}
          asChild
          className="block text-white"
          variant="link"
        >
          <a href={`#${link.id}`}>{link.label}</a>
        </Button>
      ))}
    </CollapsibleContent>
  </Collapsible>
);

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoCollapsibleOpen, setIsDemoCollapsibleOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sections, setSections] = useState({
    buttons: false,
    components: false,
  });

  const router = useRouter();

  const buttonVariants: Array<
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  > = ["default", "destructive", "outline", "secondary", "ghost", "link"];

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleToggle = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (process.env.NODE_ENV !== "development") {
    router.replace("/");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-gray-800 text-white transition-transform md:relative md:translate-x-0 overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">UI Components</h2>
          <SidebarSection
            title="Buttons"
            links={[
              { id: "variants", label: "Variants" },
              { id: "sizes", label: "Sizes" },
              { id: "states", label: "States" },
              { id: "loading", label: "Loading" },
              { id: "icons", label: "With Icon" },
            ]}
            isOpen={sections.buttons}
            onToggle={() => handleToggle("buttons")}
          />
          <SidebarSection
            title="Other Components"
            links={[{ id: "collapsible", label: "Collapsible" }]}
            isOpen={sections.components}
            onToggle={() => handleToggle("components")}
          />
        </div>
      </aside>

      <main className="bg-gray-100 min-h-screen flex-grow">
        <header className="sticky top-0 z-10 bg-white shadow-md p-4 md:hidden">
          <Button
            className="p-2 bg-gray-800 text-white"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <BarsIcon />
          </Button>
        </header>

        <div className="p-8 space-y-12">
          <h1 className="text-3xl font-bold mb-8">UI Components Playground</h1>

          {/* Button Variants */}
          <Section title="Button Variants" id="variants">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </Section>

          {/* Disabled States */}
          <Section title="Disabled States" id="states">
            <Button>Default</Button>
            {buttonVariants.map((variant) => (
              <Button key={variant} disabled variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </Section>

          {/* Loading State */}
          <Section title="Loading State" id="loading">
            <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? "Loading..." : "Click me"}
            </Button>
            <Button onClick={handleClick} disabled={isLoading}>
              {isLoading && <SpinnerIcon className="mr-2 animate-spin" />}
              {isLoading ? "Please wait" : "Click me"}
            </Button>
          </Section>

          {/* Button with Icon */}
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

          {/* Collapsible Demo */}
          <Section title="Collapsible Demo" id="collapsible-demo">
            <Collapsible
              open={isDemoCollapsibleOpen}
              onOpenChange={setIsDemoCollapsibleOpen}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline">
                  {isDemoCollapsibleOpen ? "Hide Details" : "Show Details"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <p className="text-gray-700 md:ml-2">
                  This is a collapsible content demo. Click the button above to
                  toggle this section. You can add any content here, such as
                  text, forms, or other components.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </Section>
        </div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
