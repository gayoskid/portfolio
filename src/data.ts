import {
  siBurpsuite,
  siDocker,
  siFastapi,
  siGo,
  siMetasploit,
  siNextdotjs,
  siOwasp,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  siWireshark,
} from 'simple-icons';
import type {
  Benchmark,
  CareerSide,
  Experience,
  Mission,
  PipelineStage,
  Project,
  Service,
  SkillGroup,
  Tool,
  ToolIcon,
} from './types';

export const paperUrl = 'https://journal.engineering.fuoye.edu.ng/index.php/engineer/article/view/1531';
export const githubUrl = 'https://github.com/webdev247s-boop';

export const hero = {
  greeting: "Hello, I'm Gaius.",
  title: 'Build with purpose. Test with precision. Secure by design. Iterate continuously.',
  titlePhrases: ['Build with purpose.', 'Test with precision.', 'Secure by design.', 'Iterate continuously.'],
  paragraphs: [
    "I'm Gaius Edeguare, a software developer and cybersecurity practitioner passionate about engineering purposeful digital solutions, building intelligent applications and creating technology that is reliable, secure and built to evolve.",
    'My work spans software engineering, application security and machine learning. I bring together thoughtful development, rigorous testing and security-conscious engineering to turn ideas into dependable digital products.',
  ],
  credentials: [
    'B.Tech. in Cyber Security — 4.11/5.00 CGPA',
    'Ladoke Akintola University of Technology',
    'Published co-author — SmartGuard smart contract security research',
    'Web Penetration Testing training — Hack The Box',
  ],
  credibility: ['Software Development', 'Application Security', 'Machine Learning & AI'],
  bubble: 'I engineer digital solutions with performance, reliability and security at the core of every decision.',
} as const;

export const expertiseIntro = [
  'Software development and cybersecurity are complementary parts of building dependable technology. Creating a functional product is important, but understanding how it performs, where it can fail and how it can be improved is equally essential.',
  'My approach brings software engineering, application security and quality assurance together throughout the development process.',
] as const;

export const careers: readonly [CareerSide, CareerSide] = [
  {
    id: 'development',
    label: 'Full-Stack & Mobile Development',
    headline: 'I turn ideas into working products.',
    paragraphs: [
      'I design and develop web applications, mobile experiences, backend systems and machine learning solutions. My work spans frontend development, API engineering, database-driven applications and the integration of intelligent features into digital products.',
      'I focus on building solutions that are functional, maintainable and aligned with real-world requirements.',
    ],
    image: '/images/dev-portrait.jpg',
    imageAlt: 'Portrait of Gaius Edeguare',
    logName: 'development.log',
    logTag: 'Example development workflow',
    terminal: [
      { text: '$ git push origin main', tone: 'command' },
      { text: '$ npm run build', tone: 'command' },
      { text: '$ tsc --strict', tone: 'command' },
      { text: '0 errors', tone: 'output' },
      { text: '$ docker compose up -d', tone: 'command' },
      { text: 'api: healthy', tone: 'output' },
      { text: 'database: connected', tone: 'output' },
      { text: 'deployment: successful', tone: 'highlight' },
    ],
    capabilitiesTitle: 'Development capabilities',
    capabilities: [
      'Full-stack web application development',
      'Backend and API engineering',
      'Cross-platform mobile application development',
      'Database design and integration',
      'AI-powered application development',
      'Product development and implementation',
    ],
    toolsLabel: 'Development stack',
    tools: 'Python, TypeScript, JavaScript, Go, PHP, SQL, FastAPI, Node.js, NestJS, React, React Native, Next.js, Vue.js, PostgreSQL, Docker and WordPress.',
  },
  {
    id: 'testing',
    label: 'Cybersecurity & Software Testing',
    headline: 'I engineer for performance, reliability and security.',
    paragraphs: [
      'Building software is only part of the job. Understanding how it can fail is equally important.',
      'I apply web application security testing, vulnerability assessment and quality assurance techniques to identify weaknesses, investigate potential attack paths and help improve application security.',
      'My approach combines structured testing, technical investigation and practical recommendations to support more secure and dependable software.',
    ],
    image: '/images/test-portrait.jpg',
    imageAlt: 'Gaius Edeguare at a cyber security student association event',
    logName: 'assessment.log',
    logTag: 'Example authorised security assessment',
    terminal: [
      { text: '$ confirm-scope --authorised', tone: 'command' },
      { text: '$ curl -sI https://staging.example', tone: 'command' },
      { text: 'content-security-policy: missing', tone: 'output' },
      { text: '', tone: 'output' },
      { text: '$ run-checks --auth --injection', tone: 'command' },
      { text: 'finding: login has no rate limit', tone: 'highlight' },
      { text: '', tone: 'output' },
      { text: '$ retest --after-fix', tone: 'command' },
      { text: 'all findings closed', tone: 'highlight' },
    ],
    capabilitiesTitle: 'Security and testing capabilities',
    capabilities: [
      'Web application penetration testing',
      'Vulnerability assessment',
      'API security testing',
      'Secure code review',
      'Smart contract security research',
      'Software quality assurance',
      'AI model evaluation and adversarial testing',
    ],
    toolsLabel: 'Security toolkit',
    tools: 'Burp Suite, Nmap, OWASP ZAP, sqlmap, ffuf, Wireshark, Metasploit and Python scripting.',
  },
];

export const workIntro = [
  'A selection of projects demonstrating my work across software engineering, machine learning, AI integration and digital platforms.',
  'From full-stack applications to intelligent systems, each project reflects a practical approach to solving technical and product challenges.',
] as const;

export const projects: readonly Project[] = [
  {
    title: 'PredictMonster',
    category: 'AI · Machine Learning · In Development',
    categories: ['ai'],
    challenge: 'Many football prediction platforms provide predictions without clearly explaining the reasoning behind them.',
    builtLabel: 'What I built',
    built: 'A football prediction platform powered by FastAPI, PostgreSQL, XGBoost and a Next.js/TypeScript frontend.',
    outcome: 'A prediction system designed to generate confidence scores from 0–100 using up to 20 evaluation checks, accompanied by written explanations to make prediction results more understandable.',
    technology: 'FastAPI · Python · PostgreSQL · XGBoost · Next.js · TypeScript',
    status: 'In Development',
  },
  {
    title: 'Activest',
    category: 'AI · Travel Technology',
    categories: ['ai', 'web'],
    challenge: 'Planning a trip often involves managing destinations, routes, travel costs and time across multiple platforms.',
    builtLabel: 'My contribution',
    built: 'Contributed to a live AI-powered travel platform, integrating personalised recommendations, route planning and automated travel cost estimation.',
    outcome: 'Travel planning features that bring destination discovery, route planning and cost estimation into one connected experience.',
    technology: 'AI Integration · Web Development · Travel Technology',
    link: { url: 'https://activest.ee/', label: 'Visit Website' },
  },
  {
    title: 'Mutual Aid with Love',
    category: 'Web Development · Multisite · Digital Platforms',
    categories: ['web'],
    challenge: 'A platform needed to bring multiple community-focused digital services together within one connected ecosystem.',
    builtLabel: 'What I built',
    built: 'A full-stack multisite solution designed to support multiple digital services under shared administration.',
    outcome: 'An interconnected platform supporting crowdfunding, a marketplace, social networking and a business directory.',
    technology: 'WordPress · PHP · MySQL · Multisite Development',
  },
  {
    title: 'School Event Management System',
    category: 'Web Development · Education',
    categories: ['web'],
    challenge: 'Students needed a centralised platform for accessing information about travel, scholarships and educational opportunities.',
    builtLabel: 'My contribution',
    built: 'Worked on the interface design and custom functionality of an educational information platform.',
    outcome: 'A centralised platform bringing relevant educational information and resources together.',
    link: { url: 'https://uni-event-management-system-7wn2oqjzv-edms1.vercel.app/', label: 'Visit Website' },
  },
  {
    title: 'A1 Agents',
    category: 'Web Development · Real Estate',
    categories: ['web'],
    challenge: 'An Australian real estate client needed greater functionality and design flexibility beyond the capabilities of the existing Houzez theme.',
    builtLabel: 'My contribution',
    built: 'Developed custom features, interface enhancements and integrations on top of the existing theme.',
    outcome: "A customised real estate listing and inventory platform tailored to the client's requirements.",
    link: { url: 'https://a1agents.com.au/', label: 'Visit Website' },
  },
];

export const servicesIntro = [
  'I help businesses, founders and teams develop digital products, integrate intelligent features and improve the security and quality of existing applications.',
  "Whether you're starting with an idea or improving an established product, I bring a practical engineering approach to the work.",
] as const;

export const services: readonly Service[] = [
  { title: 'Full-Stack Development', summary: 'I design and develop web applications, backend services and APIs, bringing together frontend interfaces, server-side functionality and database architecture to deliver complete digital solutions.', listLabel: 'Technologies', items: 'Go · Python · FastAPI · Node.js · NestJS · React · Next.js · TypeScript · PostgreSQL · PHP', cta: 'Discuss a Project', mission: 0 },
  { title: 'Mobile Application Development', summary: 'I develop cross-platform mobile applications for Android and iOS using React Native, supported by the backend services, APIs and databases required to power their functionality.', listLabel: 'Technologies', items: 'React Native · TypeScript · JavaScript · API Integration', cta: 'Discuss a Mobile App', mission: 0 },
  { title: 'Web Application Security Testing', summary: 'I assess web applications and APIs for security weaknesses, investigate potential attack paths and provide practical findings and remediation guidance to help strengthen application security.', listLabel: 'Services', items: 'Web penetration testing · API security testing · Vulnerability assessment · Secure code review', cta: 'Discuss Security Testing', mission: 1 },
  { title: 'Machine Learning & AI Development', summary: 'I build and integrate machine learning solutions and AI-powered features that address practical product and business needs, with attention to model performance and evaluation.', listLabel: 'Technologies', items: 'Python · PyTorch · TensorFlow · scikit-learn · XGBoost · Hugging Face', cta: 'Discuss an AI Project', mission: 2 },
  { title: 'AI Model Evaluation', summary: 'I evaluate AI-generated content and code, assess model responses against defined criteria, identify weaknesses and conduct adversarial testing to support more reliable AI systems.', listLabel: 'Services', items: 'AI output evaluation · Code evaluation · Rubric-based assessment · Adversarial testing', cta: 'Discuss AI Evaluation', mission: 2 },
  { title: 'Software Quality Assurance', summary: 'I support software quality through structured test planning, test case development, defect identification and clear, reproducible bug reports that help teams improve product reliability.', listLabel: 'Services', items: 'Functional testing · Test planning · Test cases · Bug reporting · Regression testing', cta: 'Discuss QA Services', mission: 3 },
];

export const researchIntro = {
  tagline: 'Machine learning for intelligent smart contract vulnerability detection.',
  paragraphs: [
    'SmartGuard is a machine learning-based system designed to analyse Ethereum smart contracts and identify potential security vulnerabilities across nine vulnerability categories.',
    'I contributed as the second author, credited as F.G. Edeguare, in the FUOYE Journal of Engineering and Technology.',
    'The system combines three machine learning models in a multi-stage detection pipeline, moving from initial screening to vulnerability classification and validation.',
  ],
  publication: 'FUOYE Journal of Engineering and Technology',
} as const;

export const pipeline: readonly PipelineStage[] = [
  {
    name: 'Screen',
    model: 'VulnScreener',
    architecture: 'Multi-Layer Perceptron (MLP)',
    summary: 'The first stage screens smart contracts to distinguish potentially vulnerable contracts from safe ones, reducing the workload for subsequent analysis.',
    metrics: [
      { value: '91.2%', label: 'Accuracy' },
      { value: '88.4%', label: 'Precision' },
      { value: '6.3%', label: 'False Positive Rate' },
    ],
  },
  {
    name: 'Analyze',
    model: 'VulnAnalyzer',
    architecture: 'Convolutional Neural Network (CNN)',
    summary: 'The second stage identifies which of the nine vulnerability categories may be present in a contract. Its multi-label approach allows multiple vulnerability types to be identified within a single contract.',
    metrics: [
      { value: '87.3%', label: 'Accuracy' },
      { value: '84.6%', label: 'Precision' },
      { value: '82.1%', label: 'Recall' },
    ],
  },
  {
    name: 'Validate',
    model: 'VulnValidator',
    architecture: 'Random Forest · 200 Trees',
    summary: 'The final stage provides an additional validation layer using a different model architecture to help distinguish genuine findings from false alarms.',
    metrics: [
      { value: '89.7%', label: 'Accuracy' },
      { value: '91.3%', label: 'Precision' },
      { value: '85.4%', label: 'Recall' },
    ],
  },
];

export const comparison = {
  kicker: 'Comparative Evaluation',
  title: 'Evaluating detection performance.',
  summary: 'SmartGuard was evaluated against established smart contract analysis tools using the same dataset of 3,750 contracts.',
  limitations: 'SmartGuard currently focuses on Solidity smart contracts on Ethereum. It does not identify every form of business-logic vulnerability and is intended to complement, not replace, manual security reviews.',
} as const;

export const benchmarks: readonly Benchmark[] = [
  { tool: 'SmartGuard', f1: '88.2%', width: 88.2 },
  { tool: 'Slither', f1: '61.3%', width: 61.3 },
  { tool: 'Mythril', f1: '54.3%', width: 54.3 },
  { tool: 'Oyente', f1: '47.0%', width: 47 },
];

export const experienceIntro = [
  'My experience combines client-focused development, product engineering, cybersecurity practice and technical education. Across these roles, I have applied technical skills to practical projects, collaborated on digital products and helped others develop their programming abilities.',
] as const;

export const experience: readonly Experience[] = [
  {
    role: 'Full-Stack Developer',
    organisation: 'Freelance · Upwork',
    paragraphs: [
      'Delivered websites and digital platforms for international clients, working across multisite networks, marketplaces, educational platforms, real estate websites and agency websites.',
      'Worked across frontend development, backend customisation, integrations and database-driven functionality to meet client requirements.',
    ],
  },
  {
    role: 'Web Developer — AI Travel Platform',
    organisation: 'Activest · activest.ee',
    paragraphs: [
      'Contributed to the development of a live travel platform, integrating AI-powered recommendations, route planning and automated cost estimation.',
      'Supported the delivery of features designed to make travel discovery and planning more accessible.',
    ],
  },
  {
    role: 'Python Programming Tutor',
    organisation: 'CYSSSA · LAUTECH',
    paragraphs: [
      'Taught Python programming to cybersecurity students, explaining programming fundamentals, reviewing student code and supporting practical learning.',
      'Received a Certificate of Excellence in recognition of my contribution.',
    ],
  },
  {
    role: 'Web Application Security Testing',
    organisation: 'Hack The Box & Client Projects',
    paragraphs: [
      'Developed practical web application security testing and vulnerability assessment experience through hands-on training and application testing.',
      'Applied security testing techniques to investigate weaknesses, understand potential attack paths and support improvements to application security.',
    ],
  },
];

export const skillsIntro = [
  'My technical capabilities span software engineering, cybersecurity, machine learning and quality assurance. I focus on applying these technologies to practical problems and continuously developing my engineering skills.',
] as const;

export const skills: readonly SkillGroup[] = [
  { title: 'Full-Stack & Mobile Development', itemsLabel: 'Technologies', items: 'TypeScript · JavaScript · Python · Go · PHP · SQL · FastAPI · Node.js · NestJS · React · React Native · Next.js · Vue.js · Angular · PostgreSQL · Docker · WordPress', application: 'Development of multisite platforms, custom WordPress solutions, full-stack applications, backend services and AI-powered digital products.' },
  { title: 'Cybersecurity & Quality Assurance', itemsLabel: 'Skills and tools', items: 'Web application penetration testing · API security testing · Vulnerability assessment · Secure code review · Smart contract security · Test planning · Burp Suite · Nmap · OWASP ZAP · sqlmap · ffuf · Wireshark · Metasploit', application: 'Hands-on web penetration testing training, application security assessments and security-focused research.' },
  { title: 'Machine Learning & Artificial Intelligence', itemsLabel: 'Technologies and tools', items: 'PyTorch · TensorFlow · Hugging Face · CodeBERT · CNNs · scikit-learn · XGBoost', application: 'Co-authored SmartGuard, a published machine learning research project for smart contract vulnerability detection, with a reported 91.3% precision for its validation model.' },
  { title: 'Teaching & AI Evaluation', itemsLabel: 'Skills', items: 'Python programming instruction · Code review · AI-generated code evaluation · Rubric-based assessment · Adversarial testing', application: 'Python programming tutoring at LAUTECH, recognised with a Certificate of Excellence.' },
];

export const education = {
  degree: 'Bachelor of Technology — Cyber Security',
  school: 'Ladoke Akintola University of Technology (LAUTECH)',
  years: '2020–2025',
  grade: 'Final CGPA: 4.11/5.00',
} as const;

export const certifications: readonly string[] = [
  'Web Penetration Tester — Hack The Box',
  'Python Programming and Scripting',
  'Database Development — Udemy',
  'Frontend Developer — Programming Hero',
  'WordPress Developer — Udemy',
  'WordPress Theme and Plugin Development — Udemy',
  'Website Development, Hosting and Server Management — Webbiit Technologies',
];

export const recognition = {
  title: 'Certificate of Excellence — Python Programming Tutoring',
  organisation: 'CYSSSA · LAUTECH',
  summary: 'Recognition for contributions to Python programming instruction.',
} as const;

export const contactIntro = [
  "Whether you're developing a new product, improving an existing application or looking for someone to evaluate its security and quality, let's discuss your goals and how I can contribute.",
] as const;

export const missions: readonly Mission[] = [
  { label: 'Build a Product', summary: 'From concept to implementation, I develop web applications, mobile applications and backend systems designed around real-world requirements.', listLabel: 'Technologies', items: 'Go · Python · FastAPI · Node.js · NestJS · React · React Native · Next.js · PostgreSQL · Docker', cta: 'Discuss a Project' },
  { label: 'Secure an Application', summary: 'Identify weaknesses, understand potential attack paths and strengthen your application through structured security assessments and practical remediation guidance.', listLabel: 'Services', items: 'Web penetration testing · API security testing · Vulnerability assessment · Secure code review', cta: 'Discuss Security Testing' },
  { label: 'Integrate AI', summary: 'Bring intelligent capabilities into your products through machine learning solutions, AI integrations and LLM-powered features.', listLabel: 'Technologies', items: 'PyTorch · Hugging Face · scikit-learn · XGBoost · Python · LLM Integration', cta: 'Discuss an AI Project' },
  { label: 'Improve Software Quality', summary: 'Make your releases more dependable through structured testing, test planning, code reviews and clear, reproducible bug reports.', listLabel: 'Services', items: 'QA testing · Test planning · Functional testing · Regression testing · Bug reporting', cta: 'Discuss QA Services' },
];

// Tools without a published logo use this neutral command-prompt mark.
const commandLineIcon: ToolIcon = {
  path: 'M4.3 5.3 11 12l-6.7 6.7-1.4-1.4L8.2 12 2.9 6.7zM12 17h9v2h-9z',
  hex: '16166B',
};

// Shown orbiting the hero portrait. Edit these lists to match the tools you use.
export const developerTools: readonly Tool[] = [
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Python', icon: siPython },
  { name: 'Go', icon: siGo },
  { name: 'React', icon: siReact },
  { name: 'React Native', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Docker', icon: siDocker },
];

export const pentestTools: readonly Tool[] = [
  { name: 'Burp Suite', icon: siBurpsuite },
  { name: 'Nmap', icon: commandLineIcon },
  { name: 'OWASP ZAP', icon: siOwasp },
  { name: 'sqlmap', icon: commandLineIcon },
  { name: 'ffuf', icon: commandLineIcon },
  { name: 'Wireshark', icon: siWireshark },
  { name: 'Metasploit', icon: siMetasploit },
];
