import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import * as modal from './booking-modal';
import { app } from './app-config';

// Added for debug
// import uaDetection from './ua-detection';

/**
 * @param data
 */
export default function (data){

  console.log('Rooms dataset', data);

  // Abort if there's no widget
  if(!data.provider) {
    console.warn('No ROOMS provider specified!');
    return false;
  }

  const btnRoomsRequest = document.getElementById('btnRoomsRequest');
  btnRoomsRequest.addEventListener('click', () => {
    //console.log(modal.modalContainer);
    openRoomRequest();
  });


  // Reference booking widget container
  const roomsWidgetContainer = document.getElementById('roomsWidgetContainer');
  roomsWidgetContainer.classList.add('room-request-container');

  // Is this an iOS device?
  const iOS = /iPad|iPhone/.test(navigator.userAgent);

  // Set element references
  const htmlData = document.querySelector('html').dataset;
  const htmlLang = htmlData.lang;
  const domFragment = document.createDocumentFragment();

  const roomsBkgForm = document.createElement('form');
  roomsBkgForm.classList.add('form-room-request');
  roomsBkgForm.setAttribute('id', 'roomsRequestForm');
  roomsBkgForm.setAttribute('aria-label', 'Room booking request form');


  // Generate request summary
  const openRoomRequest = () => {

      if (!document.getElementById('roomRequest')) {

        const roomRequestForm = document.createElement('div');
        roomRequestForm.setAttribute('id', 'roomRequest');
        roomRequestForm.classList.add('form-email-request');
        roomRequestForm.innerHTML =
          `<form id="roomRequestForm">
            <input type="hidden" name="restaurant_name" value="${data.name}">
            <input type="hidden" name="restaurant_email" value="${data.email}">
            <input type="hidden" name="language" value="en">
            <input type="hidden" name="email_system" value="v2">
            <input type="hidden" name="sender" value="${data.sender}">
            
                <h1>Room Enquiry</h1>

                <h2>${data.instructions}:</h2>
                
                <!-- booking -->
                <div class="form-grid-3">
                  <div class="text-field">
                    <input type="number" name="totalGuests" id="totalGuests" value="2"><label for="totalGuests">No. People</label>
                  </div>
                  <div class="text-field">
                    <input type="text" name="arrivalDate" id="arrivalDateInput"><label for="arrivalDate">Arrival Date</label>
                  </div>
                  <div class="text-field">
                    <input type="number" name="totalNights" value="2"><label for="totalNights">No. Nights</label>
                  </div>
                </div>
               
                
                <!-- Name -->
                <div class="text-field">
                  <input id="full_name" type="text" name="full_name" placeholder=" " autofocus required tabindex="0">
                    <label for="full_name">${data.labelName}</label>
                </div>
                
                <!-- Email -->
                <div class="text-field">
                  <input id="phone" type="tel" name="phone" placeholder=" " required>
                    <label for="phone">${data.labelPhone}</label>
                </div>
                
                <!-- Email -->
                <div class="text-field">
                  <input id="email" type="email" name="email" placeholder=" " required>
                    <label for="email">${data.labelEmail}</label>
                </div>
                
                
                <p>This is not a confirmed reservation. You will be contacted by the venue to 
                discuss availability and to finalise your reservation.</p>                
                
                <!-- Actions -->
                <div class="modal-actions">
                  <button id="btnCancel" type="button" class="btn-cancel">${data.labelCancel}</button>
                  <button id="btnSubmit" type="submit" class="btn">${data.labelSend}...</button>
                </div>
                </form>`;

        modal.clearContent();

        modal.modalContent.appendChild(roomRequestForm);

        const arrivalDateInput = document.getElementById('arrivalDateInput');

        const rfp = flatpickr (arrivalDateInput, {
          dateFormat: 'D, M d Y',
          defaultDate: 'today',
          minDate: 'today',
          // Max date doesn't play nicely on iPhone/iPad
          // maxDate: iOS ? null : new Date().fp_incr(bkgAdvDays),
          monthSelectorType: 'static',
          disableMobile: "false",
          locale: htmlLang === 'fr' ? French : 'en',
          // onChange: (selectedDate, dateStr) => {
          //   arrivalDateInput.value = dateStr;
          // }
        });

        document.getElementById('btnCancel').addEventListener('click', () => {
          modal.close();
        });
        document.getElementById('roomRequestForm').addEventListener('submit', (e) => {
          e.preventDefault();
          console.log('Send Room Request');
          sendRoomRequest(e.target);
        });

      } else {
        // If the modal had already been created then just
        // update the summary values accordingly
        modal.open();
      }

      // Display the modal
      modal.open(data.provider);
      // Set input focus
      setTimeout(() => {
        document.getElementById('totalGuests').focus();
      },200);

    }
  //
  /**
   * Send email request
   * @param form
   */
  function sendRoomRequest(form) {

    // Output key value pairs for debug
    for(let i = 0; i < form.elements.length; i++) {
      console.log(form.elements[i].name + ' = ' + form.elements[i].value);
    }

    // Update button status
    const btnCancel = document.getElementById('btnCancel');
    const btnSubmit = document.getElementById('btnSubmit');

    btnCancel.style.display = 'none';
    btnSubmit.innerHTML = "Sending"
    btnSubmit.classList.add('sending');
    btnSubmit.disabled = true;

    dspMessage();

    // Send
    // fetch(`${ app.server }/public/sendroombookingemail`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     api_key: 'e21421ieb2l1eb2134g21ieg21be2i1n42432',
    //     user_code: 'CF-418-Beta',
    //     now_date: new Date().toUTCString(),
    //     restaurant_id: htmlData.id,
    //     restaurant_name: form.elements['restaurant_name'].value,
    //     restaurant_email: form.elements['restaurant_email'].value,
    //     room_booking_guests: form.elements['totalGuests'].value,
    //     room_booking_arrival_date: form.elements['arrivalDate'].value,
    //     room_booking_nights: form.elements['totalNights'].value,
    //     room_booking_name: form.elements['full_name'].value,
    //     room_booking_email: form.elements['email'].value,
    //     company_prefix: form.elements['sender'].value,
    //     email_system: form.elements['email_system'].value,
    //     template_version: htmlData.templateVersion,
    //     user_agent: uaDetection() || 'No detection'
    //   })
    // })
    //   .then(response => {
    //     // Guard clause
    //     if (!response.ok) {
    //       // get error message from body or default to response status
    //       const error = (response.message) || response.status;
    //       return Promise.reject(response);
    //     }
    //     // Analytics
    //     gtag('event', 'room_request_sent', {
    //       'provider': app.provider
    //     });
    //
    //     // Display success message
    //     dspMessage(form);
    //
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  function dspMessage() {

    modal.removeModal();

    // Create our message element
    const messageContainer = document.createElement('div');
    messageContainer.className = 'booking-request-thanks';

    // Message content
    messageContainer.innerHTML =
        `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABQtJREFUWAnNmU1oXFUUx++9E9KGpB9gkRh00cl006+NrR8rcS2oRRTRjWtxVQkuNJmXhIBQ2pW41o2gINWCC9OFuBKRbtpJEJpko8QgFVqbkDSducfzv2/OmzNv3qQv80adC9N77n33nvPL/Tzn1poe0/ytymTD+VeIzNPG0IQxln8GP6R1ruOfXbfW3Ch59+30mZXV+NP+/rX7aR6tTD5udvx7RPYCGTq9n77W2Jq1dNUcdJ9EldU/8/bNBXhp4+zo1l+b7/NoTRHRWF7lWe2stZs8qpdGHxu7PDV+cyurja57JODs8uQF7/2nDDeuOxaVGXLDOfdu9eTq1b10dQXkkbIMN+2JIkOmox2PxC5P8w/O2GuG3LIZ8uvGj/C64+S2J0zdTRjrT3pDL/P0vsj6hjtALPe0NmLIedZHHd+5osMwGl357fmRu/c2Pmew19Od8Jezslkz7L6ITqz8nf6eVY5uVw6bXf8WQ1azZoIhvjpydPydi0/9tJ3u3wGIkasulb/sgLP2Af89C4eOjV7Js3bShlDGWr5/Z+si7/APDdEB3QaQ0em1N9Mj2QEYLZVnvKfZts48aiU79OrMqds/6/pe5bmlE882qP5NejSds9Xo1Nqc1tsGiA3R8P5rveZ4/dy0B91LPJ2/645FZZ72J2nHf8fr+Gyii9dkybnX9MZJADH8m3fur+i/Kqy3A6Xz/YYToAD5oPFL2ubYsUMVWUZOGjfPudZRwmsO0/pvwcEudMOGCes7JgEsWIQrAOKG4A9TUhnndqFfa07rjZYrz0W1yY+kLrZhF6SMHCzh1mI5HsFwfbVuCEwtdqvu1A8Zm4O8/96Tn49qx5PNAFuwKTb4JBnDlYpyAMTdKh+R45yTNaDri8gYuQY1Ftn4YejxZKajW+UIMmyFsxWFZhImB69EX/zccBeHsDTsRy4jJ3CZOtlmsC2A7IyAzcFl0h1wffHizXVD6H7d5PjMa42ctOMrcjY6sxZJGTZhW8rIweZ4QbI/10rhbm0VC0npaRVlaThVf01k5GDjNQhnUyVc/CrN1MofRL+Wz6mqXGK3ae0GF5SmbIONAYMn3DIKr6SZwiIm+pge0vW5Wvm81D8qzzutHXqU7fibBWDipsd1TZcJcOwqVVHJftDRBtFiHsie4WBI3DXIcQqAUgj5SKmeXH/6AyDrZK5HS8ef0fVaLgTHitK22SZhBJMphbFtevgEcuwwrBfIrURHvLeLWZBF4WBDbIs9Hqk/sEnaAIMn3GyRF7IfcMEkvPC2ROvYJO2A7KbrNntBAqxvcDCasg02DgnMDQ2EGEKXIXeDxNWlry/pt+dRIo0y8rRtsDkE1botApwQQ+hKlrMgcXWlr69e4WATtrVZsDlE/PyhJh/Y4DACHCnrPAtSf+8VDjr8jn872G4qBBPYsIvZe+GIXyVuWIWHraoSsRtkETjYYoaZxAgLwhQA8RzBnsSmNOA7cDyOvqSmPU9DFoGDZtiCTbESWJgJ5eRQ7ojm2A0fsqUX9vKqxZ8DsCjfb45ToE6NH3UYqqO7BHDggyZ4tXgr4THlGyZOGHaEhoi+pK5feYjoEHaqqYVtMGhvPl6DTauIR/FWoiEQtxKHhpgKXV9Ehi7ohG6tp/lO07ZhkymWhryDB/vpA6B4PLp3d+Mznus3BFxyRF+8y/6/xyMBwUgO7PObQCIf2AdMDYkjaGCfgDXowD6ia0iR/6v/hvgH4k9DCSezZfMAAAAASUVORK5CYII=" alt="An email request has been sent">
         <span>${data.thanks}</span>`;
    modal.modalOverlay.appendChild(messageContainer);

    // Display message
    messageContainer.style.display = 'grid';
    messageContainer.classList.add('fade-in-fast');

    // Confirm to user
    setTimeout(() => {
      messageContainer.classList.remove('fade-in-fast');
      messageContainer.style.display = 'none';
      messageContainer.style.display = 'none';
      modal.modalContainer.style.display = "block";
      modal.close();
    }, 5000);
  }
};


