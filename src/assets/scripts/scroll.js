import Lenis from '@studio-freight/lenis';

export default function () {

    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        //console.log(e)
    })

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const navLinks = document.querySelectorAll('#navBar a, .hero-nav a');
    console.log(navLinks);

    navLinks.forEach((nav) => {
        nav.addEventListener('click', () => lenis.scrollTo(nav.getAttribute('href')));
    });
}
