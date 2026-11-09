type ElementOptions = {
  readonly className?: string;
  readonly text?: string;
  readonly attrs?: Readonly<Record<string, string>>;
};

/** Creates an element using textContent only, so data can never become HTML. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
  children: readonly Node[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  for (const [name, value] of Object.entries(options.attrs ?? {})) {
    node.setAttribute(name, value);
  }
  node.append(...children);
  return node;
}

export function externalLink(href: string, text: string, className?: string): HTMLAnchorElement {
  return el('a', {
    text,
    ...(className ? { className } : {}),
    attrs: { href, target: '_blank', rel: 'noopener noreferrer' },
  });
}

export function sectionHeading(kicker: string, title: string, intro: readonly string[] = []): HTMLElement {
  return el('div', { className: 'section-heading' }, [
    el('p', { className: 'kicker reveal', text: kicker }),
    el('h2', { className: 'split-heading', text: title }),
    ...intro.map((text) => el('p', { className: 'section-intro reveal', text })),
  ]);
}
