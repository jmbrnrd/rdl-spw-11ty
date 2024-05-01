console.log('booking-widgets.js loaded');
// import modules
import emailWidget from './booking-widget-email';
import mozrestWidget from './booking-widget-mozrest';

init();

function init() {

    // Abort if there is no reservation section
    if (!document.getElementById('reservations')) {
        console.warn('No reservations section found');
        return false;
    }

    // Reference section data
    const reservations = document.getElementById('reservations');
    const config = reservations.dataset;
    console.log('CONFIG:', config);

    // Abort if there's no widget
    if(!config.provider) {
        console.log('No booking provider supplied');
        return false;
    }

    // Which provider?
    switch (config.provider) {
        case 'mozrest': {
            console.log('MOZREST WIDGET');
            mozrestWidget();
            break;
        }
        case 'serb': {
            console.log('SERB WIDGET');
            break;
        }
        case 'resdiary': {
            console.log('RESDIARY WIDGET');
            break;
        }
        default: {
            console.log('EMAIL WIDGET');
            emailWidget(config);

            break;
        }
    }
}















