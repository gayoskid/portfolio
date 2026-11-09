import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ResearchController } from './render/research';

const MOTION_OK = '(prefers-reduced-motion: no-preference)';
// Below this height the research section cannot fit on screen, so it scrolls normally.
const DESKTOP_MOTION = `(min-width: 901px) and (min-height: 600px) and ${MOTION_OK}`;

function headerHeight(): number {
  return document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
}

function publishHeaderHeight(): void {
  document.documentElement.style.setProperty('--header-height', `${headerHeight()}px`);
}

function splitWords(heading: HTMLElement): HTMLElement[] {
  const words = (heading.textContent ?? '').trim().split(/\s+/);
  heading.setAttribute('aria-label', words.join(' '));
  const inners = words.map((word) => {
    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.textContent = word;
    const outer = document.createElement('span');
    outer.className = 'word';
    outer.setAttribute('aria-hidden', 'true');
    outer.append(inner);
    return { outer, inner };
  });
  heading.replaceChildren();
  inners.forEach(({ outer }, index) => {
    heading.append(outer);
    if (index < inners.length - 1) heading.append(' ');
  });
  return inners.map(({ inner }) => inner);
}

function animateHero(): void {
  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('.nav-touch, .brand, .nav-links', { y: -24, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0)
    .from('.hero-hello', { scale: 0, rotate: -40, autoAlpha: 0, duration: 0.6, ease: 'back.out(3)' }, '-=0.4')
    .from('.hero-intro > *, .hero-actions, .hero-points > *', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, '-=0.3')
    .from('.hero-portrait .hex-back', { scale: 0.3, rotate: -35, autoAlpha: 0, duration: 1 }, '-=0.45')
    .from('.hero-portrait .hex-image', { y: 80, autoAlpha: 0, duration: 0.9 }, '-=0.75')
    .from('.orbit-ring', { scale: 0.5, autoAlpha: 0, duration: 1, stagger: 0.18 }, '-=0.6')
    .from('.hero-side > *', { y: 30, autoAlpha: 0, duration: 0.65, stagger: 0.09 }, '-=0.6')
    .from('.hero-dot', { scale: 0, duration: 0.4, stagger: 0.03, ease: 'back.out(4)' }, '-=0.4');

  gsap.utils.toArray<HTMLElement>('.hero-dot').forEach((dot) => {
    // Keep the dots around the portrait's edges so they never sit on the face.
    const onLeft = Math.random() < 0.5;
    const left = onLeft ? gsap.utils.random(-6, 10) : gsap.utils.random(90, 106);
    gsap.set(dot, { left: `${left}%`, top: `${gsap.utils.random(0, 100)}%` });
    gsap.to(dot, {
      x: gsap.utils.random(-34, 34),
      y: gsap.utils.random(-34, 34),
      duration: gsap.utils.random(2.5, 5),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  gsap.to('.hero-portrait .hex-back', { rotate: 6, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero-bubble', { y: -10, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((node) => {
    const target = Number(node.dataset.count);
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 2.2,
      delay: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        node.textContent = Math.round(counter.value).toLocaleString('en-US');
      },
    });
  });

  gsap.to('.hero-portrait', {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

function animateSections(): void {
  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  gsap.utils.toArray<HTMLElement>('.split-heading').forEach((heading) => {
    gsap.from(splitWords(heading), {
      yPercent: 115,
      duration: 0.85,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
    });
  });

  gsap.set('.reveal', { y: 44, autoAlpha: 0 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out' }),
  });

  gsap.from('.career-stage', {
    scale: 0.92,
    autoAlpha: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.career-stage', start: 'top 85%', once: true },
  });

  gsap.from('.timeline-line', {
    scaleY: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
  });
  gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
    const timeline = gsap.timeline({
      defaults: { duration: 0.7, ease: 'power3.out' },
      scrollTrigger: { trigger: item, start: 'top 80%', once: true },
    });
    timeline
      .from(item.querySelector('.timeline-dot'), { scale: 0, ease: 'back.out(4)' })
      .from(item.querySelector('.timeline-organisation'), { x: -50, autoAlpha: 0 }, 0)
      .from(item.querySelector('.timeline-content'), { x: 50, autoAlpha: 0 }, 0);
  });

  gsap.from('.bar-fill', {
    width: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.research-side', start: 'top 80%', once: true },
  });
  gsap.from('.project-card', {
    y: 50,
    autoAlpha: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.project-grid', start: 'top 85%', once: true },
  });
}

function pinResearch(research: ResearchController): () => void {
  const trigger = ScrollTrigger.create({
    trigger: research.pin,
    // Pin just below the sticky header so nothing is hidden behind it.
    start: () => `top ${headerHeight()}px`,
    end: () => `+=${window.innerHeight * 2}`,
    pin: true,
    scrub: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      research.setStage(Math.min(research.stageCount - 1, Math.floor(self.progress * research.stageCount)));
    },
  });
  research.onStagePick((index) => {
    const position = trigger.start + ((index + 0.5) / research.stageCount) * (trigger.end - trigger.start);
    window.scrollTo({ top: position, behavior: 'smooth' });
  });
  return () => research.onStagePick((index) => research.setStage(index));
}

export function initAnimations(research: ResearchController): void {
  gsap.registerPlugin(ScrollTrigger);
  publishHeaderHeight();
  ScrollTrigger.addEventListener('refreshInit', publishHeaderHeight);
  const media = gsap.matchMedia();
  media.add(MOTION_OK, () => {
    animateHero();
    animateSections();
  });
  media.add(DESKTOP_MOTION, () => pinResearch(research));

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  void document.fonts.ready.then(refresh);
}
