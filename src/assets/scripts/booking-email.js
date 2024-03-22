import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';

export default function (){

  // Abort if there's no widget
  if(!document.getElementById('bkgRequestForm')) {
    console.log('No booking widget found');
    return false;
  }

  // Is this an iOS device?
  const iOS = /iPad|iPhone/.test(navigator.userAgent);

  if (/iPad|iPhone/.test(navigator.userAgent)) {
    console.log("This is an iOS device.");
  } else {
    console.log("This is not an iOS device!");
  }

  // Element references
  const body = document.querySelector('body');
  const htmlLang = document.querySelector('html').getAttribute('lang') || 'en';
  const bkgRequestWidget = document.getElementById('bkgRequestForm');
  let bkgParams = {};

  const modalContainer = document.getElementById('modal');
  const modelWindow = document.querySelector('.modal-window');
  const emailRequestForm = document.getElementById('emailRequestForm');
  const modalThankYou = document.querySelector('.booking-request-thanks');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnCancel = document.getElementById('btnCancel');

  // Display widget
  const showModalContainer = () => {
    modalContainer.style.display = 'flex';
    modalContainer.style.opacity = '1';
    modelWindow.style.display = 'flex';
    modelWindow.classList.add('fade-in-fast');
    body.classList.add('stopScroll');
  };

  // Hide widget
  const hideModal = () => {
    modalContainer.style.opacity = '0';
    modalContainer.style.display = 'none';
    body.classList.remove('stopScroll');
  };

  // Generate request summary
  const openEmailRequest = () => {

    // Assign values
    document.getElementById('partySize').innerHTML = bkgParams.bkgSize;
    document.getElementById('timeSlot').innerHTML = bkgParams.bkgTime;
    document.getElementById('dayDate').innerHTML = bkgParams.bkgDate;

    showModalContainer();

    setTimeout(() => {
      document.getElementById('full_name').focus();
    },200);

  };
  const cancelEmailRequest = () => { hideModal(); };

  // Show user email request summary
  const dspModalMessage = () => {
    modelWindow.style.display = 'none';
    modalThankYou.style.display = 'flex';
    modalThankYou.classList.add('fade-in-fast');
    // Confirm to user
    setTimeout(() => {
      modalThankYou.classList.remove('fade-in-fast');
      modalContainer.style.display = 'none';
      modalThankYou.style.display = 'none';
      emailRequestForm.style.display = 'block';
      formReset();
    }, 2000);
  };

  // Add event listeners to widget
  emailRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBkgRequest(e.target);
  });

  /**
   * Send email request
   * @param form key value pairs
   */
  function sendBkgRequest(form) {

    // While sending
    btnCancel.style.display = 'none'
    btnSubmit.innerHTML = "Sending Request..."
    btnSubmit.disabled = true;

    // Send
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
        // Guard clause
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (response.message) || response.status;
          return Promise.reject(error);
        }
        // Display success message
        dspModalMessage();
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }

  // After form sent
  const formReset = () => {
    btnCancel.style.display = 'block'
    btnSubmit.innerHTML = "Booking Request"
    btnSubmit.disabled = false;
    hideModal();
  }

  // Initialise booking widget
  // Cancel option
  document.getElementById('btnCancel').addEventListener('click', cancelEmailRequest);

  // Generate request summary
  bkgRequestWidget.addEventListener('submit', (e) => {

      e.preventDefault();

      bkgParams.bkgDate = bkgRequestWidget.elements['date'].value;
      bkgParams.bkgSize = bkgRequestWidget.elements['covers'].value;
      bkgParams.bkgTime = bkgRequestWidget.elements['time'].value;

      openEmailRequest();
  });

  // Update the mock cover & time select fields
  bkgRequestWidget.elements['covers'].addEventListener('change', (e) => {
    const covers = e.target;
    document.getElementById('txtCovers').innerHTML = covers?.value;
  });
  bkgRequestWidget.elements['time'].addEventListener('change', (e) => {
    const time = e.target;
    document.getElementById('txtTime').innerHTML = time?.value;
  });


  // Update DOM after window load
  window.addEventListener('load', function () {

    console.log('Window loaded!');

    // Date input field
    const bkgDate = document.getElementById('selectDate');
    const bkgDateInput = document.getElementById('bkgDateInput');
    bkgDateInput.value = new Date().toLocaleDateString(htmlLang, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});

    // Set booking request values
    const bkgAdvDays = Number(bkgRequestWidget.dataset.daysinadvance || 30);
    const bkgMaxCovers = Number(bkgRequestWidget.dataset.maxcovers || 10);

    // Create cover select options
    const coversSelect = document.getElementById('selectCovers');
    const person = coversSelect.dataset.labelPerson || 'person';
    const people = coversSelect.dataset.labelPeople || 'people';
    const options = document.createDocumentFragment();

    for (let i = 1; i <= bkgMaxCovers; i++) {
      let opt = document.createElement('option');
      opt.innerHTML = `${i} ${people}`;
      if (i === 1) { opt.innerHTML = `${i} ${person}`; }
      if (i === 2) { opt.selected = true; }
      options.appendChild(opt);
    }
    coversSelect.appendChild(options);


    // Use 3rd party datepicker as Safari
    // doesn't support the Html5 default picker
    flatpickr(bkgDate, {
      dateFormat: 'D d M Y',
      defaultDate: 'today',
      minDate: 'today',
      maxDate: null, //new Date().fp_incr(bkgAdvDays),
      monthSelectorType: 'static',
      disableMobile: "false",
      locale: htmlLang === 'fr' ? French : 'en',
      onChange: (selectedDates, dateStr) => {
        bkgDateInput.value = dateStr;
      }
    });
    // Hide if flatpickr activates the mobile UI
    // which uses a native date picker
    if(!!document.querySelector('.flatpickr-mobile')) {
      const elems = document.querySelectorAll('.hide-on-mobile');
      elems.forEach( el => {
        el.style.opacity = '0';
      })
    }
  });
};


