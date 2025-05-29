// --- Toast-повідомлення ---
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
  
  // --- Tabs ---
  const tabSignup = document.getElementById('tab-signup');
  const tabSignin = document.getElementById('tab-signin');
  const formSignup = document.getElementById('form-signup');
  const formSignin = document.getElementById('form-signin');
  tabSignup.onclick = () => {
    tabSignup.classList.add('active'); tabSignin.classList.remove('active');
    formSignup.style.display = ''; formSignin.style.display = 'none';
  };
  tabSignin.onclick = () => {
    tabSignin.classList.add('active'); tabSignup.classList.remove('active');
    formSignin.style.display = ''; formSignup.style.display = 'none';
  };
  document.getElementById('goto-login').onclick = () => tabSignin.onclick();
  document.getElementById('goto-signup').onclick = () => tabSignup.onclick();
  
  // --- Password toggle ---
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.onclick = () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === "password" ? "text" : "password";
      btn.innerHTML = input.type === "password" ? "&#128065;" : "&#128068;";
    };
  });
  
  // --- Fake submit з toast ---
  formSignup.onsubmit = e => {
    e.preventDefault();
    showToast('Реєстрація успішна!', 'success');
  };
  formSignin.onsubmit = e => {
    e.preventDefault();
    showToast('Вхід успішний!', 'success');
  };
  
  // --- Terms link ---
  document.querySelectorAll('.terms-link').forEach(link => {
    link.onclick = () => showToast("Правила та умови...", 'info');
  });
  
  // --- Socials (fake) ---
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.onclick = () => showToast("OAuth (Google/Гітхаб) поки що не підключено в цій демо-версії.", 'error');
  });