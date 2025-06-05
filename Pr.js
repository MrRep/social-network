
// --- Toast ---
function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ` ${type}` : '');
  toast.textContent = message;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3300);
}

// --- Слайдер ---
const imgs = document.querySelectorAll('.slider-img');
const dots = document.querySelectorAll('.dot');
let sliderIdx = 0;
function showSlide(idx) {
  imgs.forEach((img, i) => img.style.opacity = i === idx ? '1' : '0');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
}
function nextSlide() {
  sliderIdx = (sliderIdx + 1) % imgs.length;
  showSlide(sliderIdx);
}
let sliderInterval = setInterval(nextSlide, 4000);
dots.forEach(dot => {
  dot.onclick = () => {
    clearInterval(sliderInterval);
    sliderIdx = +dot.dataset.index;
    showSlide(sliderIdx);
    sliderInterval = setInterval(nextSlide, 4000);
  }
});
showSlide(0);

// --- Tabs (запам’ятовує активний таб) ---
const tabSignup = document.getElementById('tab-signup');
const tabSignin = document.getElementById('tab-signin');
const formSignup = document.getElementById('form-signup');
const formSignin = document.getElementById('form-signin');
function setActiveTab(tab) {
  if(tab === "signup") {
    tabSignup.classList.add('active'); tabSignin.classList.remove('active');
    formSignup.style.display = ''; formSignin.style.display = 'none';
    localStorage.setItem("activeTab", "signup");
  } else {
    tabSignin.classList.add('active'); tabSignup.classList.remove('active');
    formSignin.style.display = ''; formSignup.style.display = 'none';
    localStorage.setItem("activeTab", "signin");
  }
}
tabSignup.onclick = () => setActiveTab("signup");
tabSignin.onclick = () => setActiveTab("signin");
document.getElementById('goto-login').onclick = () => setActiveTab("signin");
document.getElementById('goto-signup').onclick = () => setActiveTab("signup");
const lastTab = localStorage.getItem("activeTab");
setActiveTab(lastTab || "signup");

// --- Password toggle SVG ---
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.onclick = () => {
    const input = document.getElementById(btn.dataset.target);
    const svg = btn.querySelector('svg use');
    if (input.type === "password") {
      input.type = "text";
      svg.setAttribute('href', '#eye-off');
    } else {
      input.type = "password";
      svg.setAttribute('href', '#eye');
    }
  };
});

// --- Fake submit + redirect ---
formSignup.onsubmit = e => {
  e.preventDefault();
  showToast('Реєстрація успішна!', 'success');
  setTimeout(() => window.location.href = 'Main-Page.html', 1200);
};
formSignin.onsubmit = e => {
  e.preventDefault();
  showToast('Вхід успішний!', 'success');
  setTimeout(() => window.location.href = 'Main-Page.html', 1200);
};

// --- Terms link ---
document.querySelectorAll('.terms-link').forEach(link => {
  link.onclick = () => showToast("Правила та умови...", 'info');
});

// --- Socials (fake) ---
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.onclick = () => showToast("OAuth (Google/Гітхаб) поки що не підключено в цій демо-версії.", 'error');
});

// --- Дні народження (1-31) ---
const daySelect = document.getElementById('day');
for(let i=1; i<=31; i++){
  let opt = document.createElement('option');
  opt.value = i; opt.textContent = i;
  daySelect.appendChild(opt);
}
// Генерує випадковий id для користувача
function generateUserId() {
  return 'user_' + Math.random().toString(36).substring(2, 12) + Date.now();
}

// Валідація email (тільки Gmail)
function isGmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

// Валідація пароля
function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

// Валідація дати народження (дуже базова)
function isValidDate(year, month, day) {
  if (!year || !month || !day) return false;
  const y = parseInt(year), m = parseInt(month), d = parseInt(day);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return false;
  if (y < 1900 || y > new Date().getFullYear()) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  // Перевірка коректності дати (28, 30, 31 днів)
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

// Зберігаємо профіль у localStorage
function saveProfile(profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}

// Отримати профіль із localStorage
function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("profile"));
  } catch {
    return null;
  }
}

// --- Реєстрація ---
formSignup.onsubmit = e => {
  e.preventDefault();
  // Зчитування полів
  const fname = formSignup.fname.value.trim();
  const lname = formSignup.lname.value.trim();
  const email = formSignup.email.value.trim();
  const password = formSignup.password.value;
  const year = formSignup.year.value;
  const month = formSignup.month.value;
  const day = formSignup.day.value;

  // Перевірки
  if (!fname || !lname || !email || !password || !year || !month || !day) {
    showToast("Заповніть всі поля!", "error");
    return;
  }
  if (!isGmail(email)) {
    showToast("Введіть коректну Gmail адресу.", "error");
    return;
  }
  if (!isValidPassword(password)) {
    showToast("Пароль має містити не менше 8 символів.", "error");
    return;
  }
  if (!isValidDate(year, month, day)) {
    showToast("Введіть коректну дату народження.", "error");
    return;
  }

  // Перевірка, чи вже зареєстрований користувач (по email)
  const existingProfile = getProfile();
  if (existingProfile && existingProfile.email === email) {
    showToast("Користувач з таким Gmail вже існує!", "error");
    return;
  }

  // Генеруємо id
  const id = generateUserId();

  // Створення профілю
  const profile = {
    id,
    fname,
    lname,
    email,
    password, // У реальному додатку пароль не зберігати у відкритому вигляді!
    birthday: { year, month, day },
    loggedIn: true
  };

  saveProfile(profile);

  showToast('Реєстрація успішна!', 'success');
  setTimeout(() => {
    window.location.href = 'Main-Page.html';
  }, 1200);
};

// --- Вхід ---
formSignin.onsubmit = e => {
  e.preventDefault();
  const email = formSignin.email.value.trim();
  const password = formSignin.password.value;

  const profile = getProfile();

  if (!profile) {
    showToast("Користувач не знайдений. Зареєструйтесь!", "error");
    return;
  }

  if (profile.email === email && profile.password === password) {
    // Авторизація
    profile.loggedIn = true;
    saveProfile(profile);
    showToast("Вхід успішний!", "success");
    setTimeout(() => {
      window.location.href = 'Main-Page.html';
    }, 1000);
  } else {
    showToast("Невірний Gmail або пароль!", "error");
  }
};

// --- Якщо користувач вже авторизований (є id) --- (на сторінці реєстрації/входу)
(function(){
  const profile = getProfile();
  if (profile && profile.loggedIn && profile.id) {
    window.location.href = 'Main-Page.html';
  }
})();