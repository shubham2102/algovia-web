import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-6 sm:h-7",
  md: "h-7 sm:h-8",
  lg: "h-8 sm:h-9 lg:h-10",
};

export default function Logo({
  href = "/",
  className = "",
  size = "md",
}: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Algovia AI"
      width={200}
      height={40}
      priority={size === "md"}
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="Algovia AI home">
      {image}
    </Link>
  );
}
