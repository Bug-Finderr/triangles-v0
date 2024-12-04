import Link from "next/link";

const links = [
  { name: "Privacy Policy", href: "/coming-soon" },
  { name: "Terms of Service", href: "/coming-soon" },
  { name: "Sales and Refunds", href: "/coming-soon" },
  { name: "Legal", href: "/coming-soon" },
  { name: "Site Map", href: "/coming-soon" },
];

export default function FooterLegal() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between space-y-2 border-t border-black px-4 py-2 text-xs text-gray-500 lg:flex-row lg:space-y-0 lg:px-8">
        <span>
          © {new Date().getFullYear()} Triangles. All rights reserved.
        </span>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-end lg:gap-8">
          {links.map((link) => (
            <li key={link.name} className="whitespace-nowrap">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
