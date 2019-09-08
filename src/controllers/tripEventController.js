import {TripEvent} from '../components/tripEvent.js';
import {TripEventEdit} from '../components/tripEventEdit.js';
import {Types, Options} from '../consts.js';
import {render, Positions} from '../utils.js';

class PointController {
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

    tripEventElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
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

    tripEventEditElement.querySelectorAll(`.event__offer-label`).forEach((it) => it.addEventListener(`click`, () => {
      if (it.closest(`.event__offer-selector`).querySelector(`.event__offer-checkbox`).hasAttribute(`checked`)) {
        it.closest(`.event__offer-selector`).querySelector(`.event__offer-checkbox`).removeAttribute(`checked`);
        it.style.backgroundColor = `#f2f2f2`;
      } else {
        it.closest(`.event__offer-selector`).querySelector(`.event__offer-checkbox`).setAttribute(`checked`, ``);
        it.style.backgroundColor = `#0d8ae4`;
      }
    }));

    tripEventEditElement.querySelectorAll(`.event__type-label`).forEach((it) => it.addEventListener(`click`, () => {
      const type = it.innerHTML;
      it.closest(`.event__type-wrapper`).querySelector(`.event__type-icon`).setAttribute(`src`, `img/icons/${type.toLowerCase()}.png`);
      it.closest(`.event__header`).querySelector(`.event__label`).innerHTML = this._addPrepositionToType(type.toLowerCase());
      it.closest(`.event__header`).querySelector(`.event__type-toggle`).removeAttribute(`checked`);
      it.closest(`.event__header`).querySelector(`.event__type-list`).style.display = `none`;
    }));

    tripEventEditElement.querySelectorAll(`.event__type-btn`).forEach((it) => it.addEventListener(`click`, () => {
      it.closest(`.event__header`).querySelector(`.event__type-list`).style.display = `block`;
    }));


    tripEventEditElement.querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(tripEventEditElement.querySelector(`.event--edit`));

      const entry = {
        type: this._addPrepositionToType(formData.get(`event-type`)),
        city: formData.get(`event-destination`),
        date: new Date(`20` + formData.get(`event-start-time`).split(` `)[0].split(`/`)[2],
            formData.get(`event-start-time`).split(` `)[0].split(`/`)[1],
            formData.get(`event-start-time`).split(` `)[0].split(`/`)[0]),
        timeStart: {
          hours: parseInt(formData.get(`event-start-time`).split(` `)[1].split(`:`)[0], 10),
          mins: parseInt(formData.get(`event-start-time`).split(` `)[1].split(`:`)[1], 10),
        },
        timeEnd: {
          hours: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[0], 10),
          mins: parseInt(formData.get(`event-end-time`).split(` `)[1].split(`:`)[1], 10),
        },
        price: formData.get(`event-price`),
        options: Array.from(document.querySelectorAll(`.event__offer-checkbox`)).map((it) => {
          if (it.getAttribute(`id`) === `event-offer-luggage-1`) {
            return {
              name: Options.LUGGAGE,
              price: 10,
              isApply: it.hasAttribute(`checked`),
            };
          }
          if (it.getAttribute(`id`) === `event-offer-comfort-1`) {
            return {
              name: Options.COMFORT,
              price: 150,
              isApply: it.hasAttribute(`checked`),
            };
          }
          if (it.getAttribute(`id`) === `event-offer-meal-1`) {
            return {
              name: Options.MEAL,
              price: 2,
              isApply: it.hasAttribute(`checked`),
            };
          }
          if (it.getAttribute(`id`) === `event-offer-seats-1`) {
            return {
              name: Options.SEATS,
              price: 9,
              isApply: it.hasAttribute(`checked`),
            };
          }
          if (it.getAttribute(`id`) === `event-offer-train-1`) {
            return {
              name: Options.TRAIN,
              price: 40,
              isApply: it.hasAttribute(`checked`),
            };
          }
          return [];
        }),
        description: document.querySelector(`.event__destination-description`).innerHTML,
        photo: Array.from(document.querySelectorAll(`.event__photo`)).map((it) => it.getAttribute(`src`)),
      };

      tripEventEditElement.querySelector(`.event__save-btn`).addEventListener(`click`, (event) => {
        event.preventDefault();
        this._container.replaceChild(tripEventElement, tripEventEditElement);
      });

      this._onDataChange(entry, this._data);


      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container, tripEventElement, Positions.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._tripEventEdit.getElement())) {
      this._container.replaceChild(this._tripEvent.getElement(), this._tripEventEdit.getElement());
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

export {PointController};
