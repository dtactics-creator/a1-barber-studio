import { BOOK_ANCHOR, business, navLinks, services } from "../data/content";
import { Button } from "./Button";
import { Logo } from "./Logo";

type FooterProps = {
  onSelectService: (serviceId: string) => void;
};

export function Footer({ onSelectService }: FooterProps) {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">
            {business.tagline} {business.support}
          </p>
          <Button href={BOOK_ANCHOR} className="mt-8">
            Book Appointment
          </Button>
        </div>

        <nav aria-label="Footer">
          <p className="text-[0.6rem] tracking-[0.28em] text-silver uppercase">Studio</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-mute transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={BOOK_ANCHOR} className="text-sm text-mute transition-colors hover:text-white">
                Book Online
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-[0.6rem] tracking-[0.28em] text-silver uppercase">Services</p>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#book"
                  onClick={() => onSelectService(service.id)}
                  className="text-sm text-mute transition-colors hover:text-white"
                >
                  {service.name} · {service.price}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.6rem] tracking-[0.28em] text-silver uppercase">Visit</p>
          <address className="mt-5 text-sm leading-relaxed text-mute not-italic">{business.address}</address>
          <p className="mt-4">
            <a href={business.phoneHref} className="text-sm text-snow transition-colors hover:text-silver-2">
              {business.phone}
            </a>
          </p>
          <p className="mt-2">
            <a href={business.emailHref} className="text-sm text-snow transition-colors hover:text-silver-2">
              {business.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-mute">
            {business.hoursNote}, {business.hours}
          </p>
        </div>
      </div>

      <div className="hairline" />
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-5 py-6 text-[0.68rem] tracking-[0.16em] text-dim uppercase md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} A1 Barber Studio. All rights reserved.</p>
        <p>Precision grooming · Personalized style</p>
      </div>
    </footer>
  );
}
