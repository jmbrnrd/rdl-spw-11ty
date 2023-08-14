export default function () {

    console.log('About is loaded');

    /**
     * Display debug data/browser
     */
    const showDebug = () => {
        // Is it already exists, abort.
        if (!!document.querySelector('.debug')) { return; }
        // Get debug info
        const data = document.querySelector('html').dataset;
        // Create elements
        const fragment = document.createDocumentFragment();
        const debug = document.createElement('div');
        debug.classList.add('debug');
        debug.innerHTML =
                `<div>` +
                    `<span>Restaurant ID:</span> <span>${data.id}</span>` +
                    `<span>Template: Version</span><span>${data.templateVersion}</span>` +
                    `<span>User Agent:</span><span>${navigator.userAgent}</span>` +
            `</div>`;
        // Add to the DOM
        fragment.appendChild(debug);
        document.body.appendChild(fragment);
    }
    const hideDebug = () => {
        if (!!document.querySelector('.debug')) {
            document.querySelector('.debug').remove();
        }
    }

    document.addEventListener('keydown',

        (event)=> {
            let isKey = event.key === "0" || event.key ===")";
            let isEsc = event.key === "Escape"
            let isMetaKey =  event.metaKey;
            let isShiftKey = event.shiftKey;

            if ( isMetaKey && isShiftKey && isKey ) {
                event.preventDefault();
                showDebug();
                return
            }

            if (isEsc) {
                event.preventDefault();
                hideDebug();
            }
        });

}
