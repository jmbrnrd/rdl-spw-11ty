import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import * as modal from './booking-modal';

const api= process.env.NODE_ENV === 'production'
    ? `https://api.restaurantcollective.io`
    : `http://localhost:4000`;

console.log('API', api);

/**
 * @param config
 * @param config.provider
 * @param config.providerId
 * @param config.advanceDays
 * @param config.maxCovers
 * @param config.email
 * @param config.id
 * @param config.name
 * @param config.people
 * @param config.person
 * @param config.sender
 * @param config.email_system
 * @param config.summaryTitle
 * @param config.instructions
 * @param config.labelRequest
 * @param config.labelName
 * @param config.labelEmail
 * @param config.labelCancel
 * @param config.labelSend
 * @param config.warning
 * @param config.thanks
 * @returns {boolean}
 */
export default function (config){

  // Abort if there's no booking provider
  if(!config.provider) {
    console.warn('No booking provider specified!');
    return false;
  }

  // Reference booking widget container
  const bookingWidgetContainer = document.getElementById('bookingWidgetContainer');
  bookingWidgetContainer.classList.add('booking-request-container');

  // Is this an iOS device?
  const iOS = /iPad|iPhone/.test(navigator.userAgent);

  // Set element references
  const htmlData = document.querySelector('html').dataset;
  const htmlLang = htmlData.lang || 'en';
  const domFragment = document.createDocumentFragment();
  const bkgForm = document.createElement('form');
  bkgForm.classList.add('form-booking-request');
  bkgForm.setAttribute('id', 'bkgRequestForm');
  bkgForm.setAttribute('aria-label', 'Booking request form');

  bkgForm.innerHTML =
      `<div class="selector">
         <div class="selector-substitute">
           <div class="icon icon-covers"></div>
           <div class="selected-value" id="txtCovers">2 ${config.people}</div>
           <div class="icon icon-arrow-down"></div>
         </div>
         <select 
              id="selectCovers"
              name="covers" aria-label="Select party size"
              data-label-person="${config.person}"
              data-label-people="${config.people}">
         </select>
       </div>
       <div class="selector">
         <div class="selector-substitute">
           <div class="icon icon-time"></div>
           <div class="selected-value" id="txtTime">19:30</div>
           <div class="icon icon-arrow-down"></div>
         </div>
         <select name="time" id="selectTime" aria-label="Select time">
          <option value="09:00">09:00</option>
          <option value="09:30">09:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30" selected>19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
          <option value="22:30">22:30</option>
          <option value="23:00">23:00</option>
          <option value="23:30">23:30</option>
        </select>
      </div>
      <div class="selector">
        <div class="selector-substitute" id="selectDate">
          <div class="icon icon-date" data-toggle></div>
          <input  id="bkgDateInput"
                  data-input
                  readonly
                  aria-label="Select date"
                  type="text"
                  class="select-input hide-on-mobile"
                  name="date"
                  autocomplete="off"
                  data-adv-days="${config.advanceDays}">
          <div class="icon icon-arrow-down hide-on-mobile" data-toggle></div>
        </div>  
      </div>
      <button class="btn" aria-label="bookings.email.submit.aria">${config.labelRequest}</button>`;

  domFragment.append(bkgForm);
  bookingWidgetContainer.appendChild(domFragment);

  let bkgParams = {};

  // Generate request summary
  const openBookingRequestSummary = () => {

    // console.log(config);

      if (!document.getElementById('emailRequest')) {

        const emailRequestSummary = document.createElement('div');
        emailRequestSummary.setAttribute('id', 'emailRequest');
        emailRequestSummary.classList.add('form-email-request');
        emailRequestSummary.innerHTML =
          `<form id="emailRequestForm">
            <input type="hidden" name="restaurant_name" value="${config.name}">
            <input type="hidden" name="restaurant_email" value="${config.email}">
            <input type="hidden" name="language" value="en">
            <input type="hidden" name="email_system" value="v2">
            <input type="hidden" name="sender" value="${config.sender}">
                <!-- Summary -->
                <div class="booking-summary">
                  <h1>${config.summaryTitle}</h1>
                  <ul>
                    <li>
                      <span class="icon icon-covers"></span>
                      <span id="partySize">${bkgParams.bkgSize}</span>
                    </li>
                    <li>
                      <span class="icon icon-time"></span>
                      <span id="timeSlot">${bkgParams.bkgTime}</span>
                    </li>
                    <li>
                      <span class="icon icon-date"></span>
                      <span id="dayDate">${bkgParams.bkgDate}</span>
                    </li>
                  </ul>
                </div>
                <h2>${config.instructions}:</h2>
                <!-- Name -->
                <div class="text-field">
                  <input id="full_name" type="text" name="full_name" placeholder=" " autofocus required tabindex="0">
                    <label for="full_name">${config.labelName}</label>
                </div>
                <!-- Email -->
                <div class="text-field">
                  <input id="email" type="email" name="email" placeholder=" " required>
                    <label for="email">${config.labelEmail}</label>
                </div>
                <p>${config.warning} <strong>${config.sender}</strong>.</p>
                <!-- Actions -->
                <div class="modal-actions">
                  <button id="btnCancel" type="button" class="btn-cancel">${config.labelCancel}</button>
                  <button id="btnSubmit" type="submit" class="btn">${config.labelSend}</button>
                </div>
                </form>`;

        modal.clearContent();
        modal.modalContent.appendChild(emailRequestSummary);
        document.getElementById('btnCancel').addEventListener('click', () => {
          modal.close();
        });
        document.getElementById('emailRequestForm').addEventListener('submit', (e) => {
          e.preventDefault();
          submitBookingRequest(e.target);
        });

      } else {

        // If the modal had already been created then just
        // update the summary values accordingly
        document.getElementById('partySize').innerHTML = bkgParams.bkgSize;
        document.getElementById('timeSlot').innerHTML = bkgParams.bkgTime;
        document.getElementById('dayDate').innerHTML = bkgParams.bkgDate;
      }

      // Display the modal
      modal.open(config.provider);
      // Set input focus
      setTimeout(() => {
        document.getElementById('full_name').focus();
      },200);

    };

  function submitBookingRequest(form) {

    console.log(form);

    const btnCancel = document.getElementById('btnCancel');
    const btnSubmit = document.getElementById('btnSubmit');

    // While sending
    btnCancel.style.display = 'none';
    btnSubmit.innerHTML = "Sending"
    btnSubmit.classList.add('sending');
    btnSubmit.disabled = true;

    // Send
    fetch(`${api}/public/sendbookingemail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
        user_code: 'CF-418-Beta',
        now_date: new Date().toUTCString(),
        restaurant_id: htmlData.id,
        restaurant_name: form.elements['restaurant_name'].value,
        restaurant_email: form.elements['restaurant_email'].value,
        booking_covers: bkgParams.bkgSize,
        booking_time: bkgParams.bkgTime,
        booking_date: bkgParams.bkgDate,
        booking_name: form.elements['full_name'].value,
        booking_email: form.elements['email'].value,
        company_prefix: form.elements['sender'].value,
        email_system: form.elements['email_system'].value,
        template_version: htmlData.templateVersion
      })
    })
      .then(response => {
        // Guard clause
        if (!response.ok) {
          throw Error(`${response.status}: ${response.statusText}`);
        }
        // Analytics
        gtag('event', 'booking_request_sent', {
          'provider': config.provider,
          'covers': Number(document.getElementById('selectCovers').value)
        });
        // Display success message
        displayThankYouMessage();

      })
      .catch(error => console.error(error)
      );
  }

  function displayThankYouMessage() {

    // Hide the summary modal
    modal.modalContainer.style.display = "none";

    // Create our message element
    const messageContainer = document.createElement('div');
    messageContainer.className = 'booking-request-thanks';

    // Message content
    messageContainer.innerHTML =
        `<span>${config.thanks}</span>
        <span id="btnAcknowledged" class="modal-ok-close"></span>`;
    modal.modalOverlay.appendChild(messageContainer);

    // Display message
    messageContainer.style.display = 'grid';
    messageContainer.style.position = 'relative';
    messageContainer.style.textAlign = 'center';
    messageContainer.classList.add('fade-in-fast');

    // Create dismiss option
    document.getElementById('btnAcknowledged').addEventListener('click', () => {
      messageContainer.classList.remove('fade-in-fast');
      messageContainer.style.display = 'none';
      messageContainer.style.display = 'none';
      modal.modalContainer.style.display = "block";
      resetBookingRequestForm();
    });

    // dismiss if user hasn't
    setTimeout(() => {
      messageContainer.classList.remove('fade-in-fast');
      messageContainer.style.display = 'none';
      messageContainer.style.display = 'none';
      modal.modalContainer.style.display = "block";
      resetBookingRequestForm();
    }, 15000);

  }

  function resetBookingRequestForm() {
    // show cancel option
    document.getElementById('btnCancel').style.display = 'block';
    // reset submit button
    const btnSubmit = document.getElementById('btnSubmit')
    btnSubmit.innerHTML = "Booking Request"
    btnSubmit.disabled = false;

    modal.close();
  }

  async function initDatePicker(advance_days) {

    // list of unavailable dates
    let blockedDates = [];

    // wait until we've fetched any blacked dates
    await fetch(`${api}/public/blocked`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
        user_code: 'CF-418-apptiser',
        restaurant_id: htmlData.id,
        advance_days,
        include_closed: 'true'
      })
    })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
    })
        .then((data) => {
          const { blocked_dates } = data;
          console.log(blocked_dates);
          blockedDates = blocked_dates.map((item) => new Date(item.date));
    })
        .catch((e) => console.error('RDL', e))

    return blockedDates;
  }

  // Update DOM after window load
  window.addEventListener('load', function () {

    console.log('Window loaded!');

    const selectCovers = document.getElementById('selectCovers');
    const selectTime = document.getElementById('selectTime');

    // Date input field
    const selectDate = document.getElementById('selectDate');
    const dateInput = document.getElementById('bkgDateInput');

    // Set booking request values
    const bkgAdvDays = Number(config.advanceDays || 30);
    const bkgMaxCovers = Number(config.maxCovers || 10);

    // Create cover select options
    const person = selectCovers.dataset.labelPerson || 'person';
    const people = selectCovers.dataset.labelPeople || 'people';

    // Create booking request summary
    bkgForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Update the latest params
      bkgParams.bkgDate = document.getElementById('bkgDateInput').value;
      bkgParams.bkgSize = document.getElementById('selectCovers').value;
      bkgParams.bkgTime = document.getElementById('selectTime').value;

      // Display request summary
      openBookingRequestSummary();

    });

    // Update the mock cover & time select fields
    selectCovers.addEventListener('change', (e) => {
      const covers = e.target;
      document.getElementById('txtCovers').innerHTML = covers?.value;
    });
    selectTime.addEventListener('change', (e) => {
      const time = e.target;
      document.getElementById('txtTime').innerHTML = time?.value;
    });

    // build DOM elements
    const options = document.createDocumentFragment();
    // Cover select
    for (let i = 1; i <= bkgMaxCovers; i++) {
      let opt = document.createElement('option');
      opt.innerHTML = `${i} ${people}`;
      opt.value = `${i}`;
      if (i === 1) { opt.innerHTML = `${i} ${person}`; }
      if (i === 2) { opt.selected = true; }
      options.appendChild(opt);
    }
    selectCovers.appendChild(options);

    // load disabled dates & init calendar picker
    initDatePicker(bkgAdvDays || 60)
        .then((blockedDatesArray) => {
          const fp = flatpickr (selectDate, {
            dateFormat: 'D, d M Y',
            defaultDate: 'today',
            disable: blockedDatesArray,
            minDate: 'today',
            // Max date doesn't play nicely on iPhone/iPad
            maxDate: iOS ? null : new Date().fp_incr(bkgAdvDays),
            monthSelectorType: 'static',
            disableMobile: "false",
            locale: htmlLang === 'fr' ? French : 'en',
            wrap: true,
            clickOpens: false,
            onChange: (selectedDate, dateStr) => {
              dateInput.value = dateStr;
            }
          });
          // open flatpickr manually so that we can trigger it from
          // anywhere in the containing element - i.e. including the icons
          selectDate.addEventListener('click', () => {
            fp.open();
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

  });

};


