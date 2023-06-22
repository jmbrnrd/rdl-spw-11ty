
export default function () {

    const restaurantId = document.querySelector('html').dataset.id;
    let messagesLoaded = false;
    const currentDate = new Date();
    const devServer = 'http://localhost:4000';
    const prodServer = 'https://rc-server-staging.herokuapp.com';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;

    // Wait for page load
    window.addEventListener('load', function () {
        console.log(`Fetch offers`);
        getOffers();
    });

    function getOffers() {

        // Abort if already loaded
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
                // format
                return response.json();
            })
            .then(data => {
                // abort if array is empty
                if (data.count < 1) { return false; }
                // process
                createOffersButton(data['offers']);
            })
            .catch(err => console.log(err));
    }

    function getMonth(idx) {
        const locale = "en-GB";
        const objDate = new Date();
        objDate.setDate(1);
        objDate.setMonth(idx);
        return objDate.toLocaleString(locale, {month: "short"});
    }

    /**
     * Build the DOM elements
     * @param offers - array returned from getOffers()
     * @returns {boolean} guard clause
     */
    function createOffersButton(offerData)  {

        const offers = getValidPromos(offerData);

        // abort if no valid promotions are returned
        if (offers.length < 1) { return false; }

        // build DOM elements
        const fragment = document.createDocumentFragment();
        const messageContainer = document.createElement('aside');
        const messageHeader = document.createElement('div');
        const messageBody = document.createElement('div');
        const messageFooter = document.createElement('div');

        // apply classes
        messageContainer.className = 'modal-messages';
        messageHeader.className = 'msg-header';
        messageBody.className = 'msg-body';
        messageFooter.className = 'msg-footer';

        // add content
        messageHeader.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#fff" d="M36.5 25.5v-3H44v3ZM39 40l-6.05-4.5 1.8-2.4 6.05 4.5Zm-4.1-25.15-1.8-2.4L39 8l1.8 2.4ZM10.5 38v-8H7q-1.25 0-2.125-.875T4 27v-6q0-1.25.875-2.125T7 18h9l10-6v24l-10-6h-2.5v8ZM28 30.7V17.3q1.35 1.2 2.175 2.925Q31 21.95 31 24t-.825 3.775Q29.35 29.5 28 30.7ZM7 21v6h9.8l6.2 3.7V17.3L16.8 21Zm8 3Z"></path></svg>` +
            `<h2>Events & Offers</h2>`;

        messageFooter.innerHTML = `CLOSE`;

        // add to DOM
        messageBody.appendChild(messageFooter);
        messageContainer.append(messageHeader, messageBody);
        fragment.append(messageContainer);
        document.body.appendChild(fragment);

        // reveal label after button is on screen
        messageContainer.addEventListener('animationend', () => {
            messageHeader.classList.add('reveal');
        });

        // open offers/messages
        messageContainer.addEventListener('click', () => {
            dspOffers(messageBody, offers);
            messageBody.classList.toggle('active');
        });

        // init button
        messageContainer.classList.add('scale-in-center');
    }

    /**
     * Display the list of offers/messages
     * @param container - contain DOM element for our messages
     * @param promotions - loaded offers/messages array
     * @returns {boolean}
     */
    function dspOffers(container, promotions) {

        const isCurrentPromotions = false;

        // abort if already loaded
        if (messagesLoaded) { return false; }

        // build DOM elements
        const listFragment = document.createDocumentFragment();
        const list = document.createElement('ul');
        list.className = 'offer-list';
        let listItem;
        promotions.forEach((item) => {

          const dateObj = new Date(item['offer_from']);

          listItem = document.createElement('li');
          listItem.innerHTML =
              `<header>` +
                  `<span class="category ${item['offer_category'] ?? ``}"></span>` +
                  `<h3>${item['offer_strapline']}</h3>` +
              `</header>` +
              `<p>${item['offer_text']}</p>`
          list.appendChild(listItem);
        });

        // add to DOM
        listFragment.appendChild(list);
        container.prepend(listFragment);
        messagesLoaded = true;
    }

    /**
     *
     * @param promotions array of events/promotions
     * @returns {*[]} an array of valid promotions - i.e. in date range
     */
    function getValidPromos(promotions) {
        let validPromotions = [];
        promotions.forEach( promo => {
            // abort if beyond end date
            if (currentDate > new Date(promo['offer_to'])) { return; }
            // or before market from data
            if (currentDate < new Date(promo['offer_marketed_from'])) { return; }
            validPromotions.push(promo);
        })
        return validPromotions;
    }
}
