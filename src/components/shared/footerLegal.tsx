import React from "react";

const FooterLegal: React.FC = () => {
  return (
    <footer className="px-4 lg:px-16 md:px-12 mt-auto">
      <div className="border-t border-black py-4 px-4 lg:px-8 text-xs text-gray-500">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <span>
            © {new Date().getFullYear()} Triangles. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-12">
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

export default FooterLegal;
