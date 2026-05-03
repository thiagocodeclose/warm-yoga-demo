// @ts-nocheck
'use client';
import { useEffect, useRef, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --wm-bg: #FFF8F0;
    --wm-surface: #FFF0E4;
    --wm-card: #FFFFFF;
    --wm-primary: #C2692A;
    --wm-primary-dark: #A0521C;
    --wm-warm: #E8956B;
    --wm-text: #2C1A0E;
    --wm-muted: #8B6B55;
    --wm-border: rgba(194,105,42,0.15);
    --font-display: var(--font-playfair), 'Playfair Display', serif;
    --font-body: var(--font-nunito), 'Nunito Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--wm-bg); color: var(--wm-text); overflow-x: hidden; }

  /* NAV */
  .wm-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 70px;
    transition: background 0.35s, box-shadow 0.35s;
  }
  .wm-nav.scrolled {
    background: rgba(255,248,240,0.97);
    box-shadow: 0 1px 24px rgba(194,105,42,0.10);
    backdrop-filter: blur(12px);
  }
  .wm-nav-logo {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--wm-primary);
    letter-spacing: -0.02em;
    text-decoration: none;
  }
  .wm-nav-links { display: flex; gap: 2rem; align-items: center; }
  .wm-nav-links a {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--wm-text);
    text-decoration: none;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.75;
    transition: opacity 0.2s;
  }
  .wm-nav-links a:hover { opacity: 1; }
  .wm-btn-nav {
    background: var(--wm-primary);
    color: #fff;
    padding: 0.55rem 1.4rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .wm-btn-nav:hover { background: var(--wm-primary-dark); transform: translateY(-1px); }

  /* HERO — SPLIT LAYOUT */
  .wm-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 55fr 45fr;
    overflow: hidden;
  }
  .wm-hero-video-side {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .wm-hero-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .wm-hero-video-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(44,26,14,0.18) 0%, rgba(44,26,14,0.08) 70%, transparent 100%);
  }
  /* temperature badge floating on video */
  .wm-temp-badge {
    position: absolute;
    bottom: 2.5rem; left: 2.5rem;
    background: rgba(194,105,42,0.92);
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    backdrop-filter: blur(8px);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .wm-temp-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #FFD4A8;
    animation: wm-pulse 2s infinite;
  }
  @keyframes wm-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  /* HERO RIGHT SIDE — copy */
  .wm-hero-copy-side {
    background: var(--wm-bg);
    display: flex; align-items: center;
    padding: 7rem 4rem 4rem 4rem;
  }
  .wm-hero-copy { max-width: 460px; }
  .wm-hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--wm-surface);
    border: 1px solid var(--wm-border);
    color: var(--wm-primary);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.4rem 0.9rem;
    border-radius: 2px;
    margin-bottom: 1.5rem;
  }
  .wm-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 600;
    line-height: 1.1;
    color: var(--wm-text);
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  .wm-hero-title em {
    font-style: italic;
    color: var(--wm-primary);
  }
  .wm-hero-sub {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--wm-muted);
    margin-bottom: 2.5rem;
  }
  .wm-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .wm-btn-primary {
    background: var(--wm-primary);
    color: #fff;
    padding: 0.9rem 2rem;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
    border: none; cursor: pointer;
  }
  .wm-btn-primary:hover { background: var(--wm-primary-dark); transform: translateY(-2px); }
  .wm-btn-outline {
    background: transparent;
    color: var(--wm-text);
    padding: 0.9rem 2rem;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1.5px solid rgba(44,26,14,0.2);
    transition: border-color 0.2s, color 0.2s;
  }
  .wm-btn-outline:hover { border-color: var(--wm-primary); color: var(--wm-primary); }

  /* HEAT INDICATOR ROW */
  .wm-heat-row {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--wm-border);
    display: flex; gap: 2rem;
  }
  .wm-heat-item { display: flex; flex-direction: column; gap: 0.2rem; }
  .wm-heat-value {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--wm-primary);
  }
  .wm-heat-label {
    font-size: 0.75rem;
    color: var(--wm-muted);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .wm-section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--wm-primary);
    margin-bottom: 0.75rem;
  }
  .wm-section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600;
    line-height: 1.15;
    color: var(--wm-text);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  .wm-section-sub {
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--wm-muted);
    max-width: 560px;
  }

  /* BENEFITS */
  .wm-benefits-section { background: var(--wm-surface); }
  .wm-benefits-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  }
  .wm-benefits-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
  }
  .wm-benefit-card {
    background: var(--wm-card);
    border: 1px solid var(--wm-border);
    border-radius: 8px;
    padding: 1.75rem;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .wm-benefit-card:hover { box-shadow: 0 8px 32px rgba(194,105,42,0.10); transform: translateY(-3px); }
  .wm-benefit-icon {
    width: 44px; height: 44px;
    background: var(--wm-surface);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
    color: var(--wm-primary);
    font-size: 1.2rem;
  }
  .wm-benefit-title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--wm-text);
    margin-bottom: 0.5rem;
  }
  .wm-benefit-desc { font-size: 0.9rem; line-height: 1.65; color: var(--wm-muted); }

  /* CLASSES */
  .wm-classes-section { background: var(--wm-bg); }
  .wm-classes-inner { max-width: 1200px; margin: 0 auto; }
  .wm-classes-header { text-align: center; margin-bottom: 3.5rem; }
  .wm-classes-header .wm-section-sub { margin: 0 auto; text-align: center; }
  .wm-classes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .wm-class-card {
    background: var(--wm-card);
    border: 1px solid var(--wm-border);
    border-radius: 10px;
    padding: 2rem;
    position: relative;
    transition: box-shadow 0.25s, transform 0.25s;
    overflow: hidden;
  }
  .wm-class-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--wm-primary);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .wm-class-card:hover { box-shadow: 0 12px 40px rgba(194,105,42,0.12); transform: translateY(-4px); }
  .wm-class-card:hover::before { opacity: 1; }
  .wm-class-meta {
    display: flex; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap;
  }
  .wm-class-badge {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border-radius: 3px;
  }
  .wm-badge-temp {
    background: rgba(194,105,42,0.1);
    color: var(--wm-primary);
  }
  .wm-badge-dur {
    background: var(--wm-surface);
    color: var(--wm-muted);
  }
  .wm-class-name {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--wm-text);
    margin-bottom: 0.75rem;
  }
  .wm-class-desc { font-size: 0.9rem; line-height: 1.65; color: var(--wm-muted); }

  /* TEMP BANNER */
  .wm-temp-banner {
    background: var(--wm-primary);
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    overflow: hidden;
  }
  .wm-temp-banner span { opacity: 0.85; }
  .wm-temp-banner strong { opacity: 1; font-weight: 800; }

  /* STATS */
  .wm-stats-section {
    background: var(--wm-text);
    padding: 5rem 2rem;
  }
  .wm-stats-inner {
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2rem; text-align: center;
  }
  .wm-stat-value {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--wm-warm);
    margin-bottom: 0.4rem;
  }
  .wm-stat-label {
    font-size: 0.8rem;
    color: rgba(255,248,240,0.6);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* PRICING */
  .wm-pricing-section { background: var(--wm-surface); }
  .wm-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .wm-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .wm-pricing-header .wm-section-sub { margin: 0 auto; }
  .wm-pricing-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .wm-price-card {
    background: var(--wm-card);
    border: 1.5px solid var(--wm-border);
    border-radius: 12px;
    padding: 2.5rem 2rem;
    position: relative;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .wm-price-card.highlight {
    border-color: var(--wm-primary);
    box-shadow: 0 0 0 3px rgba(194,105,42,0.08);
  }
  .wm-price-card:hover { box-shadow: 0 12px 40px rgba(194,105,42,0.14); transform: translateY(-4px); }
  .wm-popular-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--wm-primary);
    color: #fff;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.25rem 0.9rem;
    border-radius: 20px;
  }
  .wm-price-name {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--wm-text);
    margin-bottom: 1rem;
  }
  .wm-price-amount {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--wm-primary);
    line-height: 1;
    margin-bottom: 0.25rem;
  }
  .wm-price-period { font-size: 0.85rem; color: var(--wm-muted); margin-bottom: 1.75rem; }
  .wm-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
  .wm-price-features li {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-size: 0.9rem; color: var(--wm-muted); line-height: 1.5;
  }
  .wm-check { color: var(--wm-primary); font-weight: 700; flex-shrink: 0; }
  .wm-price-cta {
    display: block; text-align: center;
    padding: 0.85rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s;
  }
  .wm-price-card.highlight .wm-price-cta {
    background: var(--wm-primary); color: #fff;
  }
  .wm-price-card.highlight .wm-price-cta:hover { background: var(--wm-primary-dark); }
  .wm-price-card:not(.highlight) .wm-price-cta {
    border: 1.5px solid rgba(44,26,14,0.2); color: var(--wm-text);
  }
  .wm-price-card:not(.highlight) .wm-price-cta:hover { border-color: var(--wm-primary); color: var(--wm-primary); }

  /* CTA SECTION */
  .wm-cta-section {
    background: var(--wm-primary);
    padding: 6rem 2rem;
    text-align: center;
  }
  .wm-cta-inner { max-width: 600px; margin: 0 auto; }
  .wm-cta-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    color: #fff;
    margin-bottom: 1rem;
    line-height: 1.15;
  }
  .wm-cta-sub { font-size: 1.05rem; color: rgba(255,248,240,0.8); margin-bottom: 2.5rem; line-height: 1.7; }
  .wm-btn-light {
    background: #fff;
    color: var(--wm-primary);
    padding: 1rem 2.5rem;
    border-radius: 4px;
    font-weight: 800;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .wm-btn-light:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

  /* FOOTER */
  .wm-footer {
    background: var(--wm-text);
    color: rgba(255,248,240,0.7);
    padding: 3.5rem 2rem 2rem;
  }
  .wm-footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem;
  }
  .wm-footer-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--wm-warm);
    margin-bottom: 0.75rem;
  }
  .wm-footer-tagline { font-size: 0.9rem; line-height: 1.6; max-width: 300px; }
  .wm-footer-h { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,248,240,0.4); margin-bottom: 1rem; }
  .wm-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .wm-footer-links a { color: rgba(255,248,240,0.7); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .wm-footer-links a:hover { color: var(--wm-warm); }
  .wm-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,248,240,0.1);
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.8rem; color: rgba(255,248,240,0.4);
    flex-wrap: wrap; gap: 0.5rem;
  }
  .wm-footer-brand { color: var(--wm-warm); font-weight: 700; text-decoration: none; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .wm-hero { grid-template-columns: 1fr; }
    .wm-hero-video-side { min-height: 55vw; max-height: 60vh; }
    .wm-hero-copy-side { padding: 3.5rem 1.5rem; }
    .wm-benefits-inner { grid-template-columns: 1fr; }
    .wm-classes-grid { grid-template-columns: 1fr; }
    .wm-pricing-grid { grid-template-columns: 1fr; }
    .wm-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .wm-footer-inner { grid-template-columns: 1fr; }
    .wm-nav-links { display: none; }
    .wm-temp-banner { flex-direction: column; gap: 0.5rem; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const ICONS = {
  fire: '🔥',
  leaf: '🌿',
  drop: '💧',
  mind: '🧘',
};

export default function WarmPage() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const benefitIcons = [ICONS.fire, ICONS.drop, ICONS.leaf, ICONS.mind];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav ref={navRef} className={`wm-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="wm-nav-logo">Warm Studio</a>
        <div className="wm-nav-links">
          <a href="#classes">Classes</a>
          <a href="#benefits">Why Heat</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#intro" className="wm-btn-nav">Try a Class</a>
        </div>
      </nav>

      {/* HERO — SPLIT LAYOUT */}
      <section id="intro" className="wm-hero">
        {/* LEFT: VIDEO */}
        <div className="wm-hero-video-side">
          <video
            className="wm-hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-in-a-studio-32874-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="wm-hero-video-overlay" />
          <div className="wm-temp-badge">
            <span className="wm-temp-dot" />
            Studio: 88–95°F
          </div>
        </div>

        {/* RIGHT: COPY */}
        <div className="wm-hero-copy-side">
          <div className="wm-hero-copy">
            <div className="wm-hero-tag">
              {ICONS.fire} Infrared-Heated Yoga
            </div>
            <h1 data-cg-el="hero_headline_1" className="wm-hero-title">
              Feel the <em>heat.</em><br />
              Find yourself.
            </h1>
            <p data-cg-el="hero_subtitle" className="wm-hero-sub">
              Warm Studio brings together the ancient power of yoga and modern infrared heat technology — for deeper flexibility, real detoxification, and a practice that transforms more than just your body.
            </p>
            <div className="wm-hero-actions">
              <a data-cg-el="hero_cta_primary" href="#pricing" className="wm-btn-primary">Try Your First Class</a>
              <a data-cg-el="hero_cta_secondary" href="#classes" className="wm-btn-outline">See Schedule</a>
            </div>
            <div className="wm-heat-row">
              {siteData.stats.map((s) => (
                <div key={s.label} className="wm-heat-item">
                  <span className="wm-heat-value">{s.value}</span>
                  <span className="wm-heat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEMP BANNER */}
      <div className="wm-temp-banner">
        <span><strong>Hot Vinyasa</strong> — 95°F</span>
        <span><strong>Infrared Yin</strong> — 88°F</span>
        <span><strong>Hot Power</strong> — 95°F</span>
        <span><strong>Warm Restore</strong> — 85°F</span>
      </div>

      {/* BENEFITS */}
      <section id="benefits" className="wm-benefits-section">
        <div className="wm-benefits-inner">
          <div className="reveal">
            <span className="wm-section-tag">Why the Heat Works</span>
            <h2 className="wm-section-title">
              Science behind<br />the warmth
            </h2>
            <p className="wm-section-sub">
              Infrared heat is different from conventional heat. It radiates directly into your body — not just the air around you — activating cellular repair, deepening flexibility, and creating a meditative warmth that transforms every class.
            </p>
          </div>
          <div className="wm-benefits-grid">
            {siteData.benefits.map((b, i) => (
              <div key={b.title} className="wm-benefit-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="wm-benefit-icon">{benefitIcons[i]}</div>
                <div className="wm-benefit-title">{b.title}</div>
                <p className="wm-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="wm-stats-section">
        <div className="wm-stats-inner">
          {siteData.stats.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="wm-stat-value">{s.value}</div>
              <div className="wm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="wm-classes-section">
        <div className="wm-classes-inner">
          <div className="wm-classes-header reveal">
            <span className="wm-section-tag">What We Offer</span>
            <h2 className="wm-section-title">Our class formats</h2>
            <p className="wm-section-sub">
              From fast-moving power flows to deep restorative holds — every format is practised in our perfectly calibrated infrared studio.
            </p>
          </div>
          <div className="wm-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="wm-class-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="wm-class-meta">
                  <span className="wm-class-badge wm-badge-temp">{c.temp}</span>
                  <span className="wm-class-badge wm-badge-dur">{c.duration}</span>
                </div>
                <div className="wm-class-name">{c.name}</div>
                <p className="wm-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="wm-pricing-section">
        <div className="wm-pricing-inner">
          <div className="wm-pricing-header reveal">
            <span className="wm-section-tag">Membership</span>
            <h2 className="wm-section-title">Simple, honest pricing</h2>
            <p className="wm-section-sub">
              Your first class is on us — then choose the plan that matches your practice.
            </p>
          </div>
          <div className="wm-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`wm-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="wm-popular-badge">Most Popular</span>}
                <div className="wm-price-name">{p.name}</div>
                <div className="wm-price-amount">{p.price}</div>
                <div className="wm-price-period">{p.period}</div>
                <ul className="wm-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="wm-check">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#intro" className="wm-price-cta">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wm-cta-section">
        <div className="wm-cta-inner">
          <h2 className="wm-cta-title reveal">Your first class is free</h2>
          <p className="wm-cta-sub reveal">
            No commitment. No experience required. Just show up — we'll take care of the rest. Mats, towels, and water available in-studio.
          </p>
          <a href="#contact" className="wm-btn-light reveal">Claim Your Free Class</a>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="wm-footer">
        <div className="wm-footer-inner">
          <div>
            <div className="wm-footer-logo">Warm Studio</div>
            <p className="wm-footer-tagline">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="wm-footer-h">Studio</div>
            <ul className="wm-footer-links">
              <li><a href="#classes">Class Schedule</a></li>
              <li><a href="#benefits">Why Infrared</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Teacher Training</a></li>
            </ul>
          </div>
          <div>
            <div className="wm-footer-h">Info</div>
            <ul className="wm-footer-links">
              <li><a href="#">New Students</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="wm-footer-bottom">
          <span>© {new Date().getFullYear()} Warm Studio. All rights reserved.</span>
          <span>Powered by <a href="https://koriva.com" className="wm-footer-brand">Koriva</a></span>
        </div>
      </footer>
    </>
  );
}
