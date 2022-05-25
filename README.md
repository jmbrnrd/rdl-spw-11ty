![logo](https://res.cloudinary.com/jmbrnrd/image/upload/c_scale,r_0,w_240/v1651842572/jmbrnrd/img-jmbrnrd-640_2x.jpg)

# 11ty Template

Whenever a Github commit is made to the master branch, it will trigger a build on Netlify and deploy to https://spwdev.netlify.app

## Development Scripts

**`npm start`**

> Run 11ty with hot reload at localhost:8080, including reload based on Sass changes and scripts

**`npm run build`**

> Production build includes minified, autoprefixed CSS, minified js with ES6 module support. 
> Uses dummy restaurant data to populate Handlebars template.

**`npm run build:prod`**

> Production build includes minified, autoprefixed CSS, minified js with ES6 module support.
> Outputs the templates with Handlebars references.
