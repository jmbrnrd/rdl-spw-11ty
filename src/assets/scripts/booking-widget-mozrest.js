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

    // Abort if there's no widget
    if(!config.provider) {
        console.warn('No booking provider specified!');
        return false;
    }

    // References all button targets
    const bookingButtonElements = document.querySelectorAll('[data-book-online]');
    if(bookingButtonElements.length < 1) {
        console.warn(`No 'data-book-online' targets specified in template!`);
        return false;
    }

    // Create modal content
    function createMozrestContent() {
        // Insert the iFrame content
        const bkgFrame = document.createElement('iframe');
        bkgFrame.src = `${config.providerUrl}
            &showOffers=true
            &showAreas=true
            &requireCC=true
            &bgColor=fff
            &showHeader=false`;
        bkgFrame.width = '600';
        bkgFrame.height = '750';
        bkgFrame.allowFullscreen = true;
        modal.container.appendChild(bkgFrame);
    }

    // Wait for DOM to be loaded
    window.addEventListener('load', function () {

        createMozrestContent();
        modal.addButtons();

    });
}
