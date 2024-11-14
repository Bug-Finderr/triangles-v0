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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Faq, FaqCategory, fetchFaqs } from "@/data/services/faqService";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

// TODO: Create data layer
// TODO: Dynamic Metadata
// TODO: Fix structure, navbar should not be in this file
// TODO: Segregate into components

interface FormData {
  email: string;
  subject: string;
  message: string;
}

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const allCategories = useMemo(() => {
    const fetched = faqCategories.map((cat) => cat.category);
    return Array.from(new Set(["All", ...fetched, ...EXTRA_CATEGORIES]));
  }, [faqCategories]);

  const selectedFaqs = useMemo<Faq[]>(() => {
    if (category === "All")
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
      setLoading(true);
      try {
        const data = await fetchFaqs();
        setFaqCategories(data);

        const fetchedCategories = data.map((cat) => cat.category);
        const combinedCategories = Array.from(
          new Set(["All", ...fetchedCategories, ...EXTRA_CATEGORIES]),
        );

        const matchedCategory = combinedCategories.find(
          (cat) => cat.toLowerCase() === category.toLowerCase(),
        );

        if (!matchedCategory) setCategory(DEFAULT_CATEGORY);
        else if (matchedCategory !== category) setCategory(matchedCategory);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <Navbar />
      <SkeletonWrapper loading={loading || !category}>
        <main className="container mx-auto flex flex-grow flex-col p-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
            Got questions? Look Here.
          </h2>
          <div className="flex flex-grow flex-col gap-8 lg:flex-row">
            <Categories
              categories={allCategories}
              selected={category}
              onSelect={handleCategoryClick}
              available={faqCategories}
              isMobile={isMobile}
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
      <div className="flex flex-grow flex-col">
        <main className="container mx-auto flex flex-grow flex-col p-8">
          <Skeleton className="mx-auto mb-8 h-8 w-72 md:h-10 md:w-[450px]" />

          <div className="flex flex-grow flex-col gap-8 lg:flex-row">
            <div className="overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide lg:hidden">
              <div className="inline-flex space-x-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <aside className="hidden rounded-lg border p-6 lg:block lg:w-1/4">
              <Skeleton className="mb-6 h-8 w-32" />
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </aside>

            <div className="flex w-full flex-col gap-20 sm:flex-grow md:mx-auto md:w-3/4 lg:mx-0 lg:w-1/2 lg:flex-grow-0">
              <div className="w-full">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="mb-4 border-b">
                    <div className="px-4 py-3">
                      <Skeleton className="h-7 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto text-center">
                <Skeleton className="mx-auto mb-2 h-8 w-48" />
                <Skeleton className="mx-auto mb-4 h-5 w-full md:w-96" />

                <form className="mx-auto grid gap-4 lg:w-2/3">
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
  <div className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
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
              isAvailable ? "" : "cursor-not-allowed opacity-50",
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
  <aside className="flex min-h-full flex-col rounded-lg border p-6 lg:w-1/4">
    <h3 className="mb-6 text-xl font-semibold text-cyan-700">Categories</h3>
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
                ? "font-semibold text-cyan-600"
                : isAvailable
                  ? "text-gray-700 hover:text-teal-600"
                  : "text-gray-400",
            )}
            onClick={() => isAvailable && onSelect(category)}
          >
            <div className="flex items-center justify-between">
              <span>{category}</span>
              {!isAvailable && (
                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
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
