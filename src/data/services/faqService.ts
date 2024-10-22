import faqs from "../mocks/faqs.json";

export interface Faq {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  questions: Faq[];
}

export async function fetchFaqs(): Promise<FaqCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(faqs as FaqCategory[]);
    }, 1000);
  });
}

export async function fetchFaqsByCategory(category: string): Promise<Faq[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categoryFaqs = (faqs as FaqCategory[]).find(
        (faq) => faq.category.toLowerCase() === category.toLowerCase(),
      );
      resolve(categoryFaqs ? categoryFaqs.questions : []);
    }, 1000);
  });
}
