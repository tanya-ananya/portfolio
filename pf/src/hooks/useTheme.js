import { useEffect, useState } from 'react';

const KEY = 'theme';

export default function useTheme() {
  const [pref, setPref] = useState(() => {
    try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; }
  });

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = pref === 'system' ? (mq.matches ? 'dark' : 'light') : pref;
      document.documentElement.dataset.theme = resolved;
    };
    apply();

    try {
      if (pref === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, pref);
    } catch { /* storage blocked: the theme still works for this visit */ }

    // In System mode, follow the OS if it changes while the page is open
    if (pref !== 'system') return;
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [pref]);

  return [pref, setPref];
}