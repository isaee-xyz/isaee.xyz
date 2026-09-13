# isaee.xyz — Twinkle Garg's Portfolio

Neo-brutalist personal portfolio (React 18 + Vite 7 + Tailwind CSS 3), with an optional Gemini-powered "chat with my resume" widget.

## Run locally

**Prerequisites:** Node.js 20.19+ (Vite 7 requirement)

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # type-checks with tsc, then bundles to dist/
npm run preview  # serve the production build locally
```

The build uses relative paths (`base: './'`), so `dist/` can be dropped into any shared-hosting directory.

## AI chat widget (optional)

Without a key the widget runs in demo mode (static reply). To enable it:

1. Copy `.env.example` to `.env.local`
2. Set `VITE_GEMINI_API_KEY` to a Gemini API key

> **Security:** this is a fully static site — the key is embedded in the JS bundle
> and visible to every visitor. Only use a key that is **HTTP-referrer-restricted
> to your domain** and quota-capped (Google Cloud Console → Credentials). For an
> unrestricted key, put a small backend proxy in front instead.

## Structure

- `App.tsx` — page layout (section order)
- `constants.ts` — **all content lives here** (profile, projects, experience, articles, chatbot system prompt)
- `components/` — one component per section + the chat widget
- `services/gemini.ts` — Gemini chat client (demo-mode fallback when no key)
- `preview.html` — standalone static design scratch file, not part of the build

## Interactive blogs

The former Story section is replaced with an Interactive Blogs feature.

- Library: `/interactive-blogs/`
- First topic: `/interactive-blogs/ai-text-watermarking/`
- Article source: `public/interactive-blogs/ai-text-watermarking/`
- Sorting and structural thinking: `/interactive-blogs/sorting/`
- Sorting research and audit: `research/sorting/`

The sorting essay includes 20 guided steps, 74 sourced atlas entries, 16 executable
teaching algorithms, everyday examples, and worker-based local timings. To regenerate
the static content after editing its research data, run `python3 research/sorting/build_content.py`
then `python3 research/sorting/render_page.py`. Algorithm verification is
`node research/sorting/audit.mjs`. Production directory links can be checked with
`npm run build` followed by `npm run preview`; Vite's development SPA fallback does
not resolve the static blog directory index URLs in the same way.

These are real static directories with `index.html` files, so direct links and refreshes
work without SPA rewrites on Apache, Nginx, and DigitalOcean static hosting. Scripts
are external files to work with the existing Content Security Policy. Diagrams use
content-sized scroll steps, responsive sticky stages, chapter links, and step controls.
Scientific examples are explicitly illustrative, with links to primary sources.

### DigitalOcean deployment

The site runs as `isaee-web` on `167.71.232.107`, in `/opt/isaee-site`, with a
48 MB memory limit. Nginx serves static files behind the existing Traefik proxy.
No server-side Node build is needed. The n8n container and routing are independent
and must not be modified as part of this deployment.

Repository: `isaee-xyz/twinkle-isaee-landing-page`.
The `Deploy isaee.xyz to DigitalOcean` GitHub Action runs on pushes to `main` or
manual dispatch. It builds with Node 22, then streams the `dist/` archive through a
restricted SSH account. The receiver validates the archive and switches `current`
to a complete release atomically. Earlier releases remain available for rollback.

GitHub secrets: `ISAEE_DEPLOY_KEY` (site-only key) and `ISAEE_KNOWN_HOSTS` (verified
server host key). The deployment key cannot open a shell, forward ports, restart
services, access Docker, or change n8n. Credentials are never committed.

- Server preview: `http://167.71.232.107/`
- Blog: `/interactive-blogs/ai-text-watermarking/`
- Container configuration: `deployment/compose.yaml`
- Static server configuration: `deployment/nginx.conf`
- Restricted receiver: `deployment/receive-release.py`

DNS cutover is handled by the owner in Cloudflare. Point the apex A record to
`167.71.232.107` and `www` to the apex (or the same IP). Remove or replace conflicting
apex/www A, AAAA, and Hostinger CDN CNAME records; retain all mail and other subdomain
records, particularly n8n. Keep apex/www DNS-only: the existing Traefik resolver uses
TLS-ALPN certificate validation, which requires a direct connection on port 443.
Once DNS resolves to the Droplet, verify HTTPS and certificate issuance. Until then,
the IP preview works over HTTP and the domain continues serving Hostinger.

Portable build: `VITE_GEMINI_API_KEY='' npm run build`. The chat widget stays in demo
mode so no local API credential is published. Hostinger can still serve the contents
of `dist/` if needed; the supplied `.htaccess` is retained as a fallback.
