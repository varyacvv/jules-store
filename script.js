// ===== Hero скролл =====
const heroBtn = document.querySelector(".hero__button");
const collections = document.querySelector(".collections");

heroBtn.addEventListener("click", () => {
  collections.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ===== Данные товаров =====
const productsData = {
  bracelets: [
    "images/bracelets.jpeg",
    "images/extra-items/extra-bracelet1.jpeg",
    "images/extra-items/extra-bracelet2.jpeg",
    "images/extra-items/extra-bracelet3.jpeg",
  ],
  rings: [
    "images/rings.jpeg",
    "images/extra-items/extra-rings1.jpeg",
    "images/extra-items/extra-rings2.jpeg",
    "images/extra-items/extra-rings3.jpeg",
  ],
  necklaces: [
    "images/necklaces.jpeg",
    "images/extra-items/extra-necklaces1.jpeg",
    "images/extra-items/extra-necklaces2.jpeg",
    "images/extra-items/extra-necklaces3.jpeg",
  ],
  earrings: [
    "images/earrings.jpeg",
    "images/extra-items/extra-earrings1.jpeg",
    "images/extra-items/extra-earrings2.jpeg",
    "images/extra-items/extra-earrings3.jpeg",
  ],
};

const grid = document.querySelector(".js-products-grid");
const filterBtns = document.querySelectorAll(".filters__btn");
let activeFilter = null;

// Главные картинки (с заголовками)
const mainItems = [
  { img: "images/bracelets.jpeg", title: "Bracelets" },
  { img: "images/rings.jpeg", title: "Rings" },
  { img: "images/necklaces.jpeg", title: "Necklaces" },
  { img: "images/earrings.jpeg", title: "Earrings" },
];

// Рендер
function render(itemsArray, showTitles = true) {
  if (!itemsArray.length) {
    grid.innerHTML = "";
    return;
  }

  const cardsHtml = itemsArray
    .map((item, index) => {
      const imgTag = `<img src="${item.img}" loading="lazy" />`;
      const titleTag = showTitles
        ? `<h3 style="margin-top: 10px; color: #8b008b; text-align: center;">${item.title}</h3>`
        : "";
      return `
        <div class="product-card" data-index="${index}" style="opacity:0; transform:translateY(10px); transition:0.3s ease">
          ${imgTag}
          ${titleTag}
        </div>
      `;
    })
    .join("");

  grid.innerHTML = cardsHtml;

  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 40);
  });
}

function showMainImages() {
  render(mainItems, true);
}

function showCategory(categoryKey) {
  const images = productsData[categoryKey];
  if (!images) return;
  const items = images.map((img) => ({ img, title: "" }));
  render(items, false);
}

function showAll() {
  const allImages = Object.values(productsData).flat();
  const allItems = allImages.map((img) => ({ img, title: "" }));
  render(allItems, false);
}

// Показать главные картинки
showMainImages();

// Логика фильтров
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterValue = btn.dataset.filter.toLowerCase();

    if (activeFilter === filterValue) {
      activeFilter = null;
      btn.classList.remove("filters__btn--active");
      showMainImages();
      return;
    }

    filterBtns.forEach((b) => b.classList.remove("filters__btn--active"));
    btn.classList.add("filters__btn--active");
    activeFilter = filterValue;

    if (filterValue === "all") {
      showAll();
      return;
    }

    showCategory(filterValue);
  });
});

// ===== Форма подписки =====
const form = document.querySelector(".subscribe__form");
const container = document.querySelector(".subscribe__content");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form
    .querySelector(".subscribe__input[type='email']")
    .value.trim();
  const phone = form
    .querySelector(".subscribe__input[type='tel']")
    .value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.length >= 10;
  if (!emailValid || !phoneValid) {
    alert("❌ Проверьте email и телефон (минимум 10 цифр)");
    return;
  }
  container.classList.add("success");
  form.reset();
  setTimeout(() => {
    container.classList.remove("success");
  }, 5000);
});

// ===== Swiper =====
new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 4000 },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  pagination: { el: ".swiper-pagination", clickable: true },
});

// ===== Анимация при скролле =====
const blocks = document.querySelectorAll(
  ".features, .collections, .filters, .subscribe, .reviews, .footer",
);
blocks.forEach((block) => block.classList.add("fade"));
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
});
blocks.forEach((block) => observer.observe(block));

// ===== Кнопка наверх =====
const topBtn = document.querySelector(".scroll-top-btn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) topBtn.classList.add("show");
  else topBtn.classList.remove("show");
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
