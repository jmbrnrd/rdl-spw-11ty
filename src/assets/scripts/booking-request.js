import flatpickr from 'flatpickr';

export default function (){

  console.log('Booking request is loaded');

  /**
   * Email booking requests
   */
  const htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
  const bkgRequestForm = document.getElementById('bkgRequestForm');
  let bkgParams = {};


  const modalContainer = document.getElementById('modal');
  const modal = document.querySelector('.booking-request-form');
  const emailRequestForm = document.getElementById('form-email-request');
  const modalThankYou = document.querySelector('.booking-request-thanks');

  console.log(bkgRequestForm);
  console.log(bkgRequestForm.value);

  const showModalContainer = () => {
    modalContainer.style.display = 'flex';
    modalContainer.style.opacity = '1';
  };

  const hideModal = () => {
    modalContainer.style.opacity = '0';
    modalContainer.style.display = 'none';
  };

  const openEmailRequest = () => {

    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Reference the input elements
    const partySize = document.getElementById('partySize');
    const timeSlot = document.getElementById('timeSlot');
    const dayDate = document.getElementById('dayDate');

    // summary strings
    partySize.innerHTML = bkgParams.bkgSize;
    timeSlot.innerHTML = bkgParams.bkgTime;
    dayDate.innerHTML = bkgParams.bkgDate;
    showModalContainer();
    modal.style.display = 'flex';
    modal.classList.add('fade-in-fast');
  };

  const cancelEmailRequest = () => {
    //console.log('Cancel email request');
    hideModal();
  };

  // Show user email request summary
  const dspModalMessage = () => {
    modal.style.display = 'none';
    modalThankYou.style.display = 'flex';
    modalThankYou.classList.add('fade-in-fast');
    // confirm sent
    setTimeout(() => {
      modalThankYou.classList.remove('fade-in-fast');
      modalContainer.style.display = 'none';
      modalThankYou.style.display = 'none';
      emailRequestForm.style.display = 'block';
    }, 2000);
  };

  // Send email request if it exists
  if (!!emailRequestForm) {
    emailRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      emailRequestForm.style.display = 'none';
      sendBkgRequest(e.target);
    });
    bkgRequestForm.elements['covers'].addEventListener('change', (e) => {
      const elem = e.target;
      document.getElementById('txtCovers').innerHTML = elem?.value;
      // console.log(elem?.value)
    })
    bkgRequestForm.elements['time'].addEventListener('change', (e) => {
      const elem = e.target;
      document.getElementById('txtTime').innerHTML = elem?.value;
      // console.log(elem?.value)
    })
  }


  /**
   * Send email request
   * @param form key value pairs
   */
  function sendBkgRequest(form) {
    fetch('https://api.restaurantcollective.io/public/sendbookingemail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
        user_code: 'CF-418-Beta',
        restaurant_name: form.elements['restaurant_name'].value,
        restaurant_email: form.elements['restaurant_email'].value,
        booking_covers: bkgParams.bkgSize,
        booking_time: bkgParams.bkgTime,
        booking_date: bkgParams.bkgDate,
        booking_name: form.elements['full_name'].value,
        booking_email: form.elements['email'].value,
        company_prefix:form.elements['sender'].value,
      })
    })
      .then(response => {
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (response.message) || response.status;
          return Promise.reject(error);
        }
        // display success
        dspModalMessage();
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }

  /**
   * Initialise booking widget
   */
  // Check existence of DOM elements in case
  // this section is not being used
  if (!!document.getElementById('btnCancel')) {
    document.getElementById('btnCancel').addEventListener('click', cancelEmailRequest);
  }

  if (!!bkgRequestForm) {
    bkgRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      bkgParams.bkgDate = bkgRequestForm.elements['date'].value;
      bkgParams.bkgSize = bkgRequestForm.elements['covers'].value;
      bkgParams.bkgTime = bkgRequestForm.elements['time'].value;

      // In case we need to convert the format for some providers
      // bkgParams.bkgDateObj = new Date(bkgParams.bkgDate);

      // Booking providers are set in the CMS
      openEmailRequest();
    });
  }

  window.addEventListener('load', function () {

    console.log('Window loaded!');

    // Guard clause
    if(!document.getElementById('selectDate')) {
      console.log('No booking widget found');
      return false;
    }

    // Date input field
    const bkgDate = document.getElementById('selectDate');
    const bkgDateInput = document.getElementById('bkgDateInput');
    const dateNow = new Date().toLocaleDateString();
    bkgDateInput.value = new Date().toDateString();

    // Adv. bookings - 30 day default fall back
    const bkgAdvDays = Number(bkgDate.getAttribute('data-adv-days') || 30);

    // Use 3rd party datepicker as Safari
    // doesn't support the Html5 default picker

    const fp = flatpickr(bkgDate, {
      dateFormat: 'D d M Y',
      defaultDate: 'today',
      minDate: 'today',
      maxDate: new Date().fp_incr(bkgAdvDays),
      //altInput: true,
      monthSelectorType: 'static',
      locale: htmlLang,
      onChange: (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        bkgDateInput.value = dateStr;
      }
    });
  });
};


