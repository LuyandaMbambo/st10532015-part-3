document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.js-slideshow').forEach(initSlideshow);

  function initSlideshow(container) {
    const slidesWrap = container.querySelector('.slides');
    const slides = Array.from(container.querySelectorAll('.slide'));
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    const dotsWrap = container.querySelector('.dots');
    let index = 0;
    let timer = null;
    const interval = 4000;

    function go(to) {
      index = (to + slides.length) % slides.length;
      slidesWrap.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function nextSlide() { go(index + 1); }
    function prevSlide() { go(index - 1); }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.className = (i === index) ? 'active' : '';
        btn.addEventListener('click', () => { go(i); resetTimer(); });
        dotsWrap.appendChild(btn);
      });
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, interval);
    }

    if (next) next.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prev) prev.addEventListener('click', () => { prevSlide(); resetTimer(); });

    // lazy-update: ensure images fill container on load
    slides.forEach(imgWrap => {
      const img = imgWrap.querySelector('img');
      if (img && !img.complete) img.addEventListener('load', () => { /* no-op */ });
    });

    // start
    go(0);
    resetTimer();

    // pause on hover
    container.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
    container.addEventListener('mouseleave', () => { resetTimer(); });
  }
});
