import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Success Stories",
  description:
    "Real-world AI transformation outcomes across Government, Financial Services, Energy, Healthcare, Real Estate, Retail & Manufacturing, and more.",
  path: "/success-stories",
});

interface CaseStudy {
  id: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string;
}

const FINANCIAL_SERVICES: CaseStudy[] = [
  {
    id: "kinage",
    client: "Kinage: AI Personal-Finance MVP",
    challenge: "Bills, subscriptions, scam messages, and other financial events arrived in inconsistent formats that were hard to track. Kinage needed a functional MVP fast, to test with users, demonstrate value to investors, and support rapid iteration.",
    solution: "We built a secure inbox connector and parsing pipeline that extracts merchants, amounts, and due dates, then classifies bills, subscriptions, scams, and anomalies, converting the results into clear alerts inside a full-stack application.",
    results: ["Accelerated market launch with a functional MVP for user testing", "Reduced future rework through a modular, extensible foundation", "Improved visibility and control over bills and financial risk", "Gave the team tangible evidence to support fundraising"],
    tech: "Python · NLP · Classification Models · AWS",
  },
];

const TMT: CaseStudy[] = [
  {
    id: "talktwelve",
    client: "TalkTwelve: Production Legal AI Platform",
    challenge: "TalkTwelve, an employment-law service, received open-ended client enquiries that often lacked key facts. Solicitors spent over 60 minutes per case gathering information before a consultation could begin.",
    solution: "We built a conversational AI agent that asks targeted follow-up questions, retrieves approved legal content through RAG, and converts each enquiry into a structured, solicitor-ready brief, deployed securely on AWS with built-in payments and video consultations.",
    results: ["Cut intake time from over 60 minutes to about 12 minutes", "Produced more complete, consistent consultation briefs", "Freed solicitor capacity for higher-value case work", "Lowered cost per case without adding headcount"],
    tech: "Python · React · Qdrant · Keycloak · AWS",
  },
  {
    id: "invisible",
    client: "Invisible Technologies: Data Platform Rebuilt for Reliability & Cost Control",
    challenge: "Invisible runs a Databricks medallion architecture processing data across raw, cleaning, and business-ready layers. As the platform scaled, pipeline failures went undetected and cloud costs accumulated without attribution.",
    solution: "We built a data-quality monitoring system across all three medallion layers with automated alerting, introduced local testing before production deployment, implemented hash-based deduplication, and delivered granular cost dashboards.",
    results: ["Pipeline anomalies detected automatically across Bronze, Silver, and Gold layers", "Production incidents from untested code eliminated", "Reliable deduplication across datasets with no primary keys", "Full cost attribution at job and cluster level"],
    tech: "Python · PySpark · Databricks · Temporal · Notebooks · Delta Lake",
  },
  {
    id: "telecom",
    client: "Major European Telecom Operator: Automated Fibre Optic Installation Validation",
    challenge: "Manual inspection of fibre optic cable installations was slow, labour-intensive, and prone to inconsistency, creating significant delays in compliance and deployment timelines.",
    solution: "We developed an automated inspection system powered by computer vision and machine learning that validates fibre optic installations in real time.",
    results: ["Real-time fibre optic inspection with an AI-driven photo validation system", "Reduced deployment errors and costs", "Scalable and customizable across environments", "Enhanced operator efficiency"],
    tech: "Python · PyTorch · Hydra · GradCam · FastAPI · OpenCV · NumPy",
  },
  {
    id: "revoize",
    client: "Intel Poland / Revoize: Revolutionizing In-Car Speech Enhancement",
    challenge: "Poor audio quality remains a cross-industry issue. Most tools simply remove noise using discriminative methods; results can be satisfactory but not category-defining.",
    solution: "Revoize, Algovia's GenAI Audio R&D initiative, set new standards in real-time audio processing through state-of-the-art analysis, microphone-array geometry design, and iterative development of high-performance DSP algorithms.",
    results: ["Real-time speech enhancement exceeding established market incumbents", "New microphone-array geometry design", "Iterative, PhD-led R&D methodology with rigorous algorithm evaluation"],
    tech: "Audio DSP Algorithms · Microphone Array Geometry Design · Speech Enhancement · Iterative R&D Methodology",
  },
];

const REAL_ESTATE: CaseStudy[] = [
  {
    id: "eazli",
    client: "Eazli: Scalable Multi-Agent Marketplace for KSA Property, Lifestyle & Services",
    challenge: "Eazli's early prototype could handle only simple, single-service requests. It could not break complex needs into tasks, activate the right specialists, or give management visibility into service quality and AI costs.",
    solution: "We designed a central AI concierge that interprets each customer's needs, plans and delegates tasks to specialist agents through standardised interfaces, and shares context through RAG, with built-in monitoring of performance, quality, and per-query cost.",
    results: ["Enabled new services to launch without rebuilding the core platform", "Cut the time and cost of integrating new specialist capabilities", "Opened new cross-selling opportunities across verticals", "Gave management real-time control over quality and AI spend"],
    tech: "Python · LLM Orchestration · RAG · AWS",
  },
  {
    id: "oculo",
    client: "Oculo: Turning On-Site Data into Actionable Construction Insights",
    challenge: "Construction project managers needed a single, reliable source of truth for on-site progress, allowing them to inspect, spot issues, and make decisions faster, even miles away from site.",
    solution: "Our deep-tech team co-developed the computer vision algorithms for progress monitoring, using 360° cameras to create an up-to-date 'street view' of a construction project.",
    results: ["A single, up-to-date 'street view' source of truth for on-site progress", "Faster inspections and issue detection, remotely", "Full-stack delivery: computer vision, frontend, backend, and mobile"],
    tech: "OpenCV · Python · NumPy · Docker · PyTest · AWS · React · Kotlin · Swift",
  },
];

const HEALTHCARE: CaseStudy[] = [
  {
    id: "everon",
    client: "Everon: Remote Patient-Care Device Re-Architecture",
    challenge: "The nursing device needed reliable links to patient-side equipment, clearer remote consultations, and better power management, while preserving clinical function and avoiding unnecessary recertification.",
    solution: "We redesigned the firmware around BLE, Bluetooth Classic, and GSM/MBIM links, added digital signal processing for noise and echo cancellation, and revised power management.",
    results: ["Extended battery life to approximately two days", "Improved remote consultation voice quality", "Added multi-patient monitoring capability", "Lowered support burden and recertification risk"],
    tech: "C/C++ · RTOS · BLE · GSM/MBIM · DSP",
  },
  {
    id: "diaperiid",
    client: "DiaperID: Parent-Facing App Screening for Liver-Disease Indicators",
    challenge: "Biliary atresia and related conditions can first appear as changes in stool colour. The product needed to convert parent-captured photos into a reliable screening signal, without requiring any medical knowledge from users.",
    solution: "We built a React Native app that guides parents through image capture and quality checks, then a Python-based computer-vision model, trained on clinically annotated images, analyses each submission against an MDR-aware validation workflow.",
    results: ["Supports earlier referral for high-risk infants", "Delivers scalable screening with less regulatory rework", "Removes reliance on parents' clinical judgement", "Provides a validated, production-ready capture pipeline"],
    tech: "React Native · Python · TensorFlow · Computer Vision",
  },
  {
    id: "motus-med",
    client: "motus med: Accelerating Infant Seizure Diagnosis with Computer Vision",
    challenge: "Diagnosing infantile spasms in toddlers is difficult due to the subtle and sporadic nature of seizures, often leading to delays in treatment and severe long-term consequences.",
    solution: "We helped the motus med team develop an AI-driven tool that uses smartphone videos taken by parents to enable rapid, accurate detection of epilepsy.",
    results: ["AI-enhanced, smartphone-based seizure detection", "Accelerated diagnosis and treatment", "MDR Certification (Class IIb) support", "Patient-centric UX validated with clinicians"],
    tech: "Python · Open3D · OpenCV · PyTorch · MM Segmentation",
  },
  {
    id: "metis",
    client: "METIS: Point-of-Care Antibiotic Decision Support",
    challenge: "Traditional lab pathways can delay antibiotic treatment decisions by days. The workflow needed to combine patient, diagnostic, and guideline inputs into one practical interface without specialist lab hardware.",
    solution: "We combined clinical recommendation logic with computer-vision analysis of diagnostic inputs, presented through a mobile-compatible, clinician-facing interface.",
    results: ["Makes guidance available during the same patient visit", "Supports better prescribing and shorter diagnostic cycles", "Combines clinical logic with computer-vision analysis", "Provides a validated architecture ready to scale"],
    tech: "Python · Computer Vision · Machine Learning · Mobile",
  },
  {
    id: "carehigh",
    client: "CaReHigh: Mobile Patient Platform and Registry for FH Care & Research",
    challenge: "Familial hypercholesterolaemia patients needed accessible information, adherence support, and easier study participation, while clinical teams needed structured registration without adding manual coordination work.",
    solution: "We built a React Native app and Python backend supporting onboarding, adherence tracking, and research participation, backed by a structured registry model.",
    results: ["Strengthened patient engagement and research participation", "Reduced coordination effort for clinical teams", "Created reusable, structured patient data", "Clarified which functions fall under medical-device regulation"],
    tech: "React Native · Python · MDR Compliance",
  },
  {
    id: "mayo-clinic",
    client: "Mayo Clinic: Benchmarked Medical-Imaging Pipeline for Stroke Etiology Classification",
    challenge: "Identifying the underlying cause or subtype of a stroke from microscopic tissue images is a complex research challenge, requiring rigorous image curation, standardized preprocessing, and specialized deep-learning development.",
    solution: "The team developed an end-to-end AI system combining a curated image repository with HistomicsTK-based preprocessing and segmentation, followed by training and validation of a specialized deep-learning model.",
    results: ["Achieved a Silver Medal benchmark: 46th of 896 teams", "Delivered independently validated technical performance", "Created reusable assets to accelerate clinical research", "Enabled continued experimentation beyond the benchmark"],
    tech: "Python · PyTorch · MONAI · HistomicsTK",
  },
];

const TRANSPORT: CaseStudy[] = [
  {
    id: "muumap",
    client: "MuuMap (D-Box): Digitizing Milk Collection Logistics Across Europe",
    challenge: "The dairy industry has long relied on manual route planning and limited real-time monitoring, with poor communication between dairy plants, farmers, and drivers hindering optimization of the milk supply chain.",
    solution: "We developed MuuMap, a digital system that streamlines milk collection logistics through real-time tracking, optimized route planning, and seamless communication between dispatchers and drivers.",
    results: ["Real-time tracking for better process control", "Optimized routes cutting transport costs", "Seamless communication between dispatchers and drivers", "Improved efficiency, cost, and food safety outcomes"],
    tech: "Java + Spring · Kotlin · React · OpenStreetMap · MySQL + MongoDB · Python · Yocto Linux · LTE",
  },
];

const RETAIL_MANUFACTURING: CaseStudy[] = [
  {
    id: "h2train",
    client: "H2TRAIN: Wearable Edge-to-Cloud Industrial Safety Platform",
    challenge: "Industrial sites needed earlier warning of unsafe physiological and environmental conditions. The wearable had to analyse time-critical signals on constrained hardware, while central teams still needed history, alerts, and reporting.",
    solution: "We integrated ECG, respiration, temperature, and movement sensors with on-device sensor fusion, ran inference with TensorFlow Lite, and built digital-twin models with cloud services for alerts, reporting, and risk prediction.",
    results: ["Working multi-sensor wearable prototype", "Earlier warning may reduce incidents and downtime", "Continuous evidence supports reporting and prediction", "Digital twins plus cloud monitoring and alerts"],
    tech: "TensorFlow Lite · Edge AI · Digital Twin · Cloud",
  },
  {
    id: "komatsu",
    client: "Komatsu: Forest Mapping with Autonomous, Computer-Vision-Extended Drones",
    challenge: "Autonomous operation of forestry vehicles can only be planned at scale if the health, species, and condition of individual trees is known and precisely located.",
    solution: "We built a drone-based solution that flies the forest ahead of harvesting to determine 3D surface structure and localize trees with their characterization (diameter, species, bend), fusing RGB camera and LiDAR data with available national data to produce an enriched operational map.",
    results: ["Data collection platform for surface reconstruction and object recognition", "Semantic segmentation of the forest", "Data fusion from LiDAR and cameras"],
    tech: "Python · Open3D · OpenCV · PyTorch · MM Segmentation",
  },
  {
    id: "satvitai",
    client: "SatVitAi: Satellite Edge AI for Precision Viticulture",
    challenge: "Vineyard managers across the Iberian Peninsula needed real-time, data-driven monitoring of vine maturity, disease, and yield anomalies without relying on continuous cloud connectivity.",
    solution: "Our embedded systems and AI team designed and implemented an on-device inference pipeline, from model optimization for CubeSat-class hardware to multispectral data preprocessing and object-detection workflows, as part of the EU Horizon Europe AGRARIAN programme.",
    results: ["Selected as an Open Call winner under EU Horizon Europe's AGRARIAN programme", "Near-real-time vine maturity estimation, disease detection, and yield-anomaly identification", "Runs on constrained, satellite-grade edge hardware without continuous cloud connectivity"],
    tech: "Python · Edge AI · Multispectral Imaging · NDVI · Kubernetes · CubeSat Emulation",
  },
  {
    id: "stihl",
    client: "STIHL: Enterprise-Wide Agentic AI Governance Strategy",
    challenge: "STIHL experimented with LLMs and low-code tools without a centralized adoption plan. After dozens of fragmented initiatives, the enterprise wanted to organize its data, select the right AI use cases, and protect against data leaks.",
    solution: "Our experts designed workshops and education plans to consolidate initiatives, prioritize AI use cases, and balance internal development with external help, laying the foundation for an enterprise-wide AI strategy.",
    results: ["Education on enterprise-level AI system design", "Agentic AI use-case assessment and prioritization", "Data governance strategy for AI initiatives"],
    tech: "Enterprise AI Strategy · Data Governance · Agentic AI Readiness",
  },
  {
    id: "aims5",
    client: "AIMS5.0: Edge AI and OT/IT Architecture for Real-Time Manufacturing",
    challenge: "Cloud-only processing does not suit production lines that are air-gapped, security-sensitive, or dependent on immediate machine-level decisions.",
    solution: "We placed inference close to the machines, integrated sensor and equipment data through industrial protocols, and defined OT/IT bridge and sensor-fusion patterns, leading work packages across the EU Horizon-funded consortium.",
    results: ["Enabled faster decisions with less cloud dependency", "Strengthened data control and reusable industrial IP", "Delivered consortium work packages and publications", "Established reusable architecture patterns for future lines"],
    tech: "Python · C++ · Edge AI · OT/IT Integration",
  },
  {
    id: "prohan",
    client: "Prohan: Computer Vision Defect Detection in Wood Furniture Manufacturing",
    challenge: "Prohan, a hardwood furniture maker, faced costly defects: cracks and gaps only tenths of a millimetre wide, invisible to the human eye. With 5% of glued panels discarded, defects caused a €40K monthly loss.",
    solution: "Our computer vision system detects defects immediately after gluing, monitoring the production line 24/7 in low light and dust conditions, triggering warnings to prevent faulty panels from reaching final production.",
    results: ["90% defect detection during production", "0% defects in final products", "0% returns from undetected flaws"],
    tech: "Python · OpenCV · PyTorch · Docker · Pandas",
  },
  {
    id: "gold-guard",
    client: "Gold Guard: Handheld Edge-AI Jewellery Authentication",
    challenge: "Reflective gold, gemstones, and variable lighting make automated authentication difficult. Gold Guard needed evidence that a handheld authentication device was technically achievable, plus a credible investor roadmap.",
    solution: "We combined macro imaging with cross-polarised and coaxial lighting, IMU-gated capture for stable images, and a quantised edge-AI verification model, defining laboratory testing, hardware direction, and a delivery roadmap.",
    results: ["Specialised lighting reduced reflections and revealed key details", "Motion sensors ensured stable image capture", "A lightweight on-device AI model returns a result in under five seconds", "Defined lab tests, hardware requirements, development stages, and investment roadmap"],
    tech: "Edge AI · Computer Vision · Quantised Inference",
  },
  {
    id: "pnk",
    client: "PNK Group: AI-Powered Defect Detection for Precast Concrete",
    challenge: "PNK Group aimed to reduce defects in precast concrete manufacturing by improving detection of geometric inaccuracies, misalignments, and surface defects traditionally reliant on error-prone manual inspection.",
    solution: "We developed an AI-powered vision system using handheld 3D scanners and a mobile multi-camera rig, with machine learning identifying geometric deviations and surface flaws with real-time alerts.",
    results: ["Automated defect detection replacing manual inspection", "Real-time alerts on geometric and surface defects", "Modular system expected to cut future adaptation costs by 20–30%"],
    tech: "OpenCV · Python · PyTorch · Open3D · Zivid SDK",
  },
  {
    id: "altana",
    client: "ALTANA: Advanced Quality Inspection for Paint Monitoring",
    challenge: "Altana, a global leader in specialty chemicals, needed an automated solution to ensure color consistency and detect imperfections like air bubbles, reducing defects and improving customer satisfaction.",
    solution: "We developed a computer vision system using colorimetric cameras for precise defect detection, analyzing and classifying defects by severity and automating real-time defect detection on the production line.",
    results: ["Automated, real-time paint quality inspection", "Consistent, high-precision color checks", "Early, predictive flagging of potential defects"],
    tech: "OpenCV · Python · NumPy · Docker · PyTest",
  },
  {
    id: "edible-oil",
    client: "Edible Oil Producer: Automated Defective Cap Detection for High-Speed Bottling",
    challenge: "An edible oil producer operates a high-speed line at 270 bottles per minute. Manual quality control was labour-intensive and costly, needing real-time defective cap detection.",
    solution: "We developed a real-time vision system to identify cracked, loose, or missing caps, ensuring immediate defect removal integrated directly with the existing rejection system.",
    results: ["Real-time detection and removal of defective bottles", "Reduced reliance on manual quality control", "Fast integration with existing rejection systems"],
    tech: "OpenCV · Python · NumPy · Docker · PyTest",
  },
  {
    id: "10beauty",
    client: "10Beauty: Autonomous Manicure Innovation with Precise Computer Vision",
    challenge: "10Beauty set out to automate applying nail polish and preparing nails, requiring a robust computer vision system for precise 3D hand positioning and nail segmentation across diverse skin tones.",
    solution: "We delivered a highly accurate 3D positioning system and nail-segmentation pipeline, improving efficiency by over 10x and paving the way for the first production prototypes.",
    results: ["Accurate 3D hand and nail positioning using stereo vision", "Precise nail segmentation (accuracy greater than 0.25mm)", "Pipeline handles diverse skin and nail combinations", "Scalable solution with continuous performance improvement"],
    tech: "Open3D · OpenCV · Python · Jupyter Notebook · Matplotlib · PyTest · AWS",
  },
  {
    id: "furniture-manufacturer",
    client: "Furniture Manufacturer: Multimodal Engineering Copilot for Drawings, Product Matching & BOMs (Illustrative example)",
    challenge: "Senior engineers manually reviewed CAD drawings and specifications, translated requirements into configurations, and built bills of materials and pricing by hand — a slow process exposed to configuration errors and margin leakage.",
    solution: "We built a copilot that extracts dimensions and requirements from CAD drawings, matches them to the product library, applies configuration rules, and generates BOMs and proposal content, routing uncertain cases to engineers for review.",
    results: ["Accelerated quotation turnaround significantly", "Increased bid capacity without adding engineering headcount", "Reduced configuration, pricing, and version-control errors", "Strengthened margin protection through consistent BOMs"],
    tech: "Python · Computer Vision · TopSolid Integration · AWS",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="page-card flex flex-col" id={study.id}>
      <h3 className="page-card__title">{study.client}</h3>
      <div className="mt-3 space-y-3 flex-1">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">Challenge</p>
          <p className="page-card__text">{study.challenge}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">Solution</p>
          <p className="page-card__text">{study.solution}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">Key Results</p>
          <ul className="mt-1 space-y-0.5">
            {study.results.map((r) => (
              <li key={r} className="text-xs text-[var(--algovia-muted)] before:mr-1.5 before:text-[var(--algovia-green)] before:content-['✓']">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-muted)]">
        Technology: <span className="normal-case font-normal">{study.tech}</span>
      </p>
    </article>
  );
}

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Real outcomes. Proven execution."
        lead="Across governments and enterprises in nine sectors — Algovia delivers AI transformation that moves from strategy to measurable business impact."
      />

      <PageSection id="government" title="Government & Public Sector" elevated>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Algovia AI works with Boards and Executive teams across governments and public institutions, delivering AI transformation programs with the governance, accountability, and sector expertise that public-sector mandates require. Case studies in development — more to come.
        </p>
      </PageSection>

      <PageSection id="financial" title="Financial Services">
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {FINANCIAL_SERVICES.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <PageSection id="energy" title="Energy (Oil & Gas, Mining, Power & Utility)" elevated>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Algovia AI brings AI transformation and execution to oil & gas, mining, power, and utility operators — edge AI, computer vision, and IoT solutions built for industrial safety and precision operations. Case studies in development — more to come.
        </p>
      </PageSection>

      <PageSection id="tmt" title="Technology, Media & Telecommunications">
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {TMT.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <PageSection id="realestate" title="Real Estate" elevated>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {REAL_ESTATE.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <PageSection id="healthcare" title="Healthcare">
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HEALTHCARE.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <PageSection id="education" title="Education" elevated>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Algovia Academy extends our AI training capability into a standing, ongoing programme — from Executive & Board AI Literacy to Practitioner Training and Technical Upskilling. Case studies in development — more to come.
        </p>
      </PageSection>

      <PageSection id="transport" title="Transport & Aviation">
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {TRANSPORT.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <PageSection id="retail" title="Retail & Manufacturing" elevated>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RETAIL_MANUFACTURING.map((s) => <CaseStudyCard key={s.id} study={s} />)}
        </div>
      </PageSection>

      <CTASection
        eyebrow="Your sector. Our expertise."
        heading="AI that delivers results"
        headingAccent="in your industry."
        lead="Tell us your challenge — we'll connect you with the right engagement model and the team that has delivered outcomes in your sector."
      />
    </>
  );
}
