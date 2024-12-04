import { UAParser } from 'ua-parser-js';

const parser = new UAParser(navigator.userAgent);
let osString = '';

console.log('UAParser loaded');

parser.getOS().withClientHints().then(os => {
    osString = os.toString();
});

export default function () {
    return `Browser: ${parser.getBrowser()} | Engine: ${parser.getEngine()} | Device: ${parser.getDevice()} | OS: ${osString}`
}

