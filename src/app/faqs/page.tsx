"use client";

import Navbar from "@/components/shared/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Faq, FaqCategory, fetchFaqs } from "@/data/services/faqService";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

// TODO: Create data layer
// TODO: Dynamic Metadata
// TODO: Fix structure, navbar should not be in this file
// TODO: Segregate into components
// TODO: Use server actions

interface FormData {
  email: string;
  subject: string;
  message: string;
}

interface CategoriesProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

interface ContactFormProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DEFAULT_CATEGORY = "All";

export default function FaqPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FaqPageContent />
    </Suspense>
  );
}

function FaqPageContent() {
  const [category, setCategory] = useQueryState("category", {
    parse: String,
    defaultValue: DEFAULT_CATEGORY,
    history: "push",
  });

  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: "",
  });

  const allCategories = useMemo(() => {
    const fetched = faqCategories.map((cat) => cat.category);
    return Array.from(new Set([DEFAULT_CATEGORY, ...fetched]));
  }, [faqCategories]);

  const selectedFaqs = useMemo<Faq[]>(() => {
    if (category === DEFAULT_CATEGORY)
      return faqCategories.flatMap((cat) => cat.questions);

    const categoryData = faqCategories.find(
      (cat) => cat.category.toLowerCase() === category.toLowerCase(),
    );
    return categoryData?.questions ?? [];
  }, [faqCategories, category]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // TODO: Implement actual form submission
      setFormData({ email: "", subject: "", message: "" });
    },
    [formData],
  );

  const handleCategoryClick = useCallback(
    (selectedCategory: string) => {
      setCategory(selectedCategory);
    },
    [setCategory],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFaqs();
        setFaqCategories(data);

        const fetchedCategories = data.map((cat) => cat.category);
        const combinedCategories = Array.from(
          new Set([DEFAULT_CATEGORY, ...fetchedCategories]),
        );

        const matchedCategory = combinedCategories.find(
          (cat) => cat.toLowerCase() === category.toLowerCase(),
        );

        if (!matchedCategory) setCategory(DEFAULT_CATEGORY);
        else if (matchedCategory !== category) setCategory(matchedCategory);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-grow flex-col p-8">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
          Got questions? Look Here.
        </h2>
        <div className="flex flex-grow flex-col gap-8 lg:flex-row">
          <CategoriesMobile
            categories={allCategories}
            selected={category}
            onSelect={handleCategoryClick}
          />
          <CategoriesSidebar
            categories={allCategories}
            selected={category}
            onSelect={handleCategoryClick}
          />
          <div className="flex w-full flex-col gap-20 sm:flex-grow md:mx-auto md:w-3/4 lg:mx-0 lg:w-1/2 lg:flex-grow-0">
            <Accordion type="single" collapsible className="w-full">
              {selectedFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${faq.question}-${index}`}
                  value={`item-${index}`}
                  className="mb-4"
                >
                  <AccordionTrigger className="px-4 py-3 text-base font-semibold sm:text-lg lg:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <ContactForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

const CategoriesMobile: React.FC<CategoriesProps> = ({
  categories,
  selected,
  onSelect,
}) => (
  <div className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide lg:hidden">
    <div className="inline-flex space-x-2">
      {categories.map((category) => {
        return (
          <Badge
            key={category}
            variant={selected === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(category)}
          >
            {category}
          </Badge>
        );
      })}
      <Badge
        key={"coming-soon"}
        variant="outline"
        className="cursor-not-allowed opacity-50"
      >
        More coming soon...
      </Badge>
    </div>
  </div>
);

const CategoriesSidebar: React.FC<CategoriesProps> = ({
  categories,
  selected,
  onSelect,
}) => (
  <aside className="hidden min-h-full flex-col rounded-lg border p-6 lg:block lg:w-1/4">
    <h3 className="mb-6 text-xl font-semibold text-cyan-700">Categories</h3>
    <ul className="space-y-3">
      {categories.map((category) => {
        return (
          <li
            key={category}
            className={cn(
              "relative flex w-fit cursor-pointer text-gray-700 transition-colors duration-200 after:absolute after:bottom-[-2px] after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:text-cyan-700 hover:after:origin-bottom-left hover:after:scale-x-100",
              selected === category
                ? "font-semibold text-cyan-600"
                : "text-gray-700 hover:text-cyan-600",
            )}
            onClick={() => onSelect(category)}
          >
            {category}
          </li>
        );
      })}
      <li className="cursor-not-allowed text-gray-400">More coming soon...</li>
    </ul>
  </aside>
);

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => (
  <div className="mt-auto text-center">
    <h3 className="mb-2 text-xl font-bold text-cyan-700">
      Still got questions?
    </h3>
    <p className="mb-4 text-gray-600">
      Can&apos;t find the answer you&apos;re looking for? Please email us.
    </p>
    <form onSubmit={onSubmit} className="mx-auto grid gap-4 lg:w-2/3">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onChange}
        required
      />
      <Input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={onChange}
        required
      />
      <Textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={onChange}
        required
      />
      <Button type="submit" className="ml-auto w-fit">
        Submit
      </Button>
    </form>
  </div>
);
