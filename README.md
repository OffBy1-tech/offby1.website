# offby1.tech

The Off By 1 studio site.

Built with [Astro](https://astro.build) + React, deployed to GitHub Pages via
GitHub Actions.

## Run locally

```sh
npm install
npm run dev
```

Then open http://localhost:4321. `npm run build` writes the production site to
`dist/`; `npm run preview` serves that build.

## Publish a post

1. Add a markdown file to `src/content/blog/`, e.g. `my-post.md`. The filename
   becomes the slug (`/blog/my-post`).
2. Include the frontmatter: `title`, `description`, `pubDate` (required);
   `updatedDate`, `draft` (optional — `draft: true` excludes the post from
   builds).
3. Commit and push to `main`. The deploy workflow publishes it automatically.

## Deploy setup checklist (one-time)

1. Create the GitHub repo — it must be **public** (GitHub Pages on the free
   plan requires a public repo).
2. Push this repository to it (`main` branch).
3. In the repo: **Settings → Pages → Source → "GitHub Actions"**.
4. At GoDaddy, confirm the four GitHub Pages A records for the apex domain
   (`offby1.tech`):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

The custom domain itself comes from `public/CNAME`, which is included in every
build artifact.
