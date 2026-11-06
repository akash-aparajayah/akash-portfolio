import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Section from "./Section";
import CopyEmail from "./CopyEmail";
import Magnetic from "./Magnetic";
import TrackedLink from "./TrackedLink";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <p className="max-w-xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
        Hiring for a full-stack role, or need a product built?
      </p>
      <p className="mt-4 text-lg text-muted">{site.replyTime}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="glass-soft rounded-[1.4rem] p-5">
          <p className="kicker">Email</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Magnetic>
              <TrackedLink
                href={`mailto:${site.email}`}
                event="email_click"
                detail={{ from: "contact" }}
                className="btn-primary inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink"
              >
                <Mail size={16} aria-hidden />
                Send email
              </TrackedLink>
            </Magnetic>
            <CopyEmail email={site.email} />
          </div>
        </div>

        <div className="glass-soft rounded-[1.4rem] p-5">
          <p className="kicker">Talk</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <TrackedLink
              href={site.phoneHref}
              event="phone_click"
              detail={{ from: "contact" }}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Phone size={16} aria-hidden />
              {site.phone}
            </TrackedLink>
            <TrackedLink
              href={site.whatsapp}
              external
              event="whatsapp_click"
              detail={{ from: "contact" }}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <MessageCircle size={16} aria-hidden />
              WhatsApp
            </TrackedLink>
          </div>
          <TrackedLink
            href={site.linkedin}
            external
            event="linkedin_click"
            className="mt-5 inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            LinkedIn
            <ArrowUpRight size={14} aria-hidden />
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
