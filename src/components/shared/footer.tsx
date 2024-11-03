import React from "react";
import Image from "next/image";
import { LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import logo from "@/public/logo-tagline.svg";
import Link from "next/link";

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
    <h3 className="font-bold mb-4 text-lg text-teal-950">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="text-gray-700 hover:text-gray-900">
          <Link href={link.href} className="flex items-center">
            {link.icon && (
              <span className="text-teal-950 mr-2">
                {React.cloneElement(link.icon, { size: 16 })}
              </span>
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
      icon: <LinkedInIcon />,
    },
  ],
  contact: [
    {
      name: "contact@triangles.site",
      href: "mailto:contact@triangles.site",
      icon: <MailIcon />,
    },
    { name: "+91-7982048679", href: "tel:+917982048679", icon: <PhoneIcon /> },
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
    <footer className="mt-24 px-4 md:px-16 mb-8">
      <div className="px-4 lg:px-24 flex flex-col lg:flex-row justify-between">
        <div className="hidden lg:block mr-16">
          <Image src={logo} alt="Triangles Logo" height={112} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
          <LinkList title="Follow Us" links={footerLinks.social} />
          <LinkList title="Contact Us" links={footerLinks.contact} />
          <LinkList title="Opportunities" links={footerLinks.opportunities} />
          <LinkList title="Company" links={footerLinks.company} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
