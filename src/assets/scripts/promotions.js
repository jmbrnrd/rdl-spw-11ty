
export default function () {

    console.log('promotion.js');

    /**
     * eventsWidget is a 'placeholder' DOM element that we're using
     * to pass to our js the UI content (label etc.) from our
     * eleventy templates.
     */
    const eventsWidget = document.getElementById('eventsWidget');
    // If there is no eventsWidget in the DOM then abort.
    if (!eventsWidget) {
        console.log('No widget included.');
        return false;
    }

    // This will be our widget label
    const eventWidgetLabel = eventsWidget.innerText;
    const restaurantId = document.querySelector('html').dataset.id;
    const currentDate = new Date();
    const devServer = 'http://localhost:4000';
    const prodServer = 'https://rc-server-staging.herokuapp.com';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;
    let messagesLoaded = false;

    // Wait for page load
    window.addEventListener('load', function () {
        console.log(`Page loaded so fetch offers`);
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

    /**
     * Build the DOM elements
     * @param offerData - array returned from getOffers()
     * @returns {boolean} guard clause
     */
    function createOffersButton(offerData)  {

        console.log(offerData);

        // we only want offers that are in date or marketing date range
        const offers = getValidPromos(offerData);

        // abort if no valid promotions are returned
        if (offers.length < 1) {
            console.log('No offers available');
            return false;
        }

        // build DOM elements
        const widgetFragment = document.createDocumentFragment();
        const widgetContainer = document.createElement('aside');
        const widgetButtonLabel = document.createElement('div');
        const widgetContent = document.createElement('div');

        // apply classes
        widgetContainer.className = 'modal-messages';
        widgetButtonLabel.className = 'msg-header';
        widgetContent.className = 'msg-body';

        // add content
        widgetButtonLabel.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="white" d="M730-450v-60h150v60H730Zm50 290-121-90 36-48 121 90-36 48Zm-82-503-36-48 118-89 36 48-118 89ZM210-200v-160h-70q-24.75 0-42.375-17.625T80-420v-120q0-24.75 17.625-42.375T140-600h180l200-120v480L320-360h-50v160h-60Zm90-280Zm260 134v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM140-540v120h196l124 74v-268l-124 74H140Z"/></svg>` +
            `<h2 class="promo-label">${eventWidgetLabel}</h2>` +
            `<svg xmlns="http://www.w3.org/2000/svg" id="close" viewBox="0 -960 960 960"><path fill="#fff" d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`;


        // add to DOM
        widgetContainer.append(widgetButtonLabel, widgetContent);
        widgetFragment.append(widgetContainer);

        // now replace our placeholder DOM element
        eventsWidget.replaceWith(widgetFragment);

        // reveal label after button is on screen
        widgetContainer.addEventListener('animationend', () => {
            widgetButtonLabel.classList.add('reveal');
        });

        // open offers/messages
        widgetContainer.addEventListener('click', () => {
            dspOffers(widgetContent, offers);
            widgetContent.classList.toggle('active');
            widgetButtonLabel.classList.toggle('open');
        });

        // init button
        widgetContainer.classList.add('scale-in-center');
    }

    /**
     * Display the list of offers/messages
     * @param container - contain DOM element for our messages
     * @param promotions - loaded offers/messages array
     * @returns {boolean}
     */
    function dspOffers(container, promotions) {

        // abort if already loaded
        if (messagesLoaded) { return false; }

        // build DOM elements
        const listFragment = document.createDocumentFragment();
        const list = document.createElement('ul');
        list.className = 'offer-list';
        let listItem;
        let listItemLink;
        promotions.forEach((item) => {
          listItem = document.createElement('li');
          listItem.innerHTML =
              `<header>` +
                  `<span class="category ${item['offer_category'] || 'event'}"></span>` +
                  `<span><h3>${item['offer_tag']}</h3>` + `<div class="subtitle">${item['offer_strapline']}</div></span>` +
              `</header>` +
              `<p>${item['offer_text']}</p>`;
          // Is there a link to additional content?
            if (!!item['offer_link']) {
                listItemLink = document.createElement('a');
                listItemLink.innerHTML = 'Read More';
                listItemLink.setAttribute('href', item['offer_link']);
                listItemLink.setAttribute('aria-label', 'View event details');
                listItem.appendChild(listItemLink);
            }
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
