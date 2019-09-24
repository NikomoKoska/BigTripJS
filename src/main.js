import {Menu} from '../src/components/menu.js';
import {Filter} from './components/filters.js';
import {TripDate} from './components/tripDate.js';
import {Route} from './components/route.js';
import {Stat} from './components/stat.js';
import {NoTripEvent} from './components/noTripEvent.js';
import {getPoint, getMenu, getFilters} from './data.js';
import {render, Positions} from './utils.js';
import {TripController} from './controllers/TripController.js';
import {createCharts} from './statistics.js';

const renderFilter = (filtersArrayParam) => {
  const filter = new Filter(filtersArrayParam);
  render(tripControlContainer, filter.getElement(), Positions.BEFOREEND);
};

const renderMenu = (menuArray) => {
  const menu = new Menu(menuArray);
  render(tripControlContainer, menu.getElement(), Positions.AFTERBEGIN);
};

// Создание контейнеров

const mainInfoContainer = document.querySelector(`.trip-main__trip-info.trip-info`);
const tripControlContainer = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripDaysList = document.createElement(`ul`);
tripDaysList.classList.add(`trip-days`);
const tripDaysItem = document.createElement(`li`);
tripDaysItem.classList.add(`trip-days__item`, `day`);
tripDaysList.appendChild(tripDaysItem);
const tripEventsList = document.createElement(`ul`);
tripEventsList.classList.add(`trip-events__list`);
tripDaysItem.appendChild(tripEventsList);

// Создание объектов и массивов объектов для каждого компонента и отрисовка элементов

const POINTS_COUNT = 5;

const tripEventsMock = new Array(POINTS_COUNT).fill(``).map(getPoint);
const filtersArray = new Array(1).fill(``).map(getFilters);
const menuArray = new Array(1).fill(``).map(getMenu);


let totalSumNum = 0;
for (let i = 0; i < tripEventsMock.length; i++) {
  totalSumNum += tripEventsMock[i].price;
  if (tripEventsMock[i].options) {
    for (let j = 0; j < tripEventsMock[i].options.length; j++) {
      totalSumNum += tripEventsMock[i].options[j].price;
    }
  }
}

document.querySelector(`.trip-info__cost`).textContent = `Total: € ${totalSumNum}`;

const tripDate = new TripDate(new Date()).getElement();
const noTripEvent = new NoTripEvent().getElement();

if (tripEventsMock.length) {
  const route = new Route(new Date()).getElement();
  render(mainInfoContainer, route, Positions.AFTERBEGIN);
}
menuArray.forEach((menuPoint) => renderMenu(menuPoint));
filtersArray.forEach((filter) => renderFilter(filter));
tripEventsContainer.appendChild(tripDaysList);
if (tripEventsMock.length) {
  render(tripDaysItem, tripDate, Positions.AFTERBEGIN);
} else {
  render(tripDaysItem, noTripEvent, Positions.AFTERBEGIN);
}
const tripEventsBlock = document.querySelector(`.trip-events__list`);
const tripController = new TripController(tripEventsBlock, tripEventsMock);
tripController.init();

const stat = new Stat().getElement();
render(document.querySelector(`main`), stat, Positions.BEFOREEND);

// Кнопки на форме в заголовке.
const mainButtons = document.querySelectorAll(`.trip-tabs__btn`);
const tripButton = mainButtons[0];
const statpButton = mainButtons[1];

statpButton.addEventListener(`click`, () => {
  tripButton.classList.remove(`trip-tabs__btn--active`);
  statpButton.classList.add(`trip-tabs__btn--active`);
  document.querySelector(`.trip-events`).classList.add(`visually-hidden`);
  document.querySelector(`.statistics`).classList.remove(`visually-hidden`);
});

tripButton.addEventListener(`click`, () => {
  statpButton.classList.remove(`trip-tabs__btn--active`);
  tripButton.classList.add(`trip-tabs__btn--active`);
  document.querySelector(`.statistics`).classList.add(`visually-hidden`);
  document.querySelector(`.trip-events`).classList.remove(`visually-hidden`);
});

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  document.querySelector(`.trip-events__item.event.event--edit`).classList.remove(`visually-hidden`);
  document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, ``);
});

document.querySelector(`.trip-events__item.event.event--edit .event__reset-btn`).addEventListener(`click`, () => {
  document.querySelector(`.trip-events__item.event.event--edit`).classList.add(`visually-hidden`);
  document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
});

createCharts(POINTS_COUNT, tripEventsMock);

export {POINTS_COUNT, tripEventsMock};


