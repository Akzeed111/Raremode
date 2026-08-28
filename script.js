document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");
  const year = document.getElementById("year");

  // Current year in footer.
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Reveal elements as they enter the viewport.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // Small parallax effect for the hero visual on desktop.
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 6;

      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // Highlight the current section in the navigation.
  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = [...navLinks];

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionLinks.forEach(link => link.classList.remove("active"));
          const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, {
      rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));
  }
});
