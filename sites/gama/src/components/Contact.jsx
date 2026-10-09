import { useRef, useState } from 'react';
import { EMAIL } from '../content.js';

const NEEDS = [
  'A website',
  'Online marketing (SEO and GEO)',
  'An Android app',
  'AI-powered business software',
  'Not sure yet, just want to chat',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <p className="field-error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const need = String(data.get('need') || '');
    const message = String(data.get('message') || '').trim();

    const next = {};
    if (!name) next.name = 'Please enter your name.';
    if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter an email address like name@example.com.';
    if (!message) next.message = 'Please tell us a little about what you need.';
    setErrors(next);

    const firstBad = ['name', 'email', 'message'].find((k) => next[k]);
    if (firstBad) {
      setStatus('');
      formRef.current.elements[firstBad]?.focus();
      return;
    }

    const subject = `New enquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nNeeds help with: ${need}\n\n${message}`;
    setStatus(`Your email app should open with the message ready to send. If nothing happens, email ${EMAIL} directly.`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const invalid = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-error` } : {});

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container contact-wrap">
        <div>
          <h2 id="contact-heading">Tell Gavin what you're trying to build or fix</h2>
          <p className="lede">Replies come within one working day, usually much sooner.</p>
          <dl className="contact-details">
            <dt>Email</dt>
            <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
            <dt>Based in</dt>
            <dd>Johannesburg, South Africa, working with clients nationwide</dd>
          </dl>
        </div>
        <form id="contact-form" ref={formRef} onSubmit={onSubmit} noValidate>
          <Field id="name" label="Name" error={errors.name}>
            <input id="name" name="name" type="text" required autoComplete="name" {...invalid('name')} />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" required autoComplete="email" {...invalid('email')} />
          </Field>
          <Field id="need" label="What do you need help with?">
            <select id="need" name="need">
              {NEEDS.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field id="message" label="Tell us a bit more" error={errors.message}>
            <textarea id="message" name="message" rows="4" required {...invalid('message')} />
          </Field>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send message</button>
          <p className="form-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  );
}
