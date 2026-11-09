export type ProjectCategory = 'ai' | 'web';
export type ProjectFilter = ProjectCategory | 'all';
export type ContactKind = 'email' | 'whatsapp' | 'linkedin';

export type Project = {
  readonly title: string;
  readonly category: string;
  readonly categories: readonly ProjectCategory[];
  readonly challenge: string;
  readonly builtLabel: 'What I built' | 'My contribution';
  readonly built: string;
  readonly outcome: string;
  readonly technology?: string;
  readonly status?: string;
  /** Leave out when a project has no public page to link to. */
  readonly link?: { readonly url: string; readonly label: string };
};

export type Experience = {
  readonly role: string;
  readonly organisation: string;
  readonly paragraphs: readonly string[];
};

export type Service = {
  readonly title: string;
  readonly summary: string;
  readonly listLabel: 'Technologies' | 'Services';
  readonly items: string;
  readonly cta: string;
  /** Index of the contact option this service should open. */
  readonly mission: number;
};

export type SkillGroup = {
  readonly title: string;
  readonly itemsLabel: string;
  readonly items: string;
  readonly application: string;
};

export type Metric = {
  readonly value: string;
  readonly label: string;
};

export type PipelineStage = {
  readonly name: string;
  readonly model: string;
  readonly architecture: string;
  readonly summary: string;
  readonly metrics: readonly Metric[];
};

export type Benchmark = {
  readonly tool: string;
  readonly f1: string;
  readonly width: number;
};

export type Mission = {
  readonly label: string;
  readonly summary: string;
  readonly listLabel: 'Technologies' | 'Services';
  readonly items: string;
  readonly cta: string;
};

export type TerminalLine = {
  readonly text: string;
  readonly tone: 'command' | 'output' | 'highlight';
};

export type CareerSide = {
  readonly id: 'development' | 'testing';
  readonly label: string;
  readonly headline: string;
  readonly paragraphs: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly logName: string;
  readonly logTag: string;
  readonly terminal: readonly TerminalLine[];
  readonly capabilitiesTitle: string;
  readonly capabilities: readonly string[];
  readonly toolsLabel: string;
  readonly tools: string;
};

export type ToolIcon = {
  readonly path: string;
  readonly hex: string;
};

export type Tool = {
  readonly name: string;
  readonly icon: ToolIcon;
};
