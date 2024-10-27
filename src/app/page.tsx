'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Footer from '@/components/shared/Footer';
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
	BarsIcon,
	BookmarkIcon,
	BookmarkOutlineIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	PeopleIcon,
	XIcon,
} from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import icon from '@/public/Icon.svg';
import logo from '@/public/Logo.svg';
import { useRouter } from 'next/navigation';
import { founder_info } from '@/constants/index';

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

export default function Home() {
	const events = generateEvents(10);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [bookmarkedEvents, setBookmarkedEvents] = useState<Set<number>>(
		new Set()
	);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [mobileMenuOpen]);

	return (
		<div className="min-h-screen flex flex-col">
			<header className="py-3 px-4 md:px-24 flex justify-between items-center z-50 sticky top-0 bg-white shadow-sm">
				<Image src={icon} alt="Triangles Icon" height={28} />
				<nav
					className={cn(
						'fixed md:relative inset-0 w-full h-full md:w-auto md:h-auto bg-white md:bg-transparent z-50 md:flex items-center transition-transform duration-300 ease-in-out',
						mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
					)}
				>
					<div className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto">
						{['Home', 'About Us', 'Events'].map((item) => (
							<a
								key={item}
								href={`#${item.toLowerCase().replace(' ', '-')}`}
								className="text-xl md:text-base font-bold text-teal-950 hover:text-teal-600 transition-colors py-4 md:py-0 md:mx-6"
								onClick={() => setMobileMenuOpen(false)}
							>
								{item}
							</a>
						))}
						<Button
							size="lg"
							className="mt-6 md:hidden"
							onClick={() => router.push('/coming-soon')}
						>
							Login
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="mt-6 md:hidden"
							onClick={() => router.push('/coming-soon')}
						>
							Host
						</Button>
					</div>
				</nav>
				<div className="flex gap-2 md:gap-4 items-center">
					<Button
						size="sm"
						className="hidden md:inline-flex"
						onClick={() => router.push('/coming-soon')}
					>
						Login
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="hidden md:inline-flex"
						onClick={() => router.push('/coming-soon')}
					>
						Host
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="md:hidden z-50"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<XIcon className="h-6 w-6" />
						) : (
							<BarsIcon className="h-6 w-6" />
						)}
					</Button>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section id="home" className="text-center mt-12 grid justify-center px-8">
					<Image src={logo} alt="Triangles Logo" height={144} className="mx-auto" />
					<div className="mt-10 p-4 md:p-10 rounded-xl md:rounded-[3rem] inline-flex flex-col shadow-2xl">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
							{['yellow', 'pink', 'orange', 'blue'].map((color) => (
								<div
									key={color}
									className={`bg-gradient-to-r from-${color}-400 to-${color}-500 w-full h-40 md:w-[350px] md:h-[200px] rounded-3xl shadow-xl`}
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
				<section id="events" className="mt-20 md:mt-32 mx-4 md:mx-40">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold mb-2 text-teal-950">
								Featured
							</h2>
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
														<BookmarkIcon className="h-4 w-4 text-teal-950" />
													) : (
														<BookmarkOutlineIcon className="h-4 w-4 text-teal-950" />
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
				<section id="about-us" className="mt-20 md:mt-32 text-center px-8">
					<h2 className="text-3xl md:text-[40px] font-black mb-4 text-teal-950">
						About Us
					</h2>
					<p className="text-gray-700 max-w-6xl mx-auto text-base md:text-lg">
						The journey of discovery never ends. <strong>Triangles</strong> is the
						launchpad for these endless possibilities.{' '}
						<strong>Discover your spark</strong> from an array of opportunities and
						collaborate with peers to unlock your full potential because your learning
						journey is just the beginning.
					</p>
				</section>

				{/* Founders Section */}
				<section
					id="founders"
					className="mt-20 md:mt-32 text-center md:px-8 w-full p-2"
				>
					<h2 className="text-3xl md:text-[40px] font-black mb-4 text-teal-950">
						Meet The Founders
					</h2>
					<div className="flex flex-col justify-center md:gap-10 mt-8 md:mt-16 items-center">
						{founder_info.map((founder, index) => (
							<Card
								key={index}
								className={`flex flex-col md:flex-row ${
									index % 2 === 0 ? 'md:flex-row-reverse' : ''
								} rounded-3xl shadow-2xl mb-8 md:mb-0 md:w-[80%] w-[95%]`}
							>
								<Image
									src={founder.icon}
									alt="Triangles Logo"
									height={230}
									width={210}
									className="rounded-2xl mx-auto md:mx-0"
								/>
								<CardContent className="p-6 flex flex-col">
									<CardTitle className="text-left text-xl">{founder.name}</CardTitle>
									<div className="text-left">{founder.role}</div>
									<CardDescription className="text-left flex flex-col justify-center flex-grow">
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
					className="mt-20 md:mt-32 mx-8 md:mx-40 flex flex-col md:flex-row justify-between min-h-[240px]"
				>
					<div className="mb-8 md:mb-0">
						<h2 className="text-4xl md:text-6xl font-bold text-teal-950 md:whitespace-nowrap">
							Got questions? <br /> We&apos;ve got answers!
						</h2>
						<Button variant="ghost" className="mt-6 md:mt-12">
							More FAQs <ArrowRightIcon className="ml-2 h-4 w-4" />
						</Button>
					</div>
					<Accordion type="single" collapsible className="w-full md:w-1/2">
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
								<AccordionTrigger className="text-lg md:text-xl">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>

				{/* Newsletter Section */}
				<section id="newsletter" className="mt-20 md:mt-24 text-center px-8">
					<h2 className="text-2xl md:text-3xl font-bold text-teal-950">
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
			</main>
			<Footer />
		</div>
	);
}
