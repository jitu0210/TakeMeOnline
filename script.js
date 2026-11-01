// Change your contact details here. They update every link on the page.
const WHATSAPP_NUMBER = "919999999999"; // Country code and number, digits only
const WHATSAPP_DISPLAY = "+91 99999 99999";
const CONTACT_EMAIL = "hello@takemeonline.com";
const WHATSAPP_GREETING = "Hi TakeMeOnline, I want to take my business online.";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl(WHATSAPP_GREETING);
});

document.querySelectorAll("[data-email]").forEach((link) => {
  link.href = `mailto:${CONTACT_EMAIL}`;
});

document.querySelectorAll("[data-whatsapp-text]").forEach((el) => {
  el.textContent = WHATSAPP_DISPLAY;
});

document.querySelectorAll("[data-email-text]").forEach((el) => {
  el.textContent = CONTACT_EMAIL;
});

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

// Mobile navigation
function setNavOpen(open) {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => {
  setNavOpen(!nav.classList.contains("is-open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setNavOpen(false);
    navToggle.focus();
  }
});

// Header border once the page has scrolled
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Fade sections in as they enter the viewport
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -60px 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Pricing buttons preselect the plan in the contact form
const planField = document.querySelector("#plan");

document.querySelectorAll("[data-plan]").forEach((link) => {
  link.addEventListener("click", () => {
    planField.value = link.dataset.plan;
  });
});

// Contact form: opens WhatsApp or the visitor's email app with the enquiry filled in
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const details = [
    `Name: ${data.get("name")}`,
    `Business: ${data.get("business")}`,
    `Phone: ${data.get("phone")}`,
    `Package: ${data.get("plan")}`,
    data.get("message"),
  ].join("\n");

  if (event.submitter?.dataset.channel === "email") {
    const subject = `Go Online enquiry from ${data.get("business")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
    formStatus.textContent = `Your email app should open with your enquiry ready to send. If it doesn't, email us at ${CONTACT_EMAIL}.`;
  } else {
    window.open(whatsappUrl(`${WHATSAPP_GREETING}\n\n${details}`), "_blank", "noopener");
    formStatus.textContent = "WhatsApp should open with your enquiry ready to send.";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
