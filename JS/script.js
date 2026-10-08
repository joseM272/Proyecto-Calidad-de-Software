document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav__menu a");
  const sections = document.querySelectorAll("main section[id], article[id]");

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
});
