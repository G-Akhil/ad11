/* ==========================================================================
   Portfolio logic — reads everything from window.SITE_CONFIG (js/config.js)
   ========================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Icons ---------- */
  var ICONS = {
    story: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M8 7h8M8 11h6"/></svg>',
    color: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="5.5"/><circle cx="15" cy="9" r="5.5"/><circle cx="12" cy="15" r="5.5"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.8" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54V21h-4V9.75Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.84-6.33L5.25 21H2.18l7.17-8.2L1.9 3h6.33l4.37 5.78L17.53 3Zm-1.08 16.15h1.7L7.33 4.75H5.5l10.95 14.4Z"/></svg>'
  };

  /* ---------- Hero / identity ---------- */
  function renderIdentity() {
    var name = C.name || "Your Name";
    document.title = name + " | " + (C.role || "Video Editor");
    $$('[data-bind="name"]').forEach(function (el) { el.textContent = name; });
    $$('[data-bind="name-logo"]').forEach(function (el) { el.textContent = name; });
    $$('[data-bind="role"]').forEach(function (el) { el.textContent = C.role || "Video Editor"; });
    $$('[data-bind="tagline"]').forEach(function (el) { el.textContent = C.tagline || ""; });
    $("#year").textContent = new Date().getFullYear();

    if (C.resumeLink) {
      var r = $("#resumeBtn");
      r.href = C.resumeLink;
      r.hidden = false;
    }
    showImage("#heroImg", "#heroMedia", C.heroImage);
    showImage("#aboutImg", "#aboutMedia", C.about && C.about.image);
  }

  // Shows an image block only if the file actually loads
  function showImage(imgSel, wrapSel, src) {
    if (!src) return;
    var img = $(imgSel), wrap = $(wrapSel);
    var probe = new Image();
    probe.onload = function () { img.src = src; wrap.hidden = false; };
    probe.src = src;
  }

  /* ---------- About ---------- */
  function renderAbout() {
    var a = C.about || {};
    $("#aboutText").innerHTML = (a.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#aboutStats").innerHTML = (a.stats || []).map(function (s) {
      return '<div class="stat"><strong>' + esc(s.value) + "</strong><span>" + esc(s.label) + "</span></div>";
    }).join("");
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    $("#skillsGrid").innerHTML = (C.skills || []).map(function (s, i) {
      var icon = ICONS[s.icon] || esc(s.icon);
      return '<article class="skill reveal" style="--d:' + (i * 0.07) + 's">' +
        '<div class="skill__icon">' + icon + "</div>" +
        "<h3>" + esc(s.name) + "</h3><p>" + esc(s.desc) + "</p></article>";
    }).join("");
  }

  /* ---------- Projects ---------- */
  function cardHTML(p, i, openLabel) {
    return '<a class="card reveal" style="--d:' + (i * 0.08) + 's" href="' + esc(p.link) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(p.title) + ' – opens on Google Drive">' +
      '<div class="card__thumb">' +
        '<img src="' + esc(p.thumb) + '" alt="' + esc(p.title) + ' thumbnail" loading="lazy" />' +
        '<div class="card__play"><i>' + ICONS.play + "</i></div>" +
      "</div>" +
      '<div class="card__body"><span class="card__title">' + esc(p.title) + '</span><span class="card__open">' + openLabel + " ↗</span></div>" +
    "</a>";
  }

  function renderProjects() {
    $("#longGrid").innerHTML = (C.longVideos || []).map(function (p, i) { return cardHTML(p, i, "Watch"); }).join("");
    $("#shortGrid").innerHTML = (C.shortVideos || []).map(function (p, i) { return cardHTML(p, i, "Play"); }).join("");

    // Graceful placeholder if a thumbnail file is missing
    $$(".card__thumb img").forEach(function (img) {
      img.addEventListener("error", function () { img.parentElement.classList.add("no-thumb"); });
    });
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var c = C.contact || {};
    var num = String(c.whatsappNumber || "").replace(/\D/g, "");
    $("#waCard").href = "https://wa.me/" + num + (c.whatsappMessage ? "?text=" + encodeURIComponent(c.whatsappMessage) : "");

    var mail = "mailto:" + (c.email || "") +
      "?subject=" + encodeURIComponent(c.emailSubject || "") +
      "&body=" + encodeURIComponent(c.emailBody || "");
    $("#mailCard").href = mail;
    if (c.email) $("#mailLabel").textContent = c.email;
  }

  /* ---------- Social ---------- */
  function renderSocial() {
    $("#socialLinks").innerHTML = (C.social || []).slice(0, 2).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' + (ICONS[s.type] || esc(s.label)) + "</a>";
    }).join("");
  }

  /* ---------- Nav behaviour ---------- */
  function initNav() {
    var nav = $("#nav"), toggle = $("#navToggle"), menu = $("#navMenu");

    function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
    $$(".nav__link", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) setMenu(false); });

    // Highlight the link for the section in view
    var links = $$(".nav__link", menu);
    var sections = links.map(function (l) { return $(l.getAttribute("href")); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { if (s) io.observe(s); });
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Init ---------- */
  renderIdentity();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderSocial();
  initNav();
  initReveal();
})();
