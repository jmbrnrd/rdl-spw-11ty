console.log('Loading modal');
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

overlay.appendChild(container)
modalFragment.append(overlay);

// Attach to the DOM
document.body.appendChild(modalFragment);

// Display the modal container
function open() {
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    overlay.style.display = 'flex';
    overlay.classList.add('fade-in-fast');
    document.body.classList.add('stopScroll');
}

// Hide the modal container
function close() {
    overlay.style.opacity = '0';
    overlay.style.display = 'none';
    document.body.classList.remove('stopScroll');
}

export { open, close, container, overlay }
