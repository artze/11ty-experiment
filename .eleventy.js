const lunr = require("lunr");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addWatchTarget("./src/style.css");
  eleventyConfig.addFilter("randomFromArray", (arr) => {
    arr.sort(() => 0.5 - Math.random());
    return arr.slice(0, 1);
  });
  /**
   * Prebuilds a serialized index in JSON.
   * This can be loaded on the frontend with:
   * lunr.Index.load(JSON.parse(searchIndexJson))
   *
   * See: https://lunrjs.com/guides/index_prebuilding.html
   */
  eleventyConfig.addFilter("extractSearchIndex", function (arr) {
    const docs = arr.map(function (doc) {
      return {
        url: doc.url,
        ...doc.data,
      };
    });
    const idx = lunr(function () {
      this.field("title");
      this.ref("url");
      docs.forEach(function (doc) {
        this.add(doc);
      }, this);
    });

    return JSON.stringify(idx);
  });
  return {
    dir: {
      input: "src",
    },
  };
};
