(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const TIGERS = "Glasgow Tigers";

  const fmtDate = (iso, opts = { day: "numeric", month: "short" }) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-GB", opts);

  /* ---------- Season maths ---------- */
  const teamMeetings = RESULTS.filter(r => r.score);
  const outcome = r => {
    const [h, a] = r.score;
    const tigersHome = r.home === TIGERS;
    const us = tigersHome ? h : a, them = tigersHome ? a : h;
    return us > them ? "W" : us < them ? "L" : "D";
  };
  const outcomeLabel = { W: "Win", D: "Draw", L: "Defeat" };

  /* ---------- Header: dropdowns ---------- */
  $$(".nav-item > button.nav-link").forEach(btn => {
    const item = btn.parentElement;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      $$(".nav-item.open").forEach(i => { i.classList.remove("open"); $("button", i).setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
    item.addEventListener("keydown", e => {
      if (e.key === "Escape") { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".nav-item")) $$(".nav-item.open").forEach(i => { i.classList.remove("open"); $("button", i).setAttribute("aria-expanded", "false"); });
  });

  /* ---------- Drawers (mobile menu, bag) ---------- */
  const makeDrawer = (drawer, openers, closers) => {
    const panel = $(".drawer-panel", drawer);
    let opener = null;
    const open = from => {
      opener = from || document.activeElement;
      drawer.classList.add("open"); drawer.removeAttribute("inert");
      openers.forEach(o => o.setAttribute("aria-expanded", "true")); document.body.classList.add("no-scroll");
      closers[closers.length - 1].focus();
    };
    const close = () => {
      drawer.classList.remove("open"); drawer.setAttribute("inert", "");
      openers.forEach(o => o.setAttribute("aria-expanded", "false")); document.body.classList.remove("no-scroll");
      if (opener && opener.isConnected) opener.focus();
    };
    openers.forEach(o => o.addEventListener("click", () => open(o)));
    closers.forEach(c => c.addEventListener("click", close));
    drawer.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = $$("a, button, summary, input, select", panel).filter(x => x.offsetParent && !x.disabled);
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    return { open, close };
  };
  const menu = $("#drawer");
  if (menu) makeDrawer(menu, $$(".menu-toggle"), [$(".drawer-scrim", menu), $(".drawer-close", menu)]);

  /* ---------- Bag (front-end demo; persisted per browser) ---------- */
  const money = p => "£" + (p / 100).toFixed(2);
  const cartEl = $("#cart");
  const store = {
    get() { try { return JSON.parse(localStorage.getItem("gt-bag")) || []; } catch { return []; } },
    set(items) { try { localStorage.setItem("gt-bag", JSON.stringify(items)); } catch { /* storage unavailable: bag lasts for this page only */ } }
  };
  let bag = store.get();
  const cartDrawer = cartEl && makeDrawer(cartEl, $$("[data-open-cart]"), $$("[data-close-cart]", cartEl));
  const toastEl = $("[data-toast]");
  let toastTimer;
  const hideToastSoon = () => { clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 6000); };
  const toast = html => {
    if (!toastEl) return;
    toastEl.innerHTML = html; toastEl.classList.add("show");
    hideToastSoon();
  };
  if (toastEl) {
    // Hold the toast while the visitor is pointing at it or tabbing through it
    ["mouseenter", "focusin"].forEach(ev => toastEl.addEventListener(ev, () => clearTimeout(toastTimer)));
    ["mouseleave", "focusout"].forEach(ev => toastEl.addEventListener(ev, hideToastSoon));
  }

  const renderBag = () => {
    const count = bag.reduce((n, i) => n + i.qty, 0);
    $$("[data-cart-count]").forEach(b => { b.textContent = count; b.hidden = !count; });
    $$("[data-cart-label]").forEach(l => { l.textContent = count ? `Bag, ${count} item${count === 1 ? "" : "s"}` : "Bag, empty"; });
    if (!cartEl) return;
    $("#cart-title").textContent = count ? `Your bag (${count})` : "Your bag";
    const list = $("[data-cart-items]", cartEl);
    $("[data-cart-foot]", cartEl).hidden = !count;
    if (!count) {
      list.innerHTML = `<div class="cart-empty"><span class="icon">${icon("cart")}</span><p><strong>Your bag is empty.</strong><br>Replica shirts, jackets and gifts are waiting.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
      return;
    }
    list.innerHTML = `<ul class="cart-list">${bag.map((i, n) => `
      <li class="cart-item">
        <img src="${i.img}" alt="" width="80" height="80">
        <div class="cart-item-info">
          <b>${i.name}</b>
          ${i.option ? `<span class="hint">${i.option}</span>` : ""}
          <div class="stepper" role="group" aria-label="Quantity of ${i.name}">
            <button type="button" data-dec="${n}" aria-label="Decrease quantity">−</button>
            <output aria-live="polite">${i.qty}</output>
            <button type="button" data-inc="${n}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <b>${money(i.price * i.qty)}</b>
          <button type="button" class="link-btn" data-remove="${n}">Remove<span class="sr-only"> ${i.name}</span></button>
        </div>
      </li>`).join("")}</ul>`;
    $("[data-cart-subtotal]", cartEl).textContent = money(bag.reduce((s, i) => s + i.price * i.qty, 0));
  };

  if (cartEl) {
    cartEl.addEventListener("click", e => {
      const t = e.target.closest("button"); if (!t) return;
      const n = +(t.dataset.inc ?? t.dataset.dec ?? t.dataset.remove);
      if (t.dataset.inc) bag[n].qty = Math.min(bag[n].qty + 1, 10);
      else if (t.dataset.dec) bag[n].qty > 1 ? bag[n].qty-- : bag.splice(n, 1);
      else if (t.dataset.remove) bag.splice(n, 1);
      else if (t.hasAttribute("data-checkout")) { $("[data-checkout-note]", cartEl).hidden = false; return; }
      else return;
      store.set(bag); renderBag();
      const again = $(`[data-${t.dataset.inc ? "inc" : "dec"}="${n}"]`, cartEl) || $("[data-close-cart]:not(.drawer-scrim)", cartEl);
      again && again.focus();
    });
  }

  window.TigersBag = {
    money,
    add(item) {
      const key = `${item.id}|${item.option || ""}`;
      const found = bag.find(i => i.key === key);
      found ? found.qty = Math.min(found.qty + item.qty, 10) : bag.push({ ...item, key });
      store.set(bag); renderBag();
      toast(`${icon("check")}<span><b>Added to bag</b> ${item.name}${item.option ? `, ${item.option}` : ""}</span><button type="button" class="btn btn--sm btn--gold" data-open-cart-toast>View bag</button>`);
      const v = $("[data-open-cart-toast]", toastEl);
      v && v.addEventListener("click", () => { toastEl.classList.remove("show"); cartDrawer.open($("[data-open-cart]")); });
    }
  };
  renderBag();

  /* ---------- Season stats strip ---------- */
  $$("[data-season-stats]").forEach(el => {
    const o = teamMeetings.map(outcome);
    const n = k => o.filter(x => x === k).length;
    const last5 = teamMeetings.slice(-5);
    el.innerHTML = `
      <div class="stat-row">
        <div class="stat"><b>${teamMeetings.length}</b><span>Meetings</span></div>
        <div class="stat"><b>${n("W")}</b><span>Won</span></div>
        <div class="stat"><b>${n("D")}</b><span>Drawn</span></div>
        <div class="stat"><b>${n("L")}</b><span>Lost</span></div>
      </div>
      <div class="form-guide">
        <span id="form-label">Last 5</span>
        <ol class="form-pills" aria-labelledby="form-label">
          ${last5.map(r => {
            const res = outcome(r), opp = r.home === TIGERS ? r.away : r.home;
            return `<li class="pill ${res}" title="${outcomeLabel[res]} v ${opp}, ${r.score.join("-")}"><span aria-hidden="true">${res}</span><span class="sr-only">${outcomeLabel[res]} versus ${opp}, ${r.score.join(" to ")}</span></li>`;
          }).join("")}
        </ol>
      </div>`;
  });

  /* ---------- Record cards (match centre) ---------- */
  $$("[data-record]").forEach(el => {
    const home = teamMeetings.filter(r => r.home === TIGERS);
    const o = teamMeetings.map(outcome), oh = home.map(outcome);
    const pts = teamMeetings.reduce((s, r) => s + (r.home === TIGERS ? r.score[0] : r.score[1]), 0);
    const pct = Math.round(o.filter(x => x === "W").length / o.length * 100);
    el.innerHTML = `
      <div class="record accent"><b>${o.filter(x => x === "W").length}-${o.filter(x => x === "D").length}-${o.filter(x => x === "L").length}</b><span>W-D-L, all meetings</span></div>
      <div class="record"><b>${pct}%</b><span>Win rate</span></div>
      <div class="record"><b>${oh.filter(x => x === "W").length}/${home.length}</b><span>Home wins at Ashfield</span></div>
      <div class="record"><b>${(pts / teamMeetings.length).toFixed(1)}</b><span>Avg. points per meeting</span></div>`;
  });

  /* ---------- Last result card ---------- */
  $$("[data-last-result]").forEach(el => {
    const r = teamMeetings[teamMeetings.length - 1];
    const res = outcome(r);
    el.innerHTML = `
      <div class="match-card-head">
        <span class="chip chip--glass">Final result</span>
        <span class="meta">${r.comp} · ${fmtDate(r.date, { weekday: "short", day: "numeric", month: "short" })}</span>
      </div>
      <div class="scoreline">
        <div class="team"><img src="${TEAMS[r.home]}" alt="" loading="lazy">${r.home}</div>
        <div class="score-box" aria-label="${r.score[0]} to ${r.score[1]}">${r.score[0]}-${r.score[1]}</div>
        <div class="team"><img src="${TEAMS[r.away]}" alt="" loading="lazy">${r.away}</div>
      </div>
      ${r.agg ? `<p class="agg">${r.agg}</p>` : ""}
      <div class="match-card-foot">
        <a class="btn btn--sm btn--ghost light" href="matches.html">All results</a>
        <a class="btn btn--sm" href="news.html">Match report</a>
      </div>`;
    el.setAttribute("aria-label", `Last result: ${outcomeLabel[res]}`);
  });

  /* ---------- Result rows ---------- */
  const resultRow = r => {
    const date = `<div class="result-when"><b>${fmtDate(r.date, { weekday: "short", day: "numeric" })}</b><small>${fmtDate(r.date, { month: "long" })}</small></div>`;
    const link = r.info
      ? `<a class="r-link" href="${r.info}" target="_blank" rel="noopener">${icon("arrow")}<span class="sr-only">Match info: ${r.comp}, ${fmtDate(r.date, { day: "numeric", month: "long" })} (opens LiveIt)</span></a>`
      : "";
    if (r.individual) {
      return `<li class="result individual">${date}
        <div class="r-team home"><span>${r.comp}</span></div>
        <div class="r-score"><span class="score-box">Individual</span></div>
        <div class="r-team away"><span>${r.individual}</span></div>
        <div class="r-meta"><span class="badge-venue">Ashfield</span>${link}</div></li>`;
    }
    const res = outcome(r);
    const venue = r.home === TIGERS ? "Home" : "Away";
    const team = (name, side) => `<div class="r-team ${side}${name === TIGERS ? " tigers" : ""}"><img src="${TEAMS[name]}" alt="" loading="lazy"><span>${name}</span></div>`;
    return `<li class="result" data-comp="${r.comp}" data-venue="${venue}">
      ${date}
      ${team(r.home, "home")}
      <div class="r-score"><span class="score-box">${r.score[0]}-${r.score[1]}</span>${r.agg ? `<small>${r.agg}</small>` : ""}</div>
      ${team(r.away, "away")}
      <div class="r-meta"><span class="pill ${res}" title="${outcomeLabel[res]}"><span aria-hidden="true">${res}</span><span class="sr-only">Tigers ${outcomeLabel[res].toLowerCase()}</span></span><span class="badge-venue">${venue}</span>${link}</div>
    </li>`;
  };

  $$("[data-results-preview]").forEach(el => {
    const n = +el.dataset.resultsPreview || 4;
    el.innerHTML = `<ul class="result-list">${teamMeetings.slice(-n).reverse().map(resultRow).join("")}</ul>`;
  });

  $$("[data-results-full]").forEach(el => {
    const chipsEl = $("[data-comp-chips]");
    const comps = ["All", ...new Set(RESULTS.map(r => r.comp))];
    let active = "All";
    chipsEl.innerHTML = comps.map(c => `<button type="button" aria-pressed="${c === "All"}" data-c="${c}">${c}</button>`).join("");
    const render = () => {
      const list = RESULTS.filter(r => active === "All" || r.comp === active).slice().reverse();
      const months = {};
      list.forEach(r => { const k = fmtDate(r.date, { month: "long", year: "numeric" }); (months[k] ||= []).push(r); });
      el.innerHTML = Object.entries(months).map(([m, rows]) =>
        `<section class="month" aria-label="${m}"><h2>${m}</h2><ul class="result-list">${rows.map(resultRow).join("")}</ul></section>`
      ).join("") || `<p>No meetings in this competition.</p>`;
      $("[data-results-count]").textContent = `${list.length} meeting${list.length === 1 ? "" : "s"}`;
    };
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      active = b.dataset.c;
      $$("button", chipsEl).forEach(x => x.setAttribute("aria-pressed", x === b));
      render();
    });
    render();
  });

  /* ---------- Generic tabs (segmented + tablist) ---------- */
  $$("[role='tablist']").forEach(list => {
    const tabs = $$("[role='tab']", list);
    const select = t => {
      tabs.forEach(x => {
        const on = x === t;
        x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", e => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; select(n); n.focus(); }
      });
    });
  });

  /* ---------- Riders ---------- */
  $$("[data-riders]").forEach(el => {
    el.innerHTML = RIDERS.map(r => `
      <a class="rider" href="${r.url}">
        <img src="${r.img}" alt="" loading="lazy">
        ${r.captain ? `<span class="chip chip--gold captain">Captain</span>` : ""}
        <div class="rider-info"><small>2026 squad</small><h3>${r.name.replace(" ", "<br>")}</h3></div>
      </a>`).join("");
  });

  /* ---------- News ---------- */
  const storyMeta = n => `<span class="meta">${fmtDate(n.date, { day: "numeric", month: "short", year: "numeric" })} · ${n.author}</span>`;
  const story = (n, cls = "", level = "h3") => `
    <a class="story ${cls}" href="${n.url}">
      <div class="story-img"><img src="${n.img}" alt="" loading="lazy"></div>
      <div class="story-body"><span class="tag">${n.tag}</span><${level}>${n.title}</${level}>${storyMeta(n)}</div>
    </a>`;
  $$("[data-news-home]").forEach(el => {
    const [first, ...rest] = NEWS;
    el.innerHTML = `${story(first, "story--feature")}<div class="news-stack">${rest.slice(0, 3).map(n => story(n, "story--row")).join("")}</div>`;
  });
  $$("[data-news-list]").forEach(el => {
    const chipsEl = $("[data-news-chips]");
    const tags = ["All", ...new Set(NEWS.map(n => n.tag))];
    let active = "All";
    chipsEl.innerHTML = tags.map(t => `<button type="button" aria-pressed="${t === "All"}" data-t="${t}">${t}</button>`).join("");
    const render = () => { el.innerHTML = NEWS.filter(n => active === "All" || n.tag === active).map(n => story(n)).join(""); };
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      active = b.dataset.t; $$("button", chipsEl).forEach(x => x.setAttribute("aria-pressed", x === b)); render();
    });
    render();
  });

  /* ---------- Partners ---------- */
  $$("[data-partners-marquee]").forEach(el => {
    const logos = PARTNERS.map(p => `<img src="${p.img}" alt="${p.name}" loading="lazy">`).join("");
    el.innerHTML = `<div class="marquee">${logos}<span aria-hidden="true" style="display:contents">${PARTNERS.map(p => `<img src="${p.img}" alt="" loading="lazy">`).join("")}</span></div>`;
  });
  $$("[data-partners-grid]").forEach(el => {
    el.innerHTML = PARTNERS.map(p => `<li><img src="${p.img}" alt="${p.name}" loading="lazy"></li>`).join("");
  });

  /* ---------- Forms: inline validation (demo, no backend) ---------- */
  $$("form[data-validate]").forEach(form => {
    form.noValidate = true;
    const msg = f => {
      if (f.validity.valueMissing) return `Please enter your ${f.dataset.label || "details"}.`;
      if (f.validity.typeMismatch && f.type === "email") return "Enter an email address like name@example.com.";
      if (f.validity.patternMismatch) return `Please check your ${f.dataset.label}.`;
      return "";
    };
    const check = f => {
      const err = document.getElementById(f.getAttribute("aria-describedby")?.split(" ").find(id => id.endsWith("-err")));
      const m = msg(f);
      f.setAttribute("aria-invalid", !!m);
      if (err) err.textContent = m;
      return !m;
    };
    $$("input, textarea, select", form).forEach(f => f.addEventListener("blur", () => f.value && check(f)));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const fields = $$("[required]", form);
      const bad = fields.filter(f => !check(f));
      if (bad.length) { bad[0].focus(); return; }
      const status = $(".form-status", form);
      if (status) { status.hidden = false; status.focus(); }
      form.reset();
    });
  });

  /* ---------- Anchor nav active state ---------- */
  const anchors = $$(".anchor-nav a");
  if (anchors.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) anchors.forEach(a => a.classList.toggle("active", a.hash === "#" + en.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    anchors.forEach(a => { const t = $(a.hash); if (t) io.observe(t); });
  }

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("in"));
  }

  const y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();
})();
