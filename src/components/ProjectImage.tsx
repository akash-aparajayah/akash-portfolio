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
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
