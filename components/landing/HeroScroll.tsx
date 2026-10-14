'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { StoryProduct } from '@/content/story';
import { HERO_CORAL } from '@/lib/hero-blur';

export type HeroItem = StoryProduct & { label: string; tagline: string };

type Props = {
  items: HeroItem[];
  titleLead: string;
  titleItalic: string;
  primaryCta: string;
  secondaryCta: string;
};

/** Pale pink that reads on the coral without washing out. */
const INK = '#FFE3EA';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Scroll-driven hero.
 *
 * One tall section with a sticky stage inside it. Scroll position becomes a
 * single number `s`:
 *
 *   s = 0        opening — all five products fanned out, headline on top
 *   s = 1..5     product 1..5 centred, its ingredients floating around it
 *
 * Every frame we ease the displayed `s` toward the real one (that easing is the
 * "smooth" feel — native scrolling is never hijacked) and write transforms
 * straight to the DOM, so React does not re-render while you scroll.
 *
 * With `prefers-reduced-motion` the whole thing is replaced by a static grid.
 */
export default function HeroScroll({ items, titleLead, titleItalic, primaryCta, secondaryCta }: Props) {
  const N = items.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const bottleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chipRefs = useRef<(HTMLLIElement | null)[][]>(items.map(() => []));
  const introRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [reduced, setReduced] = useState(false);

  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);
  const lastT = useRef(0);
  const stickyTop = useRef(0);
  const mobile = useRef(false);

  const render = useCallback(
    (s: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const mob = mobile.current;
      const centreY = mob ? 53 : 45;

      // Opening state fades out over the first slot.
      const f = 1 - smooth(clamp(s / 0.95));

      // Background eases between each product's colour.
      const bgIndex = clamp(s - 1, 0, N - 1);
      const lo = Math.floor(bgIndex);
      const hi = Math.min(N - 1, lo + 1);
      const bt = smooth(bgIndex - lo);
      const a = hexToRgb(s < 1 ? HERO_CORAL : items[lo].bg);
      const b = hexToRgb(s < 1 ? items[0].bg : items[hi].bg);
      const mixT = s < 1 ? s : bt;
      const rgb = a.map((v, i) => Math.round(lerp(v, b[i], mixT)));
      if (sectionRef.current) {
        sectionRef.current.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
      }

      // Intro copy
      const introOp = 1 - smooth(clamp(s / 0.55));
      introRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = String(introOp);
        el.style.transform = `translate3d(0,${(-s * 40).toFixed(1)}px,0)`;
        el.style.visibility = introOp < 0.02 ? 'hidden' : 'visible';
      });

      let active = -1;

      items.forEach((it, j) => {
        const u = s - (j + 1);
        const au = Math.abs(u);
        if (au < 0.5) active = j;

        const vis = 1 - smooth(clamp((au - 0.1) / 0.55));
        const t = smooth(clamp((au - 0.12) / 0.6));
        const dir = u < 0 ? 1 : -1; // arrives from below, leaves upward

        const st = {
          x: 50 + dir * t * 8,
          y: centreY + dir * t * 44,
          s: 1 - t * 0.2,
          r: dir * t * 14,
        };
        const fan = mob ? it.fan.m : it.fan.d;

        const x = lerp(st.x, fan.x, f);
        const y = lerp(st.y, fan.y, f);
        const sc = lerp(st.s, fan.s, f);
        const r = lerp(st.r, fan.r, f);
        const op = lerp(vis, 1, f);

        const bottle = bottleRefs.current[j];
        if (bottle) {
          bottle.style.transform = `translate(-50%,-50%) translate3d(${(((x - 50) / 100) * W).toFixed(1)}px,${(((y - 50) / 100) * H).toFixed(1)}px,0) rotate(${r.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
          bottle.style.opacity = op.toFixed(3);
          bottle.style.zIndex = String(Math.round(10 - Math.min(au, 1) * 5) + (j === 0 ? 1 : 0));
        }

        // Giant name behind the bottle
        const nameEl = nameRefs.current[j];
        if (nameEl) {
          const nv = (1 - smooth(clamp((au - 0.1) / 0.4))) * (1 - f);
          nameEl.style.opacity = (nv * 0.2).toFixed(3);
          nameEl.style.transform = `translate3d(${(-u * 14).toFixed(1)}vw,0,0)`;
        }

        // Label + CTA under the bottle
        const textEl = textRefs.current[j];
        if (textEl) {
          const tv = 1 - smooth(clamp((au - 0.12) / 0.26));
          textEl.style.opacity = tv.toFixed(3);
          textEl.style.transform = `translate3d(0,${((1 - tv) * 18).toFixed(1)}px,0)`;
          textEl.style.visibility = tv < 0.03 ? 'hidden' : 'visible';
        }

        // Ingredients around the bottle
        const w = 1 - smooth(clamp((au - 0.1) / 0.3));
        chipRefs.current[j].forEach((chip, i) => {
          if (!chip) return;
          const v = clamp((w - i * 0.14) / 0.42);
          const side = chip.dataset.side === 'l' ? -1 : 1;
          const drift = (i % 2 === 0 ? 1 : -1) * u * 34;
          chip.style.opacity = v.toFixed(3);
          chip.style.transform = `translate(-50%,-50%) translate3d(${((1 - v) * 28 * side).toFixed(1)}px,${drift.toFixed(1)}px,0) scale(${(0.9 + v * 0.1).toFixed(3)})`;
          chip.style.visibility = v < 0.02 ? 'hidden' : 'visible';
        });
      });

      dotRefs.current.forEach((dot, j) => {
        if (dot) dot.dataset.active = j === active ? 'true' : 'false';
      });
    },
    [items, N],
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const mq = window.matchMedia('(max-width: 767px)');

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - stage.offsetHeight;
      if (range <= 0) return 0;
      return clamp((stickyTop.current - rect.top) / range) * N;
    };

    const tick = (now: number) => {
      target.current = measure();
      const dt = Math.min(0.05, (now - lastT.current) / 1000 || 0.016);
      lastT.current = now;
      const diff = target.current - current.current;
      current.current = Math.abs(diff) < 0.0006 ? target.current : current.current + diff * (1 - Math.exp(-dt * 9));
      render(current.current);
      raf.current = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf.current) {
        lastT.current = performance.now();
        raf.current = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      mobile.current = mq.matches;
      stickyTop.current = parseFloat(getComputedStyle(stage).top) || 0;
      kick();
    };

    mobile.current = mq.matches;
    stickyTop.current = parseFloat(getComputedStyle(stage).top) || 0;
    // Start exactly where the page is (reload mid-scroll, anchor jumps, back button).
    target.current = current.current = measure();
    render(current.current);

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [N, reduced, render]);

  const goTo = (index: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const range = section.offsetHeight - stage.offsetHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - stickyTop.current + ((index + 1) / N) * range + 1, behavior: 'smooth' });
  };

  if (reduced) {
    return (
      <section
        id="hero"
        className="relative overflow-hidden pb-14 pt-12 text-center"
        style={{ backgroundColor: HERO_CORAL }}
        aria-label="Aurae — the five rituals"
      >
        <div className="shell">
          <h1
            className="u-hero-shadow font-display font-semibold leading-[1.08] tracking-[-0.01em]"
            style={{ color: INK, fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {titleLead} <em className="italic">{titleItalic}</em>
          </h1>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((it) => (
              <li key={it.handle}>
                <Link href={`/product/${it.handle}`} className="block rounded-2xl bg-cream/15 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image}
                    alt={`Aurae ${it.name}`}
                    width={Math.round(1000 * it.aspect)}
                    height={1000}
                    className="mx-auto h-48 w-auto object-contain"
                  />
                  <p className="mt-3 font-display text-[18px] font-semibold uppercase" style={{ color: INK }}>
                    {it.name}
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.14em]" style={{ color: INK }}>
                    {it.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link href="#shop" className="btn-cream">
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const cta = (
    <>
      <Link href="#shop" className="btn-cream">
        {primaryCta}
      </Link>
      <Link
        href="#rituals"
        className="btn u-hero-shadow border-b-2 px-0 py-4 transition-colors duration-300 hover:text-cream"
        style={{ color: INK, borderColor: INK }}
      >
        {secondaryCta} →
      </Link>
    </>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[520svh] md:h-[600svh]"
      style={{ backgroundColor: HERO_CORAL }}
      aria-label="Aurae — the five rituals"
    >
      <div
        ref={stageRef}
        className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden [--bh:min(48svh,100vw)] md:top-[82px] md:h-[calc(100svh-82px)] md:[--bh:min(54svh,580px)]"
      >
        {/* Soft light behind the product */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(255,255,255,0.30),transparent_62%)]"
        />

        {/* Giant product name, behind the bottles */}
        {items.map((it, j) => (
          <div
            key={`name-${it.handle}`}
            ref={(el) => {
              nameRefs.current[j] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[42%] z-[1] -translate-y-1/2 select-none text-center font-display font-semibold leading-none tracking-[-0.02em] opacity-0"
            style={{ color: INK, fontSize: 'clamp(4rem, 21vw, 15rem)' }}
          >
            {it.name}
          </div>
        ))}

        {/* Opening headline */}
        <div
          ref={(el) => {
            introRefs.current[0] = el;
          }}
          className="shell absolute left-0 top-[3%] z-20 text-center md:left-[4%] md:top-[7%] md:w-[42%] md:px-0 md:text-left"
        >
          <h1
            className="u-hero-shadow font-display font-semibold leading-[1.08] tracking-[-0.01em]"
            style={{ color: INK, fontSize: 'clamp(2rem, 4.2vw, 4.25rem)' }}
          >
            {titleLead} <em className="italic">{titleItalic}</em>
          </h1>
          <div className="mt-8 hidden flex-wrap items-center gap-5 md:flex">{cta}</div>
        </div>

        {/* Opening CTAs on phones */}
        <div
          ref={(el) => {
            introRefs.current[1] = el;
          }}
          className="absolute inset-x-0 bottom-[3%] z-20 flex justify-center md:hidden"
        >
          <Link href="#shop" className="btn-cream">
            {primaryCta}
          </Link>
        </div>

        {/* The bottles */}
        {items.map((it, j) => (
          <div
            key={it.handle}
            ref={(el) => {
              bottleRefs.current[j] = el;
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 will-change-transform"
          >
            <div className="animate-float" style={{ animationDelay: `${j * 0.9}s` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={`Aurae ${it.name}`}
                width={Math.round(1000 * it.aspect)}
                height={1000}
                draggable={false}
                fetchPriority={j === 0 ? 'high' : undefined}
                decoding="async"
                className="block w-auto max-w-none select-none drop-shadow-[0_30px_40px_rgba(120,30,50,0.35)]"
                style={{ height: 'var(--bh)' }}
              />
            </div>
          </div>
        ))}

        {/* Ingredients */}
        {items.map((it, j) => (
          <ul key={`chips-${it.handle}`} className="pointer-events-none absolute inset-0 z-20" aria-label={`${it.name} ingredients`}>
            {it.chips.map((chip, i) => (
              <li
                key={chip.name}
                ref={(el) => {
                  chipRefs.current[j][i] = el;
                }}
                data-side={chip.d.x < 50 ? 'l' : 'r'}
                className={[
                  'absolute opacity-0',
                  chip.m ? '' : 'hidden md:block',
                  '[left:var(--mx)] [top:var(--my)] md:[left:var(--dx)] md:[top:var(--dy)]',
                ].join(' ')}
                style={
                  {
                    '--dx': `${chip.d.x}%`,
                    '--dy': `${chip.d.y}%`,
                    '--mx': `${(chip.m ?? chip.d).x}%`,
                    '--my': `${(chip.m ?? chip.d).y}%`,
                  } as React.CSSProperties
                }
              >
                <div className="rounded-full bg-cream/90 px-3.5 py-1.5 text-center shadow-soft backdrop-blur md:px-5 md:py-2.5">
                  <p className="whitespace-nowrap text-[11px] font-semibold leading-tight text-espresso md:text-[14px]">
                    <span aria-hidden className="mr-1 text-coral">
                      ✦
                    </span>
                    {chip.name}
                  </p>
                  <p className="whitespace-nowrap text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-coral md:text-[10px]">
                    {chip.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ))}

        {/* Name, promise and link for the product in focus */}
        {items.map((it, j) => (
          <div
            key={`text-${it.handle}`}
            ref={(el) => {
              textRefs.current[j] = el;
            }}
            className="absolute inset-x-0 bottom-[3%] z-30 flex flex-col items-center gap-2 px-5 text-center opacity-0 md:bottom-[5%] md:gap-3"
            style={{ visibility: 'hidden' }}
          >
            <p className="u-hero-shadow text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: INK }}>
              {it.label}
            </p>
            <p
              className="u-hero-shadow hidden max-w-[34ch] font-display text-[20px] font-medium italic leading-snug md:block"
              style={{ color: INK }}
            >
              {it.tagline}
            </p>
            <Link href={`/product/${it.handle}`} className="btn-cream">
              Shop {it.name}
            </Link>
          </div>
        ))}

        {/* Progress */}
        <div className="absolute right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-6">
          {items.map((it, j) => (
            <button
              key={`dot-${it.handle}`}
              ref={(el) => {
                dotRefs.current[j] = el;
              }}
              type="button"
              onClick={() => goTo(j)}
              aria-label={`Go to ${it.name}`}
              data-active="false"
              className="h-2.5 w-2.5 rounded-full bg-cream/40 transition-all duration-300 hover:bg-cream data-[active=true]:h-6 data-[active=true]:bg-cream"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
