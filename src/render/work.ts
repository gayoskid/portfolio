import { projects, workIntro } from '../data';
import { el, externalLink, sectionHeading } from '../dom';
import { filterProjects } from '../filters';
import type { Project, ProjectFilter } from '../types';

const filterOptions: readonly (readonly [ProjectFilter, string])[] = [
  ['all', 'All'],
  ['ai', 'AI & Machine Learning'],
  ['web', 'Web Development'],
];

function renderCard(project: Project, index: number): HTMLElement {
  const row = (label: string, text: string) =>
    el('div', {}, [el('dt', { text: label }), el('dd', { text })]);
  return el('article', { className: 'project-card' }, [
    el('div', { className: 'project-panel' }, [
      el('p', { className: 'project-number' }, [
        el('span', { text: 'Project ' }),
        el('span', { className: 'project-hex', text: String(index + 1).padStart(2, '0') }),
      ]),
      el('h3', { text: project.title }),
      el('p', { className: 'project-tag', text: project.category }),
      ...(project.link ? [externalLink(project.link.url, project.link.label, 'project-link')] : []),
    ]),
    el('dl', {}, [
      row('The challenge', project.challenge),
      row(project.builtLabel, project.built),
      row('The outcome', project.outcome),
      ...(project.technology ? [row('Technology', project.technology)] : []),
      ...(project.status ? [row('Project status', project.status)] : []),
    ]),
  ]);
}

export function renderWork(): HTMLElement {
  let filter: ProjectFilter = 'all';
  let query = '';
  const grid = el('div', { className: 'project-grid', attrs: { 'aria-live': 'polite' } });

  function update(): void {
    const visible = filterProjects(projects, filter, query);
    grid.replaceChildren(
      ...(visible.length > 0
        ? visible.map((project) => renderCard(project, projects.indexOf(project)))
        : [el('p', { className: 'project-empty', text: 'No matching projects found. Try another search term.' })]),
    );
  }

  const buttons = filterOptions.map(([value, label]) => {
    const button = el('button', {
      className: 'filter-button',
      text: label,
      attrs: { type: 'button', 'aria-pressed': String(value === filter) },
    });
    button.addEventListener('click', () => {
      filter = value;
      buttons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      update();
    });
    return button;
  });

  const search = el('input', {
    className: 'project-search',
    attrs: { type: 'search', placeholder: 'Search projects...', 'aria-label': 'Search projects' },
  });
  search.addEventListener('input', () => {
    query = search.value;
    update();
  });

  update();
  return el('section', { className: 'work', attrs: { id: 'work' } }, [
    sectionHeading('Selected Work', 'Engineering ideas into real products.', workIntro),
    el('div', { className: 'project-controls reveal' }, [...buttons, search]),
    grid,
  ]);
}
