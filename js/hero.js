/* ================================================================
   hero.js — Animazioni GSAP hero (fallback se preloader non attivo)
   ================================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Le animazioni hero sono gestite dal preloader.js con CSS transitions.
    // Questo file gestisce effetti aggiuntivi con GSAP (se disponibile).

    if (typeof gsap === "undefined") return;

    // Parallax leggero sull'immagine hero allo scroll
    const heroPhoto = document.querySelector(".hero-photo-frame");
    const heroBg = document.querySelector(".hero-bg-grid");

    if (heroPhoto || heroBg) {
      gsap.registerPlugin(ScrollTrigger);

      if (heroPhoto && window.matchMedia("(min-width: 768px)").matches) {
        gsap.to(heroPhoto, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Parallax sull'hero bg grid
      if (heroBg) {
        gsap.to(heroBg, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }

    // Animazione numero sezione hero
    const heroNum = document.querySelector(".hero-section-num");
    if (heroNum) {
      gsap.to(heroNum, {
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero",
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });
})();
