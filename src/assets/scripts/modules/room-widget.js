import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import * as modal from './booking-modal';

const api= process.env.NODE_ENV === 'production'
    ? `https://api.restaurantcollective.io`
    : `http://localhost:4000`;

export default function () {

}
