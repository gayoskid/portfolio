import { encodedContacts } from './contact.generated';
import type { ContactKind } from './types';

const KEY = 'gE-both-sides-2026';

function decode(value: string): string {
  const bytes = Uint8Array.from(atob(value), (char, index) =>
    char.charCodeAt(0) ^ KEY.charCodeAt(index % KEY.length),
  );
  return [...new TextDecoder().decode(bytes)].reverse().join('');
}

/** Contact details are only decoded when a visitor actually clicks. */
export function openContact(kind: ContactKind, subject?: string): void {
  const value = decode(encodedContacts[kind]);
  if (kind === 'email') {
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${value}${query}`;
    return;
  }
  window.open(value, '_blank', 'noopener,noreferrer');
}
