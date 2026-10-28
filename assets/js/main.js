(() => {
  document.documentElement.classList.add('js-enabled');

  // 1. Mobile Menu & Dropdowns
  const initMenu = () => {
    const burger = document.querySelector('.site-header__burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');
    const subToggle = document.querySelector('.mobile-menu__sub-toggle');
    const subList = document.querySelector('.mobile-menu__sublist');

    if (!burger || !mobileMenu) return;

    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    if (subToggle && subList) {
      subToggle.addEventListener('click', () => {
        const isOpen = subList.classList.toggle('is-open');
        subToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  };

  // 3. Hero Slider (Swipe, Arrows, Keyboard, Autoplay)
  const initHeroSlider = () => {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('[data-hero-slide]'));
    if (slides.length <= 1) return;

    const prevBtn = slider.querySelector('[data-hero-prev]');
    const nextBtn = slider.querySelector('[data-hero-next]');
    const currentEl = slider.querySelector('[data-hero-current]');
    let current = 0;
    let timer = null;
    let touchStartX = 0;

    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (currentEl) currentEl.textContent = String(current + 1);
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const resetAutoplay = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(next, 6000);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prev();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        next();
        resetAutoplay();
      });
    }

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) next();
        else prev();
        resetAutoplay();
      }
    }, { passive: true });

    resetAutoplay();
  };

  // 4. Masonry Layout (Shortest-column distribution keeping left-to-right order)
  const initMasonry = () => {
    const containers = Array.from(document.querySelectorAll('[data-masonry]'));
    if (!containers.length) return;

    containers.forEach((container) => {
      const originalItems = Array.from(container.querySelectorAll('[data-masonry-item]'));
      if (!originalItems.length) return;

      let lastColCount = 0;

      const getColumnCount = () => {
        const w = window.innerWidth;
        if (w <= 640) return 1;
        if (w <= 960) return 2;
        return 3;
      };

      const layout = (force = false) => {
        const colCount = getColumnCount();
        if (!force && colCount === lastColCount) return;
        lastColCount = colCount;

        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;

        const cols = Array.from({ length: colCount }, () => {
          const col = document.createElement('div');
          col.className = 'masonry-gallery__column';
          container.appendChild(col);
          return { el: col, height: 0 };
        });

        originalItems.forEach((item) => {
          // Pick shortest column
          let targetCol = cols[0];
          for (let i = 1; i < cols.length; i++) {
            if (cols[i].height < targetCol.height) {
              targetCol = cols[i];
            }
          }
          targetCol.el.appendChild(item);
          const img = item.querySelector('img');
          const ratio = (img && img.naturalWidth && img.naturalHeight)
            ? (img.naturalHeight / img.naturalWidth)
            : 1.25;
          targetCol.height += ratio;
        });
      };

      layout(true);

      // Re-balance as images finish loading their natural dimensions
      originalItems.forEach((item) => {
        const img = item.querySelector('img');
        if (img && !img.complete) {
          img.addEventListener('load', () => layout(true), { once: true });
        }
      });

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => layout(false), 150);
      });
    });
  };

  // 5. Lightbox (Fade transition, Keyboard, Swipe, Preload next)
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const triggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
    if (!triggers.length) return;

    const imgEl = lightbox.querySelector('[data-lightbox-image]');
    const currentEl = lightbox.querySelector('[data-lightbox-current]');
    const totalEl = lightbox.querySelector('[data-lightbox-total]');
    const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
    const nextBtn = lightbox.querySelector('[data-lightbox-next]');
    const closeBtns = Array.from(lightbox.querySelectorAll('[data-lightbox-close]'));

    const gallery = triggers.map((btn) => ({
      src: btn.getAttribute('data-lightbox-src'),
      alt: btn.getAttribute('data-lightbox-alt') || ''
    }));

    if (totalEl) totalEl.textContent = String(gallery.length);

    let currentIndex = 0;
    let isOpen = false;
    let touchStartX = 0;

    const preload = (idx) => {
      const target = gallery[(idx + gallery.length) % gallery.length];
      if (!target) return;
      const pre = new Image();
      pre.src = target.src;
    };

    const show = (index) => {
      currentIndex = (index + gallery.length) % gallery.length;
      const item = gallery[currentIndex];
      if (!item || !imgEl) return;

      imgEl.style.opacity = '0.2';
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
      if (currentEl) currentEl.textContent = String(currentIndex + 1);
      preload(currentIndex + 1);
      preload(currentIndex - 1);
    };

    const open = (index) => {
      isOpen = true;
      show(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      isOpen = false;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    triggers.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const attrIdx = parseInt(btn.getAttribute('data-lightbox-index') || String(idx), 10);
        open(Number.isNaN(attrIdx) ? idx : attrIdx);
      });
    });

    closeBtns.forEach((btn) => btn.addEventListener('click', close));
    if (prevBtn) prevBtn.addEventListener('click', () => show(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    });

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (!isOpen) return;
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) show(currentIndex + 1);
        else show(currentIndex - 1);
      }
    }, { passive: true });
  };

  // 6. Scroll Reveal (IntersectionObserver)
  const initReveal = () => {
    const items = Array.from(document.querySelectorAll('.reveal-item'));
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
  };

  // 7. Contact Form fallback when Formspree ID is not yet set
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const whatsapp = form.getAttribute('data-whatsapp');
    if (!whatsapp) return; // Formspree is active

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (form.querySelector('[name="nome"]')?.value || '').trim();
      const sobrenome = (form.querySelector('[name="sobrenome"]')?.value || '').trim();
      const telefone = (form.querySelector('[name="telefone"]')?.value || '').trim();
      const email = (form.querySelector('[name="email"]')?.value || '').trim();
      const mensagem = (form.querySelector('[name="mensagem"]')?.value || '').trim();

      const texto = `Olá Mateus! Meu nome é ${nome} ${sobrenome}.\nTelefone: ${telefone}\nE-mail: ${email}\n\n${mensagem}`;
      const feedback = document.getElementById('contact-feedback');
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'Redirecionando sua mensagem para o WhatsApp...';
      }
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initHeroSlider();
    initMasonry();
    initLightbox();
    initReveal();
    initContactForm();
  });
})();
