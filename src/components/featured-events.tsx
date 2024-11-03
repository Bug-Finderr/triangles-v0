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
import icon from "@/public/icon.svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl">
      <div
        className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-secondary"
        onClick={() => router.push("/coming-soon")}
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
                <div className="relative w-28 h-28">
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

        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-950/40 to-transparent hidden md:block" />

        <div className="absolute inset-0 p-8 flex-col justify-end hidden md:flex">
          <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
            {event.title}
          </h3>
          <p className="text-white/90 mb-4 max-w-2xl">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 pt-4 md:pt-6 flex flex-col justify-between">
        <div className="flex-col flex md:hidden">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h3 className="text-2xl font-bold mb-2 ml-1">
                {event.title}
              </h3>
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
              onClick={() => router.push("/coming-soon")}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
          <p className="text-sm my-4 mx-1">{event.description}</p>
        </div>
        <div className="flex items-center gap-4 text-sm md:text-base mx-1">
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
      if (direction === "left") return prev === 0 ? events.length - 1 : prev - 1;
      return prev === events.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <FeaturedSkeleton loading={isLoading || !events.length}>
      <div className="flex justify-between items-center mb-6 mx-2">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured</h2>
          <p>Featured Events</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation("left")}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation("right")}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      {events[currentIndex] && <EventContent event={events[currentIndex]} />}
    </FeaturedSkeleton>
  );
}

function FeaturedSkeleton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  if (!loading) return children;

  return (
    <>
      <div className="flex justify-between items-center mb-6 mx-2">
        <div>
          <Skeleton className="h-10 w-36 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>

      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl">
        <Skeleton className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-none" />

        <div className="bg-white p-6 pt-4 md:pt-6">
          <div className="flex-col flex md:hidden">
            <div className="flex justify-between items-center gap-2 mb-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-7 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm md:text-base">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex md:hidden items-center gap-4 text-sm md:text-base mt-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </>
  );
}

