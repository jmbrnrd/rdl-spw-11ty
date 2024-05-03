console.log('booking-widgets.js loaded');

// import modules
import emailWidget from './booking-widget-email';
import mozrestWidget from './booking-widget-mozrest';
import serbWidget from './booking-widget-serb';
import resdiaryWidget from './booking-widget-resdiary'
import opentableWidget from './booking-widget-opentable';
import resyWidget from './booking-widget-resy';

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

    console.log('CONFIG:', config);

    // Abort if there's no widget
    if(!config.provider) {
        console.warn('No booking provider supplied');
        return false;
    }

    // Which provider?
    switch (config.provider) {
        case 'mozrest': {
            console.log('MOZREST WIDGET');
            mozrestWidget(config);
            break;
        }
        case 'serb': {
            console.log('SERB WIDGET');
            serbWidget(config);
            break;
        }
        case 'resdiary': {
            console.log('RESDIARY WIDGET');
            resdiaryWidget(config);
            break;
        }
        case 'opentable': {
            console.log('OPENTABLE WIDGET');
            opentableWidget(config);
            break;
        }
        case 'resy': {
            console.log('RESY');
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
