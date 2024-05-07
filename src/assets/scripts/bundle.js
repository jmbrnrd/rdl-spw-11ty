


process.env.NODE_ENV === 'production'
    ? console.log = () => {}
    : console.log('In Development Mode');


import scroll from './scroll';
import map from './googlmap';
import formatting from "./formatting";
import nav from './nav';
import gallery from './gallery';
//import promotions from './promotions'
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
// promotions();
map();
claim();
scroll();







