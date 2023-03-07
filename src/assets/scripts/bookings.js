export default function() {
    console.log('booking.js loaded');

    // Reference the book button
    const bkgButtons = document.querySelectorAll('[data-mzid]');

    // Wait for DOM to be loaded
    window.addEventListener('load', function () {

        // Abort if no button
        if (!bkgButtons[0]) {
            console.log('No booking button found!');
            return;
        }

        console.log('Create booking widget');

        // Grab the mz keys
        const id = bkgButtons[0].dataset.mzid;
        const key = bkgButtons[0].dataset.mzkey;

        console.log(id);

        // Create a background overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        // Create a modal container
        const bkgModal = document.createElement('div');
        bkgModal.classList.add('modal-window');
        const bkgModalClose = document.createElement('div');
        bkgModalClose.classList.add('modal-close')

        // Insert the iFrame content
        const bkgFrame = document.createElement('iframe');
        bkgFrame.src = `https://widget.mozrest.com/`+
            `?key=${key}`+
            `&mzId=${id}`+
            `&showOffers=true`+
            `&showAreas=true`+
            `&requireCC=true`+
            `&bgColor=fff`+
            `&showHeader=false`;

        bkgFrame.width = '600';
        bkgFrame.height = '750';
        bkgFrame.allowFullscreen = true;
        bkgModal.appendChild(bkgFrame);
        bkgModal.appendChild(bkgModalClose);
        modalOverlay.appendChild(bkgModal);
        document.body.appendChild(modalOverlay);

        // Add listeners to all book buttons
        bkgButtons.forEach(btn => {
            btn.addEventListener('click', toggleBkgModal);
        });

        // Click outside modal to close
        modalOverlay.addEventListener('click', toggleBkgModal);
        function toggleBkgModal() {
            modalOverlay.classList.toggle('active');
            bkgModal.classList.toggle('fade-in-fast');
            document.body.classList.toggle('stopScroll');
        }
    });
}
