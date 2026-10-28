// Personaliza este archivo antes de publicar la web.
const CORREO_INSTITUCIONAL = ""; // Ejemplo: "secretaria@tuinstitucion.edu.ec"

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Abrir menú"); }
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => backTop?.classList.toggle("visible", window.scrollY > 500), {passive:true});
document.getElementById("year").textContent = new Date().getFullYear();

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent("Consulta web - Unidad Educativa San Francisco");
  const body = encodeURIComponent(
    `Nombre: ${data.get("nombre")}\nCorreo: ${data.get("email")}\nNivel de interés: ${data.get("nivel")}\n\nConsulta:\n${data.get("mensaje")}`
  );
  if (!CORREO_INSTITUCIONAL) {
    document.getElementById("formStatus").textContent =
      "Formulario de demostración: configura CORREO_INSTITUCIONAL en script.js para activar el envío por correo.";
    return;
  }
  window.location.href = `mailto:${CORREO_INSTITUCIONAL}?subject=${subject}&body=${body}`;
});
