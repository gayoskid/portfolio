import { el } from './dom';

const START_DELAY = 900;
const TYPE_DELAY = 70;
const HOLD_DELAY = 1700;
const DELETE_DELAY = 32;
const NEXT_DELAY = 320;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

async function cycle(text: HTMLElement, cursor: HTMLElement, phrases: readonly string[]): Promise<void> {
  await wait(START_DELAY);
  for (;;) {
    for (const phrase of phrases) {
      cursor.classList.add('is-typing');
      for (let end = 1; end <= phrase.length; end += 1) {
        text.textContent = phrase.slice(0, end);
        await wait(TYPE_DELAY);
      }
      cursor.classList.remove('is-typing');
      await wait(HOLD_DELAY);
      cursor.classList.add('is-typing');
      for (let end = phrase.length - 1; end >= 0; end -= 1) {
        text.textContent = phrase.slice(0, end);
        await wait(DELETE_DELAY);
      }
      cursor.classList.remove('is-typing');
      await wait(NEXT_DELAY);
    }
  }
}

/** Types each phrase in turn. Screen readers and reduced-motion visitors get the full title. */
export function createTypedTitle(fullTitle: string, phrases: readonly string[]): readonly HTMLElement[] {
  const text = el('span');
  const cursor = el('span', { className: 'hero-cursor' });
  const typed = el('span', { className: 'hero-typed', attrs: { 'aria-hidden': 'true' } }, [text, cursor]);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.textContent = fullTitle;
    typed.classList.add('is-static');
  } else {
    void cycle(text, cursor, phrases);
  }
  return [el('span', { className: 'visually-hidden', text: fullTitle }), typed];
}
