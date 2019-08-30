import {MONTHS} from './tripDate.js';
import {tripEventsMock} from '../main.js';
import {AbstractComponent} from './abstract-component.js';

const getCitiesFormat = () => {
  if (tripEventsMock.length <= 3) {
    return `${tripEventsMock[0].city} — ${tripEventsMock[1].city} — ${tripEventsMock[2].city}`;
  } else {
    return `${tripEventsMock[0].city} — ... — ${tripEventsMock[tripEventsMock.length - 1].city}`;
  }
};

class Route extends AbstractComponent {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return `<div class="trip-info__main 1">
        <h1 class="trip-info__title">${getCitiesFormat()}</h1>
        <p class="trip-info__dates">${MONTHS[new Date(this._date).getMonth()]} ${new Date(this._date).getDate()}&nbsp;&mdash;&nbsp;${new Date(this._date).getDate() + 1}</p>
      </div>`;
  }
}

export {Route};
