console.log('bundle-booking-widgets.js loaded');

// import modules
import emailWidget from './modules/booking-widget-email';
import mozrestWidget from './modules/booking-widget-mozrest';
import serbWidget from './modules/booking-widget-serb';
import resdiaryWidget from './modules/booking-widget-resdiary'
import opentableWidget from './modules/booking-widget-opentable';
import resyWidget from './modules/booking-widget-resy';

init()

function init() {

    // Abort if there is no reservation section
    if (!document.getElementById('reservations')) {
        console.warn('No reservations section found');
        return false;
    }

    // Reference section data
    const reservations = document.getElementById('reservations');
    const config = reservations.dataset;

    console.log('Reservation config:', config);

    // Abort if there's no widget
    if(!config.provider) {
        console.warn('No booking provider supplied');
        return false;
    }

    // Which provider?
    switch (config.provider) {
        case 'mozrest': {
            console.log('Init MozRest widget');
            mozrestWidget(config);
            break;
        }
        case 'serb': {
            console.log('Init SERB widget');
            serbWidget(config);
            break;
        }
        case 'resdiary': {
            console.log('Init ResDiary widget');
            resdiaryWidget(config);
            break;
        }
        case 'opentable': {
            console.log('Init Opentable widget');
            opentableWidget(config);
            break;
        }
        case 'resy': {
            console.log('Init Resy widget');
            resyWidget(config);
            break;
        }
        default: {
            console.log('EMAIL WIDGET');
            emailWidget(config);
            break;
        }
    }

}
