import Lenis from '@studio-freight/lenis';

export default function () {

    console.log('lenis-scroll.js loaded');

    const lenis = new Lenis();

    // lenis.on('scroll', (e) => {
    //     console.log(e)
    // });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Target links
    const navLinks = document.querySelectorAll('a');
    let anchor;
    // If they're internal, apply lenis scrollTo
    navLinks.forEach((nav) => {
        anchor = nav.getAttribute('href');
        if (anchor.indexOf('#') === 0) {
            nav.addEventListener('click', () => {
                lenis.scrollTo(nav.getAttribute('href'));
            });
        }
    });



}
