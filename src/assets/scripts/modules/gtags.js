
export default function() {
    const menus = document.querySelectorAll('.menu-card');
    const gallery = document.querySelectorAll('.glightbox');

    // Tag gallery views
    if(gallery.length > 0){
        gallery.forEach((item) => {
            item.addEventListener('click', (e) => {
                gtag('event', 'gallery_view');
            })
        })
    }
    // Tag menu views
    if(menus.length > 0){
        menus.forEach((item) => {
            item.addEventListener('click', (e) => {
                gtag('event', 'pdf_menu_view');
            })
        })
    }
}

