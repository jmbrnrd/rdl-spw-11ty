import Glightbox from 'glightbox/dist/js/glightbox';

export default function () {
    console.log('gallery.js loaded');
    const lightbox = Glightbox({
        touchNavigation: true,
        autoplayVideos: true
    });

}
