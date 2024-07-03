export default function() {

    if(!document.getElementById('navBar')) {
        return false;
    }


    console.log('nav.js loaded');
    const navBar = document.getElementById('navBar');
    const navMenu = document.getElementById('navMenu');
    const navBtn = document.getElementById('navBtn');
    let navIsClosed = true;

// Hero navigation
    navMenu.addEventListener('click', () => {
        if (navIsClosed) {
            // activate
            navBtn.classList.add('is-active');
            navBar.classList.add('nav-active');
            navIsClosed = false;
        } else {
            // deactivate
            navBtn.classList.remove('is-active');
            navBar.classList.remove('nav-active');
            navIsClosed = true;
        }
    });

// when navigation is 'full-screen' for smaller devices
// we need to reset the menu states when selected
    const navs = document.querySelectorAll('nav a');
// Convert the DOM NodeList to a regular array
    const navsList = [].slice.call(navs);
    navsList.forEach((item) => {
        item.addEventListener('click', () => {
            navBar.classList.remove('nav-active');
            navBtn.classList.remove('is-active');
            navIsClosed = true;
        });
    });

// when the HERO section is no longer in the viewport
// reveal global nav
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            entry.isIntersecting ? navBar.classList.remove('nav-show') : navBar.classList.add('nav-show');
        });
    }, {rootMargin: '-180px'});
    observer.observe(document.getElementById('hero'));
}
