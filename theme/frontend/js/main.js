const header = document.querySelector(".js-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("header--is-scrolled", window.scrollY > 50);
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

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".js-quotes-item");
  const nextBtn = document.querySelector(".js-quotes-next");
  const prevBtn = document.querySelector(".js-quotes-prev");
  let current = 0;

  function show(index) {
    items.forEach((item, i) => {
      item.classList.toggle("quotes-item--is-active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % items.length;
    show(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + items.length) % items.length;
    show(current);
  });
});
