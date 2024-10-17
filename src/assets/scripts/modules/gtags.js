
export default function() {

    const template = document.querySelector('html').dataset;
    const menus = document.querySelectorAll('.menu-card');
    const gallery = document.querySelectorAll('.glightbox');

    console.log('GTAGS', template);
    console.log('MENUS', menus);
    console.log('GALLERY', gallery);


    // Tag gallery views
    if(gallery.length > 0){
        gallery.forEach((item) => {
            item.addEventListener('click', (e) => {
                gtag('event', 'gallery_view', { 'id': template.id});
            })
        })
    }




}