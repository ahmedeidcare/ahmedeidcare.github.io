// Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 50
      ? 'rgba(10,22,40,0.97)'
      : 'rgba(10,22,40,0.85)';
  });

  // Form submit → WhatsApp
  function handleSubmit(e) {
    e.preventDefault();
    const name     = document.getElementById('f-name').value.trim();
    const phone    = document.getElementById('f-phone').value.trim();
    const cond     = document.getElementById('f-condition').value;
    const details  = document.getElementById('f-details').value.trim();

    const msg = `🏥 *طلب حجز جديد — مركز د. أحمد عيد*\n\n` +
                `👤 *الاسم:* ${name}\n` +
                `📞 *الهاتف:* ${phone}\n` +
                `🩺 *الحالة:* ${cond}\n` +
                (details ? `📝 *تفاصيل:* ${details}\n` : '') +
                `\n_تم الإرسال من الموقع الإلكتروني_`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/201280019181?text=${encoded}`;

    window.open(waUrl, '_blank');

    const btn = e.target.querySelector('.submit-btn');
    btn.textContent = '✅ جاري فتح واتساب...';
    btn.style.background = 'linear-gradient(135deg, #0d7d6e, #12a896)';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = 'إرسال طلب الحجز على واتساب 💬';
      btn.style.background = '';
      btn.style.color = '';
      e.target.reset();
    }, 3000);
  }

  // Counter animation for stats
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = (target > 100 ? '+' : '') + target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = (target > 100 ? '+' : '') + Math.floor(start) + (el.dataset.suffix || '');
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(num => {
          const text = num.textContent;
          const val = parseInt(text.replace(/\D/g,''));
          if (!isNaN(val)) animateCounter(num, val);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);