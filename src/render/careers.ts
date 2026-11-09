import { careers, expertiseIntro } from '../data';
import { el, sectionHeading } from '../dom';
import { createTerminal } from '../terminal';
import type { CareerSide } from '../types';

function mainColumn(side: CareerSide): HTMLElement {
  return el('div', { className: 'world-main' }, [
    el('div', { className: 'world-intro' }, [
      el('div', { className: 'world-portrait' }, [
        el('div', { className: 'hex hex-back' }),
        el('img', { className: 'hex hex-image', attrs: { src: side.image, alt: side.imageAlt, loading: 'lazy', width: '800', height: '1000' } }),
      ]),
      el('p', { className: 'world-label', text: side.label }),
      el('h3', { className: 'world-headline', text: side.headline }),
      ...side.paragraphs.map((text) => el('p', { className: 'world-summary', text })),
    ]),
    createTerminal(side.logName, side.logTag, side.terminal),
  ]);
}

function detailColumn(side: CareerSide): HTMLElement {
  return el('div', { className: 'world-detail' }, [
    el('h3', { className: 'world-detail-title', text: side.capabilitiesTitle }),
    el('ul', { className: 'world-capabilities' }, side.capabilities.map((text) => el('li', { text }))),
    el('div', { className: 'world-item' }, [
      el('p', { className: 'world-tools-label', text: side.toolsLabel }),
      el('p', { text: side.tools }),
    ]),
  ]);
}

export function renderCareers(): HTMLElement {
  const [development, testing] = careers;

  const developmentLayer = el('div', { className: 'layer layer-development' }, [
    el('div', { className: 'world' }, [mainColumn(development), detailColumn(development)]),
  ]);
  const testingLayer = el('div', { className: 'layer layer-testing' }, [
    el('div', { className: 'world' }, [detailColumn(testing), mainColumn(testing)]),
  ]);

  const slider = el('input', {
    className: 'career-slider',
    attrs: { type: 'range', min: '0', max: '100', value: '50', 'aria-label': 'Drag right for software development, left for security and testing' },
  });
  const grip = el('div', { className: 'career-grip', attrs: { 'aria-hidden': 'true' } }, [
    el('div', { className: 'career-grip-line' }),
    el('div', { className: 'career-grip-dot', text: '‹ ›' }),
  ]);
  const stage = el('div', { className: 'career-stage' }, [testingLayer, developmentLayer, slider, grip]);

  const buttons = (['Development', 'Both', 'Security & Testing'] as const).map((label) =>
    el('button', { className: 'view-button', text: label, attrs: { type: 'button', 'aria-pressed': 'false' } }),
  );

  // Small screens swipe between the two sides; larger screens use the drag handle.
  const smallScreen = window.matchMedia('(max-width: 900px)');

  function setPressed(active: number): void {
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === active)));
  }

  function setSplit(value: number, animate: boolean): void {
    stage.classList.toggle('is-animating', animate);
    stage.style.setProperty('--split', `${value}%`);
    slider.value = String(value);
    setPressed(value === 100 ? 0 : value === 0 ? 2 : value === 50 ? 1 : -1);
  }

  function syncPressedToSwipe(): void {
    const middle = (stage.scrollWidth - stage.clientWidth) / 2;
    setPressed(stage.scrollLeft > middle ? 2 : 0);
  }

  function resetForScreen(): void {
    if (smallScreen.matches) {
      stage.scrollLeft = 0;
      setPressed(0);
    } else {
      setSplit(50, false);
    }
  }

  slider.addEventListener('input', () => setSplit(Number(slider.value), false));
  stage.addEventListener(
    'scroll',
    () => {
      if (smallScreen.matches) syncPressedToSwipe();
    },
    { passive: true },
  );
  const positions = [100, 50, 0] as const;
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (smallScreen.matches) {
        stage.scrollTo({ left: index === 0 ? 0 : stage.scrollWidth, behavior: 'smooth' });
      } else {
        setSplit(positions[index] ?? 50, true);
      }
    });
  });
  smallScreen.addEventListener('change', resetForScreen);
  resetForScreen();

  return el('section', { className: 'careers', attrs: { id: 'expertise' } }, [
    sectionHeading('Two sides of the same engineering mindset', 'I build it. I test it. I improve it.', expertiseIntro),
    el('div', { className: 'view-buttons reveal', attrs: { role: 'group', 'aria-label': 'Choose a view' } }, buttons),
    el('p', { className: 'career-hint reveal' }, [
      el('span', { className: 'career-hint-drag', text: 'Drag the handle to explore each side.' }),
      el('span', { className: 'career-hint-swipe', text: 'Swipe to switch between development and security.' }),
    ]),
    stage,
  ]);
}
