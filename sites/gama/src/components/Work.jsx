import { useRef } from 'react';
import { gsap, useIsoLayoutEffect, NO_PREF, formatNumber } from '../motion.js';
import { projects } from '../content.js';

function ExternalLink({ host, className }) {
  return (
    <a className={className} href={`https://${host}`} target="_blank" rel="noopener noreferrer">
      {host} ↗<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Work() {
  const root = useRef(null);

  // The dashboard mockup "works" when it scrolls into view: numbers count up, rows arrive,
  // then an invoice is paid and the totals move. Static markup holds the same final-before-payment state.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(NO_PREF, () => {
      const q = gsap.utils.selector(root);
      const sessionsEl = q('[data-tile="sessions"]')[0];
      const unpaidEl = q('[data-tile="unpaid"]')[0];
      const paidEl = q('[data-tile="paid"]')[0];
      const rows = q('[data-row]');
      const pill = q('[data-flip]')[0];
      const browser = q('.browser')[0];
      if (!sessionsEl || !unpaidEl || !paidEl || !pill) return undefined;

      const original = {
        sessions: sessionsEl.textContent,
        unpaid: unpaidEl.textContent,
        paid: paidEl.textContent,
        pillClass: pill.className,
        pillText: pill.textContent,
      };

      const n = { s: 0, u: 0, p: 0 };
      const write = () => {
        sessionsEl.textContent = Math.round(n.s);
        unpaidEl.textContent = `R ${formatNumber(n.u)}`;
        paidEl.textContent = `R ${formatNumber(n.p)}`;
      };
      write();
      gsap.set(rows, { opacity: 0, x: -14 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: browser, start: 'top 72%', once: true },
      });
      tl.to(n, { s: 24, u: 18400, p: 62150, duration: 1.4, ease: 'power2.out', onUpdate: write })
        .to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out' }, 0.2)
        .add(() => {
          pill.className = 'pill pill-paid';
          pill.textContent = 'Paid';
        }, '+=0.8')
        .fromTo(pill, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'power3.out' }, '<')
        .to(n, { u: 12900, p: 67650, duration: 0.9, ease: 'power2.inOut', onUpdate: write }, '<');

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        sessionsEl.textContent = original.sessions;
        unpaidEl.textContent = original.unpaid;
        paidEl.textContent = original.paid;
        pill.className = original.pillClass;
        pill.textContent = original.pillText;
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="proof on-dark" aria-labelledby="work-heading" ref={root}>
      <div className="container proof-grid">
        <div>
          <h2 id="work-heading">A practice website and admin dashboard that keep everything in one place</h2>
          <p>
            For{' '}
            <a href="https://joburgnorthpsychology.co.za" target="_blank" rel="noopener noreferrer">
              Joburg North Psychology<span className="sr-only"> (opens in a new tab)</span>
            </a>
            , GaMa built the public practice website and a private admin backend that tracks clients, sessions, invoices and payments in one place.
          </p>
          <ul className="proof-facts">
            <li>A public website for new clients, and a private backend for the practice</li>
            <li>Clients, sessions, invoices and payments, together</li>
            <li>The picture on the right is a recreation with made-up data, so client details stay private</li>
          </ul>
          {/* Replace with a real quote from the practice owner once Gavin has one. Do not invent testimonials. */}
        </div>
        <figure className="mock-set" style={{ paddingBottom: 0, margin: 0 }}>
          <div className="browser" aria-hidden="true">
            <div className="browser-bar"><i /><i /><i /><span>Practice dashboard</span></div>
            <div className="dash">
              <div className="dash-nav"><span>Clients</span><span className="on">Sessions</span><span>Invoices</span><span>Payments</span></div>
              <div className="dash-main">
                <div className="tiles">
                  <div><small>Sessions this week</small><strong data-tile="sessions">24</strong></div>
                  <div><small>Invoices unpaid</small><strong data-tile="unpaid">R 18 400</strong></div>
                  <div><small>Paid this month</small><strong data-tile="paid">R 62 150</strong></div>
                </div>
                <table>
                  <thead><tr><th>Client</th><th>When</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr data-row><td>Client A-014</td><td>Tue 09:00</td><td><span className="pill pill-paid">Paid</span></td></tr>
                    <tr data-row><td>Client A-022</td><td>Tue 10:30</td><td><span className="pill pill-due" data-flip>Invoice due</span></td></tr>
                    <tr data-row><td>Client A-031</td><td>Wed 14:00</td><td><span className="pill pill-paid">Paid</span></td></tr>
                    <tr data-row><td>Client A-007</td><td>Thu 11:00</td><td><span className="pill pill-due">Invoice due</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <figcaption>Illustrative recreation with made-up data.</figcaption>
        </figure>
      </div>

      <div className="container proj">
        <h3 className="proj-title">Live projects you can visit</h3>
        <p className="proj-intro">A mix of client work and GaMa's own products, all built the way a client project would be.</p>
        <ul className="proj-list">
          {projects.map((p) => (
            <li className="proj-row" key={p.host}>
              <div><p className="proj-name">{p.name}</p><p className="proj-type">{p.type}</p></div>
              <p>{p.text}</p>
              <ExternalLink className="proj-link" host={p.host} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
