import Section from "./Section";
import CopyEmail from "./CopyEmail";
import TrackedLink from "./TrackedLink";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl font-display text-4xl font-semibold leading-[1.1] md:text-5xl">
        Hiring for a full-stack role, or need a product built?
      </p>
      <p className="mt-4 text-lg text-muted">{site.replyTime}</p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <TrackedLink
          href={`mailto:${site.email}`}
          event="email_click"
          detail={{ from: "contact" }}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
        >
          {site.email}
        </TrackedLink>
        <CopyEmail email={site.email} />
      </div>

      <p className="mt-8 flex flex-wrap gap-6 text-lg">
        <TrackedLink
          href={site.phoneHref}
          event="phone_click"
          detail={{ from: "contact" }}
          className="hover:text-accent"
        >
          {site.phone}
        </TrackedLink>
        <TrackedLink
          href={site.whatsapp}
          external
          event="whatsapp_click"
          detail={{ from: "contact" }}
          className="hover:text-accent"
        >
          WhatsApp
        </TrackedLink>
      </p>

      <p className="mt-8 flex gap-6 text-muted">
        {site.github && (
          <TrackedLink href={site.github} external event="github_click" className="hover:text-fg">
            GitHub
          </TrackedLink>
        )}
        <TrackedLink href={site.linkedin} external event="linkedin_click" className="hover:text-fg">
          LinkedIn
        </TrackedLink>
      </p>
    </Section>
  );
}
