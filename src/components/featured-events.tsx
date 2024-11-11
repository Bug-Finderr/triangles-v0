"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PeopleIcon,
} from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import icon from "@/public/icon.svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  image?: StaticImageData;
  description: string;
  tags: [string, string];
  registered: number;
  daysLeft: number;
}

const generateEvents = (count: number): Event[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Event ${index + 1}`,
    description: [
      "Join our upcoming hackathon and build innovative solutions for real-world problems. Perfect for developers of all skill levels!",
      "Experience the thrill of public speaking and diplomacy at our Model United Nations conference. Develop leadership skills!",
      "Learn from industry experts in our tech workshop series. Master the latest tools and technologies in software development.",
      "Participate in our startup pitch competition and showcase your entrepreneurial ideas to potential investors.",
      "Join our networking mixer and connect with professionals from leading tech companies. Build valuable relationships!",
      "Attend our career development workshop and learn how to stand out in the competitive job market.",
    ][index % 6],
    tags: [
      index % 2 === 0 ? "online" : "offline",
      index % 3 === 0 ? "paid" : "free",
    ],
    registered: Math.floor(Math.random() * 900) + 100,
    daysLeft: Math.floor(Math.random() * 30) + 1,
  }));

function EventContent({ event }: { event: Event }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-xl">
      <div
        className="relative h-[200px] bg-secondary sm:h-[300px] md:h-[400px] lg:h-[450px]"
        onClick={() => {
          router.push("/coming-soon");
        }}
      >
        <div className="absolute inset-0">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${icon.src})`,
                  backgroundSize: "80px",
                  backgroundRepeat: "repeat",
                  opacity: 0.1,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-28 w-28">
                  <Image
                    src={icon}
                    alt="Event placeholder"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="absolute inset-0 hidden bg-gradient-to-t from-teal-950/80 via-teal-950/40 to-transparent md:block" />

        <div className="absolute inset-0 hidden flex-col justify-end p-8 md:flex">
          <h3 className="mb-2 text-3xl font-bold text-white lg:text-4xl">
            {event.title}
          </h3>
          <p className="mb-4 max-w-2xl text-white/90">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between bg-white p-6 pt-4 md:pt-6">
        <div className="flex flex-col md:hidden">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="mb-2 ml-1 text-2xl font-bold">{event.title}</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                router.push("/coming-soon");
              }}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
          <p className="mx-1 my-4 text-sm">{event.description}</p>
        </div>
        <div className="mx-1 flex items-center gap-4 text-sm md:text-base">
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="flex items-center gap-1">
              <PeopleIcon size={16} />
              {event.registered} registered
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon size={16} />
              {event.daysLeft} days left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generatedEvents = generateEvents(6);
    setEvents(generatedEvents);
    setIsLoading(false);
  }, []);

  const handleNavigation = (direction: "left" | "right") => {
    setCurrentIndex((prev) => {
      if (direction === "left")
        return prev === 0 ? events.length - 1 : prev - 1;
      return prev === events.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <FeaturedSkeleton loading={isLoading || !events.length}>
      <div className="mx-2 mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold lg:text-4xl">Featured</h2>
          <p>Featured Events</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleNavigation("left");
            }}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleNavigation("right");
            }}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      {events[currentIndex] && <EventContent event={events[currentIndex]} />}
    </FeaturedSkeleton>
  );
}

function FeaturedSkeleton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  if (!loading) return children;

  return (
    <>
      <div className="mx-2 mb-6 flex items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-10 w-36" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-3xl bg-white shadow-xl">
        <Skeleton className="h-[200px] rounded-none sm:h-[300px] md:h-[400px] lg:h-[450px]" />

        <div className="bg-white p-6 pt-4 md:pt-6">
          <div className="flex flex-col md:hidden">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="hidden items-center gap-4 text-sm md:flex md:text-base">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm md:hidden md:text-base">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </>
  );
}
