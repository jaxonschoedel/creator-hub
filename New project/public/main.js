import { siteConfig } from "./site-config.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function setText(selector, value) {
  $$(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setNotice(element, type, message) {
  element.hidden = false;
  element.className = `notice ${type}`;
  element.textContent = message;
}

function renderSiteContent() {
  document.title = siteConfig.brand;
  setText("[data-brand]", siteConfig.brand);
  setText("[data-location]", siteConfig.location);
  setText("[data-description]", siteConfig.description);
  setText("[data-tagline]", siteConfig.tagline);
  setText("[data-cta]", siteConfig.cta);
  setText("[data-form-title]", siteConfig.formTitle);
  setText("[data-form-intro]", siteConfig.formIntro);
  setText("[data-email-text]", siteConfig.contactEmail);

  $$("[data-email-link]").forEach((link) => {
    link.href = `mailto:${siteConfig.contactEmail}`;
  });

  const socials = $("[data-socials]");
  socials.innerHTML = siteConfig.socials
    .map(
      (social) => `
        <a class="social-item" href="${social.url}" rel="noreferrer" target="_blank">
          <span>
            <span class="social-label">${social.label}</span>
            <span class="social-handle">${social.handle}</span>
          </span>
          <span class="arrow" aria-hidden="true">-&gt;</span>
        </a>
      `
    )
    .join("");

  const highlights = $("[data-highlights]");
  highlights.innerHTML = siteConfig.highlights
    .map((highlight) => `<div class="highlight">${highlight}</div>`)
    .join("");
}

function renderForm() {
  const fields = $("[data-form-fields]");
  fields.innerHTML = siteConfig.formFields.map(renderField).join("");
}

function renderField(field) {
  const required = field.required ? "required" : "";
  const requiredMark = field.required ? " *" : "";
  const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";

  if (field.type === "textarea") {
    return `
      <div class="field">
        <label for="${field.name}">${field.label}${requiredMark}</label>
        <textarea id="${field.name}" name="${field.name}" ${placeholder} ${required}></textarea>
      </div>
    `;
  }

  if (field.type === "select") {
    const options = (field.options || [])
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("");

    return `
      <div class="field">
        <label for="${field.name}">${field.label}${requiredMark}</label>
        <select id="${field.name}" name="${field.name}" ${required}>
          <option value="" disabled selected>Select one</option>
          ${options}
        </select>
      </div>
    `;
  }

  return `
    <div class="field">
      <label for="${field.name}">${field.label}${requiredMark}</label>
      <input id="${field.name}" name="${field.name}" type="${field.type}" ${placeholder} ${required} />
    </div>
  `;
}

function attachFormHandler() {
  const form = $("[data-inquiry-form]");
  const notice = $("[data-form-notice]");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Saving...";
    notice.hidden = true;

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed.");
      }

      form.reset();
      setNotice(notice, "success", "Thanks. Your submission was saved.");
    } catch (error) {
      setNotice(notice, "error", error.message);
    } finally {
      button.disabled = false;
      button.textContent = siteConfig.cta;
    }
  });
}

renderSiteContent();
renderForm();
attachFormHandler();
