const bannedEmails = [
  "spam@example.com",
  "blocked@example.com",
  "testban@example.org"
];

const form = document.querySelector("#email-form");
const email = document.querySelector("#email");
const result = document.querySelector("#result");

function showResult(state, message) {
  result.dataset.state = state;
  result.textContent = message;
}

function clearResult() {
  email.removeAttribute("aria-invalid");
  delete result.dataset.state;
  result.textContent = "";
}

email.addEventListener("input", clearResult);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearResult();

  email.value = email.value.trim();
  if (!email.value || email.validity.typeMismatch) {
    email.setAttribute("aria-invalid", "true");
    showResult("error", email.value ? "Введите корректный email-адрес." : "Введите email-адрес.");
    email.focus();
    return;
  }

  const isBanned = bannedEmails.includes(email.value.toLowerCase());
  if (isBanned) {
    showResult("blocked", "Доступ запрещён: email находится в списке заблокированных");
  } else {
    showResult("clear", "Email не найден в списке заблокированных");
  }
});

