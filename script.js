// ===== Hero scroll =====
const heroBtn = document.querySelector(".hero button");
const collections = document.querySelector(".collections");

heroBtn.addEventListener("click", () => {
  collections.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// ===== Фильтр =====
// Данные
const products = {
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

// Элементы
const grid = document.querySelector(".products-grid");
const filterBtns = document.querySelectorAll(".filter-btn");

let activeFilter = null;

// ===== РЕНДЕР =====
function render(arr) {
  grid.innerHTML = "";

  arr.forEach((img, i) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.style.opacity = "0";
    card.style.transform = "translateY(10px)";

    card.innerHTML = `<img src="${img}" />`;

    grid.appendChild(card);

    // Плавное появление
    setTimeout(() => {
      card.style.transition = "0.3s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 40);
  });
}

// Показать всё
function showAll() {
  render(Object.values(products).flat());
}

// Скрыть
function hideAll() {
  grid.innerHTML = "";
}

// Логика
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter.toLowerCase();

    // Повторный клик = закрыть
    if (activeFilter === filter) {
      activeFilter = null;
      btn.classList.remove("active");
      hideAll();
      return;
    }

    // Active кнопка
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    activeFilter = filter;

    // ALL
    if (filter === "all") {
      showAll();
      return;
    }

    // Категории
    render(products[filter]);
  });
});
// ===== Подписка =====
const form = document.querySelector(".subscribe-form");
const container = document.querySelector(".subscribe-content");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.length >= 10;

  if (!emailValid || !phoneValid) {
    alert("Проверь данные");
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
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ===== Aнимация при скролле =====
const blocks = document.querySelectorAll(
  ".features, .collections, .filters-section, .subscribe, .reviews, .footer",
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

// ===== Console debugging =====
const names = cards.map((card) => card.querySelector("h3").textContent);
console.log("Категории товаров:", names);
