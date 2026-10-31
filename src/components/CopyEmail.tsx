"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      trackEvent("email_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="glass-soft inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors hover:border-accent"
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
