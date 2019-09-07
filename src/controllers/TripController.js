import {PointController} from './tripEventController.js';
import {Sort} from '../components/sort.js';
import {render, unrender, Positions} from '../utils.js';

class TripController {
  constructor(container, tripEvents) {
    this._container = container;
    this._tripEvents = tripEvents;
    this._sort = new Sort();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(document.querySelector(`.trip-events`), this._sort.getElement(), Positions.AFTERBEGIN);
    this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));

    this._sort.getElement().addEventListener(`click`, (evt) => {
      this._onSortClick(evt);
    });
  }

  _renderBoard() {
    unrender(this._container);
    this._container.innerHTML = ``;
    render(document.querySelector(`.trip-days__item`), this._container, Positions.BEFOREEND);
    this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));
  }

  _renderTripEvent(tripEventsMockParam) {
    const tripEventController = new PointController(this._container, tripEventsMockParam, this._onDataChange, this._onChangeView);
    this._subscriptions.push(tripEventController.setDefaultView.bind(tripEventController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tripEvents[this._tripEvents.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tripEvents);
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
