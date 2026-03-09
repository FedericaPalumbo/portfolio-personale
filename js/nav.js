/* ================================================================
   nav.js — Scroll behavior, hamburger, active link, progress bar
   ================================================================ */

(function () {
  "use strict";

  const nav = document.querySelector(".site-nav");
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const progressBar = document.querySelector(".nav-progress");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = document.querySelectorAll("section[id], header[id]");

  /* ---- Scroll: scrolled class + progress bar ---- */
  function onScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? (scrollY / docH) * 100 : 0;

    if (scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    updateActiveLink(scrollY);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Active link ---- */
  function updateActiveLink(scrollY) {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === "#" + current) {
        a.classList.add("active");
      }
    });
  }

  /* ---- Hamburger mobile ---- */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Chiudi su click link
    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Chiudi su ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }
})();
