
export default function () {
    console.log(`offers.js loaded`);
    const restaurantId = document.querySelector('html').dataset.id;
    let messagesLoaded = false;
    const devServer = 'http://localhost:4000';
    const prodServer = 'https://rc-server-staging.herokuapp.com';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;

    // Wait for page load
    window.addEventListener('load', function () {
        console.log('Window loaded');
        getOffers();
    });

    function getOffers() {
        // Are they already loaded ?
        if (messagesLoaded) { return false; }

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
                return response.json();
            })
            .then(data => {
                // Any offers/messages?
                if (data.count < 1) { return false; }
                createOffersButton(data['offers']);
            })
            .catch(err => console.log(err));
    }

    /**
     *
     * @param offers - array return from getOffers()
     * @returns {boolean} guard clause
     */
    function createOffersButton(offers) {
        // double-check that we have some content
        if (offers.length < 1) { return false; }
        // build DOM elements
        const fragment = document.createDocumentFragment();
        const messageContainer = document.createElement('div');
        const messageHeader = document.createElement('div');
        const messageBody = document.createElement('div');

        // apply classes
        messageContainer.className = 'modal-messages';
        messageHeader.className = 'msg-header';
        messageBody.className = 'msg-body';

        // add content
        messageHeader.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M36.5 25.5v-3H44v3ZM39 40l-6.05-4.5 1.8-2.4 6.05 4.5Zm-4.1-25.15-1.8-2.4L39 8l1.8 2.4ZM10.5 38v-8H7q-1.25 0-2.125-.875T4 27v-6q0-1.25.875-2.125T7 18h9l10-6v24l-10-6h-2.5v8ZM28 30.7V17.3q1.35 1.2 2.175 2.925Q31 21.95 31 24t-.825 3.775Q29.35 29.5 28 30.7ZM7 21v6h9.8l6.2 3.7V17.3L16.8 21Zm8 3Z"/></svg>' +
            '<h2>View Our Latest Offers</h2>';

        // add to DOM
        messageContainer.append(messageHeader, messageBody);
        fragment.append(messageContainer);
        document.body.appendChild(fragment);

        // reveal label after button is on screen
        messageContainer.addEventListener('animationend', () => {
            messageHeader.classList.add('reveal');
        });
        // reveal offers/messages
        messageContainer.addEventListener('click', () => {
            dspOffers(messageBody, offers);
            messageBody.classList.toggle('active');
        });
        // init button
        messageContainer.classList.add('scale-in-center');
    }

    /**
     *
     * @param container - contain DOM element for our messages
     * @param messages - loaded offers/messages array
     * @returns {boolean}
     */
    function dspOffers(container, messages) {
        // abort if already loaded
        if (messagesLoaded) { return false; }
        // build DOM elements
        const listFragment = document.createDocumentFragment();
        const list = document.createElement('ul');
        list.className = 'offer-list';
        // create list of offers/messages
        let listItem;
        messages.forEach((item, index) => {
          listItem = document.createElement('li');
          listItem.innerHTML =
              `<img src="https://res.cloudinary.com/rdl/image/upload/v1653385892/directory_assets/camc/logo.svg" alt="logo" />` +
              `<h3>${item['offer_strapline']}</h3>` +
              `<p>${item['offer_text']}</p>` +
              `<a href="#reservations">Action</a>`;
          list.appendChild(listItem);
        });
        // add to DOM
        listFragment.appendChild(list);
        container.appendChild(listFragment);
        messagesLoaded = true;
    }

}
