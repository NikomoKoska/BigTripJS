import {AbstractComponent} from './abstract-component.js';

class Menu extends AbstractComponent {
  constructor(menuPoints) {
    super();
    this._menuPoints = menuPoints;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${this._menuPoints[0].point}</a>
      <a class="trip-tabs__btn" href="#">${this._menuPoints[1].point}</a>
    </nav>`;
  }
}
export {Menu};
