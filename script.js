const heroBtn = document.querySelector(".hero button");
const collections = document.querySelector(".collections");
heroBtn.addEventListener("click", () => {
  collections.scrollIntoView({ behavior: "smooth" });
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const email = input.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    alert("Введите корректный email");
    return;
  }

  form.innerHTML = "<h3>Спасибо за подписку 💖</h3>";
});

const cards = [...document.querySelectorAll(".item")];
const names = cards.map((card) => card.querySelector("h3").textContent);
console.log(names);
