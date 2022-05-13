export default function () {
    console.log('Map loaded');
    /**
     * Lazy load the Googlemap user scrolls
     */
    window.addEventListener('load', function () {
        const target = document.querySelector('#map');
        const zoom = 15;
        const mapId = 'f547725f57ef2ea8'; // created in the Google Maps API account
        const elem =  document.getElementById('location');
        const center = {
            lat: Number(elem.dataset.lat),
            lng: Number(elem.dataset.lng)
        };
        const initMap = () => {
            // map object
            const map = new google.maps.Map(document.getElementById('map'), {
                center,
                zoom,
                mapId,
                mapTypeControl: false,
            });
            // map marker
            const marker = new google.maps.Marker({
                position: center,
                icon: {
                    path: 'M18,46 C5,37 0,27.9411255 0,18 C0,8.0588745 8.0588745,7.10542736e-15 18,7.10542736e-15 C27.9411255,7.10542736e-15 36,8.0588745 36,18 C36,27.9411255 31,37 18,46 Z M18,24 C21.3137085,24 24,21.3137085 24,18 C24,14.6862915 21.3137085,12 18,12 C14.6862915,12 12,14.6862915 12,18 C12,21.3137085 14.6862915,24 18,24 Z',
                    fillColor: '#ff5724',
                    fillOpacity: .75,
                    strokeWeight: 0,
                    strokeColor: '#000',
                    rotation: 0,
                    scale: 1,
                    labelOrigin: { x: 18, y: 18 },
                    anchor: new google.maps.Point(18, 40)
                },
                // label: {
                //   color: '#fff',
                //   text: `★`,
                //   fontSize: '18px'
                // },
                map,
                animation: google.maps.Animation.DROP
            });
            // info window
            const infowindow = new google.maps.InfoWindow({
                content:  `<div class="map-infowindow">` +
                    `<h3>${elem.dataset.label}</h3>` +
                    `</div>`,
                maxWidth: 240,
            });
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
        }
        const handleIntersection = (entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    console.log('Intersecting!');
                    initMap();
                    // once loaded remove observer
                    observer.unobserve(target);
                }
            });
        }
        // Offset the load according to the content
        const observer = new IntersectionObserver(handleIntersection, { rootMargin: `${target.dataset.intersection}px`});
        observer.observe(target);
    });

}
