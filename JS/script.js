document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav__menu a");
  const navDropdowns = document.querySelectorAll(".nav__dropdown");
  const sections = document.querySelectorAll("main section[id], article[id]");

  navDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;

      navDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) otherDropdown.open = false;
      });
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navDropdowns.forEach((dropdown) => {
        dropdown.open = false;
      });
    });
  });

  const setActiveNav = () => {
    let currentId = "inicio";

    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });

  const cards = document.querySelectorAll(".feature-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 90}ms`;
  });

  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const triggers = accordion.querySelectorAll(".quality-accordion__trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";

        triggers.forEach((otherTrigger) => {
          const otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
          const isCurrent = otherTrigger === trigger;
          const isOpen = isCurrent && willOpen;

          otherTrigger.setAttribute("aria-expanded", String(isOpen));
          otherPanel.classList.toggle("is-open", isOpen);
          otherPanel.inert = !isOpen;
          otherPanel.closest(".quality-accordion__item").classList.toggle("is-open", isOpen);
        });
      });
    });
  });

  document.querySelectorAll(".quality-traits__grid").forEach((grid) => {
    grid.querySelectorAll(".quality-trait__trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const isOpen = trigger.getAttribute("aria-expanded") !== "true";

        trigger.setAttribute("aria-expanded", String(isOpen));
        panel.classList.toggle("is-open", isOpen);
        panel.inert = !isOpen;
        panel.closest(".quality-trait").classList.toggle("is-open", isOpen);
      });
    });
  });
});
