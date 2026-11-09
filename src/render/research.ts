import { benchmarks, comparison, paperUrl, pipeline, researchIntro } from '../data';
import { el, externalLink } from '../dom';

export type ResearchController = {
  readonly element: HTMLElement;
  readonly pin: HTMLElement;
  readonly stageCount: number;
  setStage(index: number): void;
  onStagePick(handler: (index: number) => void): void;
};

export function renderResearch(): ResearchController {
  const model = el('p', { className: 'stage-model' });
  const architecture = el('p', { className: 'stage-architecture' });
  const summary = el('p', { className: 'stage-summary' });
  const metrics = el('div', { className: 'stage-metrics' });
  let current = -1;
  let pickHandler: (index: number) => void = (index) => setStage(index);

  const buttons = pipeline.map((stage, index) => {
    const button = el('button', {
      className: 'stage-button',
      text: `Stage ${String(index + 1).padStart(2, '0')} — ${stage.name}`,
      attrs: { type: 'button', 'aria-pressed': 'false' },
    });
    button.addEventListener('click', () => pickHandler(index));
    return button;
  });

  function setStage(index: number): void {
    const stage = pipeline[index];
    if (!stage || index === current) return;
    current = index;
    model.textContent = stage.model;
    architecture.textContent = stage.architecture;
    summary.textContent = stage.summary;
    metrics.replaceChildren(...stage.metrics.map((metric) =>
      el('div', { className: 'stage-metric' }, [
        el('p', { className: 'stage-metric-value', text: metric.value }),
        el('p', { className: 'stage-metric-label', text: metric.label }),
      ]),
    ));
    buttons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
  }
  setStage(0);

  const bars = benchmarks.map((item, index) => {
    const fill = el('div', { className: `bar-fill${index === 0 ? ' bar-fill-lead' : ''}` });
    fill.style.width = `${item.width}%`;
    return el('div', { className: 'bar' }, [
      el('div', { className: 'bar-label' }, [el('span', { text: item.tool }), el('span', { text: item.f1 })]),
      el('div', { className: 'bar-track' }, [fill]),
    ]);
  });

  const intro = el('div', { className: 'research-intro' }, [
    el('p', { className: 'kicker', text: 'Published Research · June 2026' }),
    el('h2', { className: 'research-title', text: 'SmartGuard' }),
    el('p', { className: 'research-tagline', text: researchIntro.tagline }),
    ...researchIntro.paragraphs.map((text) => el('p', { className: 'research-lead', text })),
    el('p', { className: 'research-publication' }, [
      el('span', { text: 'Publication: ' }),
      el('span', { text: researchIntro.publication }),
    ]),
    externalLink(paperUrl, 'Research paper', 'research-paper-link'),
  ]);

  const pin = el('div', { className: 'research-pin' }, [
    el('div', { className: 'stage-buttons', attrs: { role: 'group', 'aria-label': 'Pipeline stages' } }, buttons),
    el('div', { className: 'stage-panel' }, [
      el('div', { className: 'stage-identity' }, [model, architecture]),
      summary,
      el('p', { className: 'stage-results-label', text: 'Reported results' }),
      metrics,
    ]),
  ]);

  const compare = el('div', { className: 'research-compare' }, [
    el('div', { className: 'research-compare-text' }, [
      el('p', { className: 'kicker', text: comparison.kicker }),
      el('h3', { className: 'research-compare-title', text: comparison.title }),
      el('p', { text: comparison.summary }),
      el('h4', { text: 'Research limitations' }),
      el('p', { className: 'research-limits', text: comparison.limitations }),
    ]),
    el('div', { className: 'research-side' }, [
      el('h4', { text: 'Reported F1-scores' }),
      ...bars,
      externalLink(paperUrl, 'Read the Published Paper', 'button button-periwinkle'),
    ]),
  ]);

  return {
    element: el('section', { className: 'research', attrs: { id: 'research' } }, [intro, pin, compare]),
    pin,
    stageCount: pipeline.length,
    setStage,
    onStagePick(handler) {
      pickHandler = handler;
    },
  };
}
