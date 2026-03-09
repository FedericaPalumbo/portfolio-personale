/* ================================================================
   animations.js — Scroll reveal, stagger, counter animato
   ================================================================ */

(function () {
  "use strict";

  /* ---- Intersection Observer per .reveal ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  /* ---- Aggiunge delay in stagger agli elementi sibling ---- */
  function applyStaggerDelays() {
    // Raggruppa elementi .reveal per genitore diretto
    const parents = new Set();
    document.querySelectorAll(".reveal").forEach((el) => {
      parents.add(el.parentElement);
    });

    parents.forEach((parent) => {
      const children = Array.from(parent.querySelectorAll(":scope > .reveal"));
      children.forEach((child, i) => {
        if (!child.style.transitionDelay) {
          child.style.transitionDelay = `${i * 0.1}s`;
        }
      });
    });
  }

  /* ---- Counter animato per numeri nelle stat ---- */
  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(/\d+/, "");
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ---- Counter observer ---- */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const strong = entry.target.querySelector("strong");
        if (strong) animateCounter(strong);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  /* ---- Hover tilt leggero sulle skill cards ---- */
  function initTilt() {
    document.querySelectorAll(".skill-card, .intl-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        card.style.transition = "transform 0.1s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      });
    });
  }

  /* ---- Horizontal scroll su skills marquee ---- */
  function initMarqueeHover() {
    const marquee = document.querySelector(".skills-marquee");
    if (!marquee) return;

    const wrap = marquee.closest(".skills-marquee-wrap");
    if (!wrap) return;

    wrap.addEventListener("mouseenter", () => {
      marquee.style.animationPlayState = "paused";
    });
    wrap.addEventListener("mouseleave", () => {
      marquee.style.animationPlayState = "running";
    });
  }

  /* ---- Init ---- */
  function init() {
    applyStaggerDelays();

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    // Counter nelle stats
    document.querySelectorAll(".about-stat").forEach((stat) => {
      counterObserver.observe(stat);
    });

    initTilt();
    initMarqueeHover();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
