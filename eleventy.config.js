import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // "## Day 29 – 25th April" -> id="day-29", so #day-29 links keep working
  md.core.ruler.push("day_ids", (state) => {
    const t = state.tokens;
    t.forEach((tok, i) => {
      if (tok.type === "heading_open" && tok.tag === "h2") {
        const m = /^Day\s+(\d+)/.exec(t[i + 1].content);
        if (m) tok.attrSet("id", `day-${m[1]}`);
      }
    });
  });
  eleventyConfig.setLibrary("md", md);

  // {% dean %}…{% enddean %} / {% orla %}…{% endorla %}: Dean's text is red, Orla's is blue
  const author = (cls) => (content) =>
    `<div class="${cls}">${md.render(content).replace(/\n\s*\n/g, "\n")}</div>`;
  eleventyConfig.addPairedShortcode("dean", author("c-red"));
  eleventyConfig.addPairedShortcode("orla", author("c-blue"));

  // {% photos %}week05/01.jpg | Caption{% endphotos %} — one "file | caption" per line
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  eleventyConfig.addPairedShortcode("photos", (content) => {
    const figs = content
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [src, ...rest] = l.split("|");
        const cap = esc(rest.join("|").trim());
        const caption = cap ? `<figcaption>${cap}</figcaption>` : "";
        return `<figure><img src="/images/${src.trim()}" width="480" height="360" alt="${cap}" loading="lazy">${caption}</figure>`;
      });
    return `<div class="photos n${Math.min(figs.length, 3)}">${figs.join("")}</div>`;
  });

  eleventyConfig.addCollection("weeks", (api) =>
    api.getFilteredByGlob("src/diary/weeks/*.md").sort((a, b) => a.data.week - b.data.week)
  );
  eleventyConfig.addFilter("legTotal", (rows) =>
    rows.filter((r) => r.leg).reduce((sum, r) => sum + r.km, 0).toLocaleString("en-AU")
  );
  eleventyConfig.addFilter("km", (n) => n.toLocaleString("en-AU"));

  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
