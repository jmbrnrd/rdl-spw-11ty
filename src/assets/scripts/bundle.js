if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
}

import bookings from "./booking-mozrest";
import map from "./map-lazy";
import formatting from "./formatting";
import nav from './nav';
import gallery from './gallery';
import promotions from './promotions'
import bookingRequest from './booking-email';
import about from "./about";
import events from './events';
import logo from "./logo";

logo();
formatting();
map();
gallery();
bookingRequest();
about();

bookings();
events();
promotions();
nav();





