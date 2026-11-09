import { openContact } from '../contact';
import {
  certifications,
  contactIntro,
  education,
  experience,
  experienceIntro,
  githubUrl,
  missions,
  recognition,
  services,
  servicesIntro,
  skills,
  skillsIntro,
} from '../data';
import { el, externalLink, sectionHeading } from '../dom';
import type { ContactKind } from '../types';
import { contactLogo } from './contact-logos';

const MISSION_EVENT = 'portfolio:select-mission';

export function renderServices(): HTMLElement {
  return el('section', { className: 'services', attrs: { id: 'services' } }, [
    sectionHeading('What I offer', 'Turning technical challenges into working solutions.', servicesIntro),
    el('div', { className: 'service-grid' }, services.map((service, index) => {
      const cta = el('a', { className: 'service-cta', text: service.cta, attrs: { href: '#contact' } });
      cta.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent<number>(MISSION_EVENT, { detail: service.mission }));
      });
      return el('article', { className: 'service-card reveal' }, [
        el('p', { className: 'service-number', text: `${String(index + 1).padStart(2, '0')}.` }),
        el('h3', { text: service.title }),
        el('p', { className: 'service-summary', text: service.summary }),
        el('p', { className: 'service-list-label', text: service.listLabel }),
        el('p', { className: 'service-items', text: service.items }),
        cta,
      ]);
    })),
  ]);
}

export function renderExperience(): HTMLElement {
  return el('section', { className: 'experience', attrs: { id: 'experience' } }, [
    sectionHeading('Professional Journey', 'Experience built through real projects.', experienceIntro),
    el('ol', { className: 'timeline' }, [
      el('li', { className: 'timeline-line', attrs: { 'aria-hidden': 'true' } }),
      ...experience.map((entry) =>
        el('li', { className: 'timeline-item' }, [
          el('p', { className: 'timeline-organisation', text: entry.organisation }),
          el('span', { className: 'timeline-dot', attrs: { 'aria-hidden': 'true' } }),
          el('div', { className: 'timeline-content' }, [
            el('h3', { text: entry.role }),
            ...entry.paragraphs.map((text) => el('p', { text })),
          ]),
        ]),
      ),
    ]),
  ]);
}

export function renderSkills(): HTMLElement {
  return el('section', { className: 'skills', attrs: { id: 'skills' } }, [
    sectionHeading('Technical Capabilities', 'Skills backed by practical work.', skillsIntro),
    el('div', { className: 'skill-grid' }, skills.map((group, index) =>
      el('article', { className: 'skill-card reveal' }, [
        el('p', { className: 'service-number', text: `${String(index + 1).padStart(2, '0')}.` }),
        el('h3', { text: group.title }),
        el('p', { className: 'skill-label', text: group.itemsLabel }),
        el('p', { className: 'skill-items', text: group.items }),
        el('p', { className: 'skill-label', text: 'Practical application' }),
        el('p', { className: 'skill-proof', text: group.application }),
      ]),
    )),
    el('div', { className: 'credentials reveal' }, [
      el('figure', {}, [
        el('img', { attrs: { src: '/images/tutor.jpg', alt: 'Gaius holding a Certificate of Excellence for Python tutoring', loading: 'lazy', width: '900', height: '1200' } }),
        el('figcaption', {}, [
          el('strong', { text: 'Recognition' }),
          el('span', { className: 'recognition-title', text: recognition.title }),
          el('span', { text: recognition.organisation }),
          el('span', { text: recognition.summary }),
        ]),
      ]),
      el('div', {}, [
        el('h3', { text: 'Education' }),
        el('p', { className: 'education-degree', text: education.degree }),
        el('p', { text: education.school }),
        el('p', { text: education.years }),
        el('p', { className: 'education-grade', text: education.grade }),
        el('h3', { className: 'credentials-second', text: 'Certifications & Professional Training' }),
        el('ul', {}, certifications.map((text) => el('li', { text }))),
      ]),
    ]),
  ]);
}

export function renderContact(): HTMLElement {
  const first = missions[0];
  if (!first) throw new Error('No contact options defined');
  let selected = first;

  const summary = el('p', { className: 'mission-summary' });
  const listLabel = el('p', { className: 'mission-list-label' });
  const items = el('p', { className: 'mission-tools' });
  const cta = el('button', { className: 'button button-light', attrs: { type: 'button' } });
  const subject = () => `Portfolio enquiry: ${selected.label}`;
  cta.addEventListener('click', () => openContact('email', subject()));

  const buttons = missions.map((mission, index) => {
    const button = el('button', {
      className: 'mission-button',
      text: mission.label,
      attrs: { type: 'button', 'aria-pressed': 'false' },
    });
    button.addEventListener('click', () => select(index));
    return button;
  });

  function select(index: number): void {
    const mission = missions[index];
    if (!mission) return;
    selected = mission;
    summary.textContent = mission.summary;
    listLabel.textContent = mission.listLabel;
    items.textContent = mission.items;
    cta.textContent = mission.cta;
    buttons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
  }
  select(0);
  document.addEventListener(MISSION_EVENT, (event) => select((event as CustomEvent<number>).detail));

  const channels: readonly (readonly [ContactKind, string])[] = [
    ['email', 'Email Me'],
    ['whatsapp', 'WhatsApp'],
    ['linkedin', 'Connect on LinkedIn'],
  ];
  const contactButtons = channels.map(([kind, label]) => {
    const button = el('button', { className: 'button button-light', attrs: { type: 'button' } }, [
      contactLogo(kind),
      el('span', { text: label }),
    ]);
    button.addEventListener('click', () => openContact(kind, kind === 'email' ? subject() : undefined));
    return button;
  });

  return el('section', { className: 'contact', attrs: { id: 'contact' } }, [
    el('p', { className: 'kicker contact-kicker reveal', text: "Let's Work Together" }),
    el('h2', { className: 'split-heading', text: 'What are you looking to build?' }),
    ...contactIntro.map((text) => el('p', { className: 'section-intro reveal', text })),
    el('div', { className: 'mission-buttons reveal', attrs: { role: 'group', 'aria-label': 'Choose what you need' } }, buttons),
    summary,
    listLabel,
    items,
    el('div', { className: 'mission-cta reveal' }, [cta]),
    el('div', { className: 'contact-closing' }, [
      el('h3', { className: 'contact-closing-title reveal', text: 'Get in touch' }),
      el('p', { className: 'section-intro reveal', text: 'Have a project, opportunity or technical challenge in mind?' }),
      el('p', { className: 'section-intro reveal', text: "Let's connect." }),
      el('div', { className: 'contact-buttons reveal' }, contactButtons),
    ]),
  ]);
}

export function renderFooter(): HTMLElement {
  const quickLinks = [
    ['#work', 'Work'],
    ['#expertise', 'Expertise'],
    ['#research', 'Research'],
    ['#experience', 'Experience'],
    ['#skills', 'Skills'],
    ['#contact', 'Contact'],
  ] as const;

  const contactLink = (kind: ContactKind, label: string) => {
    const button = el('button', { className: 'footer-link', text: label, attrs: { type: 'button' } });
    button.addEventListener('click', () => openContact(kind));
    return button;
  };

  return el('footer', { className: 'site-footer' }, [
    el('div', { className: 'footer-columns' }, [
      el('div', { className: 'footer-about' }, [
        el('span', { className: 'brand-mark', text: 'G', attrs: { 'aria-hidden': 'true' } }),
        el('p', { text: 'Building software, exploring security and developing intelligent solutions.' }),
        el('p', { className: 'footer-location', text: 'Lagos, Nigeria' }),
      ]),
      el('nav', { className: 'footer-nav', attrs: { 'aria-label': 'Quick links' } }, [
        el('h2', { text: 'Quick links' }),
        ...quickLinks.map(([href, text]) => el('a', { className: 'footer-link', text, attrs: { href } })),
      ]),
      el('div', { className: 'footer-nav' }, [
        el('h2', { text: 'Social links' }),
        contactLink('linkedin', 'LinkedIn'),
        externalLink(githubUrl, 'GitHub', 'footer-link'),
        contactLink('whatsapp', 'WhatsApp'),
        contactLink('email', 'Email'),
      ]),
    ]),
    el('p', { className: 'footer-copyright', text: `© ${new Date().getFullYear()} Gaius Edeguare. All rights reserved.` }),
  ]);
}
