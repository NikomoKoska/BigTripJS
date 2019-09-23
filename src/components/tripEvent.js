import {AbstractComponent} from './abstract-component.js';

const getTimeDuration = (startTime, endTime) => {
  let startTimeMins = parseInt(startTime.hours, 10) * 60 + parseInt(startTime.mins, 10);
  let endTimeMins = parseInt(endTime.hours, 10) * 60 + parseInt(endTime.mins, 10);
  let diff = endTimeMins - startTimeMins;
  let diffTime = {
    commonTime: diff,
    hours: Math.floor(diff / 60),
    mins: diff % 60
  };
  return diffTime;
};

class TripEvent extends AbstractComponent {
  constructor({type, city, photo, description, isFavorite, date, timeStart, timeEnd, price, options}) {
    super();
    this._type = type;
    this._city = city;
    this._photo = photo;
    this._description = description;
    this._isFavorite = isFavorite;
    this._date = date;
    this._timeStart = timeStart;
    this._timeEnd = timeEnd;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.slice(0, this._type.length - 3)}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type[0].toUpperCase() + this._type.slice(1)} ${this._city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${this._timeStart.hours}:${this._timeStart.mins}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${this._timeEnd.hours}:${this._timeEnd.mins}</time>
          </p>
          <p class="event__duration">${getTimeDuration(this._timeStart, this._timeEnd).hours}H ${getTimeDuration(this._timeStart, this._timeEnd).mins}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._options.map((option) => (option.isApply) ? `<li class="event__offer">
            <span class="event__offer-title">${option.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
            </li>` : ``).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }
}

export {TripEvent};
