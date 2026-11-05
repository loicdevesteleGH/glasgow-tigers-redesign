(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const icon = id => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const { money } = window.TigersBag;
  const saving = p => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0);
  const fromPrice = p => (p.amounts ? `From ${money(p.amounts[0])}` : money(p.price));

  const grid = $("[data-shop-grid]");
  const catsEl = $("[data-shop-cats]");
  const sortEl = $("[data-shop-sort]");
  const countEl = $("[data-shop-count]");
  const dialog = $("#product");
  const pdp = $("[data-pdp]");

  /* ---------- Listing ---------- */
  const CATS = ["All", "Adults", "Kids", "Accessories", "Sale"];
  let cat = "All";
  catsEl.innerHTML = CATS.map(c => {
    const n = c === "All" ? PRODUCTS.length : c === "Sale" ? PRODUCTS.filter(p => p.was).length : PRODUCTS.filter(p => p.cat === c).length;
    return `<button type="button" aria-pressed="${c === cat}" data-cat="${c}">${c} <span class="chip-count">${n}</span></button>`;
  }).join("");

  const card = p => `
    <li>
      <a class="product${p.soldOut ? " sold-out" : ""}" href="#p-${p.id}" data-product="${p.id}">
        <div class="product-img">
          <img src="${p.imgs[0]}" alt="" loading="lazy">
          ${p.imgs[1] ? `<img class="alt" src="${p.imgs[1]}" alt="" loading="lazy">` : ""}
          ${p.soldOut ? `<span class="chip chip--dark">Sold out</span>` : p.was ? `<span class="chip">-${saving(p)}%</span>` : ""}
        </div>
        <div class="product-body">
          <span class="tag">${p.cat}</span>
          <h2 class="product-name">${p.name}</h2>
          <p class="product-price">${p.was ? `<span class="sr-only">Now </span>` : ""}<b>${fromPrice(p)}</b>${p.was ? ` <s><span class="sr-only">was </span>${money(p.was)}</s>` : ""}</p>
          ${p.sizes ? `<p class="hint">${p.sizes.length} sizes</p>` : ""}
        </div>
      </a>
    </li>`;

  const render = () => {
    let list = PRODUCTS.filter(p => cat === "All" || (cat === "Sale" ? p.was : p.cat === cat));
    const by = {
      featured: (a, b) => (!!a.soldOut - !!b.soldOut) || ((a.featured || 99) - (b.featured || 99)),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      sale: (a, b) => saving(b) - saving(a)
    }[sortEl.value];
    list = list.slice().sort(by);
    grid.innerHTML = list.map(card).join("");
    countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}${cat === "All" ? "" : ` in ${cat}`}`;
  };

  catsEl.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    cat = b.dataset.cat;
    $$("button", catsEl).forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  });
  sortEl.addEventListener("change", render);

  /* ---------- Product view (native <dialog>: focus trap + Esc for free) ---------- */
  let current = null;

  const optionsHtml = p => {
    if (p.amounts) {
      return `<fieldset class="options"><legend>Amount</legend><div class="option-pills">
        ${p.amounts.map((a, i) => `<label><input type="radio" name="opt" value="${a}" ${i === 0 ? "checked" : ""}><span>${money(a)}</span></label>`).join("")}
      </div></fieldset>`;
    }
    if (!p.sizes) return "";
    return `<fieldset class="options" aria-describedby="opt-err"><legend>${p.sizeLabel || "Size"}</legend><div class="option-pills">
      ${p.sizes.map(s => `<label><input type="radio" name="opt" value="${s}"><span aria-hidden="true">${s}</span><span class="sr-only">${SIZE_NAMES[s] || s}</span></label>`).join("")}
    </div><p class="error-msg" id="opt-err" role="alert"></p></fieldset>`;
  };

  const open = id => {
    const p = PRODUCTS.find(x => x.id === +id);
    if (!p) return;
    current = p;
    pdp.innerHTML = `
      <div class="pdp-gallery">
        <div class="pdp-main"><img src="${p.imgs[0]}" alt="${p.name}" data-main></div>
        ${p.imgs.length > 1 ? `<div class="pdp-thumbs" role="group" aria-label="Product photos">${p.imgs.map((src, i) => `
          <button type="button" data-thumb="${i}" aria-pressed="${i === 0}" aria-label="Photo ${i + 1} of ${p.imgs.length}"><img src="${src}" alt=""></button>`).join("")}</div>` : ""}
      </div>
      <form class="pdp-info" novalidate>
        <span class="tag">${p.cat}${p.was ? ` · Save ${saving(p)}%` : ""}</span>
        <h2 id="pdp-name" class="display h-md">${p.name}</h2>
        <p class="pdp-price"><b data-price>${money(p.price)}</b>${p.was ? ` <s><span class="sr-only">was </span>${money(p.was)}</s>` : ""}</p>
        <p>${p.desc}</p>
        ${p.soldOut ? `<div class="notice">${icon("info")}<p><strong>Sold out.</strong> This item isn't available right now.</p></div>` : `
        ${optionsHtml(p)}
        <div class="pdp-buy">
          <div class="stepper stepper--lg" role="group" aria-label="Quantity">
            <button type="button" data-q="-1" aria-label="Decrease quantity">−</button>
            <output data-qty aria-live="polite">1</output>
            <button type="button" data-q="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn pdp-add" type="submit">Add to bag ${icon("cart")}</button>
        </div>`}
      </form>`;
    if (!dialog.open) dialog.showModal();
    history.replaceState(null, "", `#p-${p.id}`);
  };

  pdp.addEventListener("click", e => {
    const t = e.target.closest("[data-thumb]");
    if (t) {
      $("[data-main]", pdp).src = current.imgs[+t.dataset.thumb];
      $$("[data-thumb]", pdp).forEach(b => b.setAttribute("aria-pressed", b === t));
      return;
    }
    const q = e.target.closest("[data-q]");
    if (q) {
      const out = $("[data-qty]", pdp);
      out.textContent = Math.max(1, Math.min(10, +out.textContent + +q.dataset.q));
    }
  });
  pdp.addEventListener("change", e => {
    if (e.target.name !== "opt") return;
    const err = $("#opt-err", pdp); if (err) err.textContent = "";
    if (current.amounts) $("[data-price]", pdp).textContent = money(+e.target.value);
  });
  pdp.addEventListener("submit", e => {
    e.preventDefault();
    const p = current;
    const chosen = $("input[name=opt]:checked", pdp);
    if ((p.sizes || p.amounts) && !chosen) {
      $("#opt-err", pdp).textContent = `Please choose a ${(p.sizeLabel || "size").toLowerCase()}.`;
      $("input[name=opt]", pdp).focus();
      return;
    }
    const option = chosen ? (p.amounts ? money(+chosen.value) : `${p.sizeLabel || "Size"} ${chosen.value}`) : "";
    TigersBag.add({ id: p.id, name: p.name, img: p.imgs[0], price: p.amounts ? +chosen.value : p.price, option, qty: +$("[data-qty]", pdp).textContent });
    dialog.close();
  });

  dialog.addEventListener("close", () => {
    history.replaceState(null, "", location.pathname + location.search);
    const back = $(`[data-product="${current && current.id}"]`);
    back && back.focus();
  });
  // Click on the backdrop closes the dialog
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#p-"]');
    if (!a) return;
    e.preventDefault();
    open(a.getAttribute("href").slice(3));
  });

  render();
  if (/^#p-\d+$/.test(location.hash)) open(location.hash.slice(3));
})();
