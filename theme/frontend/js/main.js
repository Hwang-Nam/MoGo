document.addEventListener("DOMContentLoaded", function () {
  // Toggle header on scroll
  const header = document.querySelector(".js-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("Header--scrolled", window.scrollY > 50);
    });
  }

  // Highlight nav link on scroll
  const links = document.querySelectorAll(".js-nav-lnk");
  const sections = document.querySelectorAll(".js-section");

  if (links.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              const href = link.getAttribute("href");
              link.classList.toggle(
                "Header-inner-nav-item__lnk--active",
                href === `#${id}`
              );
            });
            history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const toggleBtn = document.querySelector(".js-nav-toggle");
  const nav = document.querySelector(".js-header-nav");
  const overlay = document.querySelector(".js-overlay");
  const navLinks = document.querySelectorAll(".js-nav-lnk");
  const menuIcon = document.querySelector(".js-menu-icon");

  const cartToggle = document.querySelector(".js-cart-toggle");
  const cartPopupHook = document.querySelector(".js-header-cart-popup");
  const cartPopupBlock = cartPopupHook?.closest(".Header-inner-actions-cart");

  const searchToggle = document.querySelector(".js-search-toggle");
  const searchPopupHook = document.querySelector(".js-header-search-popup");
  const searchPopupBlock = searchPopupHook?.closest(
    ".Header-inner-actions-search"
  );

  function updateScrollLock() {
    document.body.classList.toggle(
      "locked",
      overlay?.classList.contains("Overlay--active")
    );
  }

  function closeAll() {
    nav?.classList.remove("Header-inner-nav--open");
    cartPopupBlock?.classList.remove("Header-inner-actions-cart--open");
    searchPopupBlock?.classList.remove("Header-inner-actions-search--open");
    overlay?.classList.remove("Overlay--active");

    menuIcon?.classList.remove("fa-times");
    menuIcon?.classList.add("fa-bars");
    console.log(2);

    updateScrollLock();
    console.log(3);
  }

  // Toggle mobile nav
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = nav.classList.contains("Header-inner-nav--open");
      closeAll();
      if (!isOpen) {
        nav.classList.add("Header-inner-nav--open");
        overlay.classList.add("Overlay--active");
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
        updateScrollLock();
      }
    });

    overlay.addEventListener("click", closeAll);
    navLinks.forEach((link) => link.addEventListener("click", closeAll));
  }

  // Toggle search popup
  if (searchToggle && searchPopupBlock) {
    searchToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = searchPopupBlock.classList.contains(
        "Header-inner-actions-search--open"
      );
      closeAll();
      if (!isOpen) {
        searchPopupBlock.classList.add("Header-inner-actions-search--open");
        overlay?.classList.add("Overlay--active");
        updateScrollLock();
      }
    });
  }

  // Toggle cart popup
  if (cartToggle && cartPopupBlock) {
    cartToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = cartPopupBlock.classList.contains(
        "Header-inner-actions-cart--open"
      );
      closeAll();
      if (!isOpen) {
        cartPopupBlock.classList.add("Header-inner-actions-cart--open");
        overlay?.classList.add("Overlay--active");
        updateScrollLock();
      }
    });
  }

  // Click ngoài để đóng hết
  document.addEventListener("click", function (e) {
    const target = e.target;

    const clickedOutsideAll =
      !searchPopupHook?.contains(target) &&
      !searchToggle?.contains(target) &&
      !cartPopupHook?.contains(target) &&
      !cartToggle?.contains(target) &&
      !nav?.contains(target) &&
      !toggleBtn?.contains(target);

    if (clickedOutsideAll) {
      closeAll();
    }
  });

  // Quotes slider
  document.querySelectorAll(".js-quote-slider").forEach((slider) => {
    const items = slider.querySelectorAll(".js-quote-item");
    const btnNext = slider.querySelector(".js-quote-next");
    const btnPrev = slider.querySelector(".js-quote-prev");
    let current = 0;

    const showItem = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle("Quote-slider-item--active", i === index);
      });
    };

    if (btnNext && btnPrev && items.length > 0) {
      showItem(current);

      btnNext.addEventListener("click", () => {
        current = (current + 1) % items.length;
        showItem(current);
      });

      btnPrev.addEventListener("click", () => {
        current = (current - 1 + items.length) % items.length;
        showItem(current);
      });
    }
  });

  // Service item toggle
  document.querySelectorAll(".js-service2-item").forEach((item) => {
    const trigger = item.querySelector(".js-service2-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      document.querySelectorAll(".js-service2-item").forEach((el) => {
        if (el !== item) {
          el.classList.remove("Service2-body-content-item--open");
        }
      });

      item.classList.toggle("Service2-body-content-item--open");
    });
  });

  // Swiper for banner
  const bannerSwiper = new Swiper(".js-banner-swiper", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      slideChange: function () {
        const navItems = document.querySelectorAll(".js-banner-nav-item");
        navItems.forEach((item, index) => {
          item.classList.toggle(
            "Banner-content-nav-item--active",
            index === this.realIndex
          );
        });
      },
    },
  });

  // Click slide-nav-tiem
  const navItems = document.querySelectorAll(".js-banner-nav-item");
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      bannerSwiper.slideToLoop(index);
    });
  });
});
