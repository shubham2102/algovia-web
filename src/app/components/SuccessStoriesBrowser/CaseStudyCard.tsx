import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Landmark,
  Banknote,
  Zap,
  Radio,
  Building2,
  HeartPulse,
  GraduationCap,
  Plane,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { CASE_STUDY_IMAGES, splitClientTitle } from "@/lib/case-studies";
import "./casestudies.css";

const SECTOR_ICONS: Record<string, LucideIcon> = {
  government: Landmark,
  financial: Banknote,
  energy: Zap,
  tmt: Radio,
  realestate: Building2,
  healthcare: HeartPulse,
  education: GraduationCap,
  transport: Plane,
  retail: Factory,
};

interface CaseStudyCardProps {
  id: string;
  client: string;
  challenge: string;
  sectorId: string;
  /** Short tag shown on top of the card, e.g. "Financial Services". */
  sectorLabel: string;
}

export default function CaseStudyCard({ id, client, challenge, sectorId, sectorLabel }: CaseStudyCardProps) {
  const { name, headline } = splitClientTitle(client);
  const image = CASE_STUDY_IMAGES[id];
  const Icon = SECTOR_ICONS[sectorId] ?? Factory;
  const title = headline ? `${name}: ${headline}` : name;

  return (
    <article className="cs-card">
      <div className={`cs-card__img-wrap${image ? "" : " cs-card__img-wrap--art"}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="cs-card__img"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          />
        ) : (
          <span className="cs-card__art" aria-hidden>
            <Icon strokeWidth={1.25} />
          </span>
        )}
        <div className="cs-card__img-fade" aria-hidden />
        <span className="cs-card__badge">{sectorLabel}</span>
      </div>

      <div className="cs-card__body">
        <h3 className="cs-card__title">{title}</h3>
        <p className="cs-card__desc">{challenge}</p>
        <Link href={`/success-stories/${id}`} className="cs-card__cta">
          View case study
          <ArrowUpRight className="cs-card__cta-icon h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}
