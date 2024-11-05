console.log('booking-modal.js loaded');
/**
 * this module creates a modal overlay & container
 * then export DOM element references and methods
 */

const modalFragment = document.createDocumentFragment();

// Modal overlay
const overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay');
overlay.classList.add('modal-overlay');

// Modal container
const container = document.createElement('div');
container.setAttribute('id', 'modal');
container.classList.add('modal-window');

// Close button
const btnClose = document.createElement('span');
btnClose.classList.add('modal-close');
btnClose.addEventListener('click', close);

// build the DOM
container.appendChild(btnClose);
overlay.appendChild(container)
modalFragment.append(overlay);

// Attach to the DOM
document.body.appendChild(modalFragment);

// Display the modal container
function open(provider) {

    overlay.style.display = 'flex';
    overlay.style.opacity = '1'
    overlay.style.display = 'flex';

    // container.style.width = `${width}px`;
    // container.style.height = `${h}px`;
    // container.style.maxHeight = '80vh';
    //container.style.maxWidth = '80vw';
    container.classList.add('fade-in-fast');

    document.body.classList.add('stopScroll');

    // Analytics
    gtag('event', 'booking_modal_open', {'provider': provider});

}

function addButtons(provider = '') {
    let btn;
    document.querySelectorAll('[data-book-online]').forEach((elem) => {
        btn = document.createElement('button');
        btn.classList.add('btn-book');
        btn.textContent = 'Book Online';
        btn.addEventListener('click', () => { open(provider) });
        elem.prepend(btn);
    });
}

// Hide the modal container
function close() {
    overlay.style.opacity = '0';
    overlay.style.display = 'none';
    document.body.classList.remove('stopScroll');
}

// Click outside to close

export { open, close, addButtons, container, overlay }
