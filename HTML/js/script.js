(function () {
  "use strict";

  /* ============================== PAGE LOADER ============================== */
  (function pageLoader() {
    var loader = document.getElementById("pageLoader");
    var fill = document.getElementById("loaderFill");
    if (!loader || !fill) return;

    var start = Date.now();
    var MIN_VISIBLE_MS = 900;
    var progress = 0;
    var finished = false;
    var rafId;

    function tick() {
      var elapsed = Date.now() - start;
      var target = 90 * (1 - Math.exp(-elapsed / 900));
      progress = Math.max(progress, Math.min(target, 90));
      fill.style.width = progress + "%";
      if (!finished) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafId);
      var elapsed = Date.now() - start;
      var remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

      setTimeout(function () {
        fill.style.width = "100%";
        setTimeout(function () {
          loader.classList.add("page-loader--exiting");
          setTimeout(function () {
            loader.classList.add("page-loader--done");
          }, 500);
        }, 150);
      }, remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }
  })();

  /* ============================== HEADER SCROLL STATE ============================== */
  (function headerScroll() {
    var navContainer = document.querySelector(".pill-nav-container");
    if (!navContainer) return;
    function onScroll() {
      if (window.scrollY > 40) navContainer.classList.add("is-scrolled");
      else navContainer.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ============================== MOBILE MENU ============================== */
  (function mobileMenu() {
    var btn = document.getElementById("mobileMenuBtn");
    var popover = document.getElementById("mobileMenuPopover");
    if (!btn || !popover) return;

    function closeMenu() {
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      popover.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function toggleMenu() {
      var isOpen = btn.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      popover.classList.toggle("is-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    }

    btn.addEventListener("click", toggleMenu);

    popover.querySelectorAll(".mobile-menu-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  })();

  /* ============================== SCROLL-REVEAL ANIMATIONS ============================== */
  (function scrollReveal() {
    var targets = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });
  })();

  /* ============================== FAQ ACCORDION ============================== */
  (function faqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      if (item.classList.contains("is-open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }

      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          if (other === item) return;
          other.classList.remove("is-open");
          var otherQ = other.querySelector(".faq-question");
          var otherA = other.querySelector(".faq-answer");
          if (otherQ) otherQ.setAttribute("aria-expanded", "false");
          if (otherA) otherA.style.maxHeight = null;
        });

        if (isOpen) {
          item.classList.remove("is-open");
          question.setAttribute("aria-expanded", "false");
          answer.style.maxHeight = null;
        } else {
          item.classList.add("is-open");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });

    window.addEventListener("resize", function () {
      var openItem = document.querySelector(".faq-item.is-open");
      if (openItem) {
        var answer = openItem.querySelector(".faq-answer");
        if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  })();

  /* ============================== TESTIMONIALS MARQUEE ============================== */
  (function marquee() {
    var testimonials = [
      { name: "Ramesh Bhatt", role: "Founder & CEO", company: "Bhatt Textiles", quote: "Creadify rebuilt our funnel from scratch and our paid ROAS doubled inside two months. They actually think like operators, not just marketers.", rating: 5, avatar: "images/Testimonials/ramesh-bhatt.png" },
      { name: "Anamika Desai", role: "Head of Growth", company: "Desai Wellness Co.", quote: "The reporting alone is worth it. We finally know which channels are actually driving revenue instead of guessing every quarter.", rating: 5, avatar: "images/Testimonials/anamika-desai.png" },
      { name: "Ravi Kamat", role: "Marketing Director", company: "Kamat Realty Group", quote: "Every deliverable shipped on time and the creative team genuinely understood our brand voice from the first draft.", rating: 5, avatar: "images/Testimonials/ravi-kamat.png" },
      { name: "Asha Harissh", role: "Co-Founder", company: "Harissh & Co. Interiors", quote: "We tried three agencies before Creadify. This is the first team that treated our budget like it was their own money.", rating: 5, avatar: "images/Testimonials/asha-harissh.png" },
      { name: "Rahul Pandit", role: "VP Marketing", company: "Pandit Fintech", quote: "Our SEO traffic grew 3x in six months and the automation work they set up saves the team about ten hours a week.", rating: 5, avatar: "images/Testimonials/rahul-pandit.png" },
      { name: "Jasica", role: "Owner", company: "Jasica Boutique", quote: "Social media went from an afterthought to our biggest acquisition channel. Genuinely didn't expect that kind of turnaround.", rating: 5, avatar: "images/Testimonials/jasica.png" },
      { name: "Sunil Naik", role: "Operations Director", company: "Naik Logistics", quote: "The weekly check-ins alone were worth it. No jargon, no vanity metrics — just a clear picture of what was working and what was changing next.", rating: 5, avatar: "images/Testimonials/sunil-naik.png" }
    ];

    var track1 = document.getElementById("marqueeTrack1");
    var track2 = document.getElementById("marqueeTrack2");
    if (!track1 || !track2) return;

    var firstRow = testimonials.filter(function (_, i) { return i % 2 === 0; });
    var secondRow = testimonials.filter(function (_, i) { return i % 2 === 1; });

    function starSvg(filled) {
      return (
        '<svg viewBox="0 0 24 24" class="' + (filled ? "star-filled" : "star-empty") + '">' +
        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" /></svg>'
      );
    }

    function cardHtml(item) {
      var stars = "";
      for (var i = 0; i < 5; i++) stars += starSvg(i < item.rating);
      return (
        '<div class="testimonial-card">' +
          '<div class="testimonial-body">' +
            '<div class="testimonial-top">' +
              '<div class="stars">' + stars + "</div>" +
              '<svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z"/></svg>' +
            "</div>" +
            '<p class="testimonial-quote">&ldquo;' + item.quote + '&rdquo;</p>' +
            '<div class="testimonial-footer">' +
              '<span class="testimonial-avatar"><img src="' + item.avatar + '" alt="' + item.name + '" loading="lazy" /></span>' +
              "<div>" +
                '<p class="testimonial-name">' + item.name + "</p>" +
                '<p class="testimonial-role">' + item.role + " &middot; <b>" + item.company + "</b></p>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }

    function fillTrack(track, items) {
      var html = "";
      for (var r = 0; r < 4; r++) {
        items.forEach(function (item) { html += cardHtml(item); });
      }
      track.innerHTML = html;
    }

    fillTrack(track1, firstRow);
    fillTrack(track2, secondRow);
  })();

  /* ============================== DOT GRID CANVAS (HERO BG) ============================== */
  (function dotGrid() {
    var canvas = document.getElementById("dotGridCanvas");
    if (!canvas) return;
    var wrap = canvas.parentElement;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var dotSize = 5;
    var gap = 24;
    var proximity = 110;
    var baseColor = "rgba(255, 122, 26, 0.2)";

    var dots = [];
    var pointer = { x: -9999, y: -9999 };

    function buildGrid() {
      var rect = wrap.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      var cols = Math.floor((rect.width + gap) / (dotSize + gap));
      var rows = Math.floor((rect.height + gap) / (dotSize + gap));
      var cell = dotSize + gap;
      var gridW = cell * cols - gap;
      var gridH = cell * rows - gap;
      var extraX = rect.width - gridW;
      var extraY = rect.height - gridH;
      var startX = extraX / 2 + dotSize / 2;
      var startY = extraY / 2 + dotSize / 2;

      dots = [];
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          dots.push({ cx: startX + x * cell, cy: startY + y * cell });
        }
      }
    }

    function draw() {
      var rect = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      var proxSq = proximity * proximity;

      for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var dx = dot.cx - pointer.x;
        var dy = dot.cy - pointer.y;
        var dsq = dx * dx + dy * dy;
        var style = baseColor;
        if (dsq <= proxSq) {
          style = "rgba(255, 122, 26, 0.55)";
        }
        ctx.beginPath();
        ctx.fillStyle = style;
        ctx.arc(dot.cx, dot.cy, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    buildGrid();
    if (!reduceMotion) requestAnimationFrame(draw);
    else draw();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 150);
    });

    window.addEventListener(
      "mousemove",
      function (e) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      },
      { passive: true }
    );
  })();

  /* ============================== CONTACT MODAL ============================== */
  (function contactModal() {
    var modal = document.getElementById("contactModal");
    var closeBtn = document.getElementById("modalCloseBtn");
    var form = document.getElementById("contactForm");
    var formWrap = document.getElementById("modalFormWrap");
    var successPanel = document.getElementById("modalSuccess");
    var sendAnotherBtn = document.getElementById("sendAnotherBtn");
    var submitBtn = document.getElementById("contactSubmitBtn");
    var submitLabel = document.getElementById("submitBtnLabel");
    var submitIcon = document.getElementById("submitBtnIcon");
    if (!modal || !form) return;

    function openModal() {
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function resetForm() {
      form.reset();
      form.querySelectorAll(".field-input, .field-select, .field-textarea").forEach(function (el) {
        el.classList.remove("has-error");
      });
      form.querySelectorAll(".field-error").forEach(function (el) {
        el.classList.remove("is-visible");
        el.querySelector("span").textContent = "";
      });
      formWrap.classList.remove("is-hidden");
      successPanel.classList.remove("is-visible");
    }

    // Intercept every in-page link to #contact, opening the modal instead of jumping.
    document.addEventListener("click", function (event) {
      var anchor = event.target.closest('a[href="#contact"]');
      if (!anchor) return;
      event.preventDefault();
      openModal();
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("mousedown", function (event) {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });

    sendAnotherBtn.addEventListener("click", resetForm);

    var VALIDATORS = {
      name: function (v) {
        v = v.trim();
        if (v.length < 2) return "Enter your full name";
        return "";
      },
      email: function (v) {
        v = v.trim();
        if (!v) return "Enter your email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
        return "";
      },
      phone: function (v) {
        v = v.trim();
        if (v.length < 7) return "Enter a valid phone number";
        if (!/^[\d\s()+-]+$/.test(v)) return "Use numbers, spaces, and + - ( ) only";
        return "";
      },
      budget: function (v) {
        v = v.trim();
        if (!v) return "Enter your budget";
        return "";
      },
      service: function (v) {
        v = v.trim();
        if (!v) return "Enter the service you need";
        return "";
      },
      message: function (v) {
        v = v.trim();
        if (v.length < 10) return "Tell us a bit more (10+ characters)";
        return "";
      }
    };

    function showError(fieldName, message) {
      var input = form.querySelector('[name="' + fieldName + '"]');
      var errorEl = form.querySelector('.field-error[data-error-for="' + fieldName + '"]');
      if (input) input.classList.toggle("has-error", !!message);
      if (errorEl) {
        errorEl.classList.toggle("is-visible", !!message);
        errorEl.querySelector("span").textContent = message;
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var hasError = false;

      Object.keys(VALIDATORS).forEach(function (field) {
        var value = data.get(field) || "";
        var error = VALIDATORS[field](String(value));
        showError(field, error);
        if (error) hasError = true;
      });

      if (hasError) return;

      submitBtn.disabled = true;
      submitLabel.textContent = "Sending...";
      submitIcon.style.display = "none";

      setTimeout(function () {
        submitBtn.disabled = false;
        submitLabel.textContent = "Send Message";
        submitIcon.style.display = "";
        formWrap.classList.add("is-hidden");
        successPanel.classList.add("is-visible");
      }, 900);
    });
  })();
})();
