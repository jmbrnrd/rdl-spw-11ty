import * as modal from './booking-modal';

/**
 * @param config
 * @param config.provider
 * @param config.providerId
 * @param config.providerKey
 * @param config.providerUrl
 * @param config.advanceDays
 * @param config.maxCovers
 * @param config.email
 * @param config.id
 * @param config.name
 * @param config.people
 * @param config.person
 * @returns {boolean}
 */
export default function(config) {

    // Abort if there's no provider
    if(!config.provider) {
        console.warn('No booking provider specified!');
        return false;
    }

    const bookingButtonElements = document.querySelectorAll('[data-book-online]');
    if(bookingButtonElements.length < 1) {
        console.warn(`No 'data-book-online' targets specified in template!`);
        return false;
    }

    // Set frame attributes& modal class
    function createWidgetContent() {
        console.log('Create Opentable widget content');
        const widgetContent = document.createElement('iframe');
        widgetContent.src = config.providerUrl;
        widgetContent.allowFullscreen = true;
        widgetContent.style.width = '290px';
        widgetContent.style.height = '490px';
        modal.container.classList.add('max360');
        modal.container.appendChild(widgetContent);
    }

    // Wait for DOM to be loaded
    window.addEventListener('load', function () {
        createWidgetContent();
        modal.addButtons();
    });
}
