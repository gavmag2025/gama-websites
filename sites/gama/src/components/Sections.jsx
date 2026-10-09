import { useRef } from 'react';
import { gsap, useIsoLayoutEffect, NO_PREF } from '../motion.js';
import { services, glossary, posts, faqs, EMAIL } from '../content.js';

export function Statement() {
  return (
    <section className="statement" aria-label="Who GaMa is for">
      <div className="container">
        <p>Built for doctors, therapists, accountants, consultants and growing businesses who are <span>brilliant at their work</span> and would rather not spend a minute on tech or marketing.</p>
      </div>
    </section>
  );
}

export function Services() {
  const root = useRef(null);

  // A list that appears as a list: each rule draws across, then the row settles in.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(NO_PREF, () => {
      const rows = root.current.querySelectorAll('.svc-row');
      const tween = gsap.fromTo(
        rows,
        { opacity: 0, y: 30, '--draw': 0 },
        {
          opacity: 1, y: 0, '--draw': 1, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: root.current.querySelector('.svc-list'), start: 'top 82%', once: true },
        },
      );
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="services" className="section section-paper" aria-labelledby="services-heading" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 id="services-heading">Four things, done properly</h2>
          <p className="lede">Each one stands on its own, and they work even better together.</p>
        </div>
        <div className="svc-list">
          {services.map((s) => (
            <div className="svc-row" key={s.title}>
              <h3>{s.title}</h3>
              <div>
                <p>{s.text}</p>
                <a href="#contact">{s.cta} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Glossary() {
  return (
    <section id="glossary" className="glossary on-dark" aria-labelledby="glossary-heading">
      <div className="container glossary-grid">
        <div>
          <h2 id="glossary-heading">Two phrases you keep hearing, in plain English</h2>
          <p>AI-built means the software is described in plain English and AI does much of the typing. A person still designs it, tests it and checks that it works for your business.</p>
          <p>GEO is the newer half. People now ask ChatGPT or Google's AI Overview instead of typing a search, and GEO makes sure your business is mentioned in the answer, the way SEO makes sure it shows up in a normal search.</p>
          <a href="/blog/what-is-vibe-coding.html" className="btn btn-light" style={{ marginTop: 8 }}>Read the full explainer →</a>
        </div>
        <dl>
          {glossary.map(([term, meaning]) => (
            <div className="gl-row" key={term}><dt>{term}</dt><dd>{meaning}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section section-paper" aria-labelledby="about-heading">
      <div className="container about-grid">
        {/* Swap this monogram for a real photo of Gavin: <img src="/images/gavin.jpg" alt="Gavin Magid" width="280" height="280" /> */}
        <div className="portrait" role="img" aria-label="Gavin Magid">GM</div>
        <div>
          <h2 id="about-heading">Meet Gavin</h2>
          <p className="lede">GaMa is run by Gavin Magid from Johannesburg. Clients deal with Gavin directly, not an account manager, and every build is checked by a person before it goes live.</p>
          <a href="#contact" className="btn btn-primary">Book a free chat with Gavin</a>
        </div>
      </div>
    </section>
  );
}

export function BlogTeasers() {
  return (
    <section className="section" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="blog-heading">Straight answers, from the blog</h2>
        </div>
        <div className="post-list">
          {posts.map((p) => (
            <a className="post-row" href={p.href} key={p.href}>
              <p className="post-meta">{p.meta}</p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </a>
          ))}
        </div>
        <p style={{ marginTop: 28 }}><a href="/blog/" className="btn btn-outline">Read more on the blog</a></p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section section-paper" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="faq-heading">Questions people ask first</h2>
        </div>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}<span className="plus" aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className="close" aria-labelledby="close-heading">
      <div className="container close-inner">
        <div>
          <h2 id="close-heading">Ready to get your business tuned in?</h2>
          <p>Free 20-minute chat. Plain English, no obligation.</p>
        </div>
        <a href="#contact" className="btn btn-primary">Book your free chat</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/" className="brand">
              <span className="brand-text">
                <span className="brand-name">GaMa</span>
                <span className="brand-sub">Gavin Magid · Web &amp; Online Marketing Solutions</span>
              </span>
            </a>
            <p style={{ maxWidth: 300, marginTop: 14 }}>Websites, online marketing, Android apps and AI-powered business software for professionals and growing businesses.</p>
          </div>
          <div>
            <h4>Site</h4>
            <ul className="footer-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#glossary">Plain English</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="/blog/">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href="#contact">Book a free chat</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 GaMa – Gavin Magid Web and Online Marketing Solutions</span>
          <span>Johannesburg, South Africa</span>
        </div>
      </div>
    </footer>
  );
}
