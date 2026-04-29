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
const cards = [...document.querySelectorAll(".item")];
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter.toLowerCase();

    // Активная кнопка
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();

      if (filter === "all" || title === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
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
