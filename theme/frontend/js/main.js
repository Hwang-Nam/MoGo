const header = document.querySelector(".js-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header--is-scrolled", window.scrollY > 100);
});

const toggleBtn = document.querySelector(".js-nav-toggle");
const mobileNav = document.querySelector(".js-nav-mobile");
const closeBtn = document.querySelector(".js-nav-close");

toggleBtn.addEventListener("click", () => {
  mobileNav.classList.add("nav-mobile--is-open");
});

closeBtn.addEventListener("click", () => {
  mobileNav.classList.remove("nav-mobile--is-open");
});

mobileNav.addEventListener("click", (e) => {
  const list = mobileNav.querySelector(".nav-mobile__list");
  if (!list.contains(e.target) && !e.target.closest(".js-nav-close")) {
    mobileNav.classList.remove("nav-mobile--is-open");
  }
});
