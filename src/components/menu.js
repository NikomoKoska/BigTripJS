import {createElement} from '../utils.js';

class Menu {
  constructor(menuPoints) {
    this._menuPoints = menuPoints;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${this._menuPoints[0].point}</a>
      <a class="trip-tabs__btn" href="#">${this._menuPoints[1].point}</a>
    </nav>`;
  }
}
export {Menu};
