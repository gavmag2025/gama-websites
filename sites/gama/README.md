# GaMa – Gavin Magid Web and Online Marketing Solutions: website

React + GSAP + Lenis, built with Vite. The homepage is prerendered to plain HTML at build time, so Google and AI crawlers see the full page without running JavaScript. The blog is static HTML in `public/blog/`.

## Run it
```bash
npm install
npm run dev      # dev server on http://localhost:8788
npm run build    # production build into dist/ (client bundle + prerendered index.html)
npm run preview  # serve the built dist/ on http://localhost:8789
```

## Where things are
- `src/components/` sections of the homepage (Hero, Work, Process, Contact, and the rest in Sections.jsx)
- `src/content.js` the text for services, projects, FAQ, steps and blog teasers. Most copy edits happen here.
- `src/motion.js` shared GSAP setup. Every animation sits inside a "no reduced motion" check, so visitors who ask for less motion get a static page.
- `src/motion.css` motion-specific styles, plus the failsafe that reveals the hero if scripts fail
- `public/css/styles.css` the design system, shared by the homepage and the blog
- `public/blog/`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` copied to the site as-is
- `PRODUCT.md` positioning, audience and what evidence may be claimed

## Deploying (Cloudflare Pages, not set up yet)
Create a Pages project from the GitHub repo with: root directory `sites/gama`, build command `npm run build`, output directory `dist`. Nothing is deployed and no domain is connected yet.

## Things to replace before launch
- The "GM" monogram in the About section: add a real photo as `public/images/gavin.jpg` and swap the marked line in `src/components/Sections.jsx`.
- A real quote from the practice owner (never invent testimonials). See the comment in `src/components/Work.jsx`.
- The contact form currently opens the visitor's email app with the message filled in. A real form backend (for example a Cloudflare Pages Function) should replace it.
- The domain `gamaonlinemarketing.co.za` is a placeholder in the page tags, sitemap, robots.txt, llms.txt and contact email.
- The three blog posts were drafted by an assistant and contain unverified details. Check them before publishing.
