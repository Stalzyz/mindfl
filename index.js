(function() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 992;

  document.addEventListener('DOMContentLoaded', () => {
    applyAdminSettings();
    initHeaderScroll();
    initMobileMenu();
    initGardenLayer();
    initMouseParallax();
    initScrollParallax();
    initScrollReveals();
    initStatsCounter();
    initTabs();
    initForms();
    initVineDrawing();
    initCardTilt();
    initMagneticButtons();
    initOrganicBlobBackdrops();
    initAllFeatures();
    initPageTransitions();
  });

  /* ---------------- HEADER SCROLL EFFECT ---------------- */
  function initHeaderScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /* ---------------- MOBILE MENU ---------------- */
  function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
      
      // Prevent body scrolling when menu is open
      if (navLinks.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- DYNAMIC GARDEN BACKGROUND ---------------- */
  function initGardenLayer() {
    const gardenLayer = document.getElementById('garden-layer');
    if (!gardenLayer) return;

    const frag = document.createDocumentFragment();

    // SVG templates
    function leafSVG(color) {
      return `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 2 C24 8 26 20 15 28 C4 20 6 8 15 2Z" fill="${color}" opacity="0.8"/>
        <line x1="15" y1="4" x2="15" y2="26" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
      </svg>`;
    }

    function cloudSVG() {
      return `<svg width="140" height="60" viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="38" rx="34" ry="18" fill="#fbf6ea"/>
        <ellipse cx="75" cy="26" rx="30" ry="22" fill="#fbf6ea"/>
        <ellipse cx="105" cy="38" rx="28" ry="16" fill="#fbf6ea"/>
      </svg>`;
    }

    function butterflySVG(color) {
      return `<svg width="26" height="22" viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 11 C6 -2 -3 4 3 12 C-3 20 6 24 13 11Z" fill="${color}" opacity="0.85"/>
        <path d="M13 11 C20 -2 29 4 23 12 C29 20 20 24 13 11Z" fill="${color}" opacity="0.7"/>
        <line x1="13" y1="4" x2="13" y2="18" stroke="#2b2416" stroke-width="1" opacity="0.4"/>
      </svg>`;
    }

    function bohoBlossomSVG() {
      return `<svg width="220" height="220" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="11" stroke="var(--clay)" stroke-width="1.6" fill="none"/>
        <circle cx="50" cy="50" r="1.5" fill="var(--clay)"/>
        <path d="M50 14 C52 27 48 27 50 34 M50 66 C52 73 48 73 50 86 M14 50 C27 52 27 48 34 50 M66 50 C73 52 73 48 86 50" stroke="var(--clay)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M25 25 C34 34 32 37 39 39 M61 61 C69 69 67 71 75 75 M75 25 C66 34 69 32 61 39 M39 61 C32 69 34 67 25 75" stroke="var(--moss)" stroke-width="1.1" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="28" stroke="var(--gold)" stroke-width="0.9" stroke-dasharray="2 3" fill="none" opacity="0.6"/>
        <circle cx="50" cy="50" r="42" stroke="var(--rose)" stroke-width="0.8" fill="none" opacity="0.4"/>
      </svg>`;
    }

    function bohoTwigSVG() {
      return `<svg width="180" height="260" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 108 C38 75 42 45 35 15" stroke="var(--moss)" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M38 88 C18 78 20 63 38 73 C18 58 22 43 37 53 C22 38 28 23 36 36" stroke="var(--moss)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        <path d="M40 88 C60 78 58 63 40 73 C60 58 56 43 41 53 C56 38 50 23 42 36" stroke="var(--moss)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        <circle cx="35" cy="15" r="3" fill="var(--gold)"/>
      </svg>`;
    }

    function bohoAbstractCirclesSVG() {
      return `<svg width="240" height="240" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="var(--rose)" stroke-width="1.2" fill="none"/>
        <circle cx="53" cy="48" r="24" stroke="var(--gold)" stroke-width="0.9" stroke-dasharray="3 3" fill="none"/>
        <path d="M50 20 C42 12 38 20 50 20 M50 80 C58 88 62 80 50 80 M20 50 C12 58 20 62 20 50 M80 50 C88 42 80 38 80 50" stroke="var(--clay)" stroke-width="1.4" fill="none"/>
        <path d="M28 28 C20 20 18 32 28 28 M72 72 C80 80 82 68 72 72 M72 28 C80 20 82 32 72 28 M28 72 C20 80 18 68 28 72" stroke="var(--moss)" stroke-width="1.1" fill="none"/>
      </svg>`;
    }

    // Clouds
    const cloudPositions = [
      [3, '6%', '10%', 65],
      [2, '65%', '6%', 90],
      [1.5, '20%', '35%', 45]
    ];
    const positions = isMobile ? cloudPositions.slice(0, 1) : cloudPositions;
    
    positions.forEach((c, idx) => {
      const el = document.createElement('div');
      el.className = 'cloud parallax-el';
      el.dataset.depth = (0.01 + idx * 0.008).toFixed(3);
      el.style.left = c[1];
      el.style.top = c[2];
      el.style.transform = `scale(${c[3]/100})`;
      el.innerHTML = cloudSVG();
      frag.appendChild(el);
    });

    // Drifting Leaves — REMOVED (replaced by static hero floating leaves)
    // Pollen — REMOVED
    // Dandelion Seeds — REMOVED
    // Butterflies — REMOVED

    // Boho Background Floral Art (kept)
    const bohoConfigs = [
      { svg: bohoBlossomSVG(), class: 'spin-1', top: '12vh', right: '-40px', scale: 0.8 },
      { svg: bohoTwigSVG(), class: 'float-1', top: '78vh', left: '-30px', scale: 0.95 },
      { svg: bohoAbstractCirclesSVG(), class: 'spin-2', top: '160vh', right: '-50px', scale: 0.85 },
      { svg: bohoBlossomSVG(), class: 'float-2', top: '235vh', left: '-40px', scale: 0.95 },
      { svg: bohoTwigSVG(), class: 'spin-1', top: '310vh', right: '-20px', scale: 0.85 }
    ];

    const activeBoho = isMobile ? bohoConfigs.slice(0, 2) : bohoConfigs;
    activeBoho.forEach(cfg => {
      const el = document.createElement('div');
      el.className = `boho-bg-art ${cfg.class}`;
      el.style.top = cfg.top;
      if (cfg.left) el.style.left = cfg.left;
      if (cfg.right) el.style.right = cfg.right;
      el.style.transform = `scale(${cfg.scale})`;
      el.innerHTML = cfg.svg;
      frag.appendChild(el);
    });

    gardenLayer.appendChild(frag);
  }

  /* ---------------- SCROLL-DRIVEN PARALLAX FOR IMAGES ---------------- */
  function initScrollParallax() {
    if (reduceMotion) return;

    const heroBg = document.getElementById('hero-parallax-bg');
    const midBg = document.getElementById('parallax-mid-bg');

    function updateParallax() {
      const scrollY = window.scrollY;

      // Hero parallax: image moves up slower than scroll (creates depth)
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.38}px)`;
      }

      // Mid-section parallax
      if (midBg) {
        const rect = midBg.closest('section')?.getBoundingClientRect();
        if (rect) {
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          midBg.style.transform = `translateY(${center * 0.22}px)`;
        }
      }

      // Parallax Stack Cards
      const stackCards = document.querySelectorAll('.parallax-card');
      stackCards.forEach(card => {
        const bg = card.querySelector('.card-bg');
        if (bg) {
          const rect = card.getBoundingClientRect();
          // Calculate distance from center of viewport
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          // Apply a gentle parallax factor to the background image
          bg.style.transform = `translateY(${center * 0.15}px)`;
        }
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  /* ---------------- MOUSE PARALLAX EFFECT ---------------- */
  function initMouseParallax() {
    if (reduceMotion || isMobile) return;

    let mx = 0, my = 0;
    window.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth) - 0.5;
      my = (e.clientY / window.innerHeight) - 0.5;

      requestAnimationFrame(() => {
        document.querySelectorAll('.parallax-el').forEach((el) => {
          const depth = parseFloat(el.dataset.depth || 0.015);
          const moveX = mx * depth * 350;
          const moveY = my * depth * 350;
          
          // Preserve any rotation or scaling in inline style
          const currentTransform = el.style.transform || '';
          const cleanTransform = currentTransform.replace(/translate\([^)]*\)\s*/g, '');
          
          el.style.transform = `translate(${moveX}px, ${moveY}px) ${cleanTransform}`;
        });
        
        // Parallax the hero sun if present
        const sun = document.querySelector('.sun-wrap');
        if (sun) {
          sun.style.transform = `translate(${mx * 12}px, ${my * 12}px)`;
        }
      });
    });
  }

  /* ---------------- SCROLL REVEALS ---------------- */
  function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll, .vine-divider, .journey-card, .pillar-row').forEach(el => {
      observer.observe(el);
    });
  }

  /* ---------------- STATISTICS COUNTER ANIMATION ---------------- */
  function initStatsCounter() {
    const statsContainer = document.querySelector('.stats-grid');
    if (!statsContainer) return;

    const stats = statsContainer.querySelectorAll('.stat-number');
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        stats.forEach(stat => {
          const target = parseInt(stat.dataset.target, 10);
          const suffix = stat.dataset.suffix || '';
          let current = 0;
          const duration = 1800; // ms
          const stepTime = Math.max(Math.floor(duration / target), 15);
          
          const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = current + suffix;
          }, stepTime);
        });
      }
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  }

  /* ---------------- INTERACTIVE TABS (PROGRAMS) ---------------- */
  function initTabs() {
    const tabsContainer = document.querySelector('.programs-tabs');
    if (!tabsContainer) return;

    const buttons = tabsContainer.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.program-detail-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;

        // Toggle active button
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle active content
        contents.forEach(card => {
          if (card.id === targetId) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      });
    });

    // Handle URL parameter pre-selection
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      const targetBtn = tabsContainer.querySelector(`[data-tab="${tabParam}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
  }

  /* ---------------- FORM LOGIC & FEEDBACK ---------------- */
  function initForms() {
    const forms = document.querySelectorAll('form');
    
    // Handle URL parameter pre-selection for admissions form
    const urlParams = new URLSearchParams(window.location.search);
    const progParam = urlParams.get('program');
    if (progParam) {
      const selectEl = document.getElementById('program-select');
      if (selectEl) {
        selectEl.value = progParam;
      }
    }

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Perform simple client-side checks
        let isValid = true;
        form.querySelectorAll('[required]').forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--clay)';
          } else {
            input.style.borderColor = '';
          }
        });

        if (!isValid) return;

        // Show a loading state
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
          // Success Feedback
          submitBtn.textContent = 'Submitted Successfully!';
          submitBtn.style.background = 'var(--moss)';
          
          // Save submitted data in localStorage
          saveLeadData(form);

          // Show overlay dialog
          showSuccessDialog(form.id);
          
          form.reset();
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
          }, 3000);
        }, 1200);
      });
    });
  }

  function showSuccessDialog(formId) {
    let title = 'Thank you!';
    let msg = 'We have received your submission and will get back to you shortly.';
    
    if (formId === 'careers-form') {
      title = 'Application Received!';
      msg = 'Thank you for applying to become a Nature Crafter. We will review your background and get back to you soon.';
    } else if (formId === 'inquiry-form') {
      title = 'Inquiry Submitted!';
      msg = 'We have received your inquiry. A coordinator will connect with you to arrange a Landscape Dialogue.';
    }

    const dialog = document.createElement('div');
    dialog.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(43, 36, 22, 0.6);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const card = document.createElement('div');
    card.style.cssText = `
      background: var(--paper);
      padding: 3rem 2rem;
      border-radius: 24px;
      max-width: 480px;
      width: 90%;
      text-align: center;
      box-shadow: 0 24px 50px rgba(43, 36, 22, 0.4);
      border: 1px solid var(--cream-line);
      transform: translateY(20px);
      transition: transform 0.3s ease;
    `;

    card.innerHTML = `
      <div style="margin-bottom: 0.6rem;">
        <svg class="flat-icon green" style="width: 50px; height: 50px;" viewBox="0 0 24 24"><path d="M12 22V12m0 0c0-3.5 2.5-6.5 6-6.5s5 2.5 5 5-4.5 5.5-11 1.5zm0 0c0-3.5-2.5-6.5-6-6.5S1 8.5 1 11s4.5 5.5 11 1.5z"/></svg>
      </div>
      <h3 style="font-size: 1.8rem; margin: 1rem 0 0.5rem; color: var(--forest-deep);">${title}</h3>
      <p style="color: var(--ink-soft); line-height: 1.6; margin-bottom: 1.8rem;">${msg}</p>
      <button class="btn-primary" style="padding: 0.75rem 2rem; font-size: 0.95rem;">Close</button>
    `;

    dialog.appendChild(card);
    document.body.appendChild(dialog);

    // Fade in
    setTimeout(() => {
      dialog.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 10);

    const closeBtn = card.querySelector('button');
    const dismiss = () => {
      dialog.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => dialog.remove(), 300);
    };

    closeBtn.addEventListener('click', dismiss);
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dismiss();
    });
  }

  /* ---------------- DYNAMIC VINE DRAWING ON SCROLL ---------------- */
  function initVineDrawing() {
    const vines = document.querySelectorAll('.vine-divider');
    if (!vines.length) return;

    const handleScroll = () => {
      vines.forEach(vine => {
        const path = vine.querySelector('.vine-path');
        if (!path) return;
        
        const rect = vine.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // If the vine is inside the viewport
        if (rect.top < viewHeight && rect.bottom > 0) {
          const scrollPct = (viewHeight - rect.top) / (viewHeight + rect.height);
          const cappedPct = Math.min(Math.max(scrollPct, 0), 1);
          
          // Draw calculation (dashoffset from 1400 down to 0)
          const drawOffset = 1400 - (cappedPct * 1.4 * 1400);
          path.style.strokeDashoffset = Math.max(drawOffset, 0);
          
          // Show leaves dynamically when drawn past 35%
          if (cappedPct > 0.35) {
            vine.querySelectorAll('.vine-leaf').forEach(leaf => {
              leaf.style.opacity = '1';
              leaf.style.transform = 'scale(1)';
            });
          } else {
            vine.querySelectorAll('.vine-leaf').forEach(leaf => {
              leaf.style.opacity = '0';
              leaf.style.transform = 'scale(0.4)';
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially
  }

  /* ---------------- 3D TILT EFFECT FOR CARDS ---------------- */
  function initCardTilt() {
    if (reduceMotion || isMobile) return;
    
    const cards = document.querySelectorAll('.journey-card, .grow-card, .sense-card');
    cards.forEach(card => {
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const dx = x - xc;
        const dy = y - yc;
        
        // Max tilt limit: 8 degrees
        const rotX = -(dy / yc) * 8;
        const rotY = (dx / xc) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.02)`;
        card.style.boxShadow = '0 25px 50px -15px rgba(43, 36, 22, 0.4)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = '';
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
      });
    });
  }

  /* ---------------- MAGNETIC BUTTONS ---------------- */
  function initMagneticButtons() {
    if (reduceMotion || isMobile) return;
    
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .play-btn, .nav-cta');
    
    window.addEventListener('mousemove', (e) => {
      magneticElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const dist = Math.hypot(e.clientX - elX, e.clientY - elY);
        
        // Attraction radius: 65px
        if (dist < 65) {
          const pullX = (e.clientX - elX) * 0.32;
          const pullY = (e.clientY - elY) * 0.32;
          el.style.transform = `translate(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px) scale(1.03)`;
          el.style.transition = 'transform 0.1s ease-out';
        } else {
          el.style.transform = '';
          el.style.transition = 'transform 0.4s ease';
        }
      });
    });
  }

  /* ---------------- DYNAMIC VIEW TRANSITIONS (SPA EFFECT) ---------------- */
  function initPageTransitions() {
    if (!document.startViewTransition) return;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      
      // Exclude external domains and local anchors on same page
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      
      e.preventDefault();
      loadPage(url);
    });

    window.addEventListener('popstate', () => {
      loadPage(new URL(window.location.href), true);
    });
  }

  async function loadPage(url, isPopState = false) {
    try {
      const res = await fetch(url.href);
      const htmlText = await res.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      
      const newTitle = doc.querySelector('title')?.textContent || '';
      const newBody = doc.querySelector('.wrap')?.innerHTML || '';
      const newNav = doc.querySelector('nav')?.innerHTML || '';

      document.startViewTransition(() => {
        document.title = newTitle;
        
        const wrap = document.querySelector('.wrap');
        if (wrap) wrap.innerHTML = newBody;
        
        const nav = document.querySelector('nav');
        if (nav) nav.innerHTML = newNav;
        
        // Update URL
        if (!isPopState) {
          window.history.pushState({}, '', url.href);
        }

        // Reset and re-init all page features
        window.scrollTo(0, 0);
        
        const garden = document.getElementById('garden-layer');
        if (garden) garden.innerHTML = ''; // clean old particles
        
        applyAdminSettings();
        initHeaderScroll();
        initMobileMenu();
        initGardenLayer();
        initScrollParallax();
        initScrollReveals();
        initStatsCounter();
        initTabs();
        initForms();
        initVineDrawing();
        initCardTilt();
        initMagneticButtons();
        initOrganicBlobBackdrops();
        initAllFeatures();
      });
    } catch (err) {
      if (!isPopState) {
        window.location.href = url.href;
      }
    }
  }

  /* ---------------- ADMIN CONFIG LOADER ---------------- */
  function applyAdminSettings() {
    // 1. Theme colors override
    try {
      const savedColors = JSON.parse(localStorage.getItem('mindfl_theme_colors'));
      if (savedColors) {
        Object.keys(savedColors).forEach(key => {
          if (savedColors[key]) {
            document.documentElement.style.setProperty(`--${key}`, savedColors[key]);
          }
        });
      }
    } catch(e){}

    // 2. Custom logo override
    const savedLogo = localStorage.getItem('mindfl_logo');
    if (savedLogo) {
      const brandElements = document.querySelectorAll('.brand');
      brandElements.forEach(brand => {
        brand.innerHTML = `<img src="${savedLogo}" alt="MINDFL" style="max-height: 42px; border-radius: 4px;">`;
      });
    }

    // 3. Custom favicon override
    const savedFavicon = localStorage.getItem('mindfl_favicon');
    if (savedFavicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = savedFavicon;
    }

    // 5. Custom contact details in footer
    const savedAddress = localStorage.getItem('mindfl_contact_address');
    const savedEmail = localStorage.getItem('mindfl_contact_email');
    const savedPhone = localStorage.getItem('mindfl_contact_phone');

    if (savedAddress || savedEmail || savedPhone) {
      const footer = document.querySelector('footer');
      if (footer) {
        const contactDivs = footer.querySelectorAll('.contact-row div');
        if (contactDivs.length >= 3) {
          if (savedAddress) {
            contactDivs[0].innerHTML = `<span>Address</span>${savedAddress}`;
          }
          if (savedEmail) {
            contactDivs[1].innerHTML = `<span>Email</span>${savedEmail}`;
          }
          if (savedPhone) {
            contactDivs[2].innerHTML = `<span>Phone</span>${savedPhone}`;
          }
        }
      }
    }
  }

  /* ---------------- LEAD SUBMISSION STORES ---------------- */
  function saveLeadData(form) {
    const timestamp = new Date().toLocaleString();
    if (form.id === 'inquiry-form') {
      const data = {
        name: form.querySelector('#p-name')?.value || '',
        email: form.querySelector('#p-email')?.value || '',
        phone: form.querySelector('#p-phone')?.value || '',
        childName: form.querySelector('#c-name')?.value || '',
        childDob: form.querySelector('#c-dob')?.value || '',
        program: form.querySelector('#program-select')?.value || '',
        notes: form.querySelector('#p-notes')?.value || '',
        timestamp
      };
      const leads = JSON.parse(localStorage.getItem('mindfl_leads') || '[]');
      leads.push(data);
      localStorage.setItem('mindfl_leads', JSON.stringify(leads));

      // Trigger Email Notification if configured
      const notifyEmails = localStorage.getItem('mindfl_notification_emails');
      if (notifyEmails && notifyEmails.trim()) {
        const subject = `New MINDFL Admissions Inquiry — ${data.childName}`;
        const body = `Hello,

A new Expression of Interest has been submitted on the MINDFL website.

Inquiry Details:
------------------------------------------
Parent Name: ${data.name}
Email Address: ${data.email}
Phone Number: ${data.phone}
Child Name: ${data.childName}
Child Date of Birth: ${data.childDob}
Program of Interest: ${data.program}
Aspirations & Notes: ${data.notes}

Submitted at: ${data.timestamp}
`;
        const mailtoUrl = `mailto:${encodeURIComponent(notifyEmails.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
      }
    } else if (form.id === 'careers-form') {
      const data = {
        name: form.querySelector('#name')?.value || '',
        email: form.querySelector('#email')?.value || '',
        phone: form.querySelector('#phone')?.value || '',
        summary: form.querySelector('#summary')?.value || '',
        why: form.querySelector('#why')?.value || '',
        timestamp
      };
      const careers = JSON.parse(localStorage.getItem('mindfl_careers') || '[]');
      careers.push(data);
      localStorage.setItem('mindfl_careers', JSON.stringify(careers));
    } else if (form.id === 'newsletter-form') {
      const email = form.querySelector('#news-email')?.value || '';
      const subscribers = JSON.parse(localStorage.getItem('mindfl_newsletter') || '[]');
      if (!subscribers.some(s => s.email === email)) {
        subscribers.push({ email, timestamp });
        localStorage.setItem('mindfl_newsletter', JSON.stringify(subscribers));
      }
    }
  }

  /* ---------------- MORPHING ORGANIC BLOB BACKDROPS (Feature 4) ---------------- */
  function initOrganicBlobBackdrops() {
    const cards = document.querySelectorAll('.pedagogy-card, .sense-card, .program-card, .founder-card');
    cards.forEach(card => {
      if (!card.querySelector('.boho-organic-blob')) {
        const blob = document.createElement('div');
        blob.className = 'boho-organic-blob';
        card.style.position = card.style.position || 'relative';
        card.prepend(blob);
      }
    });
  }

  /* ---------------- BOTANICAL CURSOR TRAIL — REMOVED ---------------- */
  function initBotanicalCursorTrail() {
    // Cursor trail removed per user request
  }

  /* ---------------- WEB AUDIO & SOUND WIDGET ENGINE ---------------- */
  let audioCtx = null;
  let isSoundEnabled = true;
  let bgmAudio = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    return audioCtx;
  }

  function unlockWebAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if (isSoundEnabled) {
      startAmbientNature();
    }
  }

  // Piano Notes Scale (C4, D4, E4, G4, A4, C5, D5, E5, G5)
  const pianoNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
  let pianoNoteIdx = 0;

  function playPianoKeySFX(noteIndex = null) {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const idx = noteIndex !== null ? noteIndex : pianoNoteIdx++;
      const freq = pianoNotes[Math.abs(idx) % pianoNotes.length];
      const now = ctx.currentTime;

      // Master Piano Note Envelope
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.28, now + 0.008);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      // Acoustic Lowpass Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(380, now + 1.3);

      // Piano Harmonics
      const harmonics = [
        { mult: 1, gain: 0.70 },
        { mult: 2, gain: 0.30 },
        { mult: 3, gain: 0.15 },
        { mult: 4, gain: 0.05 }
      ];

      harmonics.forEach(h => {
        const osc = ctx.createOscillator();
        const hGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * h.mult, now);
        hGain.gain.setValueAtTime(h.gain, now);

        osc.connect(hGain);
        hGain.connect(filter);

        osc.start(now);
        osc.stop(now + 1.6);
      });

      filter.connect(noteGain);
      noteGain.connect(ctx.destination);
    } catch(e) {}
  }

  function playRustleSFX() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    try {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime);
      whiteNoise.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  let bgmVolume = parseFloat(localStorage.getItem('mindfl_bgm_volume') || '0.30');

  function startAmbientNature() {
    if (!bgmAudio) {
      bgmAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/02/23/audio_ea70ad08e3.mp3');
      bgmAudio.loop = true;
      bgmAudio.volume = bgmVolume;
    }
    if (isSoundEnabled) {
      bgmAudio.play().catch(() => {});
    }
  }

  function stopAmbientNature() {
    if (bgmAudio) {
      bgmAudio.pause();
    }
  }

  function setBgmVolume(val) {
    bgmVolume = val;
    localStorage.setItem('mindfl_bgm_volume', val);
    if (bgmAudio) {
      bgmAudio.volume = val;
    }
  }

  function initAudioEngine() {
    const stored = localStorage.getItem('mindfl_sound_enabled');
    isSoundEnabled = stored === null ? true : stored === 'true';

    if (!document.querySelector('.sound-fab-stack')) {
      // Sound FAB container (left side)
      const stack = document.createElement('div');
      stack.className = 'sound-fab-stack';

      // Vertical volume slider
      const volBox = document.createElement('div');
      volBox.className = 'sound-volume-vertical';
      const volSlider = document.createElement('input');
      volSlider.type = 'range';
      volSlider.min = '0';
      volSlider.max = '100';
      volSlider.value = String(Math.round(bgmVolume * 100));
      volSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        setBgmVolume(parseInt(e.target.value) / 100);
      });
      volBox.appendChild(volSlider);

      // Sound toggle button
      const widget = document.createElement('button');
      widget.className = `sound-widget-btn ${isSoundEnabled ? 'playing' : ''}`;
      widget.setAttribute('aria-label', 'Toggle Spring Music');
      widget.innerHTML = `
        <div class="sound-bars">
          <div class="sound-bar"></div>
          <div class="sound-bar"></div>
          <div class="sound-bar"></div>
        </div>
        <span class="sound-label">${isSoundEnabled ? 'ON' : 'OFF'}</span>
      `;

      widget.addEventListener('click', (e) => {
        e.stopPropagation();
        unlockWebAudio();
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('mindfl_sound_enabled', isSoundEnabled);

        const label = widget.querySelector('.sound-label');
        if (isSoundEnabled) {
          widget.classList.add('playing');
          if (label) label.textContent = 'ON';
          startAmbientNature();
        } else {
          widget.classList.remove('playing');
          if (label) label.textContent = 'OFF';
          stopAmbientNature();
        }
      });

      stack.appendChild(volBox);
      stack.appendChild(widget);
      document.body.appendChild(stack);
    }

    // Unlocking Audio on First Touch/Click/Pointer
    window.addEventListener('click', unlockWebAudio, { once: true });
    window.addEventListener('pointerdown', unlockWebAudio, { once: true });
    window.addEventListener('keydown', unlockWebAudio, { once: true });

    // Global Event Delegation for Piano Key SFX on Hover
    let lastHoverTime = 0;
    document.body.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.btn-primary, .btn-secondary, button, nav a, .footer-links a, .card, .pedagogy-card, .sense-card, .program-card, .founder-card, .offering-card, .thinker-row, .video-card');
      if (!target) return;

      const now = Date.now();
      if (now - lastHoverTime < 90) return;
      lastHoverTime = now;

      playPianoKeySFX();
    });

    // Button Click Piano Chord SFX
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('.btn-primary, .btn-secondary, button, nav a, .footer-links a, input[type="submit"]');
      if (target && !target.classList.contains('sound-widget-btn') && !target.classList.contains('fab-btn') && !target.classList.contains('mini-form-close')) {
        playPianoKeySFX(4);
      }
    });
  }

  /* ---------------- FAB BUTTONS (RIGHT SIDE) ---------------- */
  function initFabButtons() {
    if (document.querySelector('.fab-stack')) return;

    const stack = document.createElement('div');
    stack.className = 'fab-stack';

    // Go to top button
    const topBtn = document.createElement('button');
    topBtn.className = 'fab-btn fab-top';
    topBtn.setAttribute('aria-label', 'Go to top');
    topBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide go-to-top on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.classList.add('visible');
      } else {
        topBtn.classList.remove('visible');
      }
    }, { passive: true });

    // WhatsApp button
    const waBtn = document.createElement('button');
    waBtn.className = 'fab-btn fab-whatsapp';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    waBtn.addEventListener('click', () => {
      window.open('https://wa.me/918754540090?text=Hi%20MINDFL%2C%20I%20am%20interested%20to%20know%20more%20about%20admissions.', '_blank');
    });

    // Apply Now button
    const applyBtn = document.createElement('button');
    applyBtn.className = 'fab-btn fab-apply';
    applyBtn.setAttribute('aria-label', 'Apply Now');
    applyBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/></svg>';
    applyBtn.addEventListener('click', () => {
      openMiniForm();
    });

    stack.appendChild(topBtn);
    stack.appendChild(waBtn);
    stack.appendChild(applyBtn);
    document.body.appendChild(stack);
  }

  /* ---------------- MINI ENQUIRY FORM POPUP ---------------- */
  function openMiniForm() {
    let overlay = document.querySelector('.mini-form-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mini-form-overlay';
      overlay.innerHTML = `
        <div class="mini-form-card" style="position:relative;">
          <button class="mini-form-close" aria-label="Close">&times;</button>
          <h3>Quick Enquiry</h3>
          <p class="mini-form-sub">Fill in your details and we'll get back to you shortly.</p>
          <form id="mini-inquiry-form">
            <div class="form-group">
              <label for="mf-name">Parent / Guardian Name</label>
              <input type="text" id="mf-name" required placeholder="Your full name">
            </div>
            <div class="form-group">
              <label for="mf-phone">Phone Number</label>
              <input type="tel" id="mf-phone" required placeholder="Your contact number">
            </div>
            <div class="form-group">
              <label for="mf-email">Email Address</label>
              <input type="email" id="mf-email" required placeholder="your.email@example.com">
            </div>
            <div class="form-group">
              <label for="mf-child">Child's Name</label>
              <input type="text" id="mf-child" required placeholder="Your child's name">
            </div>
            <div class="form-group">
              <label for="mf-program">Program of Interest</label>
              <select id="mf-program" required>
                <option value="" disabled selected>Select a program...</option>
                <option value="toddler">Parent-Toddler (6-24 Months)</option>
                <option value="sprouts">Sprouts (2-3 Years)</option>
                <option value="seedlings">Seedlings (3-4 Years)</option>
                <option value="buds">Buds (4-5 Years)</option>
                <option value="blossoms">Blossoms (5-6 Years)</option>
              </select>
            </div>
            <button type="submit" class="btn-primary" style="width:100%;text-align:center;">Submit Enquiry</button>
          </form>
        </div>
      `;

      // Close on backdrop click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMiniForm();
      });

      // Close button
      overlay.querySelector('.mini-form-close').addEventListener('click', closeMiniForm);

      // Form submit handler
      overlay.querySelector('#mini-inquiry-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you shortly.');
        closeMiniForm();
        e.target.reset();
      });

      document.body.appendChild(overlay);
    }

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
  }

  function closeMiniForm() {
    const overlay = document.querySelector('.mini-form-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  /* ---------------- INIT ALL FEATURES ON PAGE LOAD / NAV ---------------- */
  function initAllFeatures() {
    initAudioEngine();
    initFabButtons();
  }

})();

