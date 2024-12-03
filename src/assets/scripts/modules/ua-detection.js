import {UAParser} from 'ua-parser-js';

const parser = new UAParser(navigator.userAgent);
let osString = '';

parser.getOS().withClientHints().then(os => {
    osString = os.toString();
    // console.log('Based on client hints', os);
});

export default function () {

    return `Browser: ${parser.getBrowser()} | Engine: ${parser.getEngine()} | Device: ${parser.getDevice()} | OS: ${osString}`

}

