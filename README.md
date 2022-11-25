# maastolenkit.pages.dev

Render your latest Strava Activity on a [Mapbox](https://www.mapbox.com/) fullscreen map. [Try it out](https://maastolenkit.pages.dev).

## Development notes

- Cloudflare Pages && Cloudflare Pages Functions
- Mapbox GL JS
- Strava App (Details shown at OAuth Authorization page)

- Node.js test runner.

## Secrets

 - Mapbox Access Token is restricted to the domain `maastolenkit.pages.dev`.
 - Local development with `wrangler` sources secrets from from `.dev.vars`.
 - `npm test` sources the same secrets and exposes the selected ones to functions.
 -  Make sure your `.dev.vars` has a line `STRAVA_CLIENT_SECRET=...`.
