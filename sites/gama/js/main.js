document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    const closeBtn = mobileNav.querySelector(".mobile-nav-close");
    const links = mobileNav.querySelectorAll("a");
    const open = () => { mobileNav.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); };
    const close = () => { mobileNav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    links.forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = encodeURIComponent(data.get("name") || "");
      const email = data.get("email") || "";
      const need = encodeURIComponent(data.get("need") || "");
      const message = encodeURIComponent(data.get("message") || "");
      const subject = encodeURIComponent(`New enquiry from ${data.get("name") || "website"}`);
      const body = `Name: ${name}%0AEmail: ${email}%0AWhat they need: ${need}%0A%0AMessage:%0A${message}`;
      window.location.href = `mailto:hello@gamaonlinemarketing.co.za?subject=${subject}&body=${body}`;
    });
  }
});
