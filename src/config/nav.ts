export interface NavItem {
  label: string;
  /** Path relative to the site base, with trailing slash ('' = home). */
  path: string;
}

/** Routes are code (src/pages/*), so the navigation lives in code too. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About', path: '' },
  { label: 'Research', path: 'research/' },
  { label: 'Participate', path: 'participate/' },
  { label: 'FAQ', path: 'faq/' },
  { label: 'Contact', path: 'contact/' },
];
