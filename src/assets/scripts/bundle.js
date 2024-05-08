
process.env.NODE_ENV === 'production'
    ? console.log = () => {}
    : console.log('Dev Mode');

//import scroll from './lenis-scroll';
import map from './google-advanced-map';
import formatting from "./formatting";
import nav from './nav';
import gallery from './glightbox-gallery';
import eventsWidget from './events-widget'
import about from "./about";
import events from './events';
import logo from "./logo";
import claim from "./claim";

nav();
logo();
formatting();
gallery();
about();
events();
eventsWidget();
map();
claim();
//scroll();







