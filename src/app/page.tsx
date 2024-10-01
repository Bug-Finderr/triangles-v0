import Image from "next/image";
import icon from "@/public/Icon.png";
import logo from "@/public/Logo.png";
import Footer from "@/components/shared/Footer";

export default function Home() {
  const events = Array.from({ length: 12 });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-100 py-6 px-24">
        <div className="flex justify-between items-center">
          <Image src={icon} alt="Triangles Icon" height={32} />

          <nav className="space-x-12 font-bold text-xl">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#events">Events</a>
            <a href="#host">Host</a>
          </nav>

          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-700">
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section id="home" className="text-center py-20 grid justify-center">
          <Image
            src={logo}
            alt="Triangles Logo"
            height={128}
            className="mx-auto"
          />

          <div className="mt-10 p-12 rounded-xl inline-flex flex-col shadow-2xl">
            <div className="grid grid-cols-2 gap-12">
              {["yellow", "pink", "orange", "blue"].map((color, index) => (
                <div
                  key={index}
                  className={`bg-${color}-400 w-96 h-56 rounded-lg shadow-xl`}
                ></div>
              ))}
            </div>

            <button className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold mt-12 ml-auto hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700">
              Explore more
            </button>
          </div>
        </section>

        {/* Featured Events */}
        <section
          id="events"
          className="flex items-center space-x-4 bg-teal-950"
        >
          <h2 className="mx-8 font-bold text-xl whitespace-nowrap text-white">
            Featured Events
          </h2>

          <div className="flex space-x-8 overflow-x-auto scrollbar-hide bg-gray-900 px-8 py-4">
            {events.map((_, index) => (
              <div
                key={index}
                className="w-[258px] h-[290px] bg-gradient-to-r from-gray-300 to-gray-400 rounded-3xl flex-shrink-0"
              ></div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-black mb-4">About Us</h2>
            <p className="text-gray-700 max-w-4xl mx-auto text-lg">
              At Triangles, we believe in pushing boundaries and creating
              innovative solutions that redefine the way businesses and
              individuals engage with technology. Founded in 2024, our startup
              is driven by a passion for technology and a vision to deliver
              cutting-edge products that make a real difference.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
