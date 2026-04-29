// ===== Hero scroll =====
const heroBtn = document.querySelector(".hero button");
const collections = document.querySelector(".collections");

heroBtn.addEventListener("click", () => {
  collections.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// ===== фильтр =====
const filterBtns = document.querySelectorAll(".filter-btn");
const productsGrid = document.querySelector(".products-grid");

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

// старт пусто
productsGrid.innerHTML = "";

function renderCards(arr) {
  productsGrid.innerHTML = "";

  arr.forEach((src) => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${src}" alt="">
      </div>
    `;
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter.toLowerCase();

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // ALL = показать все 16
    if (filter === "all") {
      renderCards([
        ...products.bracelets,
        ...products.rings,
        ...products.necklaces,
        ...products.earrings,
      ]);
    } else {
      // одна категория = 4 карточки
      renderCards(products[filter]);
    }
  });
});

// ===== Подписка =====

const form = document.querySelector(".subscribe-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.length >= 10;

  if (!emailValid) {
    alert("Введите корректный email");
    return;
  }

  if (!phoneValid) {
    alert("Введите корректный номер телефона");
    return;
  }

  form.parentElement.innerHTML = `
    <div style="text-align:center; display:flex; flex-direction:column; align-items:center; gap:12px; padding-bottom:100px;">
      <img src="images/success.png" alt="success" style="width:300px;" />
      <h3>💖 Спасибо за подписку 💖</h3>
    </div>
  `;
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
