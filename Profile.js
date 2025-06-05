 // === Слайдер ===
 const sliderImgs = document.querySelectorAll('.slider-img');
 const dots = document.querySelectorAll('.dot');
 let currentSlide = 0;
 function showSlide(idx) {
   sliderImgs.forEach((img, i) => img.style.opacity = i === idx ? 1 : 0);
   dots.forEach((d, i) => d.classList.toggle('active', i === idx));
   currentSlide = idx;
 }
 dots.forEach(dot => {
   dot.addEventListener('click', e => showSlide(+dot.dataset.index));
 });
 setInterval(() => showSlide((currentSlide+1)%sliderImgs.length), 4000);

 // === Tabs ===
 const tabSignup = document.getElementById('tab-signup');
 const tabSignin = document.getElementById('tab-signin');
 const signupPanel = document.getElementById('signup-panel');
 const signinPanel = document.getElementById('signin-panel');

 function switchTab(isSignUp) {
   tabSignup.classList.toggle('active', isSignUp);
   tabSignin.classList.toggle('active', !isSignUp);
   signupPanel.style.display = isSignUp ? '' : 'none';
   signinPanel.style.display = isSignUp ? 'none' : '';
 }
 tabSignup.onclick = () => switchTab(true);
tabSignin.onclick = () => switchTab(false);
 
// Tabs-перемикач
const tabSignup = document.getElementById('tab-signup');
const tabSignin = document.getElementById('tab-signin');
const formSignup = document.getElementById('form-signup');
const formSignin = document.getElementById('form-signin');
const toast = document.getElementById('toast');

tabSignup.onclick = () => {
  tabSignup.classList.add('active'); tabSignin.classList.remove('active');
  formSignup.style.display = ''; formSignin.style.display = 'none';
};
tabSignin.onclick = () => {
  tabSignin.classList.add('active'); tabSignup.classList.remove('active');
  formSignin.style.display = ''; formSignup.style.display = 'none';
};
