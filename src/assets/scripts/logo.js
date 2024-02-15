/**
 * A logo url is expected that will be used as
 * a CSS mask-image.
 * If we have it, use the 'hide' class
 * to position the 'data-title' elements off-screen.
 */
export default function (){

    // get the logo element and the value of the attribute
    // which will be the url of the logo mask image
    const logoElem = document.querySelector('[data-venue-logo]');

    // Abort if we don't have a logo element
    if (!logoElem) { return false; }

    // Extract the url
    const logoUrl = logoElem.dataset.venueLogo;

    // Abort if there is no url
    if (!logoUrl) {
        console.log('No mask image url');
        logoElem.style.display = 'none';
        return false;
    }

    console.log('Mask image found', logoUrl);
    logoElem.setAttribute('style', `mask-image: url(${logoUrl})`);
    // hide any elements that are used as the venue 'title'
    const elems =  document.querySelectorAll('[data-title]');
    elems.forEach((elem) => {
        elem.classList.add('hide');
    })
}
