import {TripEvent} from '../components/tripEvent.js';
import {TripEventEdit} from '../components/tripEventEdit.js';
import {render, Positions} from '../utils.js';

class TripEventController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._tripEvent = new TripEvent(data);
    this._tripEventEdit = new TripEventEdit(data);

    this.create();
  }

  create() {
    const tripEventElement = this._tripEvent.getElement();
    const tripEventEditElement = this._tripEventEdit.getElement();

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
      this._container.replaceChild(tripEventElement, tripEventEditElement);
    });

    tripEventEditElement.querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(tripEventEditElement.querySelector(`.event--edit`));

      const entry = {
        type: this._addPrepositionToType(formData.get(`event-type`)),
        city: formData.get(`event-destination`),
        timeStart: {
          hours: parseInt(formData.get(`event-start-time`).split(` `)[1].split(`:`)[0], 10),
          mins: parseInt(formData.get(`event-start-time`).split(` `)[1].split(`:`)[1], 10),
        },
        timeEnd: {
          hours: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[0], 10),
          mins: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[1], 10),
        },
        price: formData.get(`event-price`),
        options: Array.from(document.querySelectorAll(`.event__offer-checkbox[checked]`)).map((it) => {
          if (it.getAttribute(`id`) === `event-offer-luggage-1`) {
            return {
              name: `Add luggage`,
              price: 10,
              isApply: true,
            };
          }
          if (it.getAttribute(`id`) === `event-offer-comfort-1`) {
            return {
              name: `Switch to comfort class`,
              price: 150,
              isApply: true,
            };
          }
          if (it.getAttribute(`id`) === `event-offer-meal-1`) {
            return {
              name: `Add meal`,
              price: 2,
              isApply: true,
            };
          }
          if (it.getAttribute(`id`) === `event-offer-seats-1`) {
            return {
              name: `Choose seats`,
              price: 9,
              isApply: true,
            };
          }
          if (it.getAttribute(`id`) === `event-offer-train-1`) {
            return {
              name: `Travel by train`,
              price: 40,
              isApply: true,
            };
          }
          return [];
        }),
      };

      console.log(entry);

      this._onDataChange(entry, this._data);


      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container, tripEventElement, Positions.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._tripEventEdit.getElement())) {
      this._container.getElement().replaceChild(this._tripEvent.getElement(), this._tripEventEdit.getElement());
    }
  }
  _addPrepositionToType (type) {
    if (type === 'bus' ||  type ===  `drive` || type ===  `flight` || type === `ship` || type ===  `taxi` || type ===  `train`|| type ===   `transport`) {
      type += ' to';
    } else if (type === `check-in` || type === `restaurant`  || type === `sightseeing` ) {
      type += ' at';
    }
    return type;
  }
}

export {TripEventController};
