module.exports = function (config) {
  config.addWatchTarget("./src/assets/sass/");
  config.addShortcode("year", () => `${new Date().getFullYear()}`);
  config.addWatchTarget('./src/assets/scripts/')
  return {
    //templateFormats: ['md', '11ty.js'],
    dir: {
      input: "src",
      output: "public",
    },
  };
};
