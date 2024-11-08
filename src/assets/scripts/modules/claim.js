/**
 * Request modal to allow users to 'claim' their
 * listing/content
 */
export default function () {

  // Guard clause
  if(!document.querySelector('[data-claim-widget]')) {
    // console.log('No claim widget required');
    return false;
  }

  console.log('claim.js loaded');
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.claim-form');
  const modalMessage = document.querySelector('.booking-request-thanks');
  const devServer = 'http://localhost:4000';
  const prodServer = 'https://restaurantcollective.io';
  const api = ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ? devServer : prodServer;

  // open
  const showModalContainer = () => {
    modalContainer.style.display = 'flex';
    modalContainer.style.opacity = '1';
    modal.style.display = 'flex';
    modal.classList.add('fade-in-fast');
  };

  // close
  const hideModal = () => {
    modalContainer.style.opacity = '0';
    modalContainer.style.display = 'none';
  };
  // message
  const dpsModalMessage = () => {
    modalMessage.style.display = 'flex';
    modalMessage.classList.add('fade-in-fast');
    setTimeout(() => {
      modalMessage.classList.remove('fade-in-fast');
      modalContainer.style.display = 'none';
      modalMessage.style.display = 'none';
    }, 3000);
  };

  // Send request
  function sendContactRequest(form) {
    console.log(form);
    fetch(`${api}/public/sendcontactemail`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        api_key: 'derf',
        user_code: 'WF-032-Beta',
        restaurant_id: form.elements['id'].value,
        contact_name: form.elements['name'].value,
        contact_email: form.elements['email'].value,
        company_prefix: 'app',
        email_system: 'v2',
        check_only: false,
        production: false
      })
    })
        // check for valid response
        .then(response => {
          return response.json()
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    // confirm
    dpsModalMessage();

  }

  // Add listeners
  document.querySelector('.btn-claim').addEventListener('click', showModalContainer);
  document.querySelector('.btn-cancel').addEventListener('click', hideModal);
  document.getElementById('contactRequest').addEventListener('submit', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
    sendContactRequest(e.target);
  });

}

