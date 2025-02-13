import { UAParser } from 'ua-parser-js';

const ua = new UAParser(navigator.userAgent);
let osString = '';

console.log('UAParser loaded');

ua.getOS().withClientHints().then(os => {
    osString = os.toString();
});

export default function () {
    return `Browser: ${ua.getBrowser().toString()} | Engine: ${ua.getEngine().toString()} | Device: ${ua.getDevice().toString()} | OS: ${osString}`
}

