"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  event,
  detail,
  external = false,
  className,
  children,
}: {
  href: string;
  event: string;
  detail?: Record<string, string | number | boolean>;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={() => trackEvent(event, detail)}
    >
      {children}
    </a>
  );
}
