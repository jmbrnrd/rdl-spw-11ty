import bookings from "./bookings";
import map from "./map";
import formatting from "./formatting";
import nav from './nav';
import gallery from './gallery';
import promotions from './promotions'


// Suppress Console.logging
if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
}
console.log(`Version: ${process.env.NODE_ENV}`);

bookings();
promotions();
nav();
formatting();
map();
gallery();




