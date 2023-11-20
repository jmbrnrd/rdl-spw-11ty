if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
};

import map from "./map-lazy";
import formatting from "./formatting";
import claim from './claim';
import gallery from './gallery';
import bookingRequest from './booking-email';
import about from "./about";

formatting()
map();
gallery();
bookingRequest()
about();

claim();
