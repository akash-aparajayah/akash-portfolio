"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";

const initials = site.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase();

export default function Avatar({ size = 112 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="avatar-ring glass-soft relative shrink-0 overflow-hidden rounded-2xl"
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span className="flex h-full w-full items-center justify-center font-display text-3xl font-semibold text-accent">
          {initials}
        </span>
      ) : (
        <Image
          src={site.profileImage}
          alt={`Photo of ${site.name}`}
          fill
          sizes={`${size}px`}
          priority
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
