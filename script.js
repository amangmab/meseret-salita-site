/* =============================================================
   Meseret Salita — site interactions
   Vanilla JS, no dependencies.
   ============================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
  function openMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
    document.body.classList.add("menu-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1060) closeMenu();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (typeof target.focus === "function") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Stats count-up ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
    if (reduceMotion || document.hidden) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Contact form (Web3Forms + mailto fallback) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var accessKey = form.getAttribute("data-access-key") || "";
    // Placeholder key shipped with the template — see CONTENT-TODO.md
    var keyIsPlaceholder = !accessKey || accessKey.indexOf("REPLACE") !== -1;

    function setStatus(type, message) {
      if (!status) return;
      status.className = "form-status show " + type;
      status.textContent = message;
    }

    function mailtoFallback() {
      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var email = (form.querySelector('[name="email"]') || {}).value || "";
      var company = (form.querySelector('[name="company"]') || {}).value || "";
      var role = (form.querySelector('[name="interest"]') || {}).value || "";
      var message = (form.querySelector('[name="message"]') || {}).value || "";
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Company: " + company + "\n" +
        "Interest: " + role + "\n\n" +
        message;
      var href =
        "mailto:hello@meseretsalita.com?subject=" +
        encodeURIComponent("Website enquiry — " + (name || "New message")) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // No real key yet: degrade gracefully to the user's email client.
      if (keyIsPlaceholder) {
        setStatus("success", "Opening your email app… If nothing happens, email us at hello@meseretsalita.com.");
        mailtoFallback();
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus("success", "Sending your message…");

      var data = new FormData(form);
      data.append("access_key", accessKey);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            setStatus("success", "Thank you — your message is on its way. We'll reply within one business day.");
          } else {
            setStatus("error", "Something went wrong. Please email hello@meseretsalita.com directly.");
          }
        })
        .catch(function () {
          setStatus("error", "Network error. Please email hello@meseretsalita.com directly.");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Send message"; }
        });
    });
  }
})();
