# Isaac Oppermann

A publishable athlete creator website for Isaac Oppermann with brand inquiry, creator coaching forms, and a password-protected backend for reviewing submissions.

This version is dependency-free and designed for Cloudflare Pages:

- Static frontend in `public`
- Backend API in `functions`
- Form storage in Cloudflare D1
- Admin dashboard at `/admin.html`
- Two inquiry paths: brand partnerships and creator coaching

## Preview Locally

Start a local static preview:

```bash
python3 -m http.server 4174 --directory public
```

Then open:

- `http://127.0.0.1:4174`
- `http://127.0.0.1:4174/admin.html`

The form and admin API need Cloudflare Pages Functions, so use Wrangler for full local API testing:

```bash
npx wrangler pages dev public --d1 DB=creator-hub
```

## Customize

Edit `public/site-config.js` to change:

- Brand text and hero copy
- Social links
- Brand and creator form fields
- Admin table columns

Edit `public/styles.css` to change the visual design.

## Publish on Cloudflare Pages

1. Create a Cloudflare account.
2. Create a new Pages project from this Git repo.
3. Set build command to blank.
4. Set build output directory to `public`.
5. Create a D1 database named `creator-hub`.
6. Bind it to the Pages project as `DB`.
7. Add environment variables:
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET`
8. Run the SQL in `migrations/0001_create_submissions.sql` in the D1 console.

Cloudflare gives you a free `*.pages.dev` URL. You can add a custom domain later.
