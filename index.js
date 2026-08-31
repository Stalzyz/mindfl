(function() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 992;

  document.addEventListener('DOMContentLoaded', () => {
    applyAdminSettings();
    initHeaderScroll();
    initMobileMenu();
    initGardenLayer();
    initMouseParallax();
    initScrollReveals();
    initStatsCounter();
    initTabs();
    initForms();
    initVineDrawing();
    initCardTilt();
    initMagneticButtons();
    initOrganicBlobBackdrops();
    initBotanicalCursorTrail();
    initAudioEngine();
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

    // Drifting Leaves
    const leafColors = ['#7c9463', '#b8552d', '#e0a83e', '#33502f'];
    const leafCount = isMobile ? 3 : 8;
    for (let i = 0; i < leafCount; i++) {
      const el = document.createElement('div');
      el.className = 'drift-leaf parallax-el';
      el.dataset.depth = (0.015 + Math.random() * 0.02).toFixed(3);
      
      const duration = 15 + Math.random() * 20;
      const delay = -Math.random() * duration;
      const scale = 0.5 + Math.random() * 0.8;
      
      el.style.top = `${Math.random() * 85}vh`;
      el.style.left = '0';
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${delay}s`;
      el.style.transform = `scale(${scale})`;
      el.innerHTML = leafSVG(leafColors[i % leafColors.length]);
      frag.appendChild(el);
    }

    // Pollen
    if (!reduceMotion) {
      const pollenCount = isMobile ? 5 : 18;
      for (let p = 0; p < pollenCount; p++) {
        const el = document.createElement('div');
        el.className = 'pollen';
        
        const size = 3 + Math.random() * 4;
        const duration = 12 + Math.random() * 12;
        const delay = -Math.random() * duration;
        
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = `${100 + Math.random() * 15}vh`;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.style.setProperty('--drift-x', `${Math.random() * 70 - 35}px`);
        frag.appendChild(el);
      }
    }

    function dandelionSVG(color) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="13" x2="12" y2="22" stroke="${color}" stroke-width="1.2" opacity="0.6"/>
        <circle cx="12" cy="13" r="1.5" fill="${color}"/>
        <line x1="12" y1="13" x2="6" y2="5" stroke="${color}" stroke-width="0.9" opacity="0.75"/>
        <line x1="12" y1="13" x2="18" y2="5" stroke="${color}" stroke-width="0.9" opacity="0.75"/>
        <line x1="12" y1="13" x2="12" y2="3" stroke="${color}" stroke-width="0.9" opacity="0.75"/>
        <line x1="12" y1="13" x2="8" y2="7" stroke="${color}" stroke-width="0.9" opacity="0.75"/>
        <line x1="12" y1="13" x2="16" y2="7" stroke="${color}" stroke-width="0.9" opacity="0.75"/>
      </svg>`;
    }

    // Dandelion Floating Seeds (Feature 3)
    if (!reduceMotion) {
      const dandelionColors = ['#e0a83e', '#b8552d', '#7c9463', '#c77b63'];
      const dandelionCount = isMobile ? 3 : 7;
      for (let d = 0; d < dandelionCount; d++) {
        const el = document.createElement('div');
        el.className = 'dandelion-seed';
        
        const duration = 22 + Math.random() * 14;
        const delay = -Math.random() * duration;
        
        el.style.top = `${10 + Math.random() * 75}vh`;
        el.style.left = '0';
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.innerHTML = dandelionSVG(dandelionColors[d % dandelionColors.length]);
        frag.appendChild(el);
      }
    }

    // Butterflies
    if (!isMobile) {
      const bColors = ['#c77b63', '#e0a83e', '#33502f'];
      const butterflyCount = 3;
      for (let b = 0; b < butterflyCount; b++) {
        const el = document.createElement('div');
        el.className = 'butterfly';
        
        const duration = 20 + Math.random() * 12;
        const delay = b * 10 + Math.random() * 8;
        
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.innerHTML = butterflySVG(bColors[b % bColors.length]);
        frag.appendChild(el);
      }
    }

    // Boho Background Floral Art
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
        initScrollReveals();
        initStatsCounter();
        initTabs();
        initForms();
        initVineDrawing();
        initCardTilt();
        initMagneticButtons();
        initOrganicBlobBackdrops();
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

    // 4. WhatsApp FAB Button
    const waEnabled = localStorage.getItem('mindfl_whatsapp_enabled') === 'true';
    const existingFab = document.querySelector('.whatsapp-fab');
    if (waEnabled) {
      if (!existingFab) {
        const phone = localStorage.getItem('mindfl_whatsapp_phone') || '919876543210';
        const msg = localStorage.getItem('mindfl_whatsapp_msg') || 'Hello! I would like to inquire about MINDFL School.';
        const encodedMsg = encodeURIComponent(msg);
        
        const fab = document.createElement('a');
        fab.className = 'whatsapp-fab';
        fab.href = `https://wa.me/${phone}?text=${encodedMsg}`;
        fab.target = '_blank';
        fab.setAttribute('aria-label', 'Chat on WhatsApp');
        fab.innerHTML = `
          <svg viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.023-5.09-2.885-6.948C16.279 2.016 13.822 1 12.005 1 6.57 1 2.147 5.37 2.142 10.8c-.001 1.674.452 3.3 1.311 4.747l-.994 3.633 3.766-.976.242.139z"/>
            <path d="M15.772 12.886c-.27-.135-1.597-.788-1.846-.879-.247-.09-.429-.135-.609.135-.18.27-.697.879-.855 1.059-.158.18-.315.202-.585.067-.27-.135-1.139-.42-2.169-1.34-.801-.715-1.343-1.6-1.5-1.871-.158-.272-.017-.42.119-.555.122-.121.27-.315.405-.471.135-.158.18-.27.27-.45.09-.18.045-.338-.022-.472-.068-.135-.609-1.463-.834-2.003-.22-.53-.44-.458-.609-.467-.158-.008-.338-.008-.517-.008-.18 0-.472.067-.719.338-.247.27-.945.922-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.07.644.278 1.147.444 1.54.568.647.206 1.237.177 1.703.107.519-.078 1.597-.653 1.822-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z"/>
          </svg>
        `;
        document.body.appendChild(fab);
      }
    } else {
      if (existingFab) existingFab.remove();
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

  /* ---------------- BOTANICAL CURSOR TRAIL (Feature 7) ---------------- */
  function initBotanicalCursorTrail() {
    if (reduceMotion || isMobile) return;

    let lastX = 0, lastY = 0;
    const minDistance = 28;
    const trailColors = ['#e0a83e', '#7c9463', '#b8552d', '#c77b63'];

    window.addEventListener('mousemove', (e) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < minDistance) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const particle = document.createElement('div');
      particle.className = 'cursor-trail-leaf';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      
      const driftX = (Math.random() * 50 - 25) + 'px';
      const rot = (Math.random() * 160 - 80) + 'deg';
      particle.style.setProperty('--drift-x', driftX);
      particle.style.setProperty('--rot', rot);

      const color = trailColors[Math.floor(Math.random() * trailColors.length)];
      particle.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1 C13 4 14 11 8 15 C2 11 3 4 8 1Z" fill="${color}" opacity="0.85"/>
        <line x1="8" y1="2" x2="8" y2="14" stroke="rgba(0,0,0,0.2)" stroke-width="0.8"/>
      </svg>`;

      document.body.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    });
  }

  /* ---------------- WEB AUDIO & SOUND WIDGET ENGINE ---------------- */
  let audioCtx = null;
  let isSoundEnabled = false;
  let ambientOscillators = [];
  let ambientGain = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTapSFX() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  function playDropletSFX() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  }

  function playRustleSFX() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

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
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime);
      whiteNoise.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  function playChimeSFX() {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.8);
      });
    } catch (e) {}
  }

  function startAmbientNature() {
    const ctx = getAudioContext();
    if (!ctx) return;

    stopAmbientNature();

    try {
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.03, ctx.currentTime);

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
      }

      const windSrc = ctx.createBufferSource();
      windSrc.buffer = buffer;
      windSrc.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);

      windSrc.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(ctx.destination);

      windSrc.start(ctx.currentTime);
      ambientOscillators.push(windSrc);
    } catch(e) {}
  }

  function stopAmbientNature() {
    ambientOscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    ambientOscillators = [];
  }

  function initAudioEngine() {
    isSoundEnabled = localStorage.getItem('mindfl_sound_enabled') === 'true';

    if (!document.querySelector('.sound-widget-btn')) {
      const widget = document.createElement('button');
      widget.className = `sound-widget-btn ${isSoundEnabled ? 'playing' : ''}`;
      widget.setAttribute('aria-label', 'Toggle Ambient Nature Audio');
      widget.innerHTML = `
        <div class="sound-bars">
          <div class="sound-bar"></div>
          <div class="sound-bar"></div>
          <div class="sound-bar"></div>
        </div>
        <span class="sound-label">${isSoundEnabled ? 'Nature Audio: ON' : 'Nature Audio: OFF'}</span>
      `;

      widget.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('mindfl_sound_enabled', isSoundEnabled);

        const label = widget.querySelector('.sound-label');
        if (isSoundEnabled) {
          widget.classList.add('playing');
          if (label) label.textContent = 'Nature Audio: ON';
          startAmbientNature();
          playChimeSFX();
        } else {
          widget.classList.remove('playing');
          if (label) label.textContent = 'Nature Audio: OFF';
          stopAmbientNature();
        }
      });

      document.body.appendChild(widget);
    }

    if (isSoundEnabled) {
      const unlockAudio = () => {
        if (isSoundEnabled) startAmbientNature();
        document.removeEventListener('click', unlockAudio);
      };
      document.addEventListener('click', unlockAudio);
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('button, .btn-primary, .btn-secondary, nav a, .footer-links a')) {
        playTapSFX();
      }
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.pedagogy-card, .sense-card, .program-card, .founder-card')) {
        playDropletSFX();
      }
    });
  }

})();
