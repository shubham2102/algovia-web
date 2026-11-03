"use client";

import { useState } from "react";
import { BarChart3, Factory, Layers, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import DacLogo from "@/components/ui/DacLogo";

interface Solution {
  id: string;
  title: string;
  tagline: string;
  description: string;
  impact: string;
  impactNote?: string;
}

interface Suite {
  id: string;
  label: string;
  heading: string;
  icon: React.ReactNode;
  solutions: Solution[];
}

const SUITES: Suite[] = [
  {
    id: "enterprises",
    label: "AI for Enterprises",
    heading: "Data That Answers, Checks and Acts",
    icon: <BarChart3 aria-hidden />,
    solutions: [
      { id: "invoice", title: "Invoice Verification & Fraud Detection", tagline: "Every invoice checked before the money leaves", description: "Every line matched to PO, contract and supplier data. Duplicates and changed bank details stopped before payment.", impact: "Stop leakage before payment" },
      { id: "cfo", title: "CFO Cockpit", tagline: "Finance questions answered in seconds", description: "Ask finance questions in plain language; get the number, its source and the drill-down, live.", impact: "Faster, trusted finance decisions" },
      { id: "agent", title: "AI Agent: Talk to Your Data", tagline: "Ask your business anything, live", description: "One agent across all your systems: live performance summaries and answers as charts, docs or slides.", impact: "Real-time insight, no report backlog" },
      { id: "process", title: "AI Process Automation", tagline: "Agents that do the work, not just suggest it", description: "Agents read, decide and update your systems on high-volume tasks, logging every step.", impact: "Scale your business efficiently" },
      { id: "llm-cost", title: "LLM Cost Control", tagline: "Same AI quality, a fraction of the bill", description: "Every AI call measured and routed to the right model, with quality proven before any change.", impact: "Lower AI spend, proven quality" },
    ],
  },
  {
    id: "manufacturing",
    label: "AI for Manufacturing",
    heading: "AI Across Your Manufacturing Value Chain",
    icon: <Factory aria-hidden />,
    solutions: [
      { id: "ai4cad", title: "AI4CAD: CAD Drawing Analysis", tagline: "No one retypes a parts list again", description: "Any CAD file, PDF or scan turned into structured parts, dimensions and notes, each traced to the sheet.", impact: "Engineering hours cut to minutes" },
      { id: "ai4quotation", title: "AI4Quotation: Tender Automation", tagline: "Respond to tenders faster, buy smarter", description: "RFQs costed straight from drawings; supplier quotes in any format compared on true landed cost.", impact: "Win more bids, cut procurement cost" },
      { id: "okkast", title: "OkKast: Precast Quality Inspection", tagline: "Every element checked before it ships", description: "Ceiling cameras check every precast element against its BIM model: dimensions, openings, anchors, cracks.", impact: "Less rework, millimetre-level checks" },
      { id: "ai4machines", title: "AI4Machines & AI4Optimization", tagline: "All your machines in one intelligent model", description: "All machine data in one model, powering OEE, predictive maintenance and quality analytics.", impact: "Higher uptime, fewer defects" },
      { id: "company-dna", title: "Company DNA: Knowledge Base", tagline: "Your know-how, instantly searchable", description: "Documents, drawings, quotes and machine data in one secure, searchable knowledge base.", impact: "Know-how retained and reused" },
    ],
  },
  {
    id: "specialized",
    label: "Specialized AI Solutions",
    heading: "Proven AI for Smarter Infrastructure, Logistics & Talent",
    icon: <Layers aria-hidden />,
    solutions: [
      { id: "bot", title: "Build, Operate & Transfer AI Teams", tagline: "Your own AI team, built and handed over", description: "Vetted AI engineers selected with you, run through a 6-month trial, then transferred to you with full training.", impact: "1,100+", impactNote: "tech jobs built; under 4% turnover" },
      { id: "routes", title: "Delivery Route Optimization", tagline: "Fewer kilometres, full control of every pickup", description: "Optimized pick-up and delivery routes with live tracking, quantity reconciliation and temperature checks.", impact: "Up to 26%", impactNote: "fewer km in live delivery networks" },
      { id: "oculo", title: "Oculo: 360° Site Monitoring", tagline: "Your whole site, captured and assessed", description: "Helmet-mounted 360° cameras track progress against plan and pin every defect to the floor plan.", impact: "360°", impactNote: "site record on every walk" },
      { id: "assets", title: "Smart Asset Monitoring", tagline: "Thousands of field assets, one live view", description: "Live monitoring, alerts and auto-routed service tickets for critical field assets, on one map.", impact: "20,000+", impactNote: "devices monitored in real time" },
      { id: "transport", title: "Smart Transport Data Management", tagline: "Live data on every user's phone", description: "Timetables, live locations and routes unified and published to Google Maps and journey apps.", impact: "3.8M+", impactNote: "live-data requests in a single day" },
    ],
  },
];

const PILLS = ["Proven IP", "Faster ROI", "Cost-efficient", "Delivered locally"];

export default function ProprietarySolutions() {
  const [selected, setSelected] = useState<{ suiteId: string; solutionId: string } | null>(null);

  const suite = selected ? SUITES.find((s) => s.id === selected.suiteId) : null;
  const solution = suite?.solutions.find((s) => s.id === selected?.solutionId);

  return (
    <section id="proprietary" className="proprietary">
      <Container>
        <h2 className="proprietary__title">Our Proprietary AI Solutions Powered by DAC Digital</h2>
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
                <h3 className="suite-card__title">{s.label}</h3>
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
          {suite && solution && (
            <article className="solution-detail">
              <p className="solution-detail__eyebrow">AI Solutions Suite &nbsp;|&nbsp; {suite.label}</p>
              <p className="solution-detail__suite">{suite.heading}</p>
              <h3 className="solution-detail__title">{solution.title}</h3>
              <p className="solution-detail__tagline">{solution.tagline}</p>
              <p className="solution-detail__text">{solution.description}</p>
              <div className="solution-detail__impact">
                <p className="solution-detail__impact-label">Business impact</p>
                <p className="solution-detail__impact-value">{solution.impact}</p>
                {solution.impactNote && <p className="solution-detail__impact-note">{solution.impactNote}</p>}
              </div>
            </article>
          )}
        </div>

        <ul className="proprietary__pills">
          {PILLS.map((pill) => (
            <li key={pill}>{pill}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
