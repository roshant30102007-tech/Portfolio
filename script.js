// ========== 1. MOBILE MENU ==========
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ========== 2. HIGHLIGHT THE CURRENT SECTION IN THE NAV ==========
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// ========== 3. CONTACT FORM VALIDATION ==========
const form = document.getElementById('contact-form');
const statusBox = form.querySelector('.form-status');

function showError(field, message) {
  form.querySelector(`.error[data-for="${field.id}"]`).textContent = message;
  field.classList.toggle('invalid', Boolean(message));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  statusBox.textContent = '';
  let valid = true;

  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;

  showError(name, name.value.trim() ? '' : 'Please enter your name.');
  showError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Please enter a valid email address.');
  showError(message, message.value.trim().length >= 10 ? '' : 'Please write at least 10 characters.');

  valid = !form.querySelector('.invalid');
  if (!valid) return;

  // A plain HTML page has no server, so this just confirms on screen.
  // To receive real messages, connect a service such as Formspree or EmailJS here.
  statusBox.textContent = 'Thanks! Your message is ready to send.';
  form.reset();
});

// ========== 4. FOOTER YEAR ==========
document.getElementById('year').textContent = new Date().getFullYear();