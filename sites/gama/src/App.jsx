import Lenis from 'lenis';
import { gsap, ScrollTrigger, useIsoLayoutEffect, NO_PREF, smooth } from './motion.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import { Statement, Services, Glossary, About, BlogTeasers, Faq, Close, Footer } from './components/Sections.jsx';

// Smooth scrolling, the reading-progress bar, the hide-on-scroll header and in-page anchors.
function useSiteScroll() {
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(NO_PREF, () => {
      const lenis = new Lenis({ lerp: 0.1 });
      smooth.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const header = document.querySelector('.site-header');
      lenis.on('scroll', ({ scroll, direction }) => {
        if (!header) return;
        const menuOpen = document.querySelector('.mobile-nav.open');
        if (direction === 1 && scroll > 320 && !menuOpen) header.classList.add('is-hidden');
        else if (direction === -1 || scroll <= 320) header.classList.remove('is-hidden');
      });

      const bar = document.querySelector('.progress');
      const progress = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      });

      const onClick = (e) => {
        const link = e.target.closest?.('a[href^="#"]');
        if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        const id = link.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        const below = target.getBoundingClientRect().top > 0;
        lenis.scrollTo(target, {
          offset: below ? -24 : -88,
          duration: 1.2,
          onComplete: () => {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            window.history.pushState(null, '', `#${id}`);
          },
        });
      };
      document.addEventListener('click', onClick);

      // Fonts change layout height, so measure again once they have loaded.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        document.removeEventListener('click', onClick);
        progress.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
        smooth.lenis = null;
        header?.classList.remove('is-hidden');
      };
    });

    return () => mm.revert();
  }, []);
}

export default function App() {
  useSiteScroll();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Work />
        <Glossary />
        <Process />
        <About />
        <BlogTeasers />
        <Faq />
        <Close />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
