import "@/app/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next";

export const metadata = {
  title: "Triangles - Opportunity Discovery & Networking",
  description:
    "A platform for students to discover opportunities, collaborate, and build communities through events, hackathons, talks, and competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager gtmId="GTM-597LXR5M" />
      </head>
      <body className="vsc-initialized flex min-h-screen flex-col text-teal-950 antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-597LXR5M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
