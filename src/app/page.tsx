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
  CardTitle
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  InfoIcon,
  ShieldCheckIcon
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="text-center pt-14 grid justify-center px-8"
        >
          <Image
            src={logo}
            alt="Triangles Logo"
            height={144}
            className="mx-auto"
            loading="eager"
          />
          <div className="mt-10 p-4 lg:p-10 rounded-xl lg:rounded-[3rem] inline-flex flex-col shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12">
              {[EventsImage, MunImage, HackathonImage, ComingSoonImage].map(
                (image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Event image ${index + 1}`}
                    className="w-full lg:w-[350px] lg:h-[200px] md:w-[250px] md:h-[150px] rounded-[1.75rem] shadow-xl"
                  />
                )
              )}
            </div>
            <Button
              className="mt-10 ml-auto"
              onClick={() => router.push("/coming-soon")}
            >
              Explore more
            </Button>
          </div>
        </section>

        {/* Featured Events */}
        <section id="events" className="pt-24 lg:pt-32 px-8 md:px-12 lg:px-20 xl:px-40">
          <FeaturedEvents />
        </section>

        {/* About Us Section */}
        <section
          id="about-us"
          className="pt-24 lg:pt-32 text-center px-8 md:px-12"
        >
          <h2 className="text-3xl lg:text-[40px] font-black mb-4">About Us</h2>
          <p className="text-gray-700 max-w-6xl mx-auto text-base lg:text-lg">
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
          className="pt-24 md:pt-32 text-center px-8 w-full"
        >
          <h2 className="text-3xl md:text-[40px] font-black mb-4 text-darkBlue">
            Meet The Founders
          </h2>
          <div className="flex flex-col justify-center gap-8 mt-8 md:mt-16 items-center">
            {founder_info.map((founder, index) => (
              <Card
                key={index}
                className={cn(
                  "flex flex-col md:flex-row rounded-3xl shadow-2xl w-full max-w-5xl",
                  { "md:flex-row-reverse": index % 2 === 0 }
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center p-6 pb-0 md:pb-6",
                    index % 2 === 0 ? "md:pl-0" : "md:pr-0"
                  )}
                >
                  <div className="relative w-[280px] h-[280px]">
                    <Image
                      src={founder.icon}
                      alt={founder.name}
                      fill
                      className="rounded-2xl object-cover"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </div>
                </div>
                <CardContent className="flex flex-col flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <CardTitle className="text-left text-2xl text-darkBlue">
                        {founder.name}
                      </CardTitle>
                      <div className="text-left text-darkBlue font-semibold mt-1">
                        {founder.role}
                      </div>
                    </div>
                    <CardLink>
                      <Link
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-[100px] h-[40px] relative">
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
                  <CardDescription className="text-left mt-4 text-darkBlue font-normal">
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
          className="pt-24 lg:pt-32 mx-12 lg:mx-40 flex flex-col lg:flex-row justify-between min-h-[240px] lg:gap-12"
        >
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-6xl font-bold lg:whitespace-nowrap">
              Got questions? <br /> We&apos;ve got answers!
            </h2>
            <Button
              variant="ghost"
              className="mt-6 lg:mt-12"
              onClick={() => router.push("/faqs")}
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
          className="pt-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto px-12"
        >
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-0">
            <div className="relative w-full max-w-md lg:max-w-lg transition-transform duration-300 hover:scale-105">
              <Image src={ms_badge} alt="Microsoft for Startups" />
            </div>
          </div>

          <div className="flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Join our newsletter to keep up to date with us!
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 lg:mb-8 max-w-xl">
              With Microsoft For Startups as our partner, we are rolling out new
              features and events everytime. Subscribe to our newsletter to stay
              updated.
            </p>

            <form
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
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

            <div className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
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
          className="pt-24 lg:mx-40 flex flex-col lg:flex-row items-center justify-center mx-auto px-12"
        >
          <div className="flex flex-col justify-center text-center lg:text-left ">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Join our exclusive community!
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 lg:mb-8 max-w-xl">
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
