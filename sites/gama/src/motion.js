import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Every animation lives inside this media query, so visitors who ask for reduced motion get the static page.
export const NO_PREF = '(prefers-reduced-motion: no-preference)';

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Shared handle so the mobile menu can pause smooth scrolling while it is open.
export const smooth = { lenis: null };

export const formatNumber = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
