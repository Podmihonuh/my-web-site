// ===== 1. Переключение темы с сохранением в localStorage =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Загружаем сохранённую тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ===== 2. Сохранение имени игрока (вторая функция localStorage) =====
// На странице контактов можно сохранить имя из формы
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  // Восстанавливаем сохранённое имя при загрузке
  const savedName = localStorage.getItem('playerName');
  if (savedName) {
    document.getElementById('name').value = savedName;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (name) {
      localStorage.setItem('playerName', name);
      formMessage.textContent = `Спасибо, ${name}! Сообщение отправлено (демо).`;
      formMessage.style.color = 'var(--accent)';
    } else {
      formMessage.textContent = 'Пожалуйста, введите имя.';
      formMessage.style.color = 'red';
    }
    contactForm.reset();
  });
}

// ===== 3. Анимация появления при скролле =====
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= window.innerHeight - offset;
};

const displayScrollElement = (el) => el.classList.add('visible');

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);
// Запуск при загрузке, чтобы элементы в зоне видимости появились сразу
window.addEventListener('load', handleScrollAnimation);

// ===== 4. Анимированный счётчик на главной =====
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const duration = 1500;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current);
    }
  }, stepTime);
};

// Запускаем счётчики, когда они появляются в зоне видимости
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));