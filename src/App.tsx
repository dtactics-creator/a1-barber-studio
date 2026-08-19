import { useCallback, useState } from "react";
import { About } from "./components/About";
import { Barbers } from "./components/Barbers";
import { Benefits } from "./components/Benefits";
import { Booking, type BookingIntent } from "./components/Booking";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Location } from "./components/Location";
import { Navbar } from "./components/Navbar";
import { Services } from "./components/Services";
import { SocialProof } from "./components/SocialProof";
import { Testimonials } from "./components/Testimonials";
import { business } from "./data/content";

const schema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  image: "./images/hero.jpg",
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "332 Water St #140",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    postalCode: "V6B 1B6",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.2842946,
    longitude: -123.1096123,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1437",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function App() {
  const [intent, setIntent] = useState<BookingIntent>({
    serviceId: null,
    barber: null,
    n: 0,
  });

  const selectService = useCallback((serviceId: string) => {
    setIntent((prev) => ({ ...prev, serviceId, n: prev.n + 1 }));
  }, []);

  const selectBarber = useCallback((barber: string) => {
    setIntent((prev) => ({ ...prev, barber, n: prev.n + 1 }));
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-silver-2 focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SocialProof />
        <Services onSelect={selectService} />
        <Barbers onSelect={selectBarber} />
        <Gallery />
        <Benefits />
        <Testimonials />
        <About />
        <Booking intent={intent} />
        <Location />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer onSelectService={selectService} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
