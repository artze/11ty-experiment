module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addWatchTarget("./src/style.css");
  eleventyConfig.addFilter("randomFromArray", (arr) => {
    arr.sort(() => 0.5 - Math.random());
    return arr.slice(0, 1);
  });
  return {
    dir: {
      input: "src",
    },
  };
};

/**
 * Notes on creating a search index
 *
 * We can make use of `addCollection` and have the lunr generated
 * search index reside within the collection.
 *
 * Then we can use the njk template to iterate through this
 * collection and output a json
 */
