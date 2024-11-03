import "@/app/globals.css";
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
      </head>
      <body className="antialiased vsc-initialized flex flex-col min-h-screen text-teal-950">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
