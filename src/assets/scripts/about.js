export default function () {

    console.log('About is loaded');

    /**
     * Display debug data/browser
     */
    const createAboutDialog = () => {

        // If dialog already exists, abort.
        if (!!document.querySelector('.about')) { return; }

        // Get data attributes
        const data = document.querySelector('html').dataset;

        // Create DOM elements
        const fragment = document.createDocumentFragment();
        const aboutDialog = document.createElement('div');
        const aboutDialogContent = document.createElement('div');
        aboutDialog.classList.add('about');

        // Add content
        aboutDialogContent.innerHTML =
                    `<h2>RDL:</h2>` +
                    `<span>Restaurant ID:</span> <span>${data.id}</span>` +
                    `<span>Template: Version:</span><span>${data.templateVersion}</span>` +
                    `<span>User Agent:</span><span>${navigator.userAgent}</span>`;

        // Add to DOM
        fragment.appendChild(aboutDialog);
        aboutDialog.appendChild(aboutDialogContent);
        document.body.appendChild(fragment);
        aboutDialogContent.classList.add('fade-in-fast');

    }

    const removeAboutDialog = () => {
        if (!!document.querySelector('.about')) {
            document.querySelector('.about').remove();
        }
    }

    // Listen for key combo
    document.addEventListener('keydown',

        (event)=> {
            let isKey = event.key === "0" || event.key ===")";
            let isEsc = event.key === "Escape"
            let isMetaKey =  event.metaKey;
            let isShiftKey = event.shiftKey;

            // CMD + Shift + 0 to open
            if ( isMetaKey && isShiftKey && isKey ) {
                event.preventDefault();
                createAboutDialog();
                return
            }
            // Esc to close
            if (isEsc) {
                event.preventDefault();
                removeAboutDialog();
            }
        });

}
