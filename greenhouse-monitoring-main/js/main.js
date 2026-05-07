// Inject footer component
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(file);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn('Gagal memuat komponen:', file, e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('footer-placeholder', 'components/footer.html');

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
