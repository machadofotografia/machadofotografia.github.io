(() => {
  document.documentElement.classList.add('js-enabled');

  // 1. Mobile Menu & Dropdowns
  const initMenu = () => {
    const burger = document.querySelector('.site-header__burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');
    const subToggle = document.querySelector('.mobile-menu__sub-toggle');
    const subTrigger = document.querySelector('[data-mobile-sub-trigger]');
    const subWrap = document.getElementById('mobile-submenu-trabalhos') || document.querySelector('.mobile-menu__subwrap');
    const desktopDropdown = document.querySelector('.site-nav__item--has-dropdown');
    const desktopDropdownLink = desktopDropdown ? desktopDropdown.querySelector('.site-nav__link') : null;

    if (desktopDropdown && desktopDropdownLink) {
      desktopDropdown.addEventListener('mouseenter', () => {
        desktopDropdownLink.setAttribute('aria-expanded', 'true');
      });
      desktopDropdown.addEventListener('mouseleave', () => {
        desktopDropdownLink.setAttribute('aria-expanded', 'false');
      });
      desktopDropdown.addEventListener('focusin', () => {
        desktopDropdownLink.setAttribute('aria-expanded', 'true');
      });
      desktopDropdown.addEventListener('focusout', (e) => {
        if (!desktopDropdown.contains(e.relatedTarget)) {
          desktopDropdownLink.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (!burger || !mobileMenu) return;

    const setSubmenu = (open) => {
      if (!subWrap || !subToggle) return;
      subWrap.classList.toggle('is-open', open);
      subWrap.setAttribute('aria-hidden', String(!open));
      subToggle.setAttribute('aria-expanded', String(open));
      if (subTrigger) subTrigger.setAttribute('aria-expanded', String(open));
    };

    const toggleSubmenu = (e) => {
      if (e) e.preventDefault();
      if (!subWrap) return;
      const isOpen = subWrap.classList.contains('is-open');
      setSubmenu(!isOpen);
    };

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
      setSubmenu(false);
    };

    burger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    if (subToggle) subToggle.addEventListener('click', toggleSubmenu);
    if (subTrigger) subTrigger.addEventListener('click', toggleSubmenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
      if (link === subTrigger) return;
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1199 && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  };

  // 2. Hero Slider (Swipe, Arrows, Autoplay)
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
    let touchStartY = 0;

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
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
        if (diffX < 0) next();
        else prev();
        resetAutoplay();
      }
    }, { passive: true });

    resetAutoplay();
  };

  // 3. Masonry Layout (Shortest-column distribution keeping left-to-right order)
  const initMasonry = () => {
    const containers = Array.from(document.querySelectorAll('[data-masonry]'));
    if (!containers.length) return;

    containers.forEach((container) => {
      const originalItems = Array.from(container.querySelectorAll('[data-masonry-item]'));
      if (!originalItems.length) return;

      let lastColCount = 0;
      let rafId = null;

      const getColumnCount = () => {
        const w = window.innerWidth;
        let maxCols = 3;
        if (w <= 640) maxCols = 1;
        else if (w <= 960) maxCols = 2;
        return Math.min(maxCols, originalItems.length);
      };

      const layout = (force = false) => {
        const colCount = getColumnCount();
        if (!force && colCount === lastColCount) return;
        lastColCount = colCount;

        container.innerHTML = '';
        container.dataset.cols = String(colCount);
        container.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;

        const cols = Array.from({ length: colCount }, () => {
          const col = document.createElement('div');
          col.className = 'masonry-gallery__column';
          container.appendChild(col);
          return { el: col, height: 0 };
        });

        originalItems.forEach((item) => {
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

      const scheduleRebalance = () => {
        if (getColumnCount() <= 1) return;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = null;
          layout(true);
        });
      };

      layout(true);

      originalItems.forEach((item) => {
        const img = item.querySelector('img');
        if (img && !img.complete) {
          img.addEventListener('load', scheduleRebalance, { once: true });
        }
      });

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => layout(false), 150);
      });
    });
  };

  // 4. Lightbox (Fade transition, Keyboard, Swipe, Preload next)
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
    if (gallery.length <= 1) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
    }

    let currentIndex = 0;
    let isOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const preload = (idx) => {
      if (gallery.length <= 1) return;
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
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      if (imgEl.complete) {
        imgEl.style.opacity = '1';
      }
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
      if (gallery.length > 1) {
        if (e.key === 'ArrowLeft') show(currentIndex - 1);
        if (e.key === 'ArrowRight') show(currentIndex + 1);
      }
    });

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (!isOpen || gallery.length <= 1) return;
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
        if (diffX < 0) show(currentIndex + 1);
        else show(currentIndex - 1);
      }
    }, { passive: true });
  };

  // 5. Scroll Reveal (IntersectionObserver)
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

  // 6. Contact Form (Formspree AJAX + WhatsApp fallback)
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const feedback = document.getElementById('contact-feedback');
    const submitBtn = form.querySelector('[type="submit"]');
    const whatsapp = form.getAttribute('data-whatsapp');

    if (whatsapp) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = (form.querySelector('[name="nome"]')?.value || '').trim();
        const sobrenome = (form.querySelector('[name="sobrenome"]')?.value || '').trim();
        const telefone = (form.querySelector('[name="telefone"]')?.value || '').trim();
        const email = (form.querySelector('[name="email"]')?.value || '').trim();
        const mensagem = (form.querySelector('[name="mensagem"]')?.value || '').trim();

        const texto = `Olá Mateus! Meu nome é ${nome} ${sobrenome}.\nTelefone: ${telefone}\nE-mail: ${email}\n\n${mensagem}`;
        if (feedback) {
          feedback.hidden = false;
          feedback.textContent = 'Redirecionando sua mensagem para o WhatsApp...';
        }
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
      });
      return;
    }

    if (form.action && form.action.includes('formspree.io')) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalLabel = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Enviando...';
        }
        if (feedback) {
          feedback.hidden = true;
          feedback.textContent = '';
        }

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });

          if (response.ok) {
            form.reset();
            if (feedback) {
              feedback.hidden = false;
              feedback.textContent = 'Mensagem enviada com sucesso! Responderei o mais breve possível.';
            }
          } else {
            throw new Error('Falha no envio');
          }
        } catch (_) {
          if (feedback) {
            feedback.hidden = false;
            feedback.textContent = 'Não foi possível enviar agora. Por favor, tente novamente ou chame pelo WhatsApp.';
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        }
      });
    }
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
