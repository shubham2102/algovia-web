"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { scrollToAIPanel } from "@/lib/utils";

interface AILinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AILink({ children, className = "", onClick }: AILinkProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <button
        type="button"
        onClick={() => {
          scrollToAIPanel(true);
          onClick?.();
        }}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href="/#ai-panel" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function HeroCTAPrimary() {
  return (
    <AILink className="hero__cta-primary">
      Talk to Algovia AI
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
    </AILink>
  );
}
