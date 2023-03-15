module.exports = function (config) {
  // increment loop counter
  config.addHandlebarsHelper("inc", (value) => {
    return parseInt(value) + 1;
  });
  config.addWatchTarget("./src/assets/sass/");
  config.addShortcode("year", () => `${new Date().getFullYear()}`);
  config.addWatchTarget('./src/assets/scripts/');
  config.addPassthroughCopy("./src/assets/images/");
  config.addPassthroughCopy("./src/assets/manifest.json");
  return {
    dir: {
      input: "src",
      output: "public",
      data: process.env.NODE_ENV === "production" ? "_data/prod" : "_data/dev"
    }
  };
};

