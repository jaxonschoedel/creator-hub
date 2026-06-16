import { siteConfig } from "./site-config.js?v=55k-proof";

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
  setText("[data-brand-form-label]", siteConfig.brandForm.type);
  setText("[data-brand-form-title]", siteConfig.brandForm.title);
  setText("[data-brand-form-intro]", siteConfig.brandForm.intro);
  setText("[data-creator-form-label]", siteConfig.creatorForm.type);
  setText("[data-creator-form-title]", siteConfig.creatorForm.title);
  setText("[data-creator-form-intro]", siteConfig.creatorForm.intro);
  setText("[data-creator-form-proof]", siteConfig.creatorForm.proof);
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
  renderInquiryForm("brand", siteConfig.brandForm);
  renderInquiryForm("creator", siteConfig.creatorForm);
}

function renderInquiryForm(formName, formConfig) {
  const form = $(`[data-inquiry-form="${formName}"]`);
  form.querySelector("[data-form-fields]").innerHTML = formConfig.fields
    .map((field) => renderField(field, formName))
    .join("");
  form.querySelector("[data-form-submit]").textContent = formConfig.cta;
}

function renderField(field, formName) {
  const id = `${formName}-${field.name}`;
  const required = field.required ? "required" : "";
  const requiredMark = field.required ? " *" : "";
  const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";

  if (field.type === "textarea") {
    return `
      <div class="field">
        <label for="${id}">${field.label}${requiredMark}</label>
        <textarea id="${id}" name="${field.name}" ${placeholder} ${required}></textarea>
      </div>
    `;
  }

  if (field.type === "select") {
    const options = (field.options || [])
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("");

    return `
      <div class="field">
        <label for="${id}">${field.label}${requiredMark}</label>
        <select id="${id}" name="${field.name}" ${required}>
          <option value="" disabled selected>Select one</option>
          ${options}
        </select>
      </div>
    `;
  }

  return `
    <div class="field">
      <label for="${id}">${field.label}${requiredMark}</label>
      <input id="${id}" name="${field.name}" type="${field.type}" ${placeholder} ${required} />
    </div>
  `;
}

function attachFormHandler(formName, formConfig) {
  const form = $(`[data-inquiry-form="${formName}"]`);
  const formNotice = form.querySelector("[data-form-notice]");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Saving...";
    formNotice.hidden = true;

    const data = {
      inquiryType: formConfig.type,
      ...Object.fromEntries(new FormData(form).entries())
    };

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
      setNotice(formNotice, "success", "Thanks. Your submission was saved.");
    } catch (error) {
      setNotice(formNotice, "error", error.message);
    } finally {
      button.disabled = false;
      button.textContent = formConfig.cta;
    }
  });
}

renderSiteContent();
renderForm();
attachFormHandler("brand", siteConfig.brandForm);
attachFormHandler("creator", siteConfig.creatorForm);
