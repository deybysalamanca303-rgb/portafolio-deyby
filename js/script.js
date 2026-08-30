// ============================================
// Toma los datos de config.js y los inserta en el HTML.
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const linkWhatsapp =
    `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`;

  document.title = `${CONFIG.nombre} — ${CONFIG.titulo}`;

  document.getElementById("hero-nombre").textContent = CONFIG.nombre;
  document.getElementById("hero-titulo").textContent = CONFIG.titulo;
  document.getElementById("hero-eslogan").textContent = CONFIG.eslogan;
  document.getElementById("footer-nombre").textContent = CONFIG.nombre;
  document.getElementById("footer-anio").textContent = new Date().getFullYear();

  ["nav-whatsapp", "hero-whatsapp", "contacto-whatsapp", "whatsapp-float"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = linkWhatsapp;
  });
  document.getElementById("contacto-correo").href = `mailto:${CONFIG.correo}`;

  // --- Avatar (iniciales, mientras no haya foto real) ---
  const iniciales = CONFIG.nombre.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  document.getElementById("hero-avatar").textContent = iniciales;

  // --- Sobre mí ---
  const contenedorSobreMi = document.getElementById("sobre-mi-parrafos");
  CONFIG.sobreMi.forEach((texto) => {
    const p = document.createElement("p");
    p.className = "reveal";
    p.textContent = texto;
    contenedorSobreMi.appendChild(p);
  });

  // --- Habilidades ---
  const gridHabilidades = document.getElementById("habilidades-grid");
  CONFIG.habilidades.forEach((h) => {
    const card = document.createElement("div");
    card.className = "habilidad-card reveal";
    card.innerHTML = `
      <span class="habilidad-card__icono">${h.icono}</span>
      <h3>${h.nombre}</h3>
      <p>${h.descripcion}</p>
    `;
    gridHabilidades.appendChild(card);
  });

  // --- Proyectos ---
  const listaProyectos = document.getElementById("proyectos-lista");
  CONFIG.proyectos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "proyecto-card reveal";
    card.innerHTML = `
      <div class="proyecto-card__mockup" style="background: linear-gradient(135deg, ${p.colorA}, ${p.colorB})">
        <span class="proyecto-card__mockup-punto"></span>
        <span class="proyecto-card__mockup-punto"></span>
        <span class="proyecto-card__mockup-punto"></span>
      </div>
      <div class="proyecto-card__texto">
        <span class="proyecto-card__etiqueta">${p.etiqueta}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="proyecto-card__link" href="${p.url}" target="_blank" rel="noopener">Ver sitio ↗</a>
      </div>
    `;
    listaProyectos.appendChild(card);
  });

  // --- Stack tecnológico ---
  const stackLista = document.getElementById("stack-lista");
  CONFIG.stack.forEach((tec) => {
    const chip = document.createElement("span");
    chip.className = "stack__chip";
    chip.textContent = tec;
    stackLista.appendChild(chip);
  });

  // --- Proceso de trabajo ---
  const gridProceso = document.getElementById("proceso-grid");
  CONFIG.proceso.forEach((paso) => {
    const item = document.createElement("div");
    item.className = "proceso-item reveal";
    item.innerHTML = `
      <span class="proceso-item__numero">${paso.numero}</span>
      <h3>${paso.titulo}</h3>
      <p>${paso.descripcion}</p>
    `;
    gridProceso.appendChild(item);
  });

  // --- Menú móvil ---
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("nav--open"));
  });

  // --- Animación al hacer scroll ---
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal--visible");
          const contador = entrada.target.querySelector("[data-valor]") || (entrada.target.dataset.valor ? entrada.target : null);
          if (contador) animarContador(contador);
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal, [data-valor]").forEach((el) => observador.observe(el));

  function animarContador(el) {
    const textoOriginal = el.dataset.valor;
    const numero = parseInt(textoOriginal.replace(/[^\d]/g, ""), 10);
    const sufijo = textoOriginal.replace(/[\d,]/g, "");
    if (isNaN(numero)) { el.textContent = textoOriginal; return; }
    const duracion = 1000;
    const inicio = performance.now();
    function paso(ahora) {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = Math.floor(progreso * numero) + sufijo;
      if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
});
