import flatpickr from 'flatpickr';

export default function (){

  /**
   * Email booking requests
   */
  const htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang') || 'en';
  const bkgRequestWidget = document.getElementById('bkgRequestForm');
  let bkgParams = {};


  const modalContainer = document.getElementById('modal');
  const modelWindow = document.querySelector('.modal-window');
  const emailRequestForm = document.getElementById('emailRequest');
  const modalThankYou = document.querySelector('.booking-request-thanks');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnCancel = document.getElementById('btnCancel');

  const showModalContainer = () => {
    modalContainer.style.display = 'flex';
    modalContainer.style.opacity = '1';
    modelWindow.style.display = 'flex';
    modelWindow.classList.add('fade-in-fast');
  };
  const hideModal = () => {
    modalContainer.style.opacity = '0';
    modalContainer.style.display = 'none';
  };
  const openEmailRequest = () => {
    // Assign summary values
    document.getElementById('partySize').innerHTML = bkgParams.bkgSize;
    document.getElementById('timeSlot').innerHTML = bkgParams.bkgTime;
    document.getElementById('dayDate').innerHTML = bkgParams.bkgDate;
    showModalContainer();
  };
  const cancelEmailRequest = () => {
    hideModal();
  };

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

  // Add event listeners to widget controls
  // and update display fields
  if (!!emailRequestForm) {
    emailRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBkgRequest(e.target);
    });
  }


  /**
   * Send email request
   * @param form key value pairs
   */
  function sendBkgRequest(form) {

    btnCancel.style.display = 'none'
    btnSubmit.innerHTML = "Sending Request..."
    btnSubmit.disabled = true;

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

  const formReset = () => {
    btnCancel.style.display = 'block'
    btnSubmit.innerHTML = "Booking Request"
    btnSubmit.disabled = false;
  }

  /**
   * Initialise booking widget
   */
  // Check existence of DOM elements in case
  // this section is not being used
  if (!!document.getElementById('btnCancel')) {
    document.getElementById('btnCancel').addEventListener('click', cancelEmailRequest);
  }

  if (!!bkgRequestWidget) {
    bkgRequestWidget.addEventListener('submit', (e) => {
      e.preventDefault();

      bkgParams.bkgDate = bkgRequestWidget.elements['date'].value;
      bkgParams.bkgSize = bkgRequestWidget.elements['covers'].value;
      bkgParams.bkgTime = bkgRequestWidget.elements['time'].value;

      // In case we need to convert the format for some providers
      // bkgParams.bkgDateObj = new Date(bkgParams.bkgDate);

      // Booking providers are set in the CMS
      openEmailRequest();
    });
    bkgRequestWidget.elements['covers'].addEventListener('change', (e) => {
      const elem = e.target;
      document.getElementById('txtCovers').innerHTML = elem?.value;
      // console.log(elem?.value)
    })
    bkgRequestWidget.elements['time'].addEventListener('change', (e) => {
      const elem = e.target;
      document.getElementById('txtTime').innerHTML = elem?.value;
      // console.log(elem?.value)
    })
  }

  window.addEventListener('load', function () {

    console.log('Window loaded!');

    // Guard clause
    if(!bkgRequestWidget) {
      console.log('No booking widget found');
      return false;
    }

    // Date input field
    const bkgDate = document.getElementById('selectDate');
    const bkgDateInput = document.getElementById('bkgDateInput');

    bkgDateInput.value = new Date().toDateString();

    // Adv. bookings - 30 day default fall back
    const bkgAdvDays = Number(bkgRequestWidget.dataset.advbkgdays || 30);

    // Use 3rd party datepicker as Safari
    // doesn't support the Html5 default picker
    flatpickr(bkgDate, {
      dateFormat: 'D d M Y',
      defaultDate: 'today',
      minDate: 'today',
      maxDate: new Date().fp_incr(bkgAdvDays),
      monthSelectorType: 'static',
      locale: htmlLang,
      onChange: (selectedDates, dateStr, instance) => {
        bkgDateInput.value = dateStr;
      }
    });
  });
};


