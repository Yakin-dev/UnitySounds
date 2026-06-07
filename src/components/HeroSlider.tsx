import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    src: "/slides/slide1.jpg",
    alt: "Professional LED Par lighting array – green, blue, red and purple fixtures",
    headline: "Premium Stage Lighting",
    sub: "Vivid LED par systems that transform any venue into a spectacular stage.",
  },
  {
    src: "/slides/slide2.jpg",
    alt: "Live cultural performance – artists singing on a black runway stage with blue mood lighting",
    headline: "Live Event Excellence",
    sub: "From intimate ceremonies to grand concerts — we handle every detail of your sound.",
  },
  {
    src: "/slides/slide3.jpg",
    alt: "Clean stage setup with professional speakers and flight cases ready for an event",
    headline: "Event-Ready Sound Systems",
    sub: "Professional PA, monitors and flight-case rigs — delivered, installed and engineered.",
  },
  {
    src: "/slides/slide4.jpg",
    alt: "Upscale restaurant lounge with lush greenery, velvet sofas and a fully stocked bar",
    headline: "Corporate & Venue Audio",
    sub: "Discreet background music, speeches and live sets — tailored for upscale hospitality.",
  },
  {
    src: "/slides/slide5.jpg",
    alt: "Elegant marquee reception with white draping, gold chairs and fairy-light ceiling",
    headline: "Weddings & Private Events",
    sub: "Flawless audio for your most important moments — luxury sound without compromise.",
  },
];

const INTERVAL = 5000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      className="hero-slider"
      aria-label="Hero image slideshow"
      role="region"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide ${i === current ? "hero-slide--active" : ""}`}
          aria-hidden={i !== current}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="hero-slide__img"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Gradient overlay */}
          <div className="hero-slide__overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="hero-content">
        <div className="hero-content__inner">
          <span className="hero-badge">
            <Sparkles className="hero-badge__icon" aria-hidden="true" />
            A Unity Fashions Management Division
          </span>

          <h1 className="hero-title">
            Unity <span className="text-gradient-gold">Sounds</span>
          </h1>

          <p className="hero-slide-headline" key={current}>
            {slides[current].headline}
          </p>

          <p className="hero-sub" key={`sub-${current}`}>
            {slides[current].sub}
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-gold">
              Book Sound Setup <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn-outline">
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="slider-arrow slider-arrow--left"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="slider-arrow slider-arrow--right"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${slide.headline}`}
            className={`slider-dot ${i === current ? "slider-dot--active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="slider-progress" key={current}>
        <div className="slider-progress__bar" />
      </div>
    </section>
  );
}
