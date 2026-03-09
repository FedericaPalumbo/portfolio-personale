/* ================================================================
   marquee.js — Velocità marquee legata allo scroll
   ================================================================ */

(function () {
  "use strict";

  const marquee = document.querySelector(".skills-marquee");
  if (!marquee) return;

  let lastScrollY = window.scrollY;
  let velocity = 0;
  let baseSpeed = 25; // secondi per un ciclo completo (vedi CSS animation-duration)

  window.addEventListener("scroll", () => {
    const delta = window.scrollY - lastScrollY;
    velocity = Math.abs(delta) * 0.5;
    lastScrollY = window.scrollY;
  }, { passive: true });

  // Smooth decay della velocità
  let raf;
  function decay() {
    velocity *= 0.92;

    if (velocity > 0.5) {
      // Aumenta velocità in base allo scroll
      const speed = Math.max(5, baseSpeed - velocity * 2);
      marquee.style.animationDuration = speed + "s";
    } else {
      marquee.style.animationDuration = baseSpeed + "s";
      velocity = 0;
    }

    raf = requestAnimationFrame(decay);
  }

  decay();
})();
