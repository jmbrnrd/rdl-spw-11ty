
process.env.NODE_ENV === 'production'
    ? console.log = () => {}
    : console.log('Dev Mode');

import scroll from './modules/lenis-scroll';
import map from './modules/google-advanced-map';
import formatting from "./modules/formatting";
import nav from './modules/nav';
import gallery from './modules/glightbox-gallery';
import eventsWidget from './modules/events-widget'
import about from "./modules/about";
import events from './modules/events';
import logo from "./modules/logo";
import claim from "./modules/claim";



nav();
logo();
formatting();
gallery();
about();
events();
eventsWidget();
map();
claim();
scroll();







