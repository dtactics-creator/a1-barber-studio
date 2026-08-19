export const BOOK_ANCHOR = "#book";

export const business = {
  name: "A1 Barber Studio",
  tagline: "Precision grooming. Personalized style.",
  support: "Vancouver’s modern barber experience.",
  address: "332 Water St #140, Vancouver, BC V6B 1B6",
  addressLines: ["332 Water St #140", "Vancouver, BC V6B 1B6"],
  phone: "+1 236-513-1839",
  phoneHref: "tel:+12365131839",
  email: "a1scissorsltd@gmail.com",
  emailHref: "mailto:a1scissorsltd@gmail.com",
  rating: 4.9,
  reviewCount: 1437,
  reviewCountLabel: "1,437",
  hours: "9:00 AM – 8:30 PM",
  hoursNote: "Open daily",
  mapsEmbed:
    "https://maps.google.com/maps?q=332%20Water%20St%20%23140%2C%20Vancouver%2C%20BC%20V6B%201B6&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=332+Water+St+%23140,+Vancouver,+BC+V6B+1B6",
  bookingPolicy:
    "Please arrive 5–10 minutes before your appointment. If you’re late, it delays everyone after you. To cancel or reschedule, please call (236) 513-1839 in advance.",
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#barbers", label: "Barbers" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const services = [
  {
    id: "haircut",
    name: "Haircut",
    duration: "45 min",
    price: "$38",
    description:
      "A tailored men’s haircut shaped with time-honored technique. Consultation first, then a refined, polished finish built around your hair and how you wear it.",
  },
  {
    id: "taper",
    name: "Taper + Line Up",
    duration: "30 min",
    price: "$25",
    description:
      "A clean taper and a sharp lineup to refresh your shape. Focused work on the edges, neckline, and blend — built for a precise, maintained look.",
  },
  {
    id: "scissor",
    name: "Long / Scissor Haircut",
    duration: "1 hr",
    price: "$50",
    description:
      "Where clippers step aside and craftsmanship takes the lead. Designed for medium to long hair, focusing on flow, texture, and precision — cut by hand, every snip intentional.",
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    duration: "1 hr 15 min",
    price: "$55",
    description:
      "A complete grooming session that starts with a consultation, then a tailored haircut and a carefully finished beard. Both, done properly, in one visit.",
  },
  {
    id: "scissor-beard",
    name: "Long / Scissors Haircut + Beard",
    duration: "1 hr 15 min",
    price: "$65",
    description:
      "A longer scissor-led haircut paired with a refined beard service. Extra time for texture, shape, and a complete, considered finish.",
  },
  {
    id: "beard",
    name: "Beard Trim",
    duration: "30 min",
    price: "$28",
    description:
      "Meticulous trimming, precise lining, and subtle fading, complemented by a thorough wash so your facial hair is cleanly shaped and well-kept.",
  },
  {
    id: "buzz",
    name: "Buzz Cut",
    duration: "25 min",
    price: "$25",
    description:
      "An even, seamless buzz with sharpened edges and blended regrowth. If the sides need fading techniques, book the Haircut service instead.",
  },
];

export const barbers = [
  {
    name: "Mike",
    role: "Owner / Barber",
    note: "Friendly, welcoming, and known for taking time to listen before the cut.",
    image:
      "https://images.pexels.com/photos/5337979/pexels-photo-5337979.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    name: "Rai",
    role: "Barber",
    note: "Clients come back for clean, fresh cuts and a considered finish.",
    image:
      "https://images.pexels.com/photos/29850611/pexels-photo-29850611.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    name: "Jay Jay",
    role: "Barber",
    note: "Praised for precise tapers and scissor skills — detailed, artistic cutting.",
    image:
      "https://images.pexels.com/photos/5188621/pexels-photo-5188621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    name: "Leo",
    role: "Barber",
    note: "Detail-focused styling with thoughtful recommendations. Speaks Spanish.",
    image:
      "https://images.pexels.com/photos/33380942/pexels-photo-33380942.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    name: "Zidane",
    role: "Barber",
    note: "Sharp, modern cuts — available when you book through the studio calendar.",
    image:
      "https://images.pexels.com/photos/15613461/pexels-photo-15613461.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
];

export const reviews = [
  {
    name: "Andree Borraz",
    source: "Google",
    text: "Great service, with an incredible amount of attention to detail and dedication from my barber, Leo. I’m super happy with my new look and the overall experience I had at A1 Barber. Highly recommend!",
  },
  {
    name: "Rami Abdelnour",
    source: "Google",
    text: "Jay blessed me with a taper and some pretty awesome scissor skills. He is precise and works like an artist. Thank you!!",
  },
  {
    name: "Ernest Ekie",
    source: "Google",
    text: "I had a wonderful experience at A1, Rai give me very fresh cut. And Mike the owner is really friendly and welcoming.",
  },
  {
    name: "Eddie Han",
    source: "Google",
    text: "Leo, Great Guy. Got a solid cut 10/10.",
  },
  {
    name: "Aaron Ang",
    source: "Google",
    text: "Very pleased with the quality and service!",
  },
];

export const benefits = [
  {
    title: "Precision-focused cuts",
    text: "Fades, tapers, lineups, and scissor work shaped with intention — not rushed, not generic.",
  },
  {
    title: "Personalized styling",
    text: "Every visit starts with how you wear your hair. The cut is built around you, not a template.",
  },
  {
    title: "Book your barber by name",
    text: "Choose Mike, Rai, Jay Jay, Leo, or Zidane right in the booking calendar — and keep the barber who knows your look.",
  },
  {
    title: "Quality men’s grooming",
    text: "Haircuts, beard work, and combined services with enough time booked to finish the details properly.",
  },
  {
    title: "Modern technique",
    text: "Classic barbering refined with current methods — from clean tapers to longer, textured scissor cuts.",
  },
  {
    title: "A relaxed studio",
    text: "An inviting, professional room on Water Street. High-quality grooming without the stiffness.",
  },
];

export const gallery = [
  { src: "./images/gallery-fade.jpg", alt: "Precision fade being finished in the chair" },
  { src: "./images/gallery-beard.jpg", alt: "Beard trim with scissors and comb" },
  { src: "./images/gallery-scissors.jpg", alt: "Scissor-cut texture work on longer hair" },
  { src: "./images/gallery-studio.jpg", alt: "A1 Barber Studio interior with leather chairs and warm light" },
  { src: "./images/gallery-lineup.jpg", alt: "Sharp lineup along the hairline" },
  { src: "./images/gallery-finish.jpg", alt: "Finished men’s cut and beard" },
  { src: "./images/gallery-tools.jpg", alt: "Premium clippers, scissors, and straight razor" },
  { src: "./images/about.jpg", alt: "Barber consulting with a client in the studio" },
];

export const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Right on this page — choose your service, pick a barber (or first available), select a date and time, and send your request. You can also call +1 236-513-1839 during open hours.",
  },
  {
    q: "What services do you offer?",
    a: "Haircut ($38), Taper + Line Up ($25), Long/Scissor Haircut ($50), Haircut + Beard ($55), Long/Scissors Haircut + Beard ($65), Beard Trim ($28), and Buzz Cut ($25).",
  },
  {
    q: "Can I choose my barber?",
    a: "Yes. During booking you can select Mike, Rai, Jay Jay, Leo, or Zidane — or choose first available and take the earliest open chair.",
  },
  {
    q: "What’s the difference between a Haircut and a Taper + Line Up?",
    a: "A Haircut is a 45-minute tailored cut. Taper + Line Up is a 30-minute service focused on refreshing the taper, edges, and lineup. If you need fading through the sides, book the Haircut.",
  },
  {
    q: "Do you offer beard services?",
    a: "Yes. Book a Beard Trim on its own, or pair it with a Haircut or Long/Scissor Haircut. Combined appointments include extra time so both the hair and beard can be finished properly.",
  },
  {
    q: "How long will my appointment take?",
    a: "Buzz Cut is 25 minutes, Taper + Line Up and Beard Trim are 30 minutes, Haircut is 45 minutes, Long/Scissor Haircut is 1 hour, and combined hair + beard services are 1 hour 15 minutes.",
  },
  {
    q: "Where is A1 Barber Studio?",
    a: "332 Water St #140, Vancouver, BC V6B 1B6 — in Gastown, just off Water Street and easy to reach from downtown Vancouver.",
  },
  {
    q: "What are your hours?",
    a: "We’re open daily from 9:00 AM to 8:30 PM. Booking ahead is the best way to secure your preferred barber and time.",
  },
  {
    q: "What is your booking policy?",
    a: "Please arrive 5–10 minutes before your appointment. If you’re late, it delays everyone after you. To cancel or reschedule, call (236) 513-1839 in advance.",
  },
];

export const timeSlots = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];
