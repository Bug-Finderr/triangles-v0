"use server";

import faqs from "../mocks/faqs.json";

export interface Faq {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  questions: Faq[];
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export async function fetchFaqs(): Promise<FaqCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(faqs as FaqCategory[]);
    }, 1000);
  });
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  console.log("Contact Form Data:", data);
}
