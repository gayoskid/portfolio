import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/jetbrains-mono/400.css';
import './style.css';

import { initAnimations } from './animations';
import { renderCareers } from './render/careers';
import { renderHero } from './render/hero';
import { renderNav } from './render/nav';
import { renderResearch } from './render/research';
import { renderContact, renderExperience, renderFooter, renderServices, renderSkills } from './render/sections';
import { renderWork } from './render/work';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app element');

const research = renderResearch();
const main = document.createElement('main');
main.append(
  renderHero(),
  renderCareers(),
  renderWork(),
  renderServices(),
  research.element,
  renderExperience(),
  renderSkills(),
  renderContact(),
);
app.append(renderNav(), main, renderFooter());

initAnimations(research);
