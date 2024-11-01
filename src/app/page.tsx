'use client';

import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ArrowRightIcon,
	BookmarkIcon,
	BookmarkOutlineIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	PeopleIcon,
} from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import icon from '@/public/Icon.svg';
import logo from '@/public/Logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface Event {
	id: number;
	title: string;
	image: string | null;
	description: string;
	tags: [string, string];
}

const generateEvents = (count: number): Event[] =>
	Array.from({ length: count }, (_, index) => ({
		id: index + 1,
		title: `Event ${index + 1}`,
		image: null,
		description: '',
		tags: [
			index % 2 === 0 ? 'online' : 'offline',
			index % 3 === 0 ? 'paid' : 'free',
		],
	}));

const colorClasses: { [key: string]: string } = {
	yellow: 'from-yellow-400 to-yellow-500',
	pink: 'from-pink-400 to-pink-500',
	orange: 'from-orange-400 to-orange-500',
	blue: 'from-blue-400 to-blue-500',
};

// TODO: Add Skeleton for the events if necessary
export default function Home() {
	const events = generateEvents(10);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [bookmarkedEvents, setBookmarkedEvents] = useState<Set<number>>(
		new Set()
	);

	const router = useRouter();

	const toggleBookmark = useCallback((id: number) => {
		setBookmarkedEvents((prev) => {
			const updated = new Set(prev);
			if (updated.has(id)) {
				updated.delete(id);
			} else {
				updated.add(id);
			}
			return updated;
		});
	}, []);

	const scrollEvents = useCallback(
		(direction: 'left' | 'right') => {
			const visibleCards = window.innerWidth >= 768 ? 5 : 1;
			setCurrentIndex((prevIndex) => {
				if (direction === 'left') {
					return prevIndex === 0 ? events.length - visibleCards : prevIndex - 1;
				} else {
					return prevIndex >= events.length - visibleCards ? 0 : prevIndex + 1;
				}
			});
		},
		[events.length]
	);

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 md:mx-12">
				{/* Hero Section */}
				<section id="home" className="text-center mt-12 grid justify-center px-8">
					<Image
						src={logo}
						alt="Triangles Logo"
						height={144}
						className="mx-auto"
						loading="eager"
					/>
					<div className="mt-10 p-4 lg:p-10 rounded-xl lg:rounded-[3rem] inline-flex flex-col shadow-2xl">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12">
							{['yellow', 'pink', 'orange', 'blue'].map((color) => (
								<div
									key={color}
									className={`bg-gradient-to-r ${colorClasses[color]} w-full h-40 lg:w-[350px] lg:h-[200px] md:w-[250px] md:h-[150px] rounded-3xl shadow-xl`}
								/>
							))}
						</div>
						<Button
							className="mt-10 ml-auto"
							onClick={() => router.push('/coming-soon')}
						>
							Explore more
						</Button>
					</div>
				</section>

				{/* Featured Events */}
				<section id="events" className="mt-20 lg:mt-32 mx-4 lg:mx-40">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured</h2>
							<p>Featured Events</p>
						</div>
						<div className="flex gap-2">
							<Button variant="ghost" size="icon" onClick={() => scrollEvents('left')}>
								<ChevronLeftIcon className="h-4 w-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => scrollEvents('right')}
							>
								<ChevronRightIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* TODO: Do something with this way of carousel */}
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-500 ease-in-out py-4"
							style={{ transform: `translateX(-${currentIndex * 316}px)` }}
						>
							{events.map(({ id, image, title, description, tags }) => (
								<Card
									key={id}
									className="min-w-[300px] mx-2 rounded-3xl"
									onClick={() => router.push('/coming-soon')}
								>
									<div className="h-40 m-2 flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl mb-0">
										{image ? (
											<Image
												src={image}
												alt={title}
												width={300}
												height={150}
												className="object-cover w-full h-full"
											/>
										) : (
											<Image src={icon} alt="Icon Placeholder" width={80} height={80} />
										)}
									</div>
									<CardContent className="p-4">
										<CardHeader className="p-0 mb-2">
											<CardTitle className="flex justify-between items-center text-xl">
												{title}
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => {
														e.stopPropagation();
														toggleBookmark(id);
													}}
												>
													{bookmarkedEvents.has(id) ? (
														<BookmarkIcon className="h-4 w-4" />
													) : (
														<BookmarkOutlineIcon className="h-4 w-4" />
													)}
												</Button>
											</CardTitle>
										</CardHeader>
										<div className="flex space-x-2 mb-4">
											{tags.map((tag, index) => (
												<Badge key={index} variant="outline">
													{tag}
												</Badge>
											))}
										</div>
										<div className="flex justify-between">
											<div className="text-sm text-muted-foreground">
												{description || (
													<span className="grid gap-1">
														<span className="flex items-center gap-1">
															<PeopleIcon className="h-4 w-4" />
															100 registered
														</span>
														<span className="flex items-center gap-1">
															<ClockIcon className="h-4 w-4" />
															10 days left
														</span>
													</span>
												)}
											</div>
											<Button size="icon" className="rounded-full">
												<ArrowRightIcon className="h-4 w-4" />
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* About Us Section */}
				<section id="about-us" className="mt-20 lg:mt-32 text-center px-8">
					<h2 className="text-3xl lg:text-[40px] font-black mb-4">About Us</h2>
					<p className="text-gray-700 max-w-6xl mx-auto text-base lg:text-lg">
						The journey of discovery never ends. <strong>Triangles</strong> is the
						launchpad for these endless possibilities.{' '}
						<strong>Discover your spark</strong> from an array of opportunities and
						collaborate with peers to unlock your full potential because your learning
						journey is just the beginning.
					</p>
				</section>

				{/* Founders Section */}
				<section id="founders" className="mt-20 lg:mt-32 text-center px-8">
					<h2 className="text-3xl lg:text-[40px] font-black mb-4">
						Meet The Founders
					</h2>
					<div className="flex flex-col lg:flex-row justify-center lg:gap-40 mt-8 lg:mt-16 items-center">
						{Array.from({ length: 2 }).map((_, index) => (
							<Card
								key={index}
								className="flex flex-col lg:flex-row bg-gradient-to-br from-teal-50 to-teal-100 max-w-xl rounded-3xl shadow-2xl mb-8 lg:mb-0"
							>
								<div className="h-56 lg:min-w-[180px] m-2 flex items-center justify-center rounded-2xl bg-white">
									<Image src={icon} alt="Triangles Logo" height={80} />
								</div>
								<CardContent className="p-6 flex flex-col">
									<CardTitle className="text-left text-xl">Name</CardTitle>
									<div className="text-left">Co-Founder</div>
									<CardDescription className="text-left flex flex-col justify-center flex-grow">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nam
										eius nisi labore, optio officiis in accusantium harum modi ad, sed
										incidunt?
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* FAQ Section */}
				<section
					id="faq"
					className="mt-20 lg:mt-32 mx-8 lg:mx-40 flex flex-col lg:flex-row justify-between min-h-[240px] lg:gap-12"
				>
					<div className="mb-8 lg:mb-0">
						<h2 className="text-4xl lg:text-6xl font-bold lg:whitespace-nowrap">
							Got questions? <br /> We&apos;ve got answers!
						</h2>
						<Button
							variant="ghost"
							className="mt-6 lg:mt-12"
							onClick={() => router.push('/faqs')}
						>
							More FAQs <ArrowRightIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
					<Accordion type="single" collapsible className="w-full lg:w-1/2">
						{[
							{
								question: 'What is Triangles?',
								answer:
									'Triangles is a platform that connects students with various learning opportunities and events.',
							},
							{
								question: 'How do I join an event?',
								answer:
									"To join an event, simply browse through our featured events section, select the event you're interested in, and click 'Join'.",
							},
							{
								question: 'Can I host my own event?',
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
				<section id="newsletter" className="mt-20 lg:mt-24 text-center px-8">
					<h2 className="text-2xl lg:text-3xl font-bold">
						Join our newsletter to keep up to date with us!
					</h2>
					<form
						className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4"
						aria-label="Newsletter subscription form"
					>
						<Input
							type="email"
							placeholder="Enter your email"
							className="w-full sm:w-96 h-10"
							aria-label="Email input"
						/>
						<Button type="submit">Subscribe</Button>
					</form>
				</section>

				{/* Checkout Widget */}
				<section
					id="nasio"
					className="flex my-5 mt-10 w-[80%] items-center justify-center mx-auto flex-col md:flex-row"
				>
					<div className="text-center">
						<p className="text-xl">
							We will soo bring you the worldly opportunities! But till then it's all
							about community🔥 Did I mention we're backed by Microsoft for Startups?
							So trust us when we say this is the place to be. 😎 Join the exclusive
							community now!
						</p>
					</div>
					<iframe
						title="TRIANGLES_2 checkout widget"
						src="https://nas.io/checkout-widget?communityCode=TRIANGLES_2&communitySlug=%2Ftriangles&buttonText=Join%20as%20member&buttonTextColorHex=%23fff&buttonBgColorHex=%230097b2&widgetTheme=light&backgroundColorHex=%23fff"
						width="100%"
						height="320"
						className="border-none"
						referrerPolicy="no-referrer"
					></iframe>
				</section>
			</main>
			<Footer />
		</div>
	);
}
