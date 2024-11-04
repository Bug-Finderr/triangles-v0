import React from "react";

const FooterLegal: React.FC = () => {
  return (
    <footer>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0 border-t border-black py-2 px-4 lg:px-8 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Triangles. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-4 gap-y-2 lg:gap-8">
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
};

export default FooterLegal;
