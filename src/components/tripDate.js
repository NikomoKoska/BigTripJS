import {createElement} from '../utils.js';
const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

class TripDate {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${new Date(this._date).getDate()} ${MONTHS[new Date(this._date).getMonth()]}</time>
    </div>`;
  }
}

export {TripDate, MONTHS};
