import {months} from './tripEvent.js';
import {tripEventsMock} from '../main.js';
import {createElement} from '../utils.js';

const getCitiesFormat = () => {
  if (tripEventsMock.length <= 3) {
    return `${tripEventsMock[0].city} — ${tripEventsMock[1].city} — ${tripEventsMock[2].city}`;
  } else {
    return `${tripEventsMock[0].city} — ... — ${tripEventsMock[tripEventsMock.length - 1].city}`;
  }
};

class Route {
  constructor(date, totalSum) {
    this._date = date;
    this._totalSum = totalSum;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div><div class="trip-info__main">
        <h1 class="trip-info__title">${getCitiesFormat()}</h1>
        <p class="trip-info__dates">${months[new Date(this._date).getMonth()]} ${new Date(this._date).getDate()}&nbsp;&mdash;&nbsp;${new Date(this._date).getDate() + 3}</p>
      </div><p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalSum}</span>
      </p></div>`;
  }
}

export {Route};
