/**
 * Inject the mock data and handlebars references
 * into the templates - dev only
 * @returns {Promise<any>}
 */
export default function () {
   return fetch('/assets/scripts/content.json')
       .then(response => response.json())
       .then(data => {
           console.log(data);
           return data;
       })
       .catch(error => console.log(error));
}





