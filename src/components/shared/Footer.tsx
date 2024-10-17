import React from "react";
import Image from "next/image";
import { LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import logo from "@/public/Logo_tagline.svg";

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
  <div className="mb-8 md:mb-0">
    <h3 className="font-bold mb-4 text-lg text-teal-950">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="text-gray-700 hover:text-gray-900">
          <a href={link.href} className="flex items-center">
            {link.icon && (
              <span className="text-teal-950 mr-2">
                {React.cloneElement(link.icon, { size: 16 })}
              </span>
            )}
            {link.name}
          </a>
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
    { name: "FAQs", href: "#" },
    { name: "Teams", href: "#" },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 md:mt-32 px-4 md:px-16">
      <div className="px-4 md:px-24 flex flex-col md:flex-row justify-between">
        <div className="hidden md:block">
          <Image src={logo} alt="Triangles Logo" height={112} />
        </div>
        <div className="grid md:grid-cols-4 md:gap-20">
          <LinkList title="Follow Us" links={footerLinks.social} />
          <LinkList title="Contact Us" links={footerLinks.contact} />
          <LinkList title="Opportunities" links={footerLinks.opportunities} />
          <LinkList title="Company" links={footerLinks.company} />
        </div>
      </div>
      <div className="md:mt-10 border-t border-black py-4 px-4 md:px-8 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <span>
            © {new Date().getFullYear()} Triangles. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-12">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Sales and Refunds",
              "Legal",
              "Site Map",
            ].map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
