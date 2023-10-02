
export default function () {

    console.log('event.js');

    // Target our event elements
    const eventSection = document.getElementById('events');
    const eventElements = document.querySelectorAll('[data-elem-event]');
    // Set vars
    const restaurantId = document.querySelector('html').dataset.id;
    const currentDate = new Date();
    const devServer = 'http://localhost:4000';
    const prodServer = 'https://rc-server-staging.herokuapp.com';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;
    let eventsLoaded = false;

    // Wait for page load & fetch events
    window.addEventListener('load', function () {
        console.log(`Page loaded so fetch offers`);
        getAllEvents();
    });

    function getAllEvents() {

        // Abort if already loaded
        if (eventsLoaded) { return false; }

        fetch(`${api}/public/restaurantoffers`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
                user_code: 'CF-418-Beta',
                restaurant_id: restaurantId,
                valid: false
            })
        })
            // check for valid response
            .then(response => {
                // format
                return response.json();
            })
            .then(data => {
                // abort if array is empty
                if (data.count < 1) { return false; }
                // build events
                createEventSection(data['offers']);
            })
            .catch(err => console.log(err));
    }


    /**
     * Build the DOM elements
     * @param events - array of all events
     * @returns {boolean} guard clause
     */
    function createEventSection(events)  {

        console.log(events);

        // we only want offers that are in date or marketing date range
        const activeEvents = getActiveEvents(events);

        // abort if no valid promotions are returned
        if (activeEvents.length < 1) {
            console.log('No active events!');
            return false;
        }

        // build DOM elements
        const eventFragment = document.createDocumentFragment();
        const eventScroller = document.createElement('div');

        // apply classes
        eventScroller.className = 'event-scroller snaps-inline';

        // build event cards
        activeEvents.forEach(event => {
            let eventCard = document.createElement('div');
            let eventElementString =
                `<div class="event-card" aria-label="Event">` +
                `<img src="${event.offer_image}" alt="Event image">` +
                `<div class="event-card-content">` +
                `<h2>${event.offer_tag}</h2>` +
                `<span class="event-card-subtitle">${event.offer_strapline}</span>` +
                `<p>${event.offer_text}</p>`;
            // add optional link
            if(event.offer_link) {
                eventElementString += `<a href="${event.offer_link}" target="_blank">More Information</a>`;
            }
            // complete tags and append card to scroller
            eventElementString += `</div></div>`;
            eventCard.innerHTML = eventElementString;
            eventScroller.appendChild(eventCard);
        });
        // build dom
        eventFragment.appendChild(eventScroller);
        eventSection.append(eventFragment);
        // remove hidden class from event elements
        eventElements.forEach(elem => elem.classList.remove('hidden'));
    }

    /**
     *
     * @param events array of events/promotions
     * @returns {*[]} an array of valid promotions - i.e. in date range
     */
    function getActiveEvents(events) {
        let activeEvents = [];
        events.forEach( event => {
            // abort if beyond end date
            if (currentDate > new Date(event['offer_to']) || currentDate > new Date(event['offer_marketed_to'])) { return; }
            // or before market from data
            if (currentDate < new Date(event['offer_marketed_from'])) { return; }
            activeEvents.push(event);
        });
        console.log(activeEvents);
        return activeEvents;
    }
}
