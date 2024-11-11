![logo](https://res.cloudinary.com/jmbrnrd/image/upload/c_scale,r_0,w_240/v1651842572/jmbrnrd/img-jmbrnrd-640_2x.jpg)

# 11ty Apptiser Templates
This project uses the Eleventy Static site generator to design/develop the templates that will be used to publish Apptiser websites. 

https://www.netlify.com/ is integrated with the Github repository to publish and test the templates. 

Development is carried out on the dev branch: https://github.com/RDLtd/rdl-apptiser-templates/tree/dev. If there is an 'open' pull request, then a preview version will automatically build on Netlify.

When the dev branch is merged into the main branch, it will trigger a build on Netlify and deploy to https://apptiser.netlify.app for testing,

Once created, the templates are uploaded to an S3 bucket (assets.apptiser.io/templates).

## Development Scripts

**`npm start`**

> Run 11ty with hot reload at localhost:8080, including reload based on Sass changes and scripts

**`npm run build`**

> Production build includes minified, auto-prefixed CSS, minified js with ES6 module support. 
> Uses dummy restaurant data to populate Handlebars template.

**`npm run build:prod`**

> Production build includes minified, auto-prefixed CSS, minified js with ES6 module support.
> Outputs the templates with Handlebars references.
