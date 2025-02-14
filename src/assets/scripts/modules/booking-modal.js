console.log('booking-modal.js loaded');

/**
 * this module creates a modal overlay & container
 * then export DOM element references and methods
 */

const modalFragment = document.createDocumentFragment();

// Modal overlay
const modalOverlay = document.createElement('div');
modalOverlay.setAttribute('id', 'overlay');
modalOverlay.classList.add('modal-overlay');

// Modal container
const modalContainer = document.createElement('div');
modalContainer.setAttribute('id', 'modal');
modalContainer.classList.add('modal-window');
const modalContent = document.createElement('div');
modalContent.setAttribute('id', 'modalContent');
modalContent.classList.add('modal-content');
modalContainer.appendChild(modalContent);

// Close button
const btnClose = document.createElement('span');
btnClose.classList.add('modal-close');
btnClose.addEventListener('click', close);

// build the DOM
modalContainer.appendChild(btnClose);
modalOverlay.appendChild(modalContainer)
modalFragment.append(modalOverlay);

// Attach to the DOM
document.body.appendChild(modalFragment);



// Display the modal container
function open(provider) {

    modalOverlay.style.display = 'flex';
    modalOverlay.style.opacity = '1'
    modalOverlay.style.display = 'flex';

    // container.style.width = `${width}px`;
    // container.style.height = `${h}px`;
    // container.style.maxHeight = '80vh';
    //container.style.maxWidth = '80vw';
    modalContainer.classList.add('fade-in-fast');

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

function clearContent() {
    if (modalContent.hasChildNodes()) {
        modalContent.removeChild(modalContent.children[0]);
    }
}

function removeModal() {
    if (modalOverlay.hasChildNodes()) {
        modalOverlay.removeChild(modalOverlay.children[0]);
    }
}

// Hide the modal container
function close() {
    modalOverlay.style.opacity = '0';
    modalOverlay.style.display = 'none';
    document.body.classList.remove('stopScroll');
}

// Click outside to close

export { open, close, addButtons, clearContent, removeModal, modalContainer, modalContent, modalOverlay }
