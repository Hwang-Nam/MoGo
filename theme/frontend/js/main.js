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

document.querySelectorAll(".js-quotes-slider").forEach((slider) => {
  const items = slider.querySelectorAll(".js-quotes-item");
  const btnNext = slider.querySelector(".js-quotes-next");
  const btnPrev = slider.querySelector(".js-quotes-prev");
  let current = 0;

  const showItem = (index) => {
    items.forEach((item, i) => {
      item.classList.toggle("quotes-item--is-active", i === index);
    });
  };

  btnNext.addEventListener("click", () => {
    current = (current + 1) % items.length;
    showItem(current);
  });

  btnPrev.addEventListener("click", () => {
    current = (current - 1 + items.length) % items.length;
    showItem(current);
  });
});

document.querySelectorAll(".js-service2-item").forEach((item) => {
  const trigger = item.querySelector(".js-service2-trigger");

  trigger.addEventListener("click", () => {
    document.querySelectorAll(".js-service2-item").forEach((el) => {
      if (el !== item) {
        el.classList.remove("service2-item--is-open");
      }
    });

    item.classList.toggle("service2-item--is-open");
  });
});
