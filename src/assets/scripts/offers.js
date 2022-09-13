
export default function () {
    console.log(`offers.js loaded`);
    // const restaurantId = document.querySelector('html').dataset.id;
    let messagesLoaded = false;
    const restaurantId = '2832';
    const devServer = 'http://localhost:4000';
    const prodServer = 'http://restaurantcollective.io';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;

    window.addEventListener('load', function () {
        console.log('Window loaded');
        getOffers();
    });

    function getOffers() {

        console.log(`Messages loaded: ${ messagesLoaded }`);

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
                createOffersButton(data['offers']);
            })
            .catch(err => console.log(err));
        // confirm

    }

    function createOffersButton(offers) {

        if (offers.length < 1) { return false; }

        const fragment = document.createDocumentFragment();
        const messageContainer = document.createElement('div');
        const messageHeader = document.createElement('div');
        const messageBody = document.createElement('div');

        messageContainer.className = 'modal-messages';
        messageHeader.className = 'msg-header';
        messageBody.className = 'msg-body';

        messageContainer.append(messageHeader, messageBody);
        fragment.append(messageContainer);
        document.body.appendChild(fragment);

        messageContainer.addEventListener('animationend', () => {
            console.log('Transition ended');
            messageHeader.innerHTML = '<h2>Latest Offers & Information</h2>';
        });


        messageContainer.addEventListener('click', () => {
            console.log('Messages clicked');
            dspOffers(messageBody, offers);
            messageBody.classList.toggle('active');

        });

        messageContainer.classList.add('scale-in-center');

    }

    function dspOffers(container, messages) {
        if (messagesLoaded) {
            return false;
        }
        const listFragment = document.createDocumentFragment();
        const list = document.createElement('ul');
        list.className = 'offer-list';
        let listItem;
        let listTitle;
        messages.forEach(item => {
          console.log(item);
          listItem = document.createElement('li');
          listItem.innerHTML = `<h3>${item['offer_strapline']}</h3><p>${item['offer_text']}</p><a href="#">CTA</a>`;
          list.appendChild(listItem);
        });
        listFragment.appendChild(list);
        container.appendChild(listFragment);
        messagesLoaded = true;
    }

}
