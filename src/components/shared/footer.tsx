import { LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import logo from "@/public/logo-tagline.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FooterLegal from "./footerLegal";

interface LinkItem {
  name: string;
  href: string;
  icon?: React.ReactElement;
}

interface LinkListProps {
  title: string;
  links: LinkItem[];
}

const LinkList: React.FC<LinkListProps> = ({ title, links }) => (
  <div className="mb-8 lg:mb-0">
    <h3 className="mb-4 text-lg font-bold">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="text-gray-700 hover:text-gray-900">
          <Link href={link.href} className="flex items-center">
            {link.icon && (
              <span className="mr-2">{React.cloneElement(link.icon)}</span>
            )}
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const footerLinks = {
  social: [
    {
      name: "official-triangles",
      href: "https://www.linkedin.com/company/official-triangles",
      icon: <LinkedInIcon size={16} />,
    },
  ],
  contact: [
    {
      name: "contact@triangles.site",
      href: "mailto:contact@triangles.site",
      icon: <MailIcon size={16} />,
    },
    {
      name: "+91-7982048679",
      href: "tel:+917982048679",
      icon: <PhoneIcon size={14} />,
    },
  ],
  opportunities: [
    { name: "Events", href: "#" },
    { name: "Hackathons", href: "#" },
    { name: "MUNs", href: "#" },
    { name: "View All", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "FAQs", href: "/faqs" },
    { name: "Teams", href: "#" },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 px-4 md:px-16">
      <div className="mb-8 flex flex-col justify-between px-4 lg:flex-row lg:px-24">
        <div className="mr-16 hidden lg:block">
          <Image src={logo} alt="Triangles Logo" height={112} />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-20">
          <LinkList title="Follow Us" links={footerLinks.social} />
          <LinkList title="Contact Us" links={footerLinks.contact} />
          <LinkList title="Opportunities" links={footerLinks.opportunities} />
          <LinkList title="Company" links={footerLinks.company} />
        </div>
      </div>
      <FooterLegal />
    </footer>
  );
};

export default Footer;
