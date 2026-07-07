/* ===================================================
   IDEAS AMPLIFIED — SCRIPT
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Sticky nav + scroll progress spark ---------- */
  const nav = document.getElementById('siteNav');
  const scrollSpark = document.getElementById('scrollSpark');

  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollSpark.style.width = progress + '%';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    if(isOpen){
      navLinks.style.cssText = 'display:flex; flex-direction:column; position:absolute; top:100%; left:0; right:0; background:#fff; padding:20px 24px; box-shadow:0 10px 20px rgba(15,23,42,.08);';
    } else {
      navLinks.removeAttribute('style');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navLinks.removeAttribute('style');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated number counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  statNums.forEach(el => countObserver.observe(el));

  function animateCount(el){
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if(progress < 1){
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Process timeline spark ---------- */
  const timeline = document.getElementById('timeline');
  const timelineSpark = document.getElementById('timelineSpark');

  function positionSpark(){
    if(window.innerWidth <= 960 || !timeline) return;
    const rect = timeline.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    let progress = (viewportCenter - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    const maxLeft = timeline.offsetWidth - 11;
    timelineSpark.style.left = (progress * maxLeft) + 'px';
  }
  window.addEventListener('scroll', positionSpark, { passive:true });
  window.addEventListener('resize', positionSpark);
  positionSpark();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if(openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', false);
        }
      });

      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Contact form (demo submission) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thanks — your message has been received. We\'ll be in touch soon.';
    form.reset();
  });

});
