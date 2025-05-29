const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // дозволяє запити з фронтенду

const USERS_FILE = path.join(__dirname, 'users.json');

// Генерація простого унікального ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

// Валідація пароля (як і на фронті)
function isValidPassword(password) {
  if (password.length < 8) return false;
  let digitCount = (password.match(/\d/g) || []).length;
  let letterCount = (password.match(/[a-zA-Zа-яА-Я]/g) || []).length;
  return digitCount >= 3 && letterCount >= 1;
}

// Реєстрація
app.post('/register', (req, res) => {
  const { fname, lname, email, password, birth } = req.body;

  // Базова перевірка
  if (!fname || !lname || !email || !password || !birth || !birth.year || !birth.month || !birth.day) {
    return res.json({ success: false, message: 'Будь ласка, заповніть усі поля!' });
  }
  if (!isValidPassword(password)) {
    return res.json({ success: false, message: 'Пароль не відповідає вимогам.' });
  }

  // Завантажуємо користувачів
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  }

  // Перевірка на дубльований email
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ success: false, message: 'Користувач із таким email вже існує.' });
  }

  // Створюємо юзера
  const id = generateId();
  const user = {
    id,
    fname,
    lname,
    email,
    password, // (у реальному житті хешуй пароль!)
    birth
  };
  users.push(user);

  // Зберігаємо в файл
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

  // Повертаємо відповідь
  res.json({ success: true, id, user: { id, fname, lname, email, birth } });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});