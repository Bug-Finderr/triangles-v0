"use client";

import FeaturedEvents from "@/components/featured-events";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardLink,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  InfoIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { founder_info } from "@/constants/founders";
import { cn } from "@/lib/utils";
import ms_badge from "@/public//images/ms_badge.png";
import ComingSoonImage from "@/public/images/events/coming-soon.svg";
import EventsImage from "@/public/images/events/events.svg";
import HackathonImage from "@/public/images/events/hackathons.svg";
import MunImage from "@/public/images/events/mun.svg";
import LinkedinLogo from "@/public/images/linkedin-logo.svg";
import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="grid justify-center px-8 pt-14 text-center"
        >
          <Image
            src={logo}
            alt="Triangles Logo"
            height={144}
            className="mx-auto"
            loading="eager"
          />
          <div className="mt-10 inline-flex flex-col rounded-xl p-4 shadow-2xl lg:rounded-[3rem] lg:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-12">
              {[EventsImage, MunImage, HackathonImage, ComingSoonImage].map(
                (image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Event image ${index + 1}`}
                    className="w-full rounded-[1.75rem] shadow-xl md:h-[150px] md:w-[250px] lg:h-[200px] lg:w-[350px]"
                  />
                ),
              )}
            </div>
            <Button
              className="ml-auto mt-10"
              onClick={() => {
                router.push("/coming-soon");
              }}
            >
              Explore more
            </Button>
          </div>
        </section>

        {/* Featured Events */}
        <section
          id="events"
          className="px-8 pt-24 md:px-12 lg:px-20 lg:pt-32 xl:px-40"
        >
          <FeaturedEvents />
        </section>

        {/* About Us Section */}
        <section
          id="about-us"
          className="px-8 pt-24 text-center md:px-12 lg:pt-32"
        >
          <h2 className="mb-4 text-3xl font-black lg:text-[40px]">About Us</h2>
          <p className="mx-auto max-w-6xl text-base text-gray-700 lg:text-lg">
            The journey of discovery never ends. <strong>Triangles</strong> is
            the launchpad for these endless possibilities.{" "}
            <strong>Discover your spark</strong> from an array of opportunities
            and collaborate with peers to unlock your full potential because
            your learning journey is just the beginning.
          </p>
        </section>

        {/* Founders Section */}
        <section
          id="founders"
          className="w-full px-8 pt-24 text-center md:pt-32"
        >
          <h2 className="mb-4 text-3xl font-black text-darkBlue md:text-[40px]">
            Meet The Founders
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-8 md:mt-16">
            {founder_info.map((founder, index) => (
              <Card
                key={index}
                className={cn(
                  "flex w-full max-w-5xl flex-col rounded-3xl shadow-2xl md:flex-row",
                  { "md:flex-row-reverse": index % 2 === 0 },
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center p-6 pb-0 md:pb-6",
                    index % 2 === 0 ? "md:pl-0" : "md:pr-0",
                  )}
                >
                  <div className="relative h-[280px] w-[280px]">
                    <Image
                      src={founder.icon}
                      alt={founder.name}
                      fill
                      className="rounded-2xl object-cover"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-left text-2xl text-darkBlue">
                        {founder.name}
                      </CardTitle>
                      <div className="mt-1 text-left font-semibold text-darkBlue">
                        {founder.role}
                      </div>
                    </div>
                    <CardLink>
                      <Link
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative h-[40px] w-[100px]">
                          <Image
                            src={LinkedinLogo}
                            alt="LinkedIn Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>
                    </CardLink>
                  </div>
                  <CardDescription className="mt-4 text-left font-normal text-darkBlue">
                    {founder.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="mx-12 flex min-h-[240px] flex-col justify-between pt-24 lg:mx-40 lg:flex-row lg:gap-12 lg:pt-32"
        >
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold lg:whitespace-nowrap lg:text-6xl">
              Got questions? <br /> We&apos;ve got answers!
            </h2>
            <Button
              variant="ghost"
              className="mt-6 lg:mt-12"
              onClick={() => {
                router.push("/faqs");
              }}
            >
              More FAQs <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full lg:w-1/2">
            {[
              {
                question: "What is Triangles?",
                answer:
                  "Triangles is a platform that connects students with various learning opportunities and events.",
              },
              {
                question: "How do I join an event?",
                answer:
                  "To join an event, simply browse through our featured events section, select the event you're interested in, and click 'Join'.",
              },
              {
                question: "Can I host my own event?",
                answer:
                  "Yes! Triangles encourages users to host their own events. Click on the 'Host' button in the navigation bar to get started.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg lg:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Newsletter Section */}
        <section
          id="newsletter"
          className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-12 pt-24 lg:flex-row lg:gap-12"
        >
          <div className="flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-0">
            <div className="relative w-full max-w-md transition-transform duration-300 hover:scale-105 lg:max-w-lg">
              <Image src={ms_badge} alt="Microsoft for Startups" />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center text-center lg:w-1/2 lg:text-left">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              Join our newsletter to keep up to date with us!
            </h2>
            <p className="mb-6 max-w-xl text-sm text-gray-600 md:text-base lg:mb-8">
              With Microsoft For Startups as our partner, we are rolling out new
              features and events everytime. Subscribe to our newsletter to stay
              updated.
            </p>

            <form
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              aria-label="Newsletter subscription form"
            >
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email input"
                />
              </div>
              <Button type="submit">Subscribe</Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500 lg:justify-start">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="text-teal-600" size={19} />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <InfoIcon className="text-teal-600" size={18} />
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </section>

        {/* Nasio Widget */}
        <section
          id="nasio"
          className="mx-auto flex flex-col items-center justify-center px-12 pt-24 lg:mx-40 lg:flex-row"
        >
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              Join our exclusive community!
            </h2>
            <p className="mb-6 max-w-xl text-sm text-gray-600 md:text-base lg:mb-8">
              We will soon bring you the worldly opportunities! But till then
              it&apos;s all about community🔥 Did I mention we&apos;re backed by
              Microsoft for Startups? So trust us when we say this is the place
              to be. 😎
            </p>
          </div>
          <iframe
            title="TRIANGLES_2 checkout widget"
            src="https://nas.io/checkout-widget?communityCode=TRIANGLES_2&communitySlug=%2Ftriangles&buttonText=Join%20as%20member&buttonTextColorHex=%23fff&buttonBgColorHex=%230097b2&widgetTheme=light&backgroundColorHex=%23fff"
            height="300"
            referrerPolicy="no-referrer"
          ></iframe>
        </section>
      </main>
      <Footer />
    </div>
  );
}
