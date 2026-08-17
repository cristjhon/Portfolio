/* =========================================================
   E-PORTFOLIO — SCRIPT.JS
   Organized by feature. Each block is self-contained so you
   can remove a feature by deleting its block + related HTML.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Loading screen ---------- */
  const loadingScreen = document.getElementById("loading-screen");
  const loaderText = document.getElementById("loader-text");
  const loaderMsg = "loading portfolio...";
  let li = 0;
  const loaderInterval = setInterval(() => {
    loaderText.textContent = loaderMsg.slice(0, li++);
    if (li > loaderMsg.length) clearInterval(loaderInterval);
  }, 40);

  window.addEventListener("load", () => {
    setTimeout(() => loadingScreen.classList.add("hidden"), 500);
  });
  // Fallback in case 'load' already fired or takes too long
  setTimeout(() => loadingScreen.classList.add("hidden"), 2500);

  /* ---------- 2. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 3. Sticky navbar + scroll progress + back-to-top ---------- */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";

    navbar.classList.toggle("scrolled", scrollTop > 20);
    backToTop.classList.toggle("show", scrollTop > 500);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 4. Mobile nav toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 5. Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => spyObserver.observe(section));

  /* ---------- 6. Reveal-on-scroll animations ---------- */
  const revealTargets = document.querySelectorAll(
    ".about-text, .about-side, .skill-category, .project-card, .cert-card, .timeline, .contact-form, .contact-info, .counter-card, .do-card, .info-card"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- 7. Typing animation for roles ---------- */
  const roles = ["IT Graduate", "Aspiring Software Developer", "Web Developer", "Tech Enthusiast"];
  const typingEl = document.getElementById("typing-role");
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (typingEl) typeLoop();

  /* ---------- 8. Animated counters ---------- */
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- 9. Animated skill bars ---------- */
  const bars = document.querySelectorAll(".bar-fill");
  const barObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.percent + "%";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => barObserver.observe(b));

  /* ---------- 10. Project filtering ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- 11. Certificate filtering ---------- */
  const certFilterBtns = document.querySelectorAll(".cert-filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  certFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      certFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      certCards.forEach((card) => {
        const match = filter === "all" || card.dataset.filter === filter;
        card.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- 12. Certificate preview modal ---------- */
  const certModal = document.getElementById("cert-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("cert-modal-title");

  document.querySelectorAll(".view-cert").forEach((btn) => {
    btn.addEventListener("click", () => {
      modalImg.src = btn.dataset.img;
      modalImg.alt = btn.dataset.title + " certificate, full preview";
      modalTitle.textContent = btn.dataset.title;
      certModal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    certModal.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !certModal.hidden) closeModal(); });

  /* ---------- 13. Contact form validation + toast ---------- */
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function validateField(field, errorEl, validator, message) {
    const group = field.closest(".form-group");
    if (!validator(field.value.trim())) {
      group.classList.add("invalid");
      errorEl.textContent = message;
      return false;
    }
    group.classList.remove("invalid");
    errorEl.textContent = "";
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const validName = validateField(name, document.getElementById("name-error"), (v) => v.length >= 2, "Please enter your name.");
    const validEmail = validateField(email, document.getElementById("email-error"), (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email address.");
    const validSubject = validateField(subject, document.getElementById("subject-error"), (v) => v.length >= 3, "Please enter a subject.");
    const validMessage = validateField(message, document.getElementById("message-error"), (v) => v.length >= 10, "Message should be at least 10 characters.");

    if (validName && validEmail && validSubject && validMessage) {
      // NOTE: This demo does not send data anywhere. Wire this up to your
      // own backend, a form service (e.g. Formspree), or an email API.
      showToast("Message sent! I'll get back to you soon.");
      form.reset();
    } else {
      showToast("Please fix the highlighted fields.", true);
    }
  });

  /* ---------- 14. Theme toggle (dark default, light optional) ---------- */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.className = "fa-solid fa-sun";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });

  /* ---------- 15. Cursor glow (desktop only) ---------- */
  const cursorGlow = document.getElementById("cursor-glow");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  } else {
    cursorGlow.style.display = "none";
  }

  /* ---------- 16. Lightweight particle background (hero only) ---------- */
  const canvas = document.getElementById("particles");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    const hero = document.getElementById("home");
    let particles = [];
    const COUNT = 45;

    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.15,
      };
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 141, 253, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    resizeCanvas();
    initParticles();
    tick();
    window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });
  }

});
