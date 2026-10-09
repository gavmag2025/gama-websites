// Renders the React app to static HTML at build time so search engines and
// AI crawlers receive the full page without running JavaScript.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('prerender: root marker not found in dist/index.html');

writeFileSync(resolve(root, 'dist/index.html'), template.replace(marker, `<div id="root">${render()}</div>`));
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('prerender: dist/index.html written with server-rendered content');
