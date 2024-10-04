import "@/app/globals.css";

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
      <body className="antialiased vsc-initialized">{children}</body>
    </html>
  );
}
