export default function FooterLegal() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between space-y-2 border-t border-black px-4 py-2 text-xs text-gray-500 lg:flex-row lg:space-y-0 lg:px-8">
        <span>
          © {new Date().getFullYear()} Triangles. All rights reserved.
        </span>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-end lg:gap-8">
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
    </footer>
  );
}
