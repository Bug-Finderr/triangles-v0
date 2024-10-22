"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Faq, FaqCategory, fetchFaqs } from "@/data/services/faqService";
import { cn } from "@/lib/utils";

// TODO: Create data layer
// TODO: Dynamic Metadata
// TODO: Fix structure, navbar should not be in this file

type FormData = {
  email: string;
  subject: string;
  message: string;
};

interface SkeletonWrapperProps {
  loading: boolean;
  children: React.ReactNode;
}

interface CategoriesProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  available: FaqCategory[];
}

interface ContactFormProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DEFAULT_CATEGORY = "All";
const EXTRA_CATEGORIES = [
  "Events",
  "Account",
  "Partnerships",
  "Technical Support",
];

export default function FaqPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: "",
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const allCategories = useMemo(() => {
    const fetched = faqCategories.map((cat) => cat.category);
    return Array.from(new Set(["All", ...fetched, ...EXTRA_CATEGORIES]));
  }, [faqCategories]);

  const selectedFaqs = useMemo<Faq[]>(() => {
    if (selectedCategory === "All")
      return faqCategories.flatMap((cat) => cat.questions);

    return (
      faqCategories.find((cat) => cat.category === selectedCategory)
        ?.questions || []
    );
  }, [faqCategories, selectedCategory]);

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
    (category: string) => {
      setSelectedCategory(category);
      router.push(`?category=${encodeURIComponent(category)}`, {
        scroll: false,
      });
    },
    [router],
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFaqs();
        setFaqCategories(data);

        const categoryParam = searchParams.get("category");
        const fetchedCategories = data.map((cat) => cat.category);
        const allCategories = Array.from(
          new Set(["All", ...fetchedCategories, ...EXTRA_CATEGORIES]),
        );

        const matchedCategory = categoryParam
          ? allCategories.find(
              (cat) => cat.toLowerCase() === categoryParam.toLowerCase(),
            )
          : DEFAULT_CATEGORY;

        setSelectedCategory(matchedCategory || DEFAULT_CATEGORY);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <Navbar />
      <SkeletonWrapper loading={loading || selectedCategory === null}>
        <main className="flex-grow container mx-auto p-8 flex flex-col">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-950 text-center mb-8">
            Got questions? Look Here.
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 flex-grow">
            <Categories
              categories={allCategories}
              selected={selectedCategory!}
              onSelect={handleCategoryClick}
              available={faqCategories}
              isMobile={isMobile}
            />
            <div className="lg:w-1/2 md:w-3/4 md:mx-auto lg:mx-0 w-full flex flex-col gap-20 sm:flex-grow lg:flex-grow-0">
              <Accordion type="single" collapsible className="w-full">
                {selectedFaqs.map((faq, index) => (
                  <AccordionItem
                    key={`${faq.question}-${index}`}
                    value={`item-${index}`}
                    className="mb-4"
                  >
                    <AccordionTrigger className="text-base sm:text-lg lg:text-xl font-semibold py-3 px-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base py-3 px-4">
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
      </SkeletonWrapper>
    </div>
  );
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  loading,
  children,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col flex-grow">
        <main className="flex-grow container mx-auto p-8 flex flex-col">
          <Skeleton className="h-8 md:h-10 w-72 md:w-[450px] mx-auto mb-8" />

          <div className="flex flex-col lg:flex-row gap-8 flex-grow">
            <div className="lg:hidden overflow-x-auto whitespace-nowrap pb-2">
              <div className="inline-flex space-x-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <aside className="hidden lg:block lg:w-1/4 border p-6 rounded-lg">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </aside>

            <div className="lg:w-1/2 md:w-3/4 md:mx-auto lg:mx-0 w-full flex flex-col gap-20 sm:flex-grow lg:flex-grow-0">
              <div className="w-full">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="mb-4 border-b">
                    <div className="py-3 px-4">
                      <Skeleton className="h-7 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto text-center">
                <Skeleton className="h-8 w-48 mx-auto mb-2" />
                <Skeleton className="h-5 w-full md:w-96 mx-auto mb-4" />

                <form className="grid gap-4 lg:w-2/3 mx-auto">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-end">
                    <Skeleton className="h-10 w-24" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
};

const Categories: React.FC<CategoriesProps & { isMobile: boolean }> = ({
  categories,
  selected,
  onSelect,
  available,
  isMobile,
}) => {
  const CategoryList = isMobile ? CategoriesMobile : CategoriesSidebar;
  return (
    <CategoryList
      categories={categories}
      selected={selected}
      onSelect={onSelect}
      available={available}
    />
  );
};

const CategoriesMobile: React.FC<CategoriesProps> = ({
  categories,
  selected,
  onSelect,
  available,
}) => (
  <div className="overflow-x-auto whitespace-nowrap pb-4">
    <div className="inline-flex space-x-2">
      {categories.map((category) => {
        const isAvailable =
          category === "All" ||
          available.some((cat) => cat.category === category);
        return (
          <Badge
            key={category}
            variant={selected === category ? "default" : "outline"}
            className={cn(
              "cursor-pointer",
              isAvailable ? "" : "opacity-50 cursor-not-allowed",
            )}
            onClick={() => isAvailable && onSelect(category)}
          >
            {category}
            {!isAvailable && (
              <span className="ml-1 text-xs">(Coming Soon)</span>
            )}
          </Badge>
        );
      })}
    </div>
  </div>
);

const CategoriesSidebar: React.FC<CategoriesProps> = ({
  categories,
  selected,
  onSelect,
  available,
}) => (
  <aside className="lg:w-1/4 border p-6 rounded-lg flex flex-col min-h-full">
    <h3 className="text-xl font-semibold mb-6 text-teal-700">Categories</h3>
    <ul className="space-y-3">
      {categories.map((category) => {
        const isAvailable =
          category === "All" ||
          available.some((cat) => cat.category === category);
        return (
          <li
            key={category}
            className={cn(
              "transition-colors duration-200",
              isAvailable ? "cursor-pointer" : "cursor-not-allowed",
              selected === category
                ? "text-teal-600 font-semibold"
                : isAvailable
                  ? "text-gray-700 hover:text-teal-600"
                  : "text-gray-400",
            )}
            onClick={() => isAvailable && onSelect(category)}
          >
            <div className="flex items-center justify-between">
              <span>{category}</span>
              {!isAvailable && (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </aside>
);

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => (
  <div className="mt-auto text-center">
    <h3 className="text-xl font-bold mb-2 text-teal-700">
      Still got questions?
    </h3>
    <p className="text-gray-600 mb-4">
      Can&apos;t find the answer you&apos;re looking for? Please email us.
    </p>
    <form onSubmit={onSubmit} className="grid gap-4 lg:w-2/3 mx-auto">
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
      <Button type="submit" className="w-fit ml-auto">
        Submit
      </Button>
    </form>
  </div>
);
