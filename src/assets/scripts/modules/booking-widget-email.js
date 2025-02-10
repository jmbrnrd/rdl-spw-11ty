import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import * as modal from './booking-modal';

// Added for debug
import uaDetection from './ua-detection';



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






  // Abort if there's no widget
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
  const openEmailRequest = () => {

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
          sendBkgRequest(e.target);
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

  /**
   * Send email request
   * @param form
   */
  function sendBkgRequest(form) {

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
        template_version: htmlData.templateVersion,
        user_agent: uaDetection() || 'No detection'
      })
    })
      .then(response => {
        // Guard clause
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (response.message) || response.status;
          return Promise.reject(response);
        }
        // Analytics
        gtag('event', 'booking_request_sent', {
          'provider': config.provider,
          'covers': Number(document.getElementById('selectCovers').value)
        });

        // Display success message
        dspThankYouMessage();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function dspThankYouMessage() {

    // Hide the summary modal
    modal.modalContainer.style.display = "none";

    // Create our message element
    const messageContainer = document.createElement('div');
    messageContainer.className = 'booking-request-thanks';



    // Message content
    messageContainer.innerHTML =
        `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABQtJREFUWAnNmU1oXFUUx++9E9KGpB9gkRh00cl006+NrR8rcS2oRRTRjWtxVQkuNJmXhIBQ2pW41o2gINWCC9OFuBKRbtpJEJpko8QgFVqbkDSducfzv2/OmzNv3qQv80adC9N77n33nvPL/Tzn1poe0/ytymTD+VeIzNPG0IQxln8GP6R1ruOfXbfW3Ch59+30mZXV+NP+/rX7aR6tTD5udvx7RPYCGTq9n77W2Jq1dNUcdJ9EldU/8/bNBXhp4+zo1l+b7/NoTRHRWF7lWe2stZs8qpdGHxu7PDV+cyurja57JODs8uQF7/2nDDeuOxaVGXLDOfdu9eTq1b10dQXkkbIMN+2JIkOmox2PxC5P8w/O2GuG3LIZ8uvGj/C64+S2J0zdTRjrT3pDL/P0vsj6hjtALPe0NmLIedZHHd+5osMwGl357fmRu/c2Pmew19Od8Jezslkz7L6ITqz8nf6eVY5uVw6bXf8WQ1azZoIhvjpydPydi0/9tJ3u3wGIkasulb/sgLP2Af89C4eOjV7Js3bShlDGWr5/Z+si7/APDdEB3QaQ0em1N9Mj2QEYLZVnvKfZts48aiU79OrMqds/6/pe5bmlE882qP5NejSds9Xo1Nqc1tsGiA3R8P5rveZ4/dy0B91LPJ2/645FZZ72J2nHf8fr+Gyii9dkybnX9MZJADH8m3fur+i/Kqy3A6Xz/YYToAD5oPFL2ubYsUMVWUZOGjfPudZRwmsO0/pvwcEudMOGCes7JgEsWIQrAOKG4A9TUhnndqFfa07rjZYrz0W1yY+kLrZhF6SMHCzh1mI5HsFwfbVuCEwtdqvu1A8Zm4O8/96Tn49qx5PNAFuwKTb4JBnDlYpyAMTdKh+R45yTNaDri8gYuQY1Ftn4YejxZKajW+UIMmyFsxWFZhImB69EX/zccBeHsDTsRy4jJ3CZOtlmsC2A7IyAzcFl0h1wffHizXVD6H7d5PjMa42ctOMrcjY6sxZJGTZhW8rIweZ4QbI/10rhbm0VC0npaRVlaThVf01k5GDjNQhnUyVc/CrN1MofRL+Wz6mqXGK3ae0GF5SmbIONAYMn3DIKr6SZwiIm+pge0vW5Wvm81D8qzzutHXqU7fibBWDipsd1TZcJcOwqVVHJftDRBtFiHsie4WBI3DXIcQqAUgj5SKmeXH/6AyDrZK5HS8ef0fVaLgTHitK22SZhBJMphbFtevgEcuwwrBfIrURHvLeLWZBF4WBDbIs9Hqk/sEnaAIMn3GyRF7IfcMEkvPC2ROvYJO2A7KbrNntBAqxvcDCasg02DgnMDQ2EGEKXIXeDxNWlry/pt+dRIo0y8rRtsDkE1botApwQQ+hKlrMgcXWlr69e4WATtrVZsDlE/PyhJh/Y4DACHCnrPAtSf+8VDjr8jn872G4qBBPYsIvZe+GIXyVuWIWHraoSsRtkETjYYoaZxAgLwhQA8RzBnsSmNOA7cDyOvqSmPU9DFoGDZtiCTbESWJgJ5eRQ7ojm2A0fsqUX9vKqxZ8DsCjfb45ToE6NH3UYqqO7BHDggyZ4tXgr4THlGyZOGHaEhoi+pK5feYjoEHaqqYVtMGhvPl6DTauIR/FWoiEQtxKHhpgKXV9Ehi7ohG6tp/lO07ZhkymWhryDB/vpA6B4PLp3d+Mznus3BFxyRF+8y/6/xyMBwUgO7PObQCIf2AdMDYkjaGCfgDXowD6ia0iR/6v/hvgH4k9DCSezZfMAAAAASUVORK5CYII=" alt="An email request has been sent">
        <span>${config.thanks}</span>`;
    modal.modalOverlay.appendChild(messageContainer);

    // Display message
    messageContainer.style.display = 'grid';
    messageContainer.style.textAlign = 'center';
    messageContainer.classList.add('fade-in-fast');

    // Confirm to user
    setTimeout(() => {
      messageContainer.classList.remove('fade-in-fast');
      messageContainer.style.display = 'none';
      messageContainer.style.display = 'none';
      modal.modalContainer.style.display = "block";
      formReset();
    }, 10000);


  }

  function formReset() {
    document.getElementById('btnCancel').style.display = 'block'
    const btnSubmit = document.getElementById('btnSubmit')
    btnSubmit.innerHTML = "Booking Request"
    btnSubmit.disabled = false;
    modal.close();
  }

  function loadBlockedDates() {
    let blockedDates = [];
    // fetch(`${api}/public/getblockeddates`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
    //     user_code: 'CF-418-Beta',
    //     restaurant_id: htmlData.id,
    //     company_prefix: form.elements['sender'].value
    //   })
    // })
    //     .then(response => {
    //       // Guard clause
    //       if (!response.ok) {
    //         // get error message from body or default to response status
    //         const error = (response.message) || response.status;
    //         return Promise.reject(response);
    //       }
    //       blockedDates = response;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    return blockedDates;
  }

  // Update DOM after window load
  window.addEventListener('load', function () {

    console.log('Window loaded!');

    const selectCovers = document.getElementById('selectCovers');
    const selectTime = document.getElementById('selectTime');


    // Generate request summary
    bkgForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Update the latest params
      bkgParams.bkgDate = document.getElementById('bkgDateInput').value;
      bkgParams.bkgSize = document.getElementById('selectCovers').value;
      bkgParams.bkgTime = document.getElementById('selectTime').value;

      // Display request summary
      openEmailRequest();

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

    // Date input field
    const selectDate = document.getElementById('selectDate');
    const dateInput = document.getElementById('bkgDateInput');

    // Set booking request values
    const bkgAdvDays = Number(config.advanceDays || 30);
    const bkgMaxCovers = Number(config.maxCovers || 10);

    // Create cover select options
    const person = selectCovers.dataset.labelPerson || 'person';
    const people = selectCovers.dataset.labelPeople || 'people';

    const options = document.createDocumentFragment();

    for (let i = 1; i <= bkgMaxCovers; i++) {
      let opt = document.createElement('option');
      opt.innerHTML = `${i} ${people}`;
      opt.value = `${i}`;
      if (i === 1) { opt.innerHTML = `${i} ${person}`; }
      if (i === 2) { opt.selected = true; }
      options.appendChild(opt);
    }
    selectCovers.appendChild(options);

    // init calendar picker
    // doesn't support the Html5 default picker

    const fp = flatpickr (selectDate, {
      dateFormat: 'D, d M Y',
      defaultDate: 'today',
      disable: loadBlockedDates(),
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
    })

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


