import { openContact } from '../contact';
import { el } from '../dom';
import type { ContactKind } from '../types';
import { contactChannels, contactLogo } from './contact-logos';

const headerChannels: readonly ContactKind[] = ['whatsapp', 'email', 'linkedin'];

const links = [
  ['#work', 'Work'],
  ['#expertise', 'Expertise'],
  ['#research', 'Research'],
  ['#experience', 'Experience'],
  ['#skills', 'Skills'],
] as const;

// Phones show a shorter menu; the top bar already covers Contact.
const hiddenOnPhones: ReadonlySet<string> = new Set(['#experience']);

function renderTouch(): HTMLElement {
  const buttons = headerChannels.map((kind) => {
    const { label } = contactChannels[kind];
    const button = el(
      'button',
      {
        className: 'touch-button',
        attrs: { type: 'button', 'aria-label': label, title: label },
      },
      [contactLogo(kind)],
    );
    button.addEventListener('click', () => openContact(kind));
    return button;
  });
  return el('div', { className: 'nav-touch' }, [
    el('p', { className: 'nav-touch-text', text: "Let's talk" }),
    ...buttons,
  ]);
}

export function renderNav(): HTMLElement {
  const menu = el('div', { className: 'nav-links' }, [
    ...links.map(([href, text]) =>
      el('a', { text, attrs: { href }, ...(hiddenOnPhones.has(href) ? { className: 'nav-link-optional' } : {}) }),
    ),
    el('a', { className: 'nav-cta nav-link-optional', text: 'Contact', attrs: { href: '#contact' } }),
  ]);
  const brand = el('a', { className: 'brand', attrs: { href: '#top', 'aria-label': 'Gaius Edeguare, back to top' } }, [
    el('span', { className: 'brand-mark', text: 'G' }),
  ]);
  const header = el('header', { className: 'site-header' }, [
    el('nav', { className: 'site-nav', attrs: { 'aria-label': 'Main' } }, [
      renderTouch(),
      el('div', { className: 'nav-main' }, [brand, menu]),
    ]),
    el('div', { className: 'scroll-progress', attrs: { 'aria-hidden': 'true' } }),
  ]);
  collapseMenuOnScroll(header);
  return header;
}

/** On small screens the menu row hides when scrolling down and returns when scrolling up. */
function collapseMenuOnScroll(header: HTMLElement): void {
  const threshold = 6;
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y < 120) {
        header.classList.remove('is-collapsed');
      } else if (Math.abs(y - lastY) > threshold) {
        header.classList.toggle('is-collapsed', y > lastY);
      }
      if (Math.abs(y - lastY) > threshold) lastY = y;
    },
    { passive: true },
  );
}
