import {TripEvent} from '../components/tripEvent.js';
import {TripEventEdit} from '../components/tripEventEdit.js';
import {Sort} from '../components/sort.js';
import {render, Positions} from '../utils.js';

class TripController {
  constructor(container, tripEvents) {
    this._container = container;
    this._tripEvents = tripEvents;
    this._sort = new Sort();
  }

  init() {
    render(document.querySelector(`.trip-events`), this._sort.getElement(), Positions.AFTERBEGIN);
    this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));

    this._sort.getElement().addEventListener(`click`, (evt) => {
      this._onSortClick(evt);
    });

  }

  _renderTripEvent(tripEventsMockParam) {
    const tripEvent = new TripEvent(tripEventsMockParam);
    const tripEventEdit = new TripEventEdit(tripEventsMockParam);

    const tripEventElement = tripEvent.getElement();
    const tripEventEditElement = tripEventEdit.getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(tripEventElement, tripEventEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripEventElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._container.replaceChild(tripEventEditElement, tripEventElement);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelector(`.event__input--destination`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelectorAll(`.event__input--time`).forEach((it) => it.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    }));

    tripEventEditElement.querySelector(`.event__input--price`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelector(`.event__input--destination`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelectorAll(`.event__input--time`).forEach((it) => it.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    }));

    tripEventEditElement.querySelector(`.event__input--price`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._container.replaceChild(tripEventElement, tripEventEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditElement.querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(tripEventEditElement.querySelector(`.event--edit`));

      const entry = {
        type: formData.get(`event-type`),
        city: formData.get(`event-destination`),
        timeStart: formData.get(`event-start-time`),
        timeEnd: formData.get(`event-end-time`),
        price: formData.get(`event-price`),
      };
      console.log(entry);

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container, tripEventElement, Positions.BEFOREEND);
  }

  _onSortClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._container.innerHTML = ``;

    const allSorts = document.querySelectorAll(`.trip-sort__input`);
    allSorts.forEach((sortInput) => sortInput.removeAttribute(`checked`));

    switch (evt.target.dataset.sortType) {
      case `time`:
        const sortedByTimeTripEvents = this._tripEvents.slice().sort((a, b) => {
          let aDuration = (a.timeEnd.hours * 60 + a.timeEnd.mins) - (a.timeStart.hours * 60 + a.timeStart.mins);
          let bDuration = (b.timeEnd.hours * 60 + b.timeEnd.mins) - (b.timeStart.hours * 60 + b.timeStart.mins);
          return bDuration - aDuration;
        });
        sortedByTimeTripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));
        document.querySelector(`#sort-time`).setAttribute(`checked`, `checked`);
        break;
      case `price`:
        const sortedByPriceTripEvents = this._tripEvents.slice().sort((a, b) => b.price - a.price);
        sortedByPriceTripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));
        document.querySelector(`#sort-price`).setAttribute(`checked`, `checked`);
        break;
      case `event`:
        this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));
        document.querySelector(`#sort-event`).setAttribute(`checked`, `checked`);
        break;
    }
  }
}

export {TripController};
