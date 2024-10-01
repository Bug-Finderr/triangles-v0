import Image from "next/image";
import logo from "@/public/Logo.png";
import {
  MailIcon,
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  TelegramIcon,
  YoutubeIcon,
  DiscordIcon,
} from "@/components/ui/Icons";

const LinkList = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <div>
    <h3 className="font-bold mb-4 text-lg text-teal-950">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <li key={index} className="text-gray-700 hover:text-gray-900 mb-2">
          <a href={link.href}>{link.name}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const productLinks = [
    { name: "Landing Page", href: "#" },
    { name: "Popup Builder", href: "#" },
    { name: "Web-design", href: "#" },
    { name: "Content", href: "#" },
    { name: "Integrations", href: "#" },
  ];

  const useCaseLinks = [
    { name: "Web-designers", href: "#" },
    { name: "Marketers", href: "#" },
    { name: "Small Business", href: "#" },
    { name: "Website Builder", href: "#" },
  ];

  const resourceLinks = [
    { name: "Academy", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Themes", href: "#" },
    { name: "Hosting", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Support", href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Teams", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-black py-12">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Join our newsletter to <br />
            keep up to date with us!
          </h2>
          <form
            className="flex items-center justify-center gap-2"
            aria-label="Newsletter subscription form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
              aria-label="Email input"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 pb-12 pt-10">
          {/* Company Info */}
          <div className="md:col-span-2 border-r pr-12 border-black mr-12">
            <Image
              src={logo}
              alt="Triangles Logo"
              height={72}
              className="mb-4"
              loading="lazy"
            />
            <p className="font-semibold border-dashed pb-2 border-b-2 border-black">
              Find opportunities for you.
            </p>
            <div className="grid gap-2">
              <p className="font-bold text-2xl text-teal-950 mt-4 mb-2">
                Stay Connected
              </p>
              <p className="font-medium text-lg">Sales Enquires</p>
              <a
                href="mailto:abc@gmail.com"
                className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
              >
                <MailIcon size={18} />
                abc@gmail.com
              </a>
              <a
                href="tel:+91-8984797432"
                className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
              >
                <PhoneIcon size={16} />
                +91-8984797432
              </a>
              <p className="font-medium text-lg">Support Inquiries</p>
              <a
                href="mailto:support@gmail.com"
                className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
              >
                <MailIcon size={18} />
                support@gmail.com
              </a>
              <div className="flex justify-between mt-4 mr-8">
                <InstagramIcon size={24} />
                <FacebookIcon size={22} />
                <TwitterIcon size={22} />
                <LinkedInIcon size={22} />
                <TelegramIcon size={24} />
                <YoutubeIcon size={24} />
                <DiscordIcon size={24} />
              </div>
            </div>
          </div>

          <LinkList title="Product" links={productLinks} />
          <LinkList title="Use Cases" links={useCaseLinks} />
          <LinkList title="Resources" links={resourceLinks} />
          <LinkList title="Company" links={companyLinks} />
        </div>
      </div>
    </footer>
  );
}
