/* ================================================================
   preloader.js — Animazione di caricamento iniziale
   ================================================================ */

(function () {
  "use strict";

  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const bar = preloader.querySelector(".preloader-bar span");

  // Anima la barra
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 5;
    if (bar) bar.style.width = Math.min(progress, 95) + "%";

    if (progress >= 95) {
      clearInterval(interval);
    }
  }, 80);

  // Nasconde il preloader quando tutto è caricato
  function hidePreloader() {
    clearInterval(interval);
    if (bar) bar.style.width = "100%";

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.6s ease";
      setTimeout(() => {
        preloader.style.display = "none";
        // Trigger hero animations
        document.querySelectorAll(".hero-line-inner").forEach((el, i) => {
          setTimeout(() => el.classList.add("is-visible"), i * 120);
        });
      }, 600);
    }, 200);
  }

  if (document.readyState === "complete") {
    setTimeout(hidePreloader, 400);
  } else {
    window.addEventListener("load", () => setTimeout(hidePreloader, 400));
  }
})();
