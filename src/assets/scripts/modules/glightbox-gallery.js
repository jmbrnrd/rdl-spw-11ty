import glightbox from 'glightbox/dist/js/glightbox';

export default function () {
    console.log('glightbox-gallery.js loaded');
    const gallery = glightbox({
        touchNavigation: true,
        autoplayVideos: true
    });
}
