import { useEffect, useRef, useState } from 'react';
import { smooth } from '../motion.js';

const links = [
  ['#services', 'Services'],
  ['#work', 'Work'],
  ['#glossary', 'Plain English'],
  ['/blog/', 'Blog'],
  ['#faq', 'FAQ'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.style.overflow = 'hidden';
    smooth.lenis?.stop();
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll('a, button')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      smooth.lenis?.start();
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Primary">
          <a href="/" className="brand">
            <svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14.5" stroke="#C5CBD6" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="9" stroke="#FF6B1A" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="2.2" fill="#1D4FE0" />
              <line x1="16" y1="16" x2="24" y2="9" stroke="#1D4FE0" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="brand-text">
              <span className="brand-name">GaMa</span>
              <span className="brand-sub">Gavin Magid · Web &amp; Online Marketing Solutions</span>
            </span>
          </a>
          <ul className="nav-links">
            {links.map(([href, label]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-outline">Contact</a>
            <a href="#contact" className="btn btn-primary">Book a free chat</a>
            <button
              ref={toggleRef}
              className="nav-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={drawerRef}
        className={`mobile-nav${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="mobile-nav-top">
          <a href="/" className="brand">GaMa</a>
          <button
            ref={closeRef}
            className="mobile-nav-close btn btn-dark"
            type="button"
            aria-label="Close menu"
            onClick={() => { setOpen(false); toggleRef.current?.focus(); }}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#contact" className="btn btn-orange" onClick={() => setOpen(false)}>Book a free chat</a>
      </div>
    </>
  );
}
