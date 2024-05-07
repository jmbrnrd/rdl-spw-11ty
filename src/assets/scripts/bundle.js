


if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
}

import scroll from './scroll';
import map from './googlmap';
import formatting from "./formatting";
import nav from './nav';
import gallery from './gallery';
import promotions from './promotions'
import about from "./about";
import events from './events';
import logo from "./logo";


logo();
formatting();
map();
gallery();
about();
events();
promotions();
nav();
scroll();








