
module.exports = function (config) {

  config.setServerOptions({
      port: 443,
      https: {
        key: './tls/localhost-key.pem',
        cert: './tls/localhost-cert.pem'
      }
    }
  );
  // increment loop counter
  config.addHandlebarsHelper("inc", (value) => {
    return parseInt(value) + 1;
  });
  config.addWatchTarget("./src/assets/sass/");
  config.addWatchTarget("./src/assets/scripts/*");
  config.addShortcode("year", () => `${new Date().getFullYear()}`);
  config.addWatchTarget('./tls/');
  config.addPassthroughCopy("./src/assets/brands/");
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

