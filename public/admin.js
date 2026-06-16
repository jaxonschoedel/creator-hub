import { siteConfig } from "./site-config.js";

const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setNotice(element, type, message) {
  element.hidden = false;
  element.className = `notice ${type}`;
  element.textContent = message;
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }

  return data;
}

function renderRows(submissions) {
  $("[data-brand]").textContent = siteConfig.brand;
  $("[data-count]").textContent = `${submissions.length} saved ${
    submissions.length === 1 ? "entry" : "entries"
  }.`;

  const empty = $("[data-empty]");
  const tableWrap = $("[data-table-wrap]");

  if (submissions.length === 0) {
    empty.hidden = false;
    tableWrap.hidden = true;
    return;
  }

  empty.hidden = true;
  tableWrap.hidden = false;
  $("[data-table-head]").innerHTML = `
    <tr>
      <th>Received</th>
      ${siteConfig.adminColumns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
    </tr>
  `;
  $("[data-table-body]").innerHTML = submissions
    .map(
      (submission) => `
        <tr>
          <td>${new Date(submission.createdAt).toLocaleString()}</td>
          ${siteConfig.adminColumns
            .map((column) => `<td>${escapeHtml(submission.data[column] || "-")}</td>`)
            .join("")}
        </tr>
      `
    )
    .join("");
}

async function loadDashboard() {
  const data = await request("/api/submissions");
  $("[data-login-panel]").hidden = true;
  $("[data-dashboard]").hidden = false;
  renderRows(data.submissions);
}

function attachLogin() {
  const form = $("[data-login-form]");
  const notice = $("[data-login-notice]");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Checking...";
    notice.hidden = true;

    try {
      const password = new FormData(form).get("password");
      await request("/api/login", {
        method: "POST",
        body: JSON.stringify({ password })
      });
      await loadDashboard();
    } catch (error) {
      setNotice(notice, "error", error.message);
    } finally {
      button.disabled = false;
      button.textContent = "Open dashboard";
    }
  });
}

function attachLogout() {
  $("[data-logout]").addEventListener("click", async () => {
    await request("/api/logout", { method: "POST" });
    window.location.reload();
  });
}

attachLogin();
attachLogout();
loadDashboard().catch(() => {
  $("[data-login-panel]").hidden = false;
  $("[data-dashboard]").hidden = true;
});
