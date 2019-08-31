import {AbstractComponent} from './abstract-component.js';
const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

class TripDate extends AbstractComponent {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${new Date(this._date).getDate()} ${MONTHS[new Date(this._date).getMonth()]}</time>
    </div>`;
  }
}

export {TripDate, MONTHS};
