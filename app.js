const products = [
  { id: "hud", name: "Nightshift HUD", category: "fivem", categoryLabel: "FIVEM / UI", type: "free", price: "Nemokamai", icon: "▦", tone: "#20251b", accent: "#d5fa62", description: "Švarus, lengvai pritaikomas HUD tavo FiveM serveriui. Originalus dizainas, aiškūs nustatymai ir tvarkingai paruošti failai.", detail: "Nemokamas asmeniniam ir bendruomenės serverio naudojimui. Į komplektą įeina diegimo gidas." },
  { id: "sound", name: "City Sound Kit", category: "audio", categoryLabel: "GARSAS / FX", type: "free", price: "Nemokamai", icon: "♫", tone: "#282019", accent: "#ff9a68", description: "Originalių aplinkos ir sąsajos garsų rinkinys, sukurtas gyvesnei miesto atmosferai.", detail: "Garso failai pateikiami kaip kūrėjo resursas. Platinti rinkinį kaip savo kūrinį negalima." },
  { id: "garage", name: "Garage UI Kit", category: "design", categoryLabel: "DIZAINAS / UI", type: "free", price: "Nemokamai", icon: "▧", tone: "#1d2428", accent: "#82c8d9", description: "Redaguojamų sąsajos elementų rinkinys serverio svetainei ir bendruomenės skydeliui.", detail: "Pridedami originalūs komponentai ir spalvų gairės. Reikalingi įrankiai nurodyti diegimo faile." },
  { id: "handling", name: "Roadfeel Handling", category: "fivem", categoryLabel: "FIVEM / TUNING", type: "vip", price: "VIP prieiga", icon: "⌁", tone: "#29231b", accent: "#f2ba67", description: "Kūrėjo transporto valdymo nustatymų rinkinys su keliomis važiavimo nuotaikomis.", detail: "VIP peržiūra tik parodo produkto kortelę. Tikrą prieigą ir Discord rolę turi patvirtinti serverio administratorius." },
  { id: "motion", name: "Motion Pack 01", category: "design", categoryLabel: "DIZAINAS / MOTION", type: "vip", price: "VIP prieiga", icon: "◌", tone: "#261f2a", accent: "#d2a0ff", description: "Originalios animuotos scenos ir perėjimai bendruomenės klipams bei pristatymams.", detail: "Naudok savo projektuose pagal kūrėjo licenciją. VIP turinio failai demonstraciniame puslapyje neatsisiunčiami." },
  { id: "map", name: "Afterhours Map Props", category: "fivem", categoryLabel: "FIVEM / ASSETS", type: "vip", price: "VIP prieiga", icon: "⌖", tone: "#202722", accent: "#9de0b2", description: "Originalūs dekoracijų objektai naktinio miesto vietoms ir renginiams.", detail: "VIP peržiūra tik parodo produkto kortelę. Tikrą prieigą ir Discord rolę turi patvirtinti serverio administratorius." },
  { id: "mix", name: "Creator FX Vol. 1", category: "audio", categoryLabel: "GARSAS / FX", type: "vip", price: "VIP prieiga", icon: "≋", tone: "#291f1e", accent: "#ff875c", description: "Kūrėjo garso efektai montažams, anonsams ir originaliam žaidimo turiniui.", detail: "Rinkinys skirtas kūrybiniams projektams. VIP turinio failai demonstraciniame puslapyje neatsisiunčiami." },
  { id: "guide", name: "Server Setup Notes", category: "fivem", categoryLabel: "FIVEM / GIDAS", type: "free", price: "Nemokamai", icon: "≡", tone: "#22231b", accent: "#d5fa62", description: "Trumpas kontrolinis sąrašas tvarkingam, saugiam bendruomenės serverio startui.", detail: "Bendro pobūdžio originalus gidas. Peržiūrėk savo platformos taisykles ir prieš diegdamas pasidaryk atsarginę kopiją." },
  { id: "preset", name: "Colorgrade Presets", category: "design", categoryLabel: "DIZAINAS / COLOR", type: "vip", price: "VIP prieiga", icon: "◐", tone: "#24201b", accent: "#efb46e", description: "Kūrėjo spalvų profiliai vieningai vaizdo nuotaikai ir nuotraukų serijoms.", detail: "VIP peržiūra tik parodo produkto kortelę. Tikrą prieigą ir Discord rolę turi patvirtinti serverio administratorius." },
  { id: "icons", name: "Community Icon Set", category: "design", categoryLabel: "DIZAINAS / ICONS", type: "free", price: "Nemokamai", icon: "✳", tone: "#202327", accent: "#91bddf", description: "Originalių bendruomenės piktogramų mini rinkinys su šviesiu ir tamsiu variantais.", detail: "Nemokamas bendruomenės projektams. Piktogramų rinkinio neparduok ir nenurodyk savęs kaip originalaus autoriaus." }
];

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const emptyState = document.querySelector("#empty-state");
const vipSwitch = document.querySelector("#vip-demo");
const dialog = document.querySelector("#product-dialog");
let activeCategory = "all";
let activeFilter = "all";

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("lt");
  const visible = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || activeCategory === "vip" ? (activeCategory === "all" || product.type === "vip") : product.category === activeCategory;
    const matchesFilter = activeFilter === "all" || product.type === activeFilter;
    const matchesSearch = `${product.name} ${product.categoryLabel} ${product.description}`.toLocaleLowerCase("lt").includes(query);
    return matchesCategory && matchesFilter && matchesSearch;
  });

  grid.innerHTML = visible.map((product, index) => `
    <article class="product-card ${product.type === "vip" ? "is-vip" : ""}" style="--visual-bg:${product.tone};--visual-accent:${product.accent};animation-delay:${Math.min(index * 45, 270)}ms">
      <div class="product-visual">
        <span class="visual-index">G / ${String(products.indexOf(product) + 1).padStart(2, "0")}</span>
        <span class="visual-icon" aria-hidden="true">${product.icon}</span>
        <span class="visual-badge">${product.type === "vip" ? "♛ VIP CLUB" : "ORIGINAL"}</span>
        ${product.type === "vip" && !vipSwitch.checked ? `<div class="lock-overlay"><span>♙ VIP NARIAMS</span></div>` : ""}
      </div>
      <div class="product-info">
        <div class="product-meta"><span class="product-category">${product.categoryLabel}</span><span class="product-access ${product.type === "vip" ? "is-vip" : ""}">${product.type === "vip" ? "VIP" : "ATVIRA"}</span></div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom"><span class="product-price ${product.type === "free" ? "free" : ""}">${product.price}</span><button class="product-open" type="button" data-product="${product.id}">Plačiau <span>↗</span></button></div>
      </div>
    </article>`).join("");

  emptyState.hidden = visible.length > 0;
  document.querySelector("#visible-count").textContent = String(visible.length).padStart(2, "0");
  document.querySelector("#all-count").textContent = String(products.length).padStart(2, "0");
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".nav-item").forEach((button) => {
    const selected = button.dataset.category === category;
    button.classList.toggle("is-active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const names = { all: "KATALOGAS", fivem: "FIVEM", design: "DIZAINAS", audio: "GARSAS", vip: "VIP KLUBAS" };
  document.querySelector("#crumb-category").textContent = names[category];
  renderProducts();
}

document.querySelector("#category-nav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) setCategory(button.dataset.category);
});

document.querySelectorAll(".filter-chip").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-selected", chip === button));
  renderProducts();
}));

searchInput.addEventListener("input", renderProducts);
vipSwitch.addEventListener("change", () => {
  document.body.classList.toggle("is-vip-demo", vipSwitch.checked);
  renderProducts();
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.product);
  if (!product) return;
  document.querySelector("#dialog-art").style.setProperty("--visual-bg", product.tone);
  document.querySelector("#dialog-art").style.setProperty("--visual-accent", product.accent);
  document.querySelector("#dialog-icon").textContent = product.icon;
  document.querySelector("#dialog-kicker").textContent = `${product.categoryLabel} / ${product.type === "vip" ? "VIP PRIEIGA" : "ATVIRA PRIEIGA"}`;
  document.querySelector("#dialog-title").textContent = product.name;
  document.querySelector("#dialog-description").textContent = product.description;
  document.querySelector("#dialog-note").textContent = product.type === "vip" && !vipSwitch.checked ? "Šis resursas skirtas VIP rolei. Demonstracinis perjungiklis tik pakeičia peržiūrą; tikrą Discord rolę gali patikrinti tik serverio sistema." : product.detail;
  dialog.showModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderProducts();