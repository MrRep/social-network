
const formSignup = document.getElementById('form-signup');

// Покажемо повідомлення про помилку
function showError(input, message) {
  // Видаляємо попередні помилки
  let old = input.parentNode.querySelector('.error');
  if (old) old.remove();

  let error = document.createElement('div');
  error.className = 'error';
  error.style.color = "#ff9494";
  error.style.fontSize = "13px";
  error.style.marginTop = "3px";
  error.textContent = message;
  input.parentNode.appendChild(error);
  input.style.borderColor = "#ff9494";
}

// Прибираємо повідомлення про помилку
function clearError(input) {
  let old = input.parentNode.querySelector('.error');
  if (old) old.remove();
  input.style.borderColor = "";
}

// Основна логіка перевірки
formSignup.onsubmit = function(e) {
  e.preventDefault();

  let valid = true;

  // Поля
  const fname = formSignup.elements['fname'];
  const lname = formSignup.elements['lname'];
  const email = formSignup.elements['email'];
  const password = formSignup.elements['password'];
  const year = formSignup.elements['year'];
  const month = formSignup.elements['month'];
  const day = formSignup.elements['day'];
  const terms = formSignup.querySelector('#terms');

  // Очищаємо попередні помилки
  [fname, lname, email, password, year, month, day].forEach(clearError);

  // 1. Ім'я та прізвище
  if (fname.value.trim().length < 2) {
    showError(fname, "Введіть ім'я (мінімум 2 символи)");
    valid = false;
  }
  if (lname.value.trim().length < 2) {
    showError(lname, "Введіть прізвище (мінімум 2 символи)");
    valid = false;
  }
  // 2. Email (тільки Gmail)
  if (!/^[\w\.-]+@gmail\.com$/i.test(email.value.trim())) {
    showError(email, "Введіть коректну адресу Gmail");
    valid = false;
  }
  // 3. Пароль
  if (password.value.length < 6) {
    showError(password, "Пароль повинен містити мінімум 6 символів");
    valid = false;
  }
  // 4. Дата народження
  let y = parseInt(year.value, 10),
      m = parseInt(month.value, 10),
      d = parseInt(day.value, 10);

  let nowYear = new Date().getFullYear();
  if (!(y >= 1900 && y <= nowYear)) {
    showError(year, "Некоректний рік");
    valid = false;
  }
  if (!(m >= 1 && m <= 12)) {
    showError(month, "Некоректний місяць");
    valid = false;
  }
  if (!(d >= 1 && d <= 31)) {
    showError(day, "Некоректний день");
    valid = false;
  } else {
    // Перевіряємо реальність дати
    let date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      showError(day, "Такої дати не існує");
      valid = false;
    }
  }
  // 5. Чекбокс
  if (!terms.checked) {
    terms.focus();
    alert("Потрібно погодитися з правилами!");
    valid = false;
  }
  // 6. Якщо все добре
  if (valid) {
    alert("Реєстрація успішна!");
    formSignup.reset();
    // Тут ти можеш зробити відправку на сервер через fetch/AJAX
  }
}
