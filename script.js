// ── MOBILE MENU ──
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const bars = menuBtn.querySelectorAll("span");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  bars[0].style.transform = mobileMenu.classList.contains("open")
    ? "rotate(45deg) translate(5px, 5px)"
    : "";
  bars[1].style.opacity = mobileMenu.classList.contains("open") ? "0" : "1";
  bars[2].style.transform = mobileMenu.classList.contains("open")
    ? "rotate(-45deg) translate(5px, -5px)"
    : "";
});
document.querySelectorAll(".mobile-link").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    bars.forEach((b) => {
      b.style.transform = "";
      b.style.opacity = "1";
    });
  })
);

// ── NAV SCROLL ──
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ── SCROLL REVEAL (IntersectionObserver) ──
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ── APPLE-STYLE PARALLAX ──
const parallaxLayers = document.querySelectorAll(".parallax-layer");
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      parallaxLayers.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ── STAGGER CHILDREN inside grids ──
document.querySelectorAll(".services-grid, .projects-grid").forEach((grid) => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});

// ── HOVER TILT on project cards ──
document.querySelectorAll(".project-card, .service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = "transform 0.1s";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition =
      "transform 0.4s var(--ease-apple, cubic-bezier(0.25,0.46,0.45,0.94))";
  });
});
