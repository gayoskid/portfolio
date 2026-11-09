import { el } from '../dom';
import { developerTools, hero, pentestTools } from '../data';
import { createTypedTitle } from '../typewriter';
import type { Tool, ToolIcon } from '../types';

const SVG_NS = 'http://www.w3.org/2000/svg';

function toolLogo(icon: ToolIcon): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'orbit-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', icon.path);
  path.setAttribute('fill', `#${icon.hex}`);
  svg.append(path);
  return svg;
}

function orbitRing(label: string, variant: 'dev' | 'pentest', tools: readonly Tool[]): HTMLElement {
  const slots = tools.map((tool, index) => {
    const slot = el('li', { className: 'orbit-slot' }, [
      el('span', { className: 'orbit-chip' }, [toolLogo(tool.icon), el('span', { text: tool.name })]),
    ]);
    slot.style.setProperty('--angle', `${(360 / tools.length) * index}deg`);
    return slot;
  });
  return el('div', { className: `orbit-ring orbit-ring-${variant}` }, [
    el('ul', { className: 'orbit-spin', attrs: { 'aria-label': label } }, slots),
  ]);
}

function stat(value: string, label: string, count?: string): HTMLElement {
  return el('div', { className: 'hero-stat' }, [
    el('p', { className: 'hero-stat-value', text: value, attrs: count ? { 'data-count': count } : {} }),
    el('p', { className: 'hero-stat-label', text: label }),
  ]);
}

export function renderHero(): HTMLElement {
  const dots = Array.from({ length: 12 }, () => el('span', { className: 'hero-dot' }));
  const portrait = el('div', { className: 'hero-portrait' }, [
    el('div', { className: 'hex hex-back' }),
    el('img', {
      className: 'hex hex-image',
      attrs: { src: '/images/dev-portrait.jpg', alt: 'Portrait of Gaius Edeguare', width: '800', height: '1000' },
    }),
    el('div', { className: 'hero-dots', attrs: { 'aria-hidden': 'true' } }, dots),
    orbitRing('Developer technology highlights', 'dev', developerTools),
    orbitRing('Security technology highlights', 'pentest', pentestTools),
  ]);

  const left = el('div', { className: 'hero-side' }, [
    el('div', { className: 'hero-info' }, [
      el('p', { className: 'hero-info-title', text: 'Professional credentials' }),
      el('ul', { className: 'hero-credentials' }, hero.credentials.map((text) => el('li', { text }))),
    ]),
  ]);

  const right = el('div', { className: 'hero-side hero-side-right' }, [
    stat('18,750', 'Contracts studied in published research.', '18750'),
    el('p', { className: 'hero-bubble', text: hero.bubble }),
    stat('91.3%', "Precision achieved by SmartGuard's validation model."),
  ]);

  return el('section', { className: 'hero', attrs: { id: 'top' } }, [
    el('p', { className: 'hero-hello', text: hero.greeting }),
    el('h1', { className: 'hero-title' }, createTypedTitle(hero.title, hero.titlePhrases)),
    el('div', { className: 'hero-stage' }, [left, portrait, right]),
    el('div', { className: 'hero-intro' }, hero.paragraphs.map((text) => el('p', { text }))),
    el('div', { className: 'hero-actions' }, [
      el('a', { className: 'button button-primary', text: 'View Selected Work', attrs: { href: '#work' } }),
      el('a', { className: 'button button-outline', text: 'Connect With Me', attrs: { href: '#contact' } }),
    ]),
    el('ul', { className: 'hero-points' }, hero.credibility.map((text) => el('li', { text }))),
  ]);
}
