import { el } from './dom';
import type { TerminalLine } from './types';

const CHAR_DELAY = 26;
const OUTPUT_DELAY = 280;
const LOOP_DELAY = 4200;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function createCursor(): HTMLElement {
  return el('span', { className: 'terminal-cursor', attrs: { 'aria-hidden': 'true' } });
}

function promptRow(cursor: HTMLElement): HTMLElement {
  return el('div', { className: 'terminal-line tone-command' }, [el('span', { text: '$ ' }), cursor]);
}

async function play(body: HTMLElement, lines: readonly TerminalLine[]): Promise<void> {
  const cursor = createCursor();
  for (;;) {
    body.replaceChildren();
    for (const line of lines) {
      const text = el('span');
      body.append(el('div', { className: `terminal-line tone-${line.tone}` }, [text, cursor]));
      if (line.tone === 'command') {
        // The cursor stays solid while typing, and blinks whenever it is idle.
        cursor.classList.add('is-typing');
        for (let end = 1; end <= line.text.length; end += 1) {
          text.textContent = line.text.slice(0, end);
          await wait(CHAR_DELAY);
        }
        cursor.classList.remove('is-typing');
      } else {
        text.textContent = line.text;
      }
      await wait(OUTPUT_DELAY);
    }
    body.append(promptRow(cursor));
    await wait(LOOP_DELAY);
  }
}

export function createTerminal(logName: string, logTag: string, lines: readonly TerminalLine[]): HTMLElement {
  const body = el('div', { className: 'terminal-body', attrs: { 'aria-label': `Example ${logName} session` } });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    body.append(
      ...lines.map((line) => el('div', { className: `terminal-line tone-${line.tone}`, text: line.text })),
      promptRow(createCursor()),
    );
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void play(body, lines);
      }
    });
    observer.observe(body);
  }

  return el('div', { className: 'terminal' }, [
    el('div', { className: 'terminal-bar' }, [
      el('span', { text: logName }),
      el('span', { text: logTag }),
    ]),
    body,
  ]);
}
