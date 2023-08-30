/**
 * Lazy load Google map
 * Add custom marker & info window
 */

import { Loader } from "@googlemaps/js-api-loader";

export default function (){
    let map;
    // Get color from html
    const clrMarker = getComputedStyle(document.documentElement)
        .getPropertyValue('--clr-accent-500') || '#000';
    // section element
    const elem =  document.getElementById('location');
    const center = {
        lat: Number(elem.dataset.lat),
        lng: Number(elem.dataset.lng)
    };
    // styles set up in Maps Api Account
    // const mapId = 'f547725f57ef2ea8';
    const mapId = elem.dataset.mapStyleId;
    const zoom = 14;
    // Google maps loader
    const loader = new Loader({
        apiKey: "AIzaSyAUOxHaeFFu1_c0sEpjRCNOAKnl6r8YMvY",
        version: "weekly",
    });
    // Wait for DOM loaded event
    document.addEventListener("DOMContentLoaded", () => {
        console.log('DOMContentLoaded');
        // Set
        const handleIntersection = (entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    console.log('Intersecting!');
                    loader.load().then(() => {
                        map = new google.maps.Map(document.getElementById("map"), {
                            center,
                            zoom,
                            mapId,
                            mapTypeControl: false,
                        });
                    }).then(() => {
                        // map marker
                        const marker = new google.maps.Marker({
                            position: center,
                            icon: {
                                path: 'M18,46 C5,37 0,27.9411255 0,18 C0,8.0588745 8.0588745,7.10542736e-15 18,7.10542736e-15 C27.9411255,7.10542736e-15 36,8.0588745 36,18 C36,27.9411255 31,37 18,46 Z M18,24 C21.3137085,24 24,21.3137085 24,18 C24,14.6862915 21.3137085,12 18,12 C14.6862915,12 12,14.6862915 12,18 C12,21.3137085 14.6862915,24 18,24 Z',
                                fillColor: clrMarker,
                                fillOpacity: .75,
                                strokeWeight: 0,
                                strokeColor: '#000',
                                rotation: 0,
                                scale: 1,
                                labelOrigin: { x: 18, y: 18 },
                                anchor: new google.maps.Point(18, 40)
                            },
                            map,
                            //animation: google.maps.Animation.DROP,
                            ariaLabel: 'Restaurant location marker'
                        });
                        if (elem.dataset.mapShowInfo === "true") {
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
                            //infowindow.open(map, marker);
                        }

                    });
                    console.log('Map loaded now');
                    // once loaded remove observer
                    observer.unobserve(elem);
                }
            });
        }

        // Offset the load according to the content
        const observer = new IntersectionObserver(handleIntersection, { rootMargin: `${elem.dataset.intersection ?? 100}px`});
        observer.observe(elem);
    });


}
