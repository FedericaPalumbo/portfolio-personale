/* ================================================================
   cursor.js — Cursore custom con glow e follower fluido
   ================================================================ */

(function () {
  "use strict";

  // Skip su touch device
  if (window.matchMedia("(hover: none)").matches) return;

  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  /* ---- Stili CSS iniettati dinamicamente ---- */
  const style = document.createElement("style");
  style.textContent = `
    #cursor {
      position: fixed;
      top: 0; left: 0;
      width: 8px; height: 8px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease, background 0.2s ease;
      will-change: transform;
      mix-blend-mode: normal;
    }
    #cursor.hover {
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid var(--accent);
      mix-blend-mode: normal;
    }
    #cursor.click {
      transform: translate(-50%, -50%) scale(0.7);
    }
    #cursorFollower {
      position: fixed;
      top: 0; left: 0;
      width: 32px; height: 32px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(232, 168, 112, 0.3);
      transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      will-change: transform;
    }
    #cursorFollower.hover {
      width: 60px;
      height: 60px;
      border-color: rgba(232, 168, 112, 0.15);
    }
  `;
  document.head.appendChild(style);

  /* ---- Tracking ---- */
  const mouse = { x: -100, y: -100 };
  const curPos = { x: -100, y: -100 };
  const follPos = { x: -100, y: -100 };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener("mousedown", () => cursor.classList.add("click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("click"));

  /* ---- Hover sugli interactivi ---- */
  function updateInteractives() {
    document.querySelectorAll("a, button, .project-item, .stag, .intl-card, .skill-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        follower.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        follower.classList.remove("hover");
      });
    });
  }

  // Aspetta il DOM completo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateInteractives);
  } else {
    updateInteractives();
  }

  /* ---- Loop LERP ---- */
  function tick() {
    // Cursore principale: snap quasi istantaneo
    curPos.x += (mouse.x - curPos.x) * 0.45;
    curPos.y += (mouse.y - curPos.y) * 0.45;

    // Follower: lag fluido
    follPos.x += (mouse.x - follPos.x) * 0.12;
    follPos.y += (mouse.y - follPos.y) * 0.12;

    cursor.style.transform = `translate(${curPos.x}px, ${curPos.y}px) translate(-50%, -50%)`;
    follower.style.transform = `translate(${follPos.x}px, ${follPos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }

  tick();

  /* ---- Visibilità ---- */
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    follower.style.opacity = "1";
  });
})();
