
import {createElement} from '../utils.js';


class TotalSum {
  constructor(totalSum) {
    this._totalSum = totalSum;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalSum}</span>
      </p>`;
  }
}

export {TotalSum};
