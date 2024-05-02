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

    function createSerbContent() {
        console.log('Create SERB widget content');

        const serbContent = document.createElement('iframe');
        serbContent.src = config.providerUrl;
        serbContent.width = '600';
        serbContent.height = '600';
        serbContent.allowFullscreen = true;
        //modal.container.classList.add('large');
        modal.container.appendChild(serbContent);
    }

    // Wait for DOM to be loaded
    window.addEventListener('load', function () {
        createSerbContent();
        modal.addButtons();
    });
}
