/* =========================================================
   ARCHIT — app.js
   Makes everything move: opening the box, the menu, picking
   up objects, opening/closing project pages and moving
   between them.

   The address bar keeps track of where you are, so the
   browser's back button works and links can be shared:
     index.html                → closed box
     index.html#/              → open box
     index.html#/packaging     → the Packaging project
   ========================================================= */

(function () {
  "use strict";

  const SITE = window.SITE;
  const ITEMS = SITE.items;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const body = document.body;
  const scene = $("#scene");
  const inside = $("#inside");
  const opener = $("#opener");
  const menuBtn = $("#menu-btn");
  const closeBoxBtn = $("#closebox-btn");
  const menu = $("#menu");

  const overlay = $("#project");
  const sheet = $("#sheet");
  const content = $("#content");
  const countEl = $("#count");
  const backBtn = $("#back");

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");

  let boxOpen = false;
  let current = null;
  let hideTimer = null;
  let swapTimer = null;

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  const pad = (n) => String(n).padStart(3, "0");
  const indexOf = (id) => ITEMS.findIndex((p) => p.id === id);
  const keepsakeFor = (id) => inside.querySelector(`.keepsake[data-project="${id}"]`);
  const ms = (n) => (reducedMotion.matches ? 0 : n);

  $$("[data-owner]").forEach((el) => (el.textContent = SITE.owner));
  $("#total").textContent = pad(ITEMS.length);

  // fill the menu and the side list from content.js
  const links = ITEMS.map((p) => `<li><a href="#/${esc(p.id)}">${esc(p.title)}</a></li>`).join("");
  $("#menu-list").innerHTML = links;
  $("#menu-more").innerHTML = `<li><a href="#/about">About me</a></li><li><a href="#/resume">Resume</a></li>`;
  $("#sidenav").innerHTML = links;

  /* =========================================================
     The box
     ========================================================= */
  function setState(open, instant) {
    if (instant) {
      body.classList.add("is-instant");
      requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove("is-instant")));
    }
    body.classList.toggle("is-open", open);
    body.classList.toggle("is-closed", !open);
    hits.inert = !open;
    closeBoxBtn.hidden = !open;
    if (instant) {
      // jump the lid straight to where it ends up (no lift-off animation)
      $("#lid").getAnimations().forEach((a) => {
        if (a.animationName !== "lid-peek") a.finish();
      });
    }
  }

  function openBox(instant) {
    if (boxOpen) return;
    boxOpen = true;
    toggleMenu(false);
    setState(true, instant);
  }

  function closeBox(instant) {
    if (!boxOpen) return;
    boxOpen = false;
    setState(false, !!instant);
    opener.focus({ preventScroll: true });
  }

  opener.addEventListener("click", () => { location.hash = "#/"; });
  closeBoxBtn.addEventListener("click", () => { location.hash = ""; });
  $("#closelid").addEventListener("click", () => { location.hash = ""; });

  /* ---------- menu ---------- */
  function toggleMenu(force) {
    const show = typeof force === "boolean" ? force : menu.hidden;
    menu.hidden = !show;
    menuBtn.setAttribute("aria-expanded", String(show));
  }
  menuBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMenu(); });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target)) toggleMenu(false);
  });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggleMenu(false); });

  /* =========================================================
     Picking things up
     The objects you see live inside the 3D box. The ones you
     click are invisible twins in a flat layer on top (#hits),
     because browsers can't reliably click inside 3D scenes.
     ========================================================= */
  const hits = $("#hits");
  const hitsTray = $("#hits-tray");
  const keepsakes = $$(".keepsake[data-project]", inside);

  keepsakes.forEach((k) => {
    k.tabIndex = -1;
    k.setAttribute("aria-hidden", "true");
    const ks = $(".ks", k);

    const hit = document.createElement("button");
    hit.type = "button";
    hit.className = "hit " + [...k.classList].filter((c) => c.startsWith("k-")).join(" ");
    hit.dataset.project = k.dataset.project;
    hit.setAttribute("aria-label", k.getAttribute("aria-label"));
    hitsTray.appendChild(hit);
    k._hit = hit;

    hit.addEventListener("pointerenter", () => k.classList.add("is-hover"));
    hit.addEventListener("pointerleave", () => {
      k.classList.remove("is-hover");
      ks.style.removeProperty("--tx");
      ks.style.removeProperty("--ty");
    });
    hit.addEventListener("focus", () => { if (hit.matches(":focus-visible")) k.classList.add("is-focus"); });
    hit.addEventListener("blur", () => k.classList.remove("is-focus"));
    hit.addEventListener("pointermove", (e) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const r = hit.getBoundingClientRect();
      ks.style.setProperty("--tx", (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2) + "deg");
      ks.style.setProperty("--ty", (-((e.clientY - r.top) / r.height - 0.5) * 14).toFixed(2) + "deg");
    });
    hit.addEventListener("click", () => {
      keepsakes.forEach((el) => el.classList.remove("is-picked"));
      k.classList.add("is-picked");
      setTimeout(() => { location.hash = "#/" + k.dataset.project; }, ms(180));
    });
  });

  // keep each invisible twin the same height as the real object
  function sizeHits() {
    keepsakes.forEach((k) => { k._hit.style.height = k.offsetHeight + "px"; });
  }
  new ResizeObserver(sizeHits).observe(inside);
  inside.addEventListener("load", sizeHits, true);   // a sticker PNG finished loading
  inside.addEventListener("error", () => requestAnimationFrame(sizeHits), true);
  document.fonts && document.fonts.ready.then(sizeHits);
  sizeHits();

  /* =========================================================
     Project pages
     ========================================================= */
  const ICON_COMPANY = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 13.5V4.5L8 2l6 2.5v9M5 13.5V8h6v5.5M1 13.5h14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
  const ICON_TAGS = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h6l6 6-5 5-6-6V3z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="5.2" cy="6" r="1.1" fill="currentColor"/></svg>`;
  const ICON_YEAR = `<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M2 6.5h12M5 1.5v3M11 1.5v3" stroke="currentColor" stroke-width="1.3"/></svg>`;

  // every tag always gets the same colour (like Notion)
  // tag colours matching your Notion (0 green, 1 blue, 2 pink, 3 orange,
  // 4 purple, 5 yellow, 6 red, 7 brown, 8 gray). New tags get a colour automatically.
  const TAG_COLOURS = {
    "ui/ux": 0, "product design": 1, "brand design": 2, "ux research": 3, "user testing": 4,
    "market research": 5, "analysis": 8, "ux design": 6, "illustration": 2, "advertising": 3,
    "outdoor": 3, "social media": 8, "art direction": 0, "styling": 0, "video production": 8,
    "photography": 3
  };
  const pillColour = (t) => {
    const k = String(t).toLowerCase().trim();
    return k in TAG_COLOURS ? TAG_COLOURS[k]
      : [...k].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % 9;
  };
  const nl = (s) => esc(s).replace(/\n/g, "<br>");

  function mediaHTML(b) {
    const ratio = esc(b.ratio || "16/9");
    const cap = b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : "";
    if (b.video !== undefined) {
      const inner = b.video
        ? `<video src="${esc(b.video)}" controls playsinline preload="metadata" style="aspect-ratio:${ratio}"></video>`
        : `<div class="np-ph" style="aspect-ratio:${ratio}"><span class="np-ph__play" aria-hidden="true">▶</span><span class="ui">Video · ${ratio.replace("/", ":")}</span></div>`;
      return `<figure class="np-media">${inner}${cap}</figure>`;
    }
    const inner = b.image
      ? `<img src="${esc(b.image)}" alt="${esc(b.alt || b.caption || "")}" loading="lazy">`
      : `<div class="np-ph" style="aspect-ratio:${ratio}"><span class="ui">Image · ${ratio.replace("/", ":")}</span></div>`;
    return `<figure class="np-media">${inner}${cap}</figure>`;
  }

  function blockHTML(b) {
    if (b.heading !== undefined) return `<h2>${esc(b.heading)}</h2>`;
    if (b.subheading !== undefined) return `<h3>${esc(b.subheading)}</h3>`;
    if (b.text !== undefined) return `<p>${nl(b.text)}</p>`;
    if (b.quote !== undefined) return `<blockquote>${nl(b.quote)}</blockquote>`;
    if (b.lead !== undefined) return `<p class="np-lead">${nl(b.lead)}</p>`;
    if (Array.isArray(b.list)) return `<ul class="np-list">${b.list.map((li) => `<li>${nl(li)}</li>`).join("")}</ul>`;
    if (b.callout !== undefined) return `<div class="np-callout"><span aria-hidden="true">${esc(b.icon || "💡")}</span><span>${nl(b.callout)}</span></div>`;
    if (b.divider) return `<hr>`;
    if (b.image !== undefined || b.video !== undefined) return mediaHTML(b);
    if (b.embed !== undefined) {
      const ratio = esc(b.ratio || "16/9");
      const cap = b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : "";
      return `<figure class="np-media np-embed"><iframe src="${esc(b.embed)}" style="aspect-ratio:${ratio}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${esc(b.caption || "Embedded video")}"></iframe>${cap}</figure>`;
    }
    if (Array.isArray(b.row)) return `<div class="np-row">${b.row.map(blockHTML).join("")}</div>`;
    return "";
  }

  // the wide image at the top of a page, with its settings from content.js
  // The cover at the top of a page.
  // 1) If there's a file in assets/covers/ named after the page
  //    (e.g. assets/covers/olive-hotel.jpg), that's used automatically.
  // 2) Otherwise the cover: "…" set in content.js.
  // 3) Otherwise a placeholder (projects) or nothing (About / Resume).
  const COVER_DIR = "assets/covers/";
  const COVER_TYPES = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];

  function coverHTML(p) {
    const vars = [
      p.coverPosition && `--cover-pos:${p.coverPosition}`,
      p.coverFit && `--cover-fit:${p.coverFit}`,
      p.coverHeight && `--cover-h:${p.coverHeight}`,
      p.coverBg && `--cover-bg:${p.coverBg}`
    ].filter(Boolean).join(";");
    const ph = p.coverless ? "" : `<div class="np-cover__ph"><span class="ui">Cover image</span></div>`;
    return `<header class="np-cover" style="${esc(vars)}" data-cover-id="${esc(p.id)}" data-cover="${esc(p.cover || "")}"${p.coverless ? " hidden" : ""}>${ph}</header>`;
  }

  // try each possible cover file in turn and show the first one that exists
  function loadCovers(root) {
    $$("[data-cover-id]", root).forEach((header) => {
      const candidates = COVER_TYPES.map((t) => `${COVER_DIR}${header.dataset.coverId}.${t}`);
      if (header.dataset.cover) candidates.push(header.dataset.cover);
      const show = (html) => {
        header.innerHTML = html;
        header.hidden = false;
        const page = header.closest(".np--page");
        if (page) page.classList.add("has-cover");
      };
      const next = (i) => {
        if (i >= candidates.length) {                 // nothing found
          if (header.hidden) header.remove();
          return;
        }
        const src = candidates[i];
        if (/\.(mp4|webm|mov)$/i.test(src)) {
          show(`<video src="${esc(src)}" autoplay muted loop playsinline></video>`);
          return;
        }
        const img = new Image();
        img.onload = () => { if (header.isConnected) show(`<img src="${esc(src)}" alt="">`); };
        img.onerror = () => next(i + 1);
        img.src = src;
      };
      next(0);
    });
  }

  // "DuolingoXLakmeFashionWeek" may wrap between its words: add invisible
  // break points (<wbr>) where a capital letter starts a new word
  const camelSplit = (t) => String(t).replace(/([a-z0-9])(?=[A-Z])|([A-Z])(?=[A-Z][a-z])/g, "$1$2\u0000");
  const wrapTitle = (t) => esc(camelSplit(t)).split("\u0000").join("<wbr>");
  const titleParts = (t) => Math.max(...camelSplit(t).split(/[\s\u0000]+/).map((w) => w.length));

  function pageHTML(p, i) {
    const prev = ITEMS[(i - 1 + ITEMS.length) % ITEMS.length];
    const next = ITEMS[(i + 1) % ITEMS.length];
    const tags = (p.tags || []).map((t) => `<span class="pill pill--${pillColour(t)}">${esc(t)}</span>`).join("");
    return `
      <div class="np">
        ${coverHTML(p)}
        <div class="np-body">
          <div class="np-head">
            <div class="np-head__text">
              <p class="np-crumb ui rv" style="--d:2">Box / Work / ${pad(i + 1)}</p>
              <h1 class="np-title rv" style="--d:3;--len:${titleParts(p.title)}" id="project-title">${wrapTitle(p.title)}</h1>
              ${p.subtitle ? `<p class="np-subtitle rv" style="--d:3">${esc(p.subtitle)}</p>` : ""}
            </div>
            <div class="sticker-stage np-icon rv" style="--d:1" data-sticker="${esc(p.id)}"></div>
          </div>
          <dl class="np-props rv" style="--d:4">
            ${p.company ? `<div><dt>${ICON_COMPANY}Company</dt><dd>${esc(p.company)}</dd></div>` : ""}
            ${tags ? `<div><dt>${ICON_TAGS}Tags</dt><dd class="pills">${tags}</dd></div>` : ""}
            ${p.year ? `<div><dt>${ICON_YEAR}Year</dt><dd>${esc(p.year)}</dd></div>` : ""}
          </dl>
          <hr class="rv" style="--d:5">
          <article class="np-content rv" style="--d:6">
            ${(p.blocks || []).map(blockHTML).join("")}
          </article>
          <nav class="np-nav" aria-label="More from the box">
            <button class="prev" type="button" data-go="${esc(prev.id)}">
              <span class="sticker-stage np-mini" data-sticker="${esc(prev.id)}"></span>
              <span class="np-nav__text"><span class="ui">← Previous</span><strong>${esc(prev.title)}</strong></span>
            </button>
            <button class="next" type="button" data-go="${esc(next.id)}">
              <span class="np-nav__text"><span class="ui">Next →</span><strong>${esc(next.title)}</strong></span>
              <span class="sticker-stage np-mini" data-sticker="${esc(next.id)}"></span>
            </button>
          </nav>
          <button class="np-back ui" type="button" data-close>← Homepage</button>
        </div>
      </div>`;
  }

  /* ---------- About me & Resume pages ---------- */
  const ARROW_OUT = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const PLATFORM_ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 10v7M7 7v.01M11 17v-7M11 13c0-2 1.2-3 2.8-3 1.7 0 2.2 1.2 2.2 3v4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    behance:  `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M5.5 8h3.2c1.4 0 2.2.7 2.2 1.8S10.1 11.6 8.7 11.6M5.5 11.6h3.6c1.5 0 2.3.8 2.3 2s-.9 2.2-2.4 2.2H5.5zM5.5 8v7.8M13.4 13.2h5.1c0-1.8-1-3-2.5-3s-2.6 1.2-2.6 2.8 1 2.8 2.7 2.8c1 0 1.8-.4 2.2-1.2M14.2 8.4h3.4" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    email:    `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M6.5 8.5h11v7h-11zM6.8 8.8 12 13l5.2-4.2" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    instagram:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.2" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="15.3" cy="8.7" r=".8" fill="#fff"/></svg>`,
    link:     `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M10.5 13.5l3-3M9.5 11 8 12.5a2.5 2.5 0 0 0 3.5 3.5l1.5-1.5M14.5 13 16 11.5A2.5 2.5 0 0 0 12.5 8L11 9.5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>`
  };

  function aboutHTML() {
    const a = SITE.about || {};
    return `
      <div class="np np--page">
        ${coverHTML({ ...a, id: "about", coverless: true })}
        <div class="np-body">
          <section class="ab-hero">
            ${a.photo ? `<figure class="ab-photo rv" style="--d:1"><img src="${esc(a.photo)}" alt="Portrait of ${esc(SITE.owner)}"></figure>` : ""}
            <div class="ab-intro">
              <p class="np-crumb ui rv" style="--d:2">About me</p>
              <h1 class="np-title rv" style="--d:3" id="project-title">${esc(a.title || "About me")}</h1>
              ${a.headline ? `<p class="np-subtitle rv" style="--d:4">${esc(a.headline)}</p>` : ""}
            </div>
          </section>
          <hr class="rv" style="--d:5">
          <article class="np-content rv" style="--d:6">
            <h2>Bio</h2>
            ${(a.bio || []).map((t) => `<p>${nl(t)}</p>`).join("")}
            <ul class="ab-links">
              ${(a.links || []).map((l) => `
                <li><a href="${esc(l.url)}" ${/^https?:/.test(l.url) ? 'target="_blank" rel="noopener"' : ""}>
                  <span class="ab-links__icon">${PLATFORM_ICONS[l.icon] || PLATFORM_ICONS.link}</span>
                  <strong>${esc(l.label)}</strong>${ARROW_OUT}
                </a></li>`).join("")}
            </ul>
          </article>
          <nav class="np-nav np-nav--single" aria-label="More">
            <button class="next" type="button" data-go="resume"><span class="np-nav__text"><span class="ui">Next →</span><strong>Resume</strong></span></button>
          </nav>
          <button class="np-back ui" type="button" data-close>← Homepage</button>
        </div>
      </div>`;
  }

  // "Digitas India" → "DI": shown until a company logo file is added
  const initials = (name) => String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  function resumeHTML() {
    const r = SITE.resume || {};
    return `
      <div class="np np--page">
        ${coverHTML({ ...r, id: "resume", coverless: true })}
        <div class="np-body">
          <p class="np-crumb ui rv" style="--d:1">${esc(SITE.owner)}${r.location ? ` · ${esc(r.location)}` : ""}</p>
          <h1 class="np-title rv" style="--d:2" id="project-title">${esc(r.title || "Resume")}</h1>
          ${r.role ? `<p class="np-subtitle rv" style="--d:3">${esc(r.role)}</p>` : ""}
          ${r.pdf ? `<a class="rs-download ui rv" style="--d:3" href="${esc(r.pdf)}" download>Download PDF ↓</a>` : ""}
          <hr class="rv" style="--d:4">
          <article class="np-content rv" style="--d:5">
            ${r.profile ? `<h2>Profile</h2><p>${nl(r.profile)}</p>` : ""}
            <h2>Experience</h2>
            <div class="rs-jobs">
              ${(r.experience || []).map((j) => `
                <section class="rs-job">
                  <div class="rs-logo" aria-hidden="true">
                    <span>${esc(initials(j.company))}</span>
                    ${j.logo ? `<img src="${esc(j.logo)}" alt="" onerror="this.remove()">` : ""}
                  </div>
                  <div class="rs-job__body">
                    <div class="rs-job__head">
                      <h3>${esc(j.role)}</h3>
                      <span class="rs-dates">${esc(j.dates)}</span>
                    </div>
                    <p class="rs-company">${esc(j.company)}${j.location ? ` <span>· ${esc(j.location)}</span>` : ""}</p>
                    ${j.text ? `<p>${nl(j.text)}</p>` : ""}
                    ${j.bullets ? `<ul class="rs-bullets">${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
                    ${j.brands || j.clients ? `<p class="rs-clients"><span class="ui">Selected brands</span> ${esc(j.brands || j.clients)}</p>` : ""}
                  </div>
                </section>`).join("")}
            </div>
            ${r.expertise ? `<h2>Core expertise</h2><div class="pills rs-skills">${r.expertise.map((x) => `<span class="pill pill--8">${esc(x)}</span>`).join("")}</div>` : ""}
            <div class="rs-grid">
              <section>
                <h2>Education</h2>
                ${(r.education || []).map((e) => `
                  <div class="rs-edu">
                    <span class="rs-dates">${esc(e.dates)}</span>
                    <h3>${esc(e.school)}</h3>
                    <p>${esc(e.course)}</p>
                  </div>`).join("")}
              </section>
              <section>
                <h2>Awards &amp; recognition</h2>
                <ul class="rs-list">${(r.awards || []).map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
                ${r.languages ? `<h2>Languages</h2><div class="pills">${r.languages.map((l) => `<span class="pill pill--8">${esc(l)}</span>`).join("")}</div>` : ""}
              </section>
            </div>
          </article>
          <nav class="np-nav np-nav--single" aria-label="More">
            <button class="prev" type="button" data-go="about"><span class="np-nav__text"><span class="ui">← About me</span><strong>Hi, I’m Archit</strong></span></button>
          </nav>
          <button class="np-back ui" type="button" data-close>← Homepage</button>
        </div>
      </div>`;
  }

  // the pages that aren't objects in the box
  const PAGES = {
    about:  { id: "about",  title: "About me", page: aboutHTML },
    resume: { id: "resume", title: "Resume",   page: resumeHTML }
  };

  function render(p) {
    sheet.classList.toggle("is-page", !!p.page);
    if (p.page) {
      content.innerHTML = p.page();
      loadCovers(content);
      document.title = `${p.title} — ${SITE.name}`;
      return;
    }
    const i = indexOf(p.id);
    countEl.textContent = pad(i + 1);
    content.innerHTML = pageHTML(p, i);
    loadCovers(content);

    // put a (non-clickable) copy of each object wherever the page asks for one
    $$("[data-sticker]", content).forEach((stage) => {
      const src = keepsakeFor(stage.dataset.sticker);
      if (!src) return;
      const copy = document.createElement("span");
      copy.className = src.className;
      copy.classList.remove("is-picked", "is-hover", "is-focus");
      copy.setAttribute("aria-hidden", "true");
      copy.innerHTML = src.innerHTML;
      const ks = $(".ks", copy);
      if (ks) ks.setAttribute("style", "");
      stage.appendChild(copy);
    });
    document.title = `${p.title} — ${SITE.name}`;
  }

  function showProject(p) {
    clearTimeout(hideTimer);

    if (current && !overlay.hidden && overlay.classList.contains("is-open")) {
      if (current.id === p.id) return;
      const forward = p.page ? true : indexOf(p.id) > indexOf(current.id);
      content.style.setProperty("--leave", forward ? "-28px" : "28px");
      content.style.setProperty("--enter", forward ? "28px" : "-28px");
      content.classList.add("is-leaving");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        render(p);
        sheet.scrollTop = 0;
        content.classList.remove("is-leaving");
        content.classList.add("is-entering");
        requestAnimationFrame(() => requestAnimationFrame(() => content.classList.remove("is-entering")));
      }, ms(240));
      current = p;
      return;
    }

    current = p;
    render(p);
    sheet.scrollTop = 0;
    overlay.hidden = false;
    scene.inert = true;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        overlay.classList.add("is-open");
        backBtn.focus({ preventScroll: true });
      })
    );
  }

  function hideProject() {
    if (!current) return;
    const was = current;
    current = null;
    overlay.classList.remove("is-open");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      overlay.hidden = true;
      content.innerHTML = "";
      scene.inert = false;
      document.title = `${SITE.name} — Portfolio`;
      $$(".keepsake.is-picked", inside).forEach((el) => el.classList.remove("is-picked"));
      const k = !was.page && keepsakeFor(was.id);
      if (k && k._hit && boxOpen) k._hit.focus({ preventScroll: true });
    }, ms(600));
  }

  overlay.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { location.hash = "#/" + go.dataset.go; return; }
    if (e.target.closest("[data-close]")) closePage();
  });

  // "Homepage" (and Esc) always go back to the closed box
  function closePage() { location.hash = ""; }

  function step(dir) {
    if (!current || current.page) return;
    const i = indexOf(current.id);
    location.hash = "#/" + ITEMS[(i + dir + ITEMS.length) % ITEMS.length].id;
  }
  $("#prev").addEventListener("click", () => step(-1));
  $("#next").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) { toggleMenu(false); menuBtn.focus(); return; }
    if (!current) return;
    if (e.key === "Escape") { e.preventDefault(); closePage(); }
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  /* =========================================================
     Routing — reads the address bar and shows the right thing
     ========================================================= */
  function route(initial) {
    const hash = location.hash;

    if (!hash || hash === "#") {
      // coming back from a page: show the box already closed (no lid animation)
      const fromPage = !!current;
      hideProject();
      closeBox(fromPage);
      return;
    }

    const id = hash.replace(/^#\/?/, "");
    if (!id) {
      hideProject();
      openBox(initial);
      return;
    }

    if (PAGES[id]) {
      toggleMenu(false);
      showProject(PAGES[id]);
      return;
    }

    const i = indexOf(id);
    if (i === -1) { location.replace("#/"); return; }
    openBox(true);
    showProject(ITEMS[i]);
  }

  setState(false, true);
  // the drop-in entrance only happens once, when the page first loads.
  // Wait until the box photos are decoded so it never falls in half-drawn.
  const decode = (src) => { const i = new Image(); i.src = src; return i.decode().catch(() => {}); };
  const timeout = new Promise((r) => setTimeout(r, 2500));          // don't wait forever on a slow connection
  Promise.race([Promise.all([decode("assets/box/lid.jpg"), decode("assets/box/inside.jpg")]), timeout])
    .then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
      body.classList.add("is-ready");
      setTimeout(() => body.classList.remove("is-entering"), reducedMotion.matches ? 0 : 2000);
    })));
  window.addEventListener("hashchange", () => route(false));
  route(true);
})();
