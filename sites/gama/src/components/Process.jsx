import { useRef } from 'react';
import { gsap, ScrollTrigger, useIsoLayoutEffect, NO_PREF } from '../motion.js';
import { steps } from '../content.js';

export default function Process() {
  const root = useRef(null);

  // The steps are a real sequence, so scroll progress fills a line and lights each step as it is reached.
  // Desktop only: on narrow screens the steps stack and the line would not map to them.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(`${NO_PREF} and (min-width: 981px)`, () => {
      const wrap = root.current.querySelector('.steps');
      const bar = root.current.querySelector('.steps-progress');
      const items = [...root.current.querySelectorAll('.step')];
      wrap.classList.add('is-armed');
      gsap.set(bar, { scaleX: 0 });

      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 78%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
          items.forEach((el, i) => el.classList.toggle('reached', self.progress >= i * 0.25 + 0.01));
        },
      });

      return () => {
        trigger.kill();
        wrap.classList.remove('is-armed');
        items.forEach((el) => el.classList.remove('reached'));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" className="section" aria-labelledby="process-heading" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 id="process-heading">From "we should really sort our tech out" to live</h2>
        </div>
        <div className="steps">
          <span className="steps-progress" aria-hidden="true" />
          {steps.map(([title, text], i) => (
            <div className="step" key={title}>
              <span className="step-num">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
