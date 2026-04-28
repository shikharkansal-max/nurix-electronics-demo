# Nurix Electronics Demo

Static landing page that triggers an outbound call from a Nurix crew. Mirrors the Lowe's demo, repointed at the crew endpoint.

## Configuration

Edit `assets/nurix.js`:

- `CREW_API_URL` &mdash; outbound-call endpoint
- `CREW_ID` &mdash; the crew to invoke
- `WORKSPACE_ID` &mdash; sent as the `workspace-id` request header

## Deploy

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`. Enable Pages in repo Settings &rarr; Pages &rarr; Source: GitHub Actions.

## Local preview

Open `index.html` directly, or run a static server from the project root:

```sh
python3 -m http.server 8000
```
