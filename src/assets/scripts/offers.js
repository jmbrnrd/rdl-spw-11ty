
export default function () {
    console.log(`offers.js loaded`);
    const restaurantId = document.querySelector('html').dataset.id;
    const devServer = 'http://localhost:4000';
    const prodServer = 'http://restaurantcollective.io';
    const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;
    const offersOpen = false;

    window.addEventListener('load', function () {
        console.log('Window loaded');
        getOffers(restaurantId);
    });

    function getOffers(restaurant_id) {
        console.log('Fetch any offers');
        fetch(`${api}/public/restaurantoffers`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                api_key: '',
                user_code: 'CF-418-Beta',
                restaurant_id: '2832',
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
        const btn = document.createElement('div');
        btn.className = 'rdl-btn-offers';

        fragment.appendChild(btn);
        document.body.appendChild(fragment);

        btn.addEventListener('animationend', () => {
            console.log('Transition ended');
            btn.innerText = `View Available Offers`;
        });

        btn.addEventListener('click', () => {
            console.log('Btn clicked');
            dspOffers(btn, offers)
            btn.classList.add('grow');
        });

        btn.classList.add('scale-in-center');

    }

    function dspOffers(btn, offers) {
        const listFragment = document.createDocumentFragment();
        const list = document.createElement('ul');
        list.className = 'offer-list closed';
        let listItem;
        offers.forEach(item => {
          console.log(item);
          listItem = document.createElement('li');
          listItem.innerText = item['offer_text'];
          list.appendChild(listItem);
        });
        listFragment.appendChild(list);
        btn.appendChild(listFragment);
    }

}
