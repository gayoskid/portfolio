import { siWhatsapp } from 'simple-icons';
import type { ContactKind } from '../types';

const SVG_NS = 'http://www.w3.org/2000/svg';

type LogoPart = { readonly d: string; readonly fill: string; readonly transform?: string };
type Channel = {
  readonly label: string;
  readonly viewBox: string;
  readonly parts: readonly LogoPart[];
};

export const contactChannels: Readonly<Record<ContactKind, Channel>> = {
  whatsapp: {
    label: 'WhatsApp',
    viewBox: '0 0 24 24',
    parts: [{ d: siWhatsapp.path, fill: '#25D366' }],
  },
  email: {
    label: 'Email',
    viewBox: '0 0 48 48',
    parts: [
      { d: 'M45 16.2l-5 2.75-5 4.75V40h7c1.657 0 3-1.343 3-3V16.2z', fill: '#4CAF50' },
      { d: 'M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z', fill: '#1E88E5' },
      { d: 'M35 11.2L24 19.45 13 11.2 12 17l1 6.7 11 8.25L35 23.7 36 17z', fill: '#E53935' },
      { d: 'M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.3 4.3 0 0 0 7.298 8C4.924 8 3 9.924 3 12.298z', fill: '#C62828' },
      { d: 'M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.3 4.3 0 0 1 40.702 8C43.076 8 45 9.924 45 12.298z', fill: '#FBC02D' },
    ],
  },
  linkedin: {
    label: 'LinkedIn',
    viewBox: '0 0 24 24',
    parts: [
      { d: 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', fill: '#0A66C2' },
      {
        d: 'M4 9h3.5v11H4zM5.75 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.35v1.5c.5-.9 1.7-1.8 3.45-1.8 3.7 0 4.2 2.4 4.2 5.5V20h-3.5v-5.1c0-1.3 0-2.9-1.8-2.9s-2.2 1.4-2.2 2.8V20H10z',
        fill: '#FFFFFF',
        transform: 'translate(3.2 3.1) scale(.72)',
      },
    ],
  },
};

export function contactLogo(kind: ContactKind): SVGSVGElement {
  const channel = contactChannels[kind];
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'contact-logo');
  svg.setAttribute('viewBox', channel.viewBox);
  svg.setAttribute('aria-hidden', 'true');
  for (const part of channel.parts) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', part.d);
    path.setAttribute('fill', part.fill);
    if (part.transform) path.setAttribute('transform', part.transform);
    svg.append(path);
  }
  return svg;
}
