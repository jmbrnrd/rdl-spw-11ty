module.exports = function (config) {
  config.addWatchTarget("./src/assets/sass/");
  config.addShortcode("year", () => `${new Date().getFullYear()}`);
  config.addWatchTarget('./src/assets/scripts/');
  config.addPassthroughCopy("./src/assets/imgs/");
  return {
    //templateFormats: ['md', '11ty.js'],
    dir: {
      input: "src",
      output: "public",
      data: process.env.MY_ENVIRONMENT === "production" ? "_data/prod" : "_data/dev"
    },
  };
};

