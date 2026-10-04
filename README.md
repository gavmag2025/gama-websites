# GaMa websites

Monorepo for GaMa – Gavin Magid Web and Online Marketing Solutions (Johannesburg, South Africa).

- `sites/gama/` is the agency site: static HTML/CSS/JS, no build step, target Cloudflare Pages. See `sites/gama/PRODUCT.md` for positioning and `sites/gama/README.md` for notes.
- `starter/` and `scripts/` are reserved for a reusable template and a scaffold script for end-customer sites (not built yet).

Each site deploys as its own Cloudflare Pages project with the root directory set to `sites/<slug>`, no build command.

Nothing publishes automatically. Blog drafts are reviewed before they go live.
