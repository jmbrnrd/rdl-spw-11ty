/**
 * Lazy load Google map
 * Add custom marker & info window
 */

import { Loader } from "@googlemaps/js-api-loader";

export default function (){

    // Guard clause
    if (!document.getElementById('location')) {
        console.warn('No map "location" element');
        return false;
    }

    // Get color from html
    const clrMarker = getComputedStyle(document.documentElement)
        .getPropertyValue('--clr-accent-500') || '#000';

    // Reference section & data
    const elem =  document.getElementById('location');

    const mapOptions = {
        center: {
            lat: Number(elem.dataset.lat),
            lng: Number(elem.dataset.lng)
        },
        zoom: 14,
        mapId: 'f547725f57ef2ea8'
    };

    const loader = new Loader({
        apiKey: "AIzaSyAUOxHaeFFu1_c0sEpjRCNOAKnl6r8YMvY",
        version: "weekly"
    });

    // Wait for DOM loaded event
    document.addEventListener("DOMContentLoaded", () => {
        console.log('DOMContentLoaded');
        // Set
        const handleIntersection = (entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    console.log('Intersecting!');

                    // Promise for a specific library
                    loader
                        .importLibrary('maps')
                        .then(async ({ Map, InfoWindow }) => {

                            const map = new Map(document.getElementById("map"), mapOptions);
                            const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');

                            const pin = new PinElement({
                                glyph: `★`,
                                scale: 1,
                                background: clrMarker,
                                borderColor: clrMarker,
                                glyphColor: '#fff'
                            })

                            const marker = new AdvancedMarkerElement({
                                map,
                                position: mapOptions.center,
                                title: elem.dataset.label,
                                content: pin.element,
                                gmpClickable: true
                            });

                            const info = new InfoWindow({
                                content: marker.title
                            });
                            marker.addListener("click", () => {
                                info.open(marker.map, marker);
                            });



                        })
                        .catch((e) => {
                            console.log(e);
                        });
                    console.log('Map loaded now');
                    // once loaded remove observer
                    observer.unobserve(elem);
                }
            });
        }

        // Offset the load according to the content
        console.log(!!elem.dataset.intersection);
        const offset = !!elem.dataset.intersection ? `${elem.dataset.intersection}px` : `0px`;
        const observer = new IntersectionObserver(handleIntersection, { rootMargin: offset });
        observer.observe(elem);
    });


}
