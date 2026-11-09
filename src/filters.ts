import type { Project, ProjectFilter } from './types';

export function filterProjects(
  projects: readonly Project[],
  filter: ProjectFilter,
  query: string,
): readonly Project[] {
  const search = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.categories.includes(filter);
    const text = `${project.title} ${project.category} ${project.challenge} ${project.built} ${project.outcome} ${project.technology ?? ''}`.toLowerCase();
    return matchesFilter && (search === '' || text.includes(search));
  });
}
