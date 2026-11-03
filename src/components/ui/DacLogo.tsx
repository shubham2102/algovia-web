import Image from "next/image";

export default function DacLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/dac-digital-logo.png"
      alt="DAC.digital — Infomotion Group"
      width={417}
      height={159}
      className={className}
    />
  );
}
