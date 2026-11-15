// Single source of truth for all profile content.
// Sourced from the CV (public/cv/Abdul-Aziz-Setiawan-CV.pdf), LinkedIn
// recommendations, and live screenshots of each product.

export const person = {
  name: "Abdul Aziz Setiawan",
  chineseName: "王毅成",
  shortName: "Aziz",
  initials: "AA",
  title: "Customer Experience · AI Application Developer",
  headline: "Customer Experience | AI Application Developer",
  location: "Kota Bogor, Jawa Barat, Indonesia",
  email: "hi@aziz.ai.id",
  linkedin: "https://www.linkedin.com/in/abdazizs",
  cvUrl: "/cv/Abdul-Aziz-Setiawan-CV.pdf",
  photoUrl: "/images/profile/aziz.png",
  siteUrl: "https://portoaziz.my.id",
  focus: "Customer experience specialist and tech enthusiast",
} as const;

export const summary = {
  lead: "Nine years of answering customers, from Commuter Line platforms to fintech help desks. Now I also build the tools that help a support team answer them faster.",
  body: "At Skor Technologies I handle card cases between the bank, Skorcard and Skorlife in a ticketing system, and I built the internal CS Tools Portal, which cut the team's manual case handling by 50% within 6 months.",
};

export type Image = { src: string; w: number; h: number };

export type Project = {
  id: string;
  name: string;
  /** Where it lives: built inside a team at work, or a product I run myself. */
  group: "skor" | "own";
  status: string;
  tagline: string;
  description: string;
  points?: string[];
  url?: string;
  urlLabel?: string;
  image: Image;
  /** More sections of the same live site, cycled after the main image. Same size as `image`. */
  gallery?: Image[];
  imageAlt: string;
  /** Shown under the screenshot when something in it was blurred. */
  imageNote?: string;
};

// The flagship case study, told in more depth than the other projects.
export const featuredCase = {
  name: "Skorcard CS Tools Portal",
  org: "Skor Technologies",
  status: "In daily use",
  url: "https://sc-cs-portal.skorcard.app",
  urlLabel: "sc-cs-portal.skorcard.app (sign-in required)",
  image: { src: "/images/ai-projects/skorcard-cs-portal-2026-11.jpg", w: 2400, h: 1226 },
  // SC Desk and SL Desk: the Skorcard and Skorlife ticketing desks inside the portal.
  // Requester names, emails and subjects are blurred.
  gallery: [
    { src: "/images/ai-projects/skorcard-cs-portal-sc-desk-2026-11.jpg", w: 2400, h: 1226 },
    { src: "/images/ai-projects/skorcard-cs-portal-sl-desk-2026-11.jpg", w: 2400, h: 1226 },
  ],
  imageNote: "SC Desk and SL Desk ticket queues: customer names, emails and subjects are blurred.",
  imageAlt:
    "CS Tools Portal: the dashboard, then the SC Desk and SL Desk ticketing queues for Skorcard and Skorlife",
  result: { value: "50%", label: "less manual case work within 6 months" },
  sections: [
    {
      heading: "The problem",
      text: "Agents worked Skorcard and Skorlife cases across two ticket desks, bank escalations, fee waivers, card delivery sheets and a monthly roster. Each lived in its own tab, so a single case meant a lot of copying and checking by hand.",
    },
    {
      heading: "What I built",
      text: "One portal for the whole shift: a live queue that refreshes every 20 seconds, the team schedule, BMI escalation workflows, request forms for fee waivers, early payoff and card closing, customer data trackers, and every team sheet linked in one place.",
    },
    {
      heading: "How it landed",
      text: "Manual case handling dropped by half within 6 months. The team later asked for chat and a chatbot console on the same sign-in, which became the next three tools below.",
    },
  ],
  quote: {
    text: "One of his most impressive contributions was developing an internal portal that significantly simplifies and streamlines the Customer Service team's daily operations.",
    name: "Nabila Sharafina",
    role: "Customer Service Supervisor, Skor Technologies",
  },
};

export const projects: Project[] = [
  {
    id: "skorcard-chatbot",
    name: "Skorcard Chatbot console",
    group: "skor",
    status: "Internal",
    tagline: "Agent and admin console for the Skorcard chatbot",
    description:
      "Agents pick up chats the bot can't finish, claim or reassign a session, and see the customer's card, billing and risk details beside the conversation. A ticket can be raised without leaving the chat.",
    url: "https://cs.skorcard.app",
    urlLabel: "cs.skorcard.app (sign-in required)",
    image: { src: "/images/ai-projects/skorcard-chatbot-2026-11.jpg", w: 2000, h: 997 },
    imageAlt: "Skorcard agent dashboard with a session queue, conversation and customer panel",
    imageNote: "Customer names, IDs and financial details are blurred.",
  },
  {
    id: "skorlife-chatbot",
    name: "Skorlife chatbot",
    group: "skor",
    status: "Internal",
    tagline: "AI chat with agent takeover for Skorlife",
    description:
      "The AI answers credit report questions first. When a customer needs a person, an agent takes over with the credit snapshot and active accounts already on screen, then hands the chat back or closes it.",
    image: { src: "/images/ai-projects/skorlife-chatbot-2026-11.jpg", w: 2000, h: 1023 },
    imageAlt: "Skorlife agent dashboard with AI-handled sessions and a credit snapshot panel",
    imageNote: "Customer names, IDs and financial details are blurred.",
  },
  {
    id: "skorchat",
    name: "Skor Chat",
    group: "skor",
    status: "Internal",
    tagline: "Team chat on the same sign-in",
    description:
      "Channels and direct messages for the Skorcard and Skorlife team, using the CS Portal account, so case talk stays next to the tools instead of in personal chat apps.",
    url: "https://sc-cs-portal.skorcard.app/skorchat",
    urlLabel: "sc-cs-portal.skorcard.app/skorchat (sign-in required)",
    image: { src: "/images/ai-projects/skorchat-2026-11.jpg", w: 2000, h: 1024 },
    imageAlt: "Skor Chat with channels and direct messages in the sidebar",
  },
  {
    id: "temankereta",
    name: "Teman Kereta",
    group: "own",
    status: "On Google Play",
    tagline: "A free, ad-free companion for KRL Jabodetabek commuters",
    description:
      "Built from five years on the Commuter Line. It sounds an alarm two stations before your stop, shows routes and fares, and tracks trains live from anonymous passenger GPS.",
    points: [
      "Schedules from official GTFS open data",
      "Forum for crowding reports",
      "Independent app, not an official KAI Commuter product",
    ],
    url: "https://play.google.com/store/apps/details?id=id.temankereta.teman_kereta",
    urlLabel: "Google Play",
    image: { src: "/images/ai-projects/temankereta-2026-11.jpg", w: 2000, h: 1250 },
    imageAlt: "Three Teman Kereta screens: home, active trip countdown and the station list",
  },
  {
    id: "patungan",
    name: "Patungan Yuk!",
    group: "own",
    status: "Live",
    tagline: "QRIS donations that show up live on TikTok LIVE and OBS",
    description:
      "Viewers pay by QRIS and the alert appears on the streamer's screen. Hosts get a dashboard, overlay widgets and a wallet with withdrawal requests. The platform takes a 1% fee.",
    url: "https://patungan.gifts",
    urlLabel: "patungan.gifts",
    image: { src: "/images/ai-projects/patungan-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/patungan-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/patungan-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "Patungan Yuk! landing page",
  },
  {
    id: "duacincin",
    name: "DuaCincin",
    group: "own",
    status: "Live",
    tagline: "Wedding vendor marketplace",
    description:
      "Couples compare verified vendors, chat and book in one place. Payment is held in escrow and released to the vendor after the event.",
    url: "https://duacincin.id",
    urlLabel: "duacincin.id",
    image: { src: "/images/ai-projects/duacincin-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/duacincin-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/duacincin-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "DuaCincin marketplace landing page",
  },
  {
    id: "duacincin-invitation",
    name: "DuaCincin Invitation",
    group: "own",
    status: "Live",
    tagline: "Cinematic digital wedding invitations",
    description:
      "12 themes, RSVP with guest count and dress code, live streaming, a digital guestbook, QR check-in and a photo booth.",
    url: "https://invitation.duacincin.id",
    urlLabel: "invitation.duacincin.id",
    image: { src: "/images/ai-projects/duacincin-invitation-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/duacincin-invitation-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/duacincin-invitation-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "DuaCincin Invitation landing page",
  },
  {
    id: "tongkrongan",
    name: "Tongkrongan.tech",
    group: "own",
    status: "Live",
    tagline: "Free subdomains for anyone",
    description:
      "Claim yourname.tongkrongan.tech and point it at Vercel, Cloudflare, a VPS or other hosting. No credit card, no DNS knowledge needed.",
    url: "https://tongkrongan.tech",
    urlLabel: "tongkrongan.tech",
    image: { src: "/images/ai-projects/tongkrongan-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/tongkrongan-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/tongkrongan-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "Tongkrongan.tech landing page",
  },
  {
    id: "flowworks",
    name: "FlowWorks",
    group: "own",
    status: "Live",
    tagline: "Survey-to-quotation workflow platform",
    description:
      "Takes a team from site survey to quotation with real-time KPI dashboards, role-based access and automated task workflows.",
    url: "https://flowworks.ptuip.my.id",
    urlLabel: "flowworks.ptuip.my.id",
    image: { src: "/images/ai-projects/flowworks-2026-11.jpg", w: 2000, h: 1250 },
    imageAlt: "FlowWorks sign-in page",
  },
  {
    id: "ruangbaru",
    name: "RuangBaru",
    group: "own",
    status: "Live",
    tagline: "Team workspace for small businesses",
    description:
      "Projects, tasks, calendar and notes in one board, so progress is visible without chasing updates in group chats.",
    url: "https://ruangbaru.my.id",
    urlLabel: "ruangbaru.my.id",
    image: { src: "/images/ai-projects/ruangbaru-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/ruangbaru-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/ruangbaru-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "RuangBaru landing page",
  },
  {
    id: "muter-my-id",
    name: "Muter.my.id",
    group: "own",
    status: "Live",
    tagline: "Link-in-bio for creators who sell",
    description:
      "Creators list products, recruit fellow affiliates and track every commission from one dashboard.",
    url: "https://muter.my.id",
    urlLabel: "muter.my.id",
    image: { src: "/images/ai-projects/muter-my-id-2026-11.jpg", w: 2000, h: 1250 },
    gallery: [
      { src: "/images/ai-projects/muter-my-id-2026-11-g1.jpg", w: 2000, h: 1250 },
      { src: "/images/ai-projects/muter-my-id-2026-11-g2.jpg", w: 2000, h: 1250 },
    ],
    imageAlt: "Muter.my.id landing page",
  },
];

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  place: string;
  period: string;
  bullets: string[];
  milestone?: string;
  logo?: string;
  images?: { src: string; alt: string }[];
};

// Newest first, as on the CV.
export const experience: ExperienceEntry[] = [
  {
    id: "skor-cx",
    role: "Customer Experience | AI Application Developer",
    company: "Skor Technologies",
    place: "Jakarta",
    period: "Jun 2026 – Present",
    logo: "/images/companies/skor-technologies.png",
    bullets: [
      "Resolve card-related customer complaints and coordinate cases between the bank, Skorcard and Skorlife",
      "Built the internal CS Tools Portal with AI-assisted development for the team's daily case handling; it cut manual work by 50% within 6 months",
      "Recommended on LinkedIn by the customer service supervisor for building the portal",
      "Added team chat on the same sign-in, and an agent and admin console for the customer-facing chatbot",
    ],
    images: [
      { src: "/images/experience/skor/team-selfie.jpg", alt: "With the Skor CS team" },
      { src: "/images/experience/skor/team-lunch.jpg", alt: "Team lunch at Skor" },
      { src: "/images/experience/skor/birthday-celebration.jpg", alt: "Celebrating a teammate's birthday" },
    ],
  },
  {
    id: "skor-csa",
    role: "Customer Service Agent",
    company: "Skor Technologies",
    place: "Jakarta",
    period: "Jan 2026 – Jun 2026",
    logo: "/images/companies/skor-technologies.png",
    bullets: [
      "Resolved card-related customer complaints and coordinated cases between the bank and Skorcard",
      "Handled cases from first contact to resolution in the ticketing system, within SLA targets",
      "Kept customers updated on case status and escalated to the bank or Skorcard when they had to act",
    ],
  },
  {
    id: "duacincin",
    role: "Co-Founder",
    company: "Duacincin.id (side venture)",
    place: "Indonesia",
    period: "Jun 2026 – Present",
    logo: "/images/companies/duacincin.png",
    bullets: [
      "Co-launched DuaCincin, a wedding marketplace and invitation platform, plus a digital photobooth service",
      "Co-run operations, marketing and client support next to a full-time job",
    ],
  },
  {
    id: "angkasa-pura",
    role: "Guest Service Officer",
    company: "PT Angkasa Pura Supports",
    place: "District 8, Jakarta",
    period: "Jan 2025 – Nov 2025",
    logo: "/images/companies/angkasa-pura.png",
    bullets: [
      "Handled resident and guest inquiries, access requests and complaints through to resolution",
      "Made announcements and safety reminders",
      "Helped roll out a new building operations system",
    ],
    images: [
      { src: "/images/experience/angkasa-pura/reception.jpg", alt: "At the District 8 reception desk" },
      { src: "/images/experience/angkasa-pura/lobby-guest.jpg", alt: "Assisting a guest in the lobby" },
    ],
  },
  {
    id: "kawisata",
    role: "Customer Service On Train",
    company: "PT Kereta Api Pariwisata (KAWISATA)",
    place: "Jakarta",
    period: "Aug 2022 – Dec 2024",
    logo: "/images/companies/kai-wisata.png",
    bullets: [
      "Ran pre-trip equipment and safety checks and onboard announcements, and coordinated with the driver on every trip",
      "Coordinated content for the CSOT Instagram account and linked the creative team with KAI Commuter's Corporate Culture Team",
      "The account gained 5,041 followers in 2 years and reached 115,050 accounts in 90 days (data as of 5 Dec 2024)",
    ],
    milestone:
      "Selected as onboard Service Officer for the President and the Minister of Transportation at the Manggarai Station inauguration, 27 Dec 2022.",
    images: [
      { src: "/images/experience/kawisata/presidential-service.jpg", alt: "Presidential service at the Manggarai inauguration" },
      { src: "/images/experience/kawisata/platform-group.jpg", alt: "CSOT officers on the platform" },
      { src: "/images/experience/kawisata/onboard-portrait.jpg", alt: "On board a Commuter Line train" },
    ],
  },
  {
    id: "kci-announcer",
    role: "Announcer on Station",
    company: "PT Kereta Commuter Indonesia",
    place: "Jakarta",
    period: "Jun 2019 – Jul 2022",
    logo: "/images/companies/kai-commuter.png",
    bullets: [
      "Announced arrivals, departures and schedule changes, and helped passengers directly, including lost and found cases",
      "Operated the Tracking Announcer Application (ATA), which feeds the station information boards and the C-Access app",
    ],
    images: [
      { src: "/images/experience/kci-announcer/lost-and-found.jpg", alt: "Helping a passenger with a lost and found case" },
    ],
  },
  {
    id: "kci-helpdesk",
    role: "Helpdesk, Command Control Room",
    company: "PT Kereta Commuter Indonesia",
    place: "Jakarta",
    period: "Jan 2019 – May 2019",
    logo: "/images/companies/kai-commuter.png",
    bullets: [
      "Routed customer reports to the responsible teams, monitored passenger flow across stations, and handled complaints on Twitter",
    ],
  },
];

export const earlierRoles = {
  period: "2017 – 2018",
  roles: [
    {
      role: "Sales Assistant",
      company: "PT MAP Aktif Adiperkasa",
      note: "Exceeded monthly sales targets and lifted customer satisfaction by 15%",
    },
    {
      role: "Marketing Staff",
      company: "PT Orgaren Indonesia Jaya",
      note: "Landed an international client and represented the company at a Ministry of Industry expo",
    },
    {
      role: "Administration",
      company: "Diva Karaoke",
      note: "Bookkeeping and weekly payroll",
    },
    {
      role: "Sales Promotion intern",
      company: "PT Ramayana Lestari Sentosa",
      note: "Floor sales and event promotions",
    },
  ],
};

export const highlights = [
  { value: "50%", label: "less manual case work after the CS Tools Portal" },
  { value: "9 yrs", label: "customer-facing, in retail, transport, hospitality and fintech" },
  { value: String(projects.length + 1), label: "tools and products built with AI-assisted development" },
  { value: "2022", label: "onboard service officer for the President at Manggarai" },
];

export const skillGroups = [
  {
    name: "CRM and customer operations",
    items: [
      "Customer relations",
      "Complaint handling",
      "Case resolution",
      "Ticketing systems",
      "SLA compliance",
      "Fintech customer support",
      "Bank-to-issuer case coordination",
    ],
  },
  {
    name: "Systems and process",
    items: [
      "Process improvement",
      "Workflow automation",
      "Internal tool design",
      "KPI dashboards",
      "Role-based access",
      "AI-assisted development",
      "AI prompting",
    ],
  },
  {
    name: "Communication",
    items: [
      "Announcing and public speaking",
      "Persuasive communication",
      "Team leadership",
      "Social media administration",
    ],
  },
];

export const tools: { name: string; logo?: string }[] = [
  { name: "Microsoft Excel", logo: "/images/tools/excel.png" },
  { name: "Microsoft Word", logo: "/images/tools/word.png" },
  { name: "Microsoft Outlook", logo: "/images/tools/outlook.png" },
  { name: "Google Workspace" },
  { name: "VS Code", logo: "/images/tools/vscode.png" },
  { name: "Claude", logo: "/images/tools/claude.png" },
  { name: "Antigravity", logo: "/images/tools/antigravity.png" },
  { name: "Canva", logo: "/images/tools/canva.png" },
  { name: "Adobe Photoshop", logo: "/images/tools/photoshop.png" },
  { name: "Adobe Lightroom", logo: "/images/tools/lightroom.png" },
  { name: "CapCut", logo: "/images/tools/capcut.png" },
];

export const education = {
  school: "SMK Negeri 23 Jakarta",
  logo: "/images/education/smkn23-logo.png",
  degree: "Vocational High School, Marketing Management",
  period: "2015 – 2018",
  note: "Vice President of the Student Council (2016–2017); replaced manual chairman elections with an online voting system.",
};

export type Certification = { title: string; url?: string };

export const certifications: Certification[] = [
  {
    title: "TOEIC",
    url: "https://drive.google.com/file/d/172d-akQdKGDNRT0r3GIw9LdXilPW_rrS/view",
  },
  {
    title: "Marketing Competency Certificate",
    url: "https://drive.google.com/file/d/16zsOM42e_n2xlSpjrkL3FQ9ExcCcWzEP/view",
  },
  {
    title: "Persuasive Communication in Complaint Handling",
    url: "https://drive.google.com/file/d/15AoutYNKMrmxZ7bSVviySpC35KuBztwd/view",
  },
  {
    title: "Basic Service Excellence & Voice Treatment",
    url: "https://drive.google.com/file/d/15D6HX3U6PrDAXNL4Vuu-GHLHDWq2i9LH/view",
  },
  {
    title: "Work Motivation Program: Building a Successful Service Team",
    url: "https://drive.google.com/file/d/15FBaoAut7NXbmiDWy6CLVlu4iIZLU5B9/view",
  },
  {
    title: "Team Building: Developing AKHLAK for Frontline Service Excellence",
    url: "https://drive.google.com/file/d/15G0hbgh53A9u_tGpxoG9yTGzayEUL2Ih/view",
  },
];

export const languages = [
  { name: "Bahasa Indonesia", level: "Professional working" },
  { name: "English", level: "TOEIC certified" },
];

export type Recommendation = {
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
  photo: string;
};

// LinkedIn recommendations on linkedin.com/in/abdazizs.
export const recommendations: Recommendation[] = [
  {
    name: "Nabila Sharafina",
    title: "Customer Service Supervisor, Skor Technologies",
    relationship: "Aziz's mentor at Skor Technologies",
    date: "1 July 2026",
    quote:
      "Aziz is one of the best Customer Service team members at Skor. Beyond his excellent customer support skills, he has an exceptional aptitude for technology and problem-solving. One of his most impressive contributions was developing an internal portal that significantly simplifies and streamlines the Customer Service team's daily operations.",
    photo: "/images/recommendations/nabila-sharafina.jpg",
  },
  {
    name: "Riyan Riyadi",
    title: "Training & Service Quality Strategist",
    relationship: "Senior colleague",
    date: "3 July 2026",
    quote:
      "Aziz has a strong willingness to learn and continuously improve. He quickly adapts to new processes, actively seeks feedback, and is always looking for ways to enhance both his own performance and the team's effectiveness. Beyond his technical capabilities, Aziz is a reliable, proactive, and collaborative team player.",
    photo: "/images/recommendations/riyan-riyadi.jpg",
  },
  {
    name: "Abdul Azis",
    title: "Public Relations | Customer Service | Human Resources",
    relationship: "Worked together at PT KAI Wisata",
    date: "17 December 2024",
    quote:
      "During his time at PT KAI Wisata, Abdul Aziz Setiawan consistently demonstrated exceptional skills in customer service and operational management. His dedication to providing top-notch service and his ability to handle complex situations with ease made him an invaluable asset to the team.",
    photo: "/images/recommendations/abdul-azis.jpg",
  },
];

// CSOT Creative Team work, from the Portfolio deck.

export const socialMediaWork = {
  handle: "@csot.kaicommuter",
  url: "https://www.instagram.com/csot.kaicommuter",
  description:
    "I coordinated content for the official Customer Service On Train account and linked our creative team with KAI Commuter's Corporate Culture Team.",
  metrics: [
    { value: "5,041", label: "followers gained in 2 years" },
    { value: "115,050", label: "accounts reached in 90 days" },
  ],
  asOf: "Data as of 5 Dec 2024",
};

export const kmtCard = {
  title: "Multi-Trip Card (KMT) design competition",
  description:
    "Entry for KAI Commuter's 15th anniversary. The mosaic pattern and #PilihanCerdas message pitch the Commuter Line as a clean, always-adapting choice for city life.",
  frontTexture: "/images/graphic-design/kmt-card-front-flat.jpg",
  backTexture: "/images/graphic-design/kmt-card-back.png",
};

export const graphicDesignWork = [
  {
    title: "CSOT official logo",
    description: "Customer Service On Train, KAI Commuter",
    image: "/images/graphic-design/csot-logo.png",
  },
  {
    title: "ABSES jersey logo",
    description: "CSOT sports team",
    image: "/images/graphic-design/abses-logo.jpg",
  },
  {
    title: "PPK community logo",
    description: "Forum Pengguna dan Pecinta KA",
    image: "/images/graphic-design/ppk-logo.jpg",
  },
];

export const socialDesignPosts: { image: string; caption: string }[] = [
  { image: "/images/design-posts/design-post-01.jpg", caption: "C-Access app launch" },
  { image: "/images/design-posts/design-post-02.jpg", caption: "KRL Access real-time tracking" },
  { image: "/images/design-posts/design-post-03.jpg", caption: "Independence Day, 17 Agustus 2024" },
  { image: "/images/design-posts/design-post-04.jpg", caption: "KAI Commuter's 16th anniversary" },
  { image: "/images/design-posts/design-post-05.jpg", caption: "CSOT open recruitment" },
  { image: "/images/design-posts/design-post-06.jpg", caption: "GAPEKA 2023 schedule change" },
  { image: "/images/design-posts/design-post-07.jpg", caption: "Station cleanliness campaign" },
  { image: "/images/design-posts/design-post-08.jpg", caption: "\"Maaf\" short film poster" },
];

export const photographyWork: { image: string; caption: string }[] = [
  { image: "/images/photography/train-01.jpg", caption: "Commuter Line at the platform" },
  { image: "/images/photography/train-02.jpg", caption: "Commuter Line on the open line" },
  { image: "/images/photography/cabin-crew.jpg", caption: "In the driver's cabin, on duty" },
  { image: "/images/photography/officers-lineup.jpg", caption: "CSOT officers lineup" },
];

export const photographyNote = "Shot on a Canon 1200D with tele and prime lenses.";

export const shortMovie = {
  title: "Maaf",
  subtitle: "CSOT short film by Gilang & Aziz",
  description:
    "A light-hearted short about an ordinary day as a Customer Service On Train officer.",
  poster: "/images/short-movie/maaf-poster.jpg",
  link: "https://www.instagram.com/tv/CrQiRetJAWB/?igsh=a2Mxc3lxdnh2YnVq",
  credits: [
    { role: "Director & editor", name: "Gilang Anggi Pradana" },
    { role: "Lead actor", name: "Albi Wagia Yusup" },
    { role: "Supporting actor & audio", name: "Abdul Aziz Setiawan" },
  ],
};

export type GalleryItem = { image: Image; caption: string; org: string };

export const gallery: GalleryItem[] = [
  { image: { src: "/images/gallery/photo-01.jpg", w: 1400, h: 1860 }, caption: "Serving Shin Tae-yong at District 8 Jakarta", org: "Angkasa Pura Supports" },
  { image: { src: "/images/gallery/photo-03.jpg", w: 1400, h: 933 }, caption: "Recording session with C-Choir", org: "KAI Commuter & KAI Wisata" },
  { image: { src: "/images/gallery/photo-05.jpg", w: 1400, h: 2100 }, caption: "Train services duty", org: "KAI Commuter & KAI Wisata" },
  { image: { src: "/images/experience/kawisata/team-photo.jpg", w: 1600, h: 775 }, caption: "CSOT team photo", org: "KAI Commuter & KAI Wisata" },
  { image: { src: "/images/gallery/photo-02.jpg", w: 1400, h: 2489 }, caption: "Service desk at District 8 Jakarta", org: "Angkasa Pura Supports" },
  { image: { src: "/images/experience/kawisata/night-briefing.jpg", w: 1600, h: 776 }, caption: "Night briefing with station security", org: "KAI Commuter & KAI Wisata" },
  { image: { src: "/images/gallery/orgaren-trade-expo.jpg", w: 1400, h: 1051 }, caption: "Ministry of Industry trade expo", org: "PT Orgaren Indonesia Jaya" },
  { image: { src: "/images/gallery/orgaren-indian-client.jpg", w: 1400, h: 1864 }, caption: "Meeting an Indian client to supply aren sugar", org: "PT Orgaren Indonesia Jaya" },
  { image: { src: "/images/experience/kawisata/depot-portrait.jpg", w: 1600, h: 755 }, caption: "Between trains at the depot", org: "KAI Commuter & KAI Wisata" },
];

export type Service = {
  id: string;
  title: string;
  /** Giant hollow word at the foot of the panel. */
  word: string;
  description: string;
  chips: string[];
  /** Which dot animation draws on the panel. */
  art: "ripple" | "wave" | "orbit" | "phone" | "bars" | "spiral";
  /** Route-line colour for the panel's dots, chips and stop marker. */
  tone: "navy" | "steel" | "green";
};

// "What I do": the parts of customer service I own, from first contact to the tool behind it.
export const services: Service[] = [
  {
    id: "cx",
    title: "Customer experience",
    word: "SERVICE",
    description:
      "Card cases between the bank, Skorcard and Skorlife, handled from first contact to resolution inside SLA. Nine years of it, from station platforms to fintech help desks.",
    chips: ["Ticketing", "SLA", "Complaint handling"],
    art: "ripple",
    tone: "navy",
  },
  {
    id: "tools",
    title: "Internal tools",
    word: "TOOLS",
    description:
      "Portals that put a support shift's queue, schedule, request forms and sheets on one screen. The CS Tools Portal halved manual case work within 6 months.",
    chips: ["AI-assisted development", "Workflow automation", "KPI dashboards"],
    art: "wave",
    tone: "steel",
  },
  {
    id: "chat",
    title: "Chatbots and agent consoles",
    word: "CHAT",
    description:
      "The AI answers first. When a customer needs a person, an agent takes over with the card, billing and credit details already beside the conversation.",
    chips: ["AI prompting", "Agent takeover", "Role-based access"],
    art: "orbit",
    tone: "green",
  },
  {
    id: "products",
    title: "Products I run",
    word: "LAUNCH",
    description:
      "Teman Kereta for KRL commuters, Patungan Yuk! for live-stream donations, DuaCincin for weddings. Each one started from a problem I saw up close.",
    chips: ["Mobile apps", "Web platforms", "QRIS payments"],
    art: "phone",
    tone: "navy",
  },
  {
    id: "voice",
    title: "Announcing and speaking",
    word: "VOICE",
    description:
      "Three years on station microphones and onboard trains, including service for the President at the Manggarai Station inauguration in 2022.",
    chips: ["Public speaking", "Announcements", "Persuasive communication"],
    art: "bars",
    tone: "steel",
  },
  {
    id: "creative",
    title: "Design and content",
    word: "CREATE",
    description:
      "Content for the CSOT Instagram account (115,050 accounts reached in 90 days), team logos, a KMT card design entry and a short film.",
    chips: ["Canva", "Photoshop", "CapCut"],
    art: "spiral",
    tone: "green",
  },
];
