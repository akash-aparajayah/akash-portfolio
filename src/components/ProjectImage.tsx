import Image from "next/image";

export default function ProjectImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
}
