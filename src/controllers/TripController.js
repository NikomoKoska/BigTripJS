import {PointController} from './tripEventController.js';
import {Sort} from '../components/sort.js';
import {Types} from '../consts.js';
import {render, unrender, Positions} from '../utils.js';
import {NewEvent} from '../components/newEvent.js';

class TripController {
  constructor(container, tripEvents) {
    this._container = container;
    this._tripEvents = tripEvents;
    this._sort = new Sort();
    this._newEvent = new NewEvent();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(document.querySelector(`.trip-events`), this._newEvent.getElement(), Positions.AFTERBEGIN);
    render(document.querySelector(`.trip-events`), this._sort.getElement(), Positions.AFTERBEGIN);
    this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));

    this._sort.getElement().addEventListener(`click`, (evt) => {
      this._onSortClick(evt);
    });

    this.createNewEvent();
  }

  createNewEvent() {
    document.querySelector(`.trip-events__item.event.event--edit .event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(document.querySelector(`.trip-events__item.event.event--edit`));

      const newEntry = {
        type: this._addPrepositionToType(formData.get(`event-type`)),
        city: formData.get(`event-destination`),
        date: new Date(formData.get(`event-start-time`).split(` `)[0].split(`.`)[2],
            formData.get(`event-start-time`).split(` `)[0].split(`.`)[1],
            formData.get(`event-start-time`).split(` `)[0].split(`.`)[0]),
        timeStart: {
          hours: formData.get(`event-start-time`).split(` `)[1].split(`:`)[0],
          mins: formData.get(`event-start-time`).split(` `)[1].split(`:`)[1],
        },
        timeEnd: {
          hours: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[0], 10),
          mins: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[1], 10),
        },
        price: formData.get(`event-price`),
        options: [
          {
            name: `Add luggage`,
            price: 10,
            isApply: false,
          },
          {
            name: `Switch to comfort class`,
            price: 150,
            isApply: false,
          },
          {
            name: `Add meal`,
            price: 2,
            isApply: false,
          },
          {
            name: `Choose seats`,
            price: 9,
            isApply: false,
          },
          {
            name: `Travel by train`,
            price: 40,
            isApply: false,
          }
        ],
        description: ``,
        photo: [`http://picsum.photos/300/150?r=${Math.random()}`, `http://picsum.photos/300/150?r=${Math.random()}`, `http://picsum.photos/300/150?r=${Math.random()}`],
      };

      this._onDataChange(newEntry, null);

      document.querySelector(`.trip-events__item.event.event--edit`).classList.add(`visually-hidden`);
      document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
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
    if (newData === null && oldData === null) {
      this._tripEvents.splice([this._tripEvents.findIndex((it) => it === oldData)], 1);
      this._renderBoard(this._tripEvents);
    } else if (newData !== null && oldData === null) {
      this._tripEvents.unshift(newData);
      this._renderBoard(this._tripEvents);
    } else {
      this._tripEvents[this._tripEvents.findIndex((it) => it === oldData)] = newData;
      this._renderBoard(this._tripEvents);
    }
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

  _addPrepositionToType(type) {
    if (type === Types.CHECK_IN || type === Types.RESTAURANT || type === Types.SIGHTSEEING) {
      type += ` at`;
    } else {
      type += ` to`;
    }
    return type;
  }
}

export {TripController};
