# GaMa Online Marketing — website

Your new site. Plain HTML/CSS, no build step, no dependencies to install or break.

## What's here
- `index.html` — the main site (one page: hero, services, AI explainer, process, case study, blog teaser, FAQ, contact)
- `blog/` — the blog (index + 3 starter posts)
- `css/styles.css` — all the styling (colours, fonts, spacing) in one file
- `js/main.js` — mobile menu + contact form behaviour
- `robots.txt`, `sitemap.xml`, `llms.txt` — so Google (and AI search tools) can find and understand the site

## Buying a domain
Go with `.co.za` for South African trust signals, or `.com` if you want it to read more international. Try to get something close to `gamaonlinemarketing.co.za` — check availability on a registrar like Domains.co.za, Afrihost, or Cloudflare Registrar. Once you own it, tell me and I'll wire it up.

## Editing text yourself later
Every page is plain HTML — open the file in any text editor, find the sentence in plain English, change it, save. Nothing to compile. If that ever feels risky, just ask me.

## Contact form (important — do this before going live)
Right now the contact form opens the visitor's email app pre-filled with their message (works everywhere, zero setup, but relies on them having an email client configured). Before launch, I'd recommend wiring it to a proper form backend (e.g. Cloudflare Pages Functions, or a free tier of Web3Forms/Formspree) so submissions land straight in your inbox even from mobile. Say the word and I'll set it up.

## Deploying (Cloudflare Pages — free)
This site is ready for Cloudflare Pages. Once you're ready to go live, I can either:
1. Connect it to a GitHub repo and deploy through the Cloudflare dashboard (recommended — auto-deploys every time we update the site), or
2. Run `npx wrangler pages deploy .` from this folder for a one-off deploy.

I won't push anything live without checking with you first.

## The blog / ongoing SEO
Per your call: new posts land as **drafts for your review**, not auto-published. I'll set up a recurring task that researches a topic, writes a post in this same plain-spoken voice, and lets you know it's ready to check — nothing goes live until you say so.
