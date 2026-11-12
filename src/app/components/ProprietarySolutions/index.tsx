"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Factory,
  HeartPulse,
  Layers,
  ChevronRight,
  ReceiptText,
  Gauge,
  MessagesSquare,
  Cog,
  Coins,
  DraftingCompass,
  FilePenLine,
  Boxes,
  Cpu,
  Dna,
  ClipboardPlus,
  ScanLine,
  Stethoscope,
  Users,
  UsersRound,
  Route,
  HardHat,
  TrafficCone,
  Bus,
} from "lucide-react";
import Container from "@/components/ui/Container";
import DacLogo from "@/components/ui/DacLogo";

interface Solution {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
}

interface Suite {
  id: string;
  label: string;
  /** Shown with an asterisk — solutions apply across industry sectors. */
  crossSector?: boolean;
  heading: string;
  icon: React.ReactNode;
  solutions: Solution[];
}

const SUITES: Suite[] = [
  {
    id: "enterprises",
    label: "AI for Enterprises",
    crossSector: true,
    heading: "Data That Answers, Checks and Acts",
    icon: <BarChart3 aria-hidden />,
    solutions: [
      {
        id: "invoice",
        icon: <ReceiptText aria-hidden />,
        title: "Invoice Verification & Fraud Detection",
        tagline: "Every invoice checked before payment",
        description:
          "Every invoice is matched to PO, contract & payment history before payment. Duplicates, prices and bank-detail changes are held for review, with the reason.",
      },
      {
        id: "cfo",
        icon: <Gauge aria-hidden />,
        title: "CFO Cockpit",
        tagline: "Trusted finance answers in seconds",
        description:
          "Ask finance questions in plain language. AI queries your ERP and data warehouse through one governed data model, and returns the figure, its source and the drill-down.",
      },
      {
        id: "agent",
        icon: <MessagesSquare aria-hidden />,
        title: "AI Agent: Talk to Your Data",
        tagline: "Ask your business anything, live",
        description:
          "One AI agent on top of your existing data. Ask in plain language and get live answers, summaries, charts or ready-made slides.",
      },
      {
        id: "process",
        icon: <Cog aria-hidden />,
        title: "AI Process Automation",
        tagline: "Agents that do the work, so you scale efficiently",
        description:
          "AI agents read documents, apply your rules and update systems for high-volume transactions. Your people handle only exceptions, and every action is traceable.",
      },
      {
        id: "llm-cost",
        icon: <Coins aria-hidden />,
        title: "LLM Cost Control",
        tagline: "Same AI quality, at lower AI spend",
        description:
          "Every AI task is tracked for cost and routed to the most cost-effective model that can do the job. Quality is tested first, so your AI bill drops while results stay the same.",
      },
    ],
  },
  {
    id: "manufacturing",
    label: "AI for Manufacturing",
    heading: "AI Across Your Manufacturing Value Chain",
    icon: <Factory aria-hidden />,
    solutions: [
      {
        id: "ai4cad",
        icon: <DraftingCompass aria-hidden />,
        title: "AI4CAD: CAD Drawing Analysis",
        tagline: "Engineering hours cut to minutes",
        description:
          "AI reads technical drawings (CAD files, PDFs or scans) and extracts parts lists, dimensions and notes, each linked back to the drawing for one-click checks.",
      },
      {
        id: "ai4quotation",
        icon: <FilePenLine aria-hidden />,
        title: "AI4Quotation: Tender Automation",
        tagline: "Win more bids, cut procurement cost",
        description:
          "AI prices tenders directly from drawings and compares supplier quotes in any format on true total cost, so your team responds faster and negotiates better.",
      },
      {
        id: "okkast",
        icon: <Boxes aria-hidden />,
        title: "OkKast: Precast Quality Inspection",
        tagline: "Every element checked before it ships",
        description:
          "Overhead cameras check every precast element against its design model, measuring dimensions, openings, anchors and cracks, so defects are caught before delivery.",
      },
      {
        id: "ai4machines",
        icon: <Cpu aria-hidden />,
        title: "AI4Machines & AI4Optimization",
        tagline: "Higher uptime, fewer defects",
        description:
          "AI brings all machine and production data into one view, tracking performance, predicting maintenance and flagging quality issues before they cause downtime.",
      },
      {
        id: "company-dna",
        icon: <Dna aria-hidden />,
        title: "Company DNA: Knowledge Base",
        tagline: "Your know-how, instantly searchable",
        description:
          "AI connects your documents, drawings, quotes and machine data in one secure, searchable knowledge base, so expertise stays with the company.",
      },
    ],
  },
  {
    id: "healthcare",
    label: "AI for Healthcare",
    heading: "Smarter Care, Better Outcomes for Patients",
    icon: <HeartPulse aria-hidden />,
    solutions: [
      {
        id: "clinical-docs",
        icon: <ClipboardPlus aria-hidden />,
        title: "Clinical Documentation AI",
        tagline: "More time with patients, less admin",
        description:
          "Notes, referral letters and discharge summaries drafted by AI from the consultation, then reviewed and signed by the clinician.",
      },
      {
        id: "imaging",
        icon: <ScanLine aria-hidden />,
        title: "Imaging & Pathology AI",
        tagline: "Urgent scans first, fewer missed findings",
        description:
          "AI flags urgent findings in radiology and digital pathology and prioritizes critical patients up the worklist.",
      },
      {
        id: "decision-support",
        icon: <Stethoscope aria-hidden />,
        title: "Clinical Decision Support",
        tagline: "The right guideline at the point of care",
        description:
          "Protocols, prescriptions and patient history surfaced in the clinician’s workflow, giving a clear, comprehensive view of each patient for evidence-based decisions.",
      },
      {
        id: "population-health",
        icon: <Users aria-hidden />,
        title: "Population Health & Risk Stratification",
        tagline: "Reach high-risk patients earlier",
        description:
          "Electronic Health Record, lab and claims data used to identify patients at risk of complications, admission or readmission.",
      },
      {
        id: "remote-monitoring",
        icon: <HeartPulse aria-hidden />,
        title: "Remote Patient Monitoring",
        tagline: "Care that continues at home",
        description:
          "Device and app readings monitored continuously, with alerts routed to care teams when readings fall outside safe ranges.",
      },
    ],
  },
  {
    id: "specialized",
    label: "Specialized AI Solutions",
    crossSector: true,
    heading: "Proven AI for Smarter Infrastructure, Logistics & Talent",
    icon: <Layers aria-hidden />,
    solutions: [
      {
        id: "bot",
        icon: <UsersRound aria-hidden />,
        title: "Build, Operate & Transfer AI Teams",
        tagline: "Your own AI team: 1,100+ tech jobs built",
        description:
          "Together we select vetted AI engineers who work alongside your business through a 6-month trial. The team then transfers to your organization fully trained.",
      },
      {
        id: "routes",
        icon: <Route aria-hidden />,
        title: "Delivery Route Optimization",
        tagline: "Up to 26% fewer km in live networks",
        description:
          "AI plans optimized routes and tracks every vehicle live, matching expected pickup quantities with what is loaded and checking the temperature of goods in transit.",
      },
      {
        id: "oculo",
        icon: <HardHat aria-hidden />,
        title: "Oculo: 360° Site Monitoring",
        tagline: "Your whole site, analyzed in real time",
        description:
          "Helmet-mounted 360° cameras capture every site walk, and AI compares progress against the plan, flagging delays and defects on the floor plan.",
      },
      {
        id: "assets",
        icon: <TrafficCone aria-hidden />,
        title: "Smart Asset Monitoring",
        tagline: "20,000+ devices, one live view",
        description:
          "Critical field assets are monitored live on one map, and AI flags faults instantly, routing service tickets to the right team for faster fixes.",
      },
      {
        id: "transport",
        icon: <Bus aria-hidden />,
        title: "Smart Transport Data Management",
        tagline: "3.8M+ live-data requests in a day",
        description:
          "Timetables, live vehicle locations and routes are unified in one platform and published to Google Maps and journey apps, giving users real-time information.",
      },
    ],
  },
];

const PILLS = ["Proven IP", "Faster ROI", "Cost-efficient", "Delivered locally"];

export default function ProprietarySolutions() {
  const [selected, setSelected] = useState<{ suiteId: string; solutionId: string } | null>(null);

  const suite = selected ? SUITES.find((s) => s.id === selected.suiteId) : null;

  // The detail panel opens below the suite cards, often off-screen: bring it into view.
  useEffect(() => {
    if (!selected) return;
    document.getElementById("proprietary-detail")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selected]);

  return (
    <section id="proprietary" className="proprietary">
      <Container>
        <p className="proprietary__eyebrow">Powered by DAC Digital</p>
        <h2 className="proprietary__title">Our Proprietary AI Solutions</h2>
        <div className="proprietary__intro">
          <DacLogo className="proprietary__logo" />
          <p>
            ALGOVIA&apos;s global ecosystem includes DAC Digital, our strategic AI specialist partner. Together we offer Proprietary AI Solutions that deliver tangible business value.
          </p>
        </div>

        <div className="proprietary__suites">
          {SUITES.map((s) => (
            <div key={s.id} className="suite-card">
              <div className="suite-card__head">
                <span className="suite-card__icon">{s.icon}</span>
                <h3 className="suite-card__title">
                  {s.label}
                  {s.crossSector ? "*" : ""}
                </h3>
              </div>
              <ul className="suite-card__list">
                {s.solutions.map((item) => {
                  const isOpen = selected?.suiteId === s.id && selected.solutionId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="suite-card__item"
                        aria-expanded={isOpen}
                        aria-controls="proprietary-detail"
                        onClick={() => setSelected(isOpen ? null : { suiteId: s.id, solutionId: item.id })}
                      >
                        <ChevronRight className="suite-card__chevron" strokeWidth={2.5} aria-hidden />
                        {item.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div id="proprietary-detail" aria-live="polite">
          {suite && (
            <article key={suite.id} className="solution-detail">
              <p className="solution-detail__eyebrow">AI Solutions Suite &nbsp;|&nbsp; {suite.label}</p>
              <h3 className="solution-detail__suite">{suite.heading}</h3>
              <ul className="solution-detail__grid">
                {suite.solutions.map((item) => (
                  <li
                    key={item.id}
                    className={`solution-tile${item.id === selected?.solutionId ? " solution-tile--active" : ""}`}
                  >
                    <span className="solution-tile__icon">{item.icon}</span>
                    <h4 className="solution-tile__title">{item.title}</h4>
                    <p className="solution-tile__tagline">{item.tagline}</p>
                    <p className="solution-tile__text">{item.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>

        <ul className="proprietary__pills">
          {PILLS.map((pill) => (
            <li key={pill}>{pill}</li>
          ))}
        </ul>
        <p className="proprietary__footnote">* Solutions are applicable across industry sectors.</p>
      </Container>
    </section>
  );
}
