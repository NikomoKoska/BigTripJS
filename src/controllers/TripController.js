import {TripEvent} from '../components/tripEvent.js';
import {TripEventEdit} from '../components/tripEventEdit.js';
import {render, Positions} from '../utils.js';

class TripController {
  constructor(container, tripEvents) {
    this._container = container;
    this._tripEvents = tripEvents;
  }

  init() {
    this._tripEvents.forEach((tripEvent) => this._renderTripEvent(tripEvent));
  }

  _renderTripEvent(tripEventsMockParam) {
    const tripEvent = new TripEvent(tripEventsMockParam);
    const tripEventEdit = new TripEventEdit(tripEventsMockParam);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._container.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEdit.getElement().querySelector(`.event__input--destination`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEdit.getElement().querySelectorAll(`.event__input--time`).forEach((it) => it.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    }));

    tripEventEdit.getElement().querySelector(`.event__input--price`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEdit.getElement().querySelector(`.event__input--destination`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEdit.getElement().querySelectorAll(`.event__input--time`).forEach((it) => it.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    }));

    tripEventEdit.getElement().querySelector(`.event__input--price`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._container.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container, tripEvent.getElement(), Positions.BEFOREEND);
  }
}

export {TripController};
