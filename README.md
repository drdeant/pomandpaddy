# pomandpaddy.com

Dean and Orla's 2004 road-trip diary, built with [Eleventy](https://www.11ty.dev/) and hosted on GitHub Pages.

## Working on it

```
npm install        # once
npm start          # live preview at http://localhost:8080
npm run build      # writes the site to _site/ (not committed)
```

Pushing to `main` builds and deploys automatically (`.github/workflows/pages.yml`).

## Where things are

| Path | What |
|---|---|
| `src/diary/weeks/week-NN.md` | One file per week of the diary |
| `src/_data/route.json`, `stats.json` | Data behind the Trip page tables |
| `src/_includes/` | Page layouts (`base.njk`, `week.njk`) |
| `src/images/weekNN/` | Photos |
| `src/style.css` | All styling |
| `src/CNAME` | Custom domain (copied into the build) |

## Writing a week

Front matter sets `week`, `title`, `dates` and the `cover` photo. In the body:

```
## Day 29 – 25th April

{% orla %}
Orla's paragraphs (shown in blue).
{% endorla %}

{% dean %}
Dean's paragraphs (shown in red).
{% enddean %}

{% photos %}
week05/01.jpg | Caption for the first photo
week05/02.jpg | Caption for the second
{% endphotos %}
```
