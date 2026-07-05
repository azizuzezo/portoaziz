// Single source of truth for all real profile content.
// Sourced from the user's LinkedIn "Save to PDF" export (public/Profile.pdf).

export const person = {
  name: "Abdul Aziz Setiawan",
  initials: "AA",
  headline:
    "Customer Service Agent as Supported Team | Good in Communication, Administration and Time Management",
  location: "Kota Bogor, Jawa Barat, Indonesia",
  email: "work.aziz@outlook.com",
  linkedin: "https://www.linkedin.com/in/abdazizs",
  cvUrl: "/Profile.pdf",
  hasPhoto: true,
  photoUrl: "/images/profile/aziz.png",
} as const;

export const roleRotator = [
  "Customer Experience Specialist",
  "Customer Service Professional",
  "Guest Service Expert",
  "Fintech Support Specialist",
  "Problem Solver",
] as const;

export const about = {
  paragraphs: [
    "I am a graduate of SMK Negeri 23 Jakarta and currently serve as a Customer Service Agent at Skor Technologies. Previously, I worked as a Guest Service Officer at PT Angkasa Pura Supports and as a Customer Service on Train at PT Kereta Api Pariwisata (KAWISATA).",
    "One of the highlights of my career was in 2022, when I was honored as the Best Service Officer and entrusted with serving the 7th President of the Republic of Indonesia, Mr. Ir. Joko Widodo, and the Minister of Transportation, Mr. Budi Karya Sumadi, during a special train service.",
    "Throughout my education and career journey, I have always been eager to learn new things. I have gained experience in various roles, including Sales Promotion, Sales Assistant, Helpdesk, Customer Service, Social Media Administrator, and Announcer. These experiences have shaped my ability to adapt quickly, communicate effectively, and develop excellent time management skills.",
  ],
  arc: [
    {
      industry: "Transportation",
      years: "2019 – 2024",
      description:
        "5+ years keeping Jakarta's Commuter Line moving — announcements, onboard safety, and a presidential service assignment.",
    },
    {
      industry: "Hospitality",
      years: "2025",
      description:
        "Guest Service Officer role translating railway-grade service discipline into warm, resident-first hospitality.",
    },
    {
      industry: "Fintech",
      years: "2026 – Present",
      description:
        "Customer Service Agent at Skor Technologies, resolving card issues and building internal tools that cut resolution time in half.",
    },
  ],
} as const;

export type Industry =
  | "retail"
  | "administration"
  | "transportation"
  | "hospitality"
  | "fintech"
  | "venture";

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  industry: Industry;
  /** One-line summary, always visible without expanding. */
  summary: string;
  bullets: string[];
  milestone?: string;
  /** Optional photo gallery, e.g. ["/images/experience/skor/team-1.jpg"] */
  images?: string[];
};

// Chronological (oldest -> newest) to read as a growth story.
export const experience: ExperienceEntry[] = [
  {
    id: "ramayana",
    company: "PT Ramayana Lestari Sentosa, Tbk",
    role: "Sales Promotion Boy",
    period: "Januari 2017 – April 2017",
    duration: "4 bulan",
    location: "North Jakarta, Indonesia",
    industry: "retail",
    summary: "Sold products on the floor and ran live event promotions.",
    bullets: [
      "Sold products directly to customers on the floor",
      "Ran live promotions during special events",
      "Prepared monthly sales reports",
    ],
  },
  {
    id: "map-aktif",
    company: "PT MAP Aktif Adiperkasa, Indonesia",
    role: "Sales Assistant",
    period: "Mei 2018 – Agustus 2018",
    duration: "4 bulan",
    location: "Area DKI Jakarta",
    industry: "retail",
    summary: "Beat sales targets by 100%+ and lifted customer satisfaction by 15%.",
    bullets: [
      "Exceeded monthly sales target by over 100%",
      "Ran daily stock checks for availability",
      "Lifted customer satisfaction by 15%",
    ],
  },
  {
    id: "orgaren",
    company: "PT Orgaren Indonesia Jaya",
    role: "Marketing Staff",
    period: "September 2018 – Desember 2018",
    duration: "4 bulan",
    location: "Jakarta, Indonesia",
    industry: "administration",
    summary: "Sold palm sugar to retailers and repped the company at trade expos.",
    bullets: [
      "Sold palm sugar to shops, cafes, and retailers",
      "Landed an international client for the product",
      "Represented the company at a Ministry of Industry expo",
    ],
    images: [
      "/images/experience/orgaren/indian-client.jpg",
      "/images/experience/orgaren/trade-expo.jpg",
    ],
  },
  {
    id: "diva-karaoke",
    company: "Diva Karaoke",
    role: "Administration",
    period: "September 2018 – Desember 2018",
    duration: "4 bulan",
    location: "Jakarta, Indonesia",
    industry: "administration",
    summary: "Ran daily bookkeeping and payroll for the venue.",
    bullets: [
      "Handled daily bookkeeping and income recaps",
      "Processed weekly staff payroll",
      "Tracked incoming and outgoing cash flow",
    ],
  },
  {
    id: "kci-helpdesk",
    company: "PT Kereta Commuter Indonesia",
    role: "Helpdesk Command Control Room",
    period: "Januari 2019 – Mei 2019",
    duration: "5 bulan",
    location: "Area DKI Jakarta",
    industry: "transportation",
    summary: "Bridged customer reports to the right teams across the network.",
    bullets: [
      "Routed customer reports to the right team",
      "Monitored passenger flow at every station",
      "Handled complaints on social media (Twitter)",
    ],
  },
  {
    id: "kci-announcer",
    company: "PT Kereta Commuter Indonesia",
    role: "Announcer",
    period: "Juni 2019 – Juli 2022",
    duration: "3 tahun 2 bulan",
    location: "Area DKI Jakarta",
    industry: "transportation",
    summary: "Announced train updates and kept the passenger-info system running, 3+ years.",
    bullets: [
      "Announced arrivals, departures, and schedule changes",
      "Operated the train-tracking system (ATA)",
      "Helped passengers directly, including lost & found",
    ],
    images: [
      "/images/experience/kci-announcer/studio-booth.jpg",
      "/images/experience/kci-announcer/lost-and-found.jpg",
    ],
  },
  {
    id: "kawisata",
    company: "PT Kereta Api Pariwisata (KAWISATA)",
    role: "Customer Service On Train",
    period: "Agustus 2022 – Desember 2024",
    duration: "2 tahun 5 bulan",
    location: "Area DKI Jakarta",
    industry: "transportation",
    summary: "Delivered onboard service and safety on the KRL — including a presidential assignment.",
    bullets: [
      "Ran onboard safety checks and announcements",
      "Coordinated with the train driver every trip",
      "Led the CSOT Creative Team's social & design output",
    ],
    milestone:
      "27 Dec 2022 — Onboard Service Officer for President Joko Widodo & Minister Budi Karya Sumadi, Manggarai Station inauguration.",
    images: [
      "/images/experience/kawisata/presidential-service.jpg",
      "/images/experience/kawisata/platform-group.jpg",
      "/images/experience/kawisata/team-photo.jpg",
      "/images/experience/kawisata/onboard-portrait.jpg",
      "/images/experience/kawisata/night-briefing.jpg",
      "/images/experience/kawisata/depot-portrait.jpg",
    ],
  },
  {
    id: "angkasa-pura",
    company: "Angkasa Pura Supports",
    role: "Guest Service Officer",
    period: "Januari 2025 – November 2025",
    duration: "11 bulan",
    location: "Jakarta Raya, Indonesia",
    industry: "hospitality",
    summary: "Greeted residents and guests, and helped roll out a smoother ops system.",
    bullets: [
      "Greeted and assisted residents & guests daily",
      "Handled complaints and resolved issues",
      "Helped roll out a new building operations system",
    ],
    images: [
      "/images/experience/angkasa-pura/reception.jpg",
      "/images/experience/angkasa-pura/lobby-guest.jpg",
    ],
  },
  {
    id: "skor",
    company: "Skor Technologies",
    role: "Customer Service Agent and Support",
    period: "Januari 2026 – Present",
    duration: "7 bulan",
    location: "Jakarta Raya, Indonesia",
    industry: "fintech",
    summary: "Resolves card cases and built internal tools that cut manual work in half.",
    bullets: [
      "Resolves card-related complaints for customers",
      "Liaises between the bank and Skorcard on cases",
      "Built the internal CS Tools Portal (see AI Projects)",
    ],
    milestone:
      "Built internal CS tooling within 6 months that cut manual case-handling work by 50%.",
    images: [
      "/images/experience/skor/team-lunch.jpg",
      "/images/experience/skor/birthday-celebration.jpg",
      "/images/experience/skor/team-selfie.jpg",
    ],
  },
  {
    id: "duacincin",
    company: "Duacincin.id",
    role: "Founder",
    period: "Juni 2026 – Present",
    duration: "2 bulan",
    location: "Indonesia",
    industry: "venture",
    summary: "Built a digital wedding invitation & photobooth business from the ground up.",
    bullets: [
      "Founded a digital wedding invitation platform",
      "Added digital photobooth offerings for events",
      "Runs ops, marketing, and client support solo",
    ],
  },
];

export const education = {
  school: "SMK Negeri 23 Jakarta",
  degree: "Vocational High School, Manajemen Pemasaran (Marketing Management)",
  period: "2015 – 2018",
  bullets: [
    "Curriculum covered digital marketing strategies, business communication, market analysis, and brand management — building a strong foundation in marketing studies.",
    "Served as Vice President of the Intra-School Student Council (OSIS) for one term and initiated an internet-based election system for the next leadership selection.",
    "Contributed to the School Theater Event as part of the music accompaniment team, well received by the public.",
  ],
};

export const organizationalExperience: {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Creative Team Coordinator",
    org: "Creative Team of Customer Service On Train — PT Kereta Api Pariwisata (KAWISATA)",
    period: "August 2022 – Present",
    bullets: [
      "Coordinated content for publication on the Customer Service On Train (CSOT) account.",
      "Acted as a bridge between the CSOT Creative Team and the Corporate Culture Team of KAI Commuter.",
    ],
  },
  {
    role: "Wakil Ketua (Vice Chairman)",
    org: "Intra-School Student Organization (OSIS) — SMK Negeri 23 Jakarta",
    period: "June 2016 – June 2017",
    bullets: [
      "Assisted in coordinating the planning of the 2016 Art Performance event.",
      "Implemented a digital voting system for the Chairman election, replacing the traditional manual process.",
      "Helped organize and manage events such as Class Meet, which was successfully executed as planned.",
    ],
  },
];

export const tools: string[] = [
  "Canva",
  "Adobe Photoshop",
  "Adobe Lightroom",
  "CapCut",
  "Microsoft Word",
  "Microsoft Excel",
  "Microsoft Outlook",
];

export type Certification = { title: string; url?: string };

export const certifications: Certification[] = [
  {
    title: "TOEIC",
    url: "https://drive.google.com/file/d/172d-akQdKGDNRT0r3GIw9LdXilPW_rrS/view",
  },
  {
    title: "Certificate of Competency in Marketing Skills",
    url: "https://drive.google.com/file/d/16zsOM42e_n2xlSpjrkL3FQ9ExcCcWzEP/view",
  },
  {
    title: "Fundamentals of Service: Using Persuasive Communication in Handling Complaints",
    url: "https://drive.google.com/file/d/15AoutYNKMrmxZ7bSVviySpC35KuBztwd/view",
  },
  {
    title: "Work Motivation Program: Building a Successful Service Team",
    url: "https://drive.google.com/file/d/15FBaoAut7NXbmiDWy6CLVlu4iIZLU5B9/view",
  },
  {
    title: "Basic Service Excellence & Basic Voice Treatment",
    url: "https://drive.google.com/file/d/15D6HX3U6PrDAXNL4Vuu-GHLHDWq2i9LH/view",
  },
  {
    title: "Team Building: Developing AKHLAK for Frontline Service Excellence",
    url: "https://drive.google.com/file/d/15G0hbgh53A9u_tGpxoG9yTGzayEUL2Ih/view",
  },
];

export const languages = [
  { name: "Bahasa Indonesia", level: "Professional Working" },
  { name: "English", level: "Limited Working" },
];

export type SkillCategory =
  | "Customer Experience"
  | "Communication"
  | "Fintech Support"
  | "Hospitality"
  | "Creative & Design"
  | "Leadership & Teamwork"
  | "Digital & AI";

export const skills: { name: string; category: SkillCategory }[] = [
  { name: "Customer Service", category: "Customer Experience" },
  { name: "Complaint Handling", category: "Customer Experience" },
  { name: "CRM", category: "Customer Experience" },
  { name: "Time Management", category: "Customer Experience" },
  { name: "Multitasking", category: "Customer Experience" },
  { name: "Customer Relations", category: "Customer Experience" },
  { name: "Customer Engagement", category: "Customer Experience" },
  { name: "Public Communication", category: "Communication" },
  { name: "Persuasive Communication", category: "Communication" },
  { name: "Public Relations", category: "Communication" },
  { name: "Public Speaking", category: "Communication" },
  { name: "Marketing Communication", category: "Communication" },
  { name: "Announcing", category: "Communication" },
  { name: "Vocal Performance", category: "Communication" },
  { name: "Leadership", category: "Leadership & Teamwork" },
  { name: "Team Building", category: "Leadership & Teamwork" },
  { name: "Team Management", category: "Leadership & Teamwork" },
  { name: "Teamwork", category: "Leadership & Teamwork" },
  { name: "Fintech Customer Support", category: "Fintech Support" },
  { name: "Ticketing Systems", category: "Fintech Support" },
  { name: "Process Improvement", category: "Fintech Support" },
  { name: "SLA Compliance", category: "Fintech Support" },
  { name: "Hospitality Excellence", category: "Hospitality" },
  { name: "Guest Relations", category: "Hospitality" },
  { name: "Public Service", category: "Hospitality" },
  { name: "Photography", category: "Creative & Design" },
  { name: "Photo Editing", category: "Creative & Design" },
  { name: "Video Editing", category: "Creative & Design" },
  { name: "Graphic Design", category: "Creative & Design" },
  { name: "AI Prompting", category: "Digital & AI" },
  { name: "Start-up Ventures", category: "Digital & AI" },
  { name: "Digital Operations", category: "Digital & AI" },
  { name: "Social Media Administration", category: "Digital & AI" },
  { name: "Microsoft Office", category: "Digital & AI" },
  { name: "Basic Computer Literacy", category: "Digital & AI" },
  { name: "Google Workspace", category: "Digital & AI" },
];

export const achievements = [
  {
    title: "Presidential Service Honor",
    description:
      "Entrusted as Onboard Service Officer for the 7th President of Indonesia, Joko Widodo, and Minister of Transportation Budi Karya Sumadi during the Manggarai Station inauguration — 27 December 2022, Tanah Abang → Manggarai route.",
    stat: "1 of 1",
  },
  {
    title: "Cross-Industry Experience",
    description:
      "Built a career spanning retail, transportation, hospitality, and fintech — adapting fast in every environment.",
    stat: "4",
    statLabel: "industries",
  },
  {
    title: "Public Transportation Service",
    description:
      "Nearly 6 years across roles on Jakarta's Commuter Line — helpdesk, announcer, and onboard customer service.",
    stat: "5.7",
    statLabel: "years",
  },
  {
    title: "Sales Performance",
    description:
      "Exceeded monthly sales targets by over 100% and lifted customer satisfaction by 15% at PT MAP Aktif Adiperkasa.",
    stat: "+15%",
    statLabel: "CSAT",
  },
  {
    title: "Process Improvement",
    description:
      "Developed internal CS tooling at Skor Technologies that cut manual case-handling work in half within 6 months.",
    stat: "50%",
    statLabel: "faster",
  },
  {
    title: "Founder Mindset",
    description:
      "Launched and operates Duacincin.id, a digital wedding invitation and photobooth service, alongside a full-time role.",
    stat: "2026",
    statLabel: "founded",
  },
];

export const stats = [
  { value: 9, suffix: "+", label: "Years of Experience" },
  { value: 4, suffix: "", label: "Industries" },
  { value: 10, suffix: "", label: "Roles Held" },
  { value: 1, suffix: "", label: "Presidential Assignment" },
] as const;

// CSOT Creative Team work — content sourced from the Portfolio deck (Portfolio.pdf).

export const socialMediaWork = {
  handle: "@csot.kaicommuter",
  url: "https://www.instagram.com/csot.kaicommuter",
  followers: "5,265+",
  description:
    "As part of the CSOT Creative Team, developed and managed the official Customer Service On Train Instagram account — planning content, growing the following, and tracking reach across posts, reels, and stories.",
  metrics: [
    { value: "5.041", label: "Followers gained in 2 years" },
    { value: "115.050", label: "Accounts reached (last 90 days)" },
  ],
};

export type GraphicDesignItem = {
  title: string;
  description: string;
  image: string;
  tag: string;
};

export const graphicDesignWork: GraphicDesignItem[] = [
  {
    title: "Multi-Trip Card (KMT) Design Competition",
    description:
      "Designed for the 15th Anniversary of KAI Commuter. The mosaic pattern and #PilihanCerdas messaging position CommuterLine as a pollution-free, ever-adapting choice for urban life.",
    image: "/images/graphic-design/kmt-card-design.jpg",
    tag: "Design Competition",
  },
  {
    title: "CSOT Official Logo",
    description: "Official logo of Customer Service On Train (CSOT), KAI Commuter.",
    image: "/images/graphic-design/csot-logo.png",
    tag: "Brand Identity",
  },
  {
    title: "ABSES Jersey Logo",
    description: "Official jersey logo for the Customer Service On Train sports team.",
    image: "/images/graphic-design/abses-logo.jpg",
    tag: "Brand Identity",
  },
  {
    title: "PPK Community Logo",
    description:
      "Official logo of Forum Pengguna dan Pecinta KA (PPK) — a community for public transport enthusiasts.",
    image: "/images/graphic-design/ppk-logo.jpg",
    tag: "Brand Identity",
  },
];

export const socialDesignPosts: { image: string; caption: string }[] = [
  {
    image: "/images/design-posts/design-post-01.jpg",
    caption: "C-Access app launch — \"Satu genggaman, bisa untuk semua\"",
  },
  {
    image: "/images/design-posts/design-post-02.jpg",
    caption: "KRL Access — real-time schedule and train position tracking",
  },
  {
    image: "/images/design-posts/design-post-03.jpg",
    caption: "Indonesia Independence Day greeting, 17 Agustus 2024",
  },
  {
    image: "/images/design-posts/design-post-04.jpg",
    caption: "KAI Commuter's 16th anniversary greeting",
  },
  {
    image: "/images/design-posts/design-post-05.jpg",
    caption: "CSOT open recruitment announcement",
  },
  {
    image: "/images/design-posts/design-post-06.jpg",
    caption: "GAPEKA 2023 train schedule change notice",
  },
  {
    image: "/images/design-posts/design-post-07.jpg",
    caption: "Station cleanliness campaign",
  },
  {
    image: "/images/design-posts/design-post-08.jpg",
    caption: "\"Maaf\" short film promotional poster",
  },
];

export const photographyWork: { image: string; caption: string }[] = [
  { image: "/images/photography/train-01.jpg", caption: "KRL Commuter Line at the platform" },
  { image: "/images/photography/train-02.jpg", caption: "KRL Commuter Line on the open line" },
  { image: "/images/photography/cabin-crew.jpg", caption: "Inside the driver's cabin, on duty" },
  { image: "/images/photography/officers-lineup.jpg", caption: "CSOT officers lineup" },
];

export const photographyNote = "Shot on a Canon 1200D with tele and fix lenses.";

export type GalleryItem = { image: string; caption: string; org: string };

export const gallery: GalleryItem[] = [
  {
    image: "/images/gallery/photo-01.jpg",
    caption: "Serving Shin Tae-yong at District 8 Jakarta",
    org: "Angkasa Pura Supports",
  },
  {
    image: "/images/gallery/photo-02.jpg",
    caption: "Service desk at District 8 Jakarta",
    org: "Angkasa Pura Supports",
  },
  {
    image: "/images/gallery/photo-03.jpg",
    caption: "Recording session with C-Choir",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/gallery/photo-04.jpg",
    caption: "Recording session with C-Choir",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/gallery/photo-05.jpg",
    caption: "Train services duty",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/experience/kawisata/team-photo.jpg",
    caption: "CSOT team photo",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/experience/kawisata/night-briefing.jpg",
    caption: "Night coordination briefing with station security",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/experience/kawisata/depot-portrait.jpg",
    caption: "Between trains at the depot",
    org: "PT Kereta Commuter Indonesia & KAI Wisata",
  },
  {
    image: "/images/gallery/announcer-lost-and-found.jpg",
    caption: "Assisting a passenger with a lost & found case",
    org: "PT Kereta Commuter Indonesia — Announcer",
  },
  {
    image: "/images/gallery/orgaren-indian-client.jpg",
    caption: "Meeting an Indian client to supply aren sugar",
    org: "PT Orgaren Indonesia Jaya",
  },
  {
    image: "/images/gallery/orgaren-trade-expo.jpg",
    caption: "Representing the company at a Ministry of Industry trade expo",
    org: "PT Orgaren Indonesia Jaya",
  },
];

export const shortMovie = {
  title: "Maaf",
  subtitle: "CSOT Short Movie — by Gilang & Aziz",
  description:
    "A short film with a festive atmosphere, depicting the everyday situation of being a Customer Service On Train officer.",
  poster: "/images/short-movie/maaf-poster.jpg",
  link: "https://www.instagram.com/tv/CrQiRetJAWB/?igsh=a2Mxc3lxdnh2YnVq",
  credits: [
    { role: "Director", name: "Gilang Anggi Pradana" },
    { role: "Lead Actor", name: "Albi Wagia Yusup" },
    { role: "Assistant Actor", name: "Bani Adam" },
    { role: "Supporting Actor", name: "Abdul Aziz Setiawan" },
    { role: "Editor", name: "Gilang Anggi Pradana" },
    { role: "Audio", name: "Abdul Aziz Setiawan" },
  ],
};

export type Recommendation = {
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
  photo: string;
};

// LinkedIn recommendations — abdazizs.
export const recommendations: Recommendation[] = [
  {
    name: "Riyan Riyadi",
    title: "Training & Service Quality Strategist",
    relationship: "Senior colleague, did not manage Aziz directly",
    date: "July 3, 2026",
    quote:
      "Aziz has a strong willingness to learn and continuously improve. He quickly adapts to new processes, actively seeks feedback, and is always looking for ways to enhance both his own performance and the team's effectiveness. Beyond his technical capabilities, Aziz is a reliable, proactive, and collaborative team player.",
    photo: "/images/recommendations/riyan-riyadi.jpg",
  },
  {
    name: "Nabila Sharafina",
    title: "Customer Service Supervisor | HR Operations | Employee Relations",
    relationship: "Aziz's mentor at Skor Technologies",
    date: "July 1, 2026",
    quote:
      "Aziz is one of the best Customer Service team members at Skor. Beyond his excellent customer support skills, he has an exceptional aptitude for technology and problem-solving. One of his most impressive contributions was developing an internal portal that significantly simplifies and streamlines the Customer Service team's daily operations.",
    photo: "/images/recommendations/nabila-sharafina.jpg",
  },
  {
    name: "Abdul Azis",
    title: "Public Relations | Customer Service | Human Resources",
    relationship: "Worked together at PT KAI Wisata",
    date: "December 17, 2024",
    quote:
      "During his time at PT KAI Wisata, Abdul Aziz Setiawan consistently demonstrated exceptional skills in customer service and operational management. His dedication to providing top-notch service and his ability to handle complex situations with ease made him an invaluable asset to the team.",
    photo: "/images/recommendations/abdul-azis.jpg",
  },
];

export type AiProject = {
  name: string;
  tagline: string;
  description: string;
  url: string;
};

// Software built with AI-assisted ("vibe coding") development.
export const aiProjects: AiProject[] = [
  {
    name: "Skorcard CS Tools Portal",
    tagline: "Internal CS toolkit — Skor Technologies",
    description:
      "An internal portal built for Skor Technologies' Customer Service team, streamlining day-to-day case handling — the tooling referenced in Nabila's recommendation above.",
    url: "https://sc-cs-portal.skorcard.app",
  },
  {
    name: "FlowWorks",
    tagline: "Enterprise workflow platform",
    description:
      "Takes teams from survey to quotation in one place, with real-time KPI dashboards, role-based access, and automated task workflows.",
    url: "https://flowworks.ptuip.my.id",
  },
  {
    name: "RuangBaru",
    tagline: "UMKM team workspace",
    description:
      "Unifies projects, tasks, calendar, and notes in one simple space, so small teams can focus on the work instead of the tools.",
    url: "https://ruangbaru.my.id",
  },
  {
    name: "Muter",
    tagline: "Casual browser games",
    description:
      "A pocketful of quick, joyful browser games — no installs, no accounts. Pick one and you're playing in seconds.",
    url: "https://muter.my.id",
  },
  {
    name: "Duacincin.id",
    tagline: "Digital wedding invitations",
    description:
      "32 templates with rich animation and layout variety, from rustic to baroque to minimalist — the platform behind the Founder role above.",
    url: "https://duacincin.id",
  },
];
