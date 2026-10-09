import { useRef, useState } from 'react';
import { gsap, useIsoLayoutEffect, NO_PREF } from '../motion.js';

const HEADLINE = 'Websites, marketing and software that get your business tuned in.'.split(' ');
const DAYS = ['Mon 12', 'Tue 13', 'Wed 14'];
const SLOTS = ['09:00', '10:30', '14:00', '15:30'];
const CTA_LABEL = ['Choose a day', 'Choose a time', 'Confirm booking', 'Booked ✓'];

export default function Hero() {
  const root = useRef(null);
  // The app mockup tells a tiny story: pick a day, pick a time, booked. The static page shows step 2.
  const [step, setStep] = useState(2);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(NO_PREF, () => {
      const q = gsap.utils.selector(root);
      setStep(0);

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(q('.hl-word'), { yPercent: 112 }, { yPercent: 0, duration: 0.95, stagger: 0.055, ease: 'expo.out' })
        .fromTo(q('.lede, .hero-cta, .hero-note'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.45)
        .fromTo(q('.browser'), { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1 }, 0.35)
        .fromTo(q('.phone'), { opacity: 0, y: 90, rotate: 4 }, { opacity: 1, y: 0, rotate: 0, duration: 1 }, 0.6)
        .call(() => setStep(1), null, 2.2)
        .call(() => setStep(2), null, 2.9)
        .call(() => setStep(3), null, 3.7);

      // Inline start states are now set, so the CSS pre-hide and its failsafe can retire.
      document.documentElement.classList.add('motion-ready');

      return () => {
        tl.kill();
        setStep(2);
      };
    });

    mm.add(`${NO_PREF} and (min-width: 981px)`, () => {
      const q = gsap.utils.selector(root);
      const scrollTrigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('.phone'), { yPercent: -12, ease: 'none', scrollTrigger });
      gsap.to(q('.browser'), { yPercent: 5, ease: 'none', scrollTrigger });
    });

    return () => mm.revert();
  }, []);

  const ctaState = step === 0 ? 'is-idle' : step === 3 ? 'is-done' : '';

  return (
    <section className="hero" ref={root}>
      <div className="container hero-grid">
        <div>
          <h1>
            {HEADLINE.map((word, i) => (
              <span key={i}>
                <span className="hl-mask"><span className="hl-word">{word}</span></span>
                {i < HEADLINE.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className="lede">GaMa builds websites, runs SEO and GEO marketing, and creates Android apps and AI-powered business software for professionals and growing businesses across South Africa.</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Book a free 20-min chat</a>
            <a href="#services" className="btn btn-outline">See what GaMa does</a>
          </div>
          <p className="hero-note">Free 20-minute chat. Plain English. No obligation.</p>
        </div>

        <figure className="mock-set">
          <div className="browser" aria-hidden="true">
            <div className="browser-bar"><i /><i /><i /><span>yourpractice.co.za</span></div>
            <div className="site-mock">
              <div className="site-mock-nav"><span>Your Practice</span><span>Services · About · Contact</span></div>
              <h4>Care you can book in a minute.</h4>
              <p>Clear information, easy booking, found when people search.</p>
              <span className="site-mock-btn">Book an appointment</span>
              <div className="site-mock-row"><span /><span /><span /></div>
            </div>
          </div>
          <div className="phone" aria-hidden="true">
            <div className="phone-status"><span>9:41</span><span>5G</span></div>
            <div className="phone-head">Book a session</div>
            <div className="phone-body">
              <p className="phone-label">Choose a day</p>
              <div className="phone-chips">
                {DAYS.map((d, i) => <span key={d} className={step >= 1 && i === 1 ? 'on' : ''}>{d}</span>)}
              </div>
              <p className="phone-label">Choose a time</p>
              <div className="phone-slots">
                {SLOTS.map((s, i) => <span key={s} className={step >= 2 && i === 2 ? 'on' : ''}>{s}</span>)}
              </div>
              <div className={`phone-cta ${ctaState}`}>{CTA_LABEL[step]}</div>
            </div>
          </div>
          <figcaption>Illustrative examples of a website and a booking app. Not real clients.</figcaption>
        </figure>
      </div>
    </section>
  );
}
