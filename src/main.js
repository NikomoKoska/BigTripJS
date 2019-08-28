import {Menu} from '../src/components/menu.js';
import {Filter} from './components/filters.js';
import {getSortTemplate} from './components/sort.js';
import {TripEvent, getTripDate} from './components/tripEvent.js';
import {TripEventEdit} from './components/tripEventEdit.js';
import {Route} from './components/route.js';
import {getPoint, pointsObjectsArray, getMenu, getFilters} from './data.js';
import {render, Positions} from './utils.js';

const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

const renderFilter = (filtersArrayParam) => {
  const filter = new Filter(filtersArrayParam);
  render(tripControlContainer, filter.getElement(), Positions.BEFOREEND);
};

const renderMenu = (menuArray) => {
  const menu = new Menu(menuArray);
  render(tripControlContainer, menu.getElement(), Positions.AFTERBEGIN);
};

const renderTripEvent = (tripEventsMockParam) => {
  const tripEvent = new TripEvent(tripEventsMockParam);
  const tripEventEdit = new TripEventEdit(tripEventsMockParam);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tripEventsBlock.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    tripEventsBlock.replaceChild(tripEventEdit.getElement(), tripEvent.getElement());
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
    tripEventsBlock.replaceChild(tripEvent.getElement(), tripEventEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventsBlock, tripEvent.getElement(), Positions.BEFOREEND);
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

const POINTS_COUNT = 5;

const tripEventsMock = new Array(POINTS_COUNT).fill(``).map(getPoint);
const filtersArray = new Array(1).fill(``).map(getFilters);
const menuArray = new Array(1).fill(``).map(getMenu);


let totalSum = 0;
for (let i = 0; i < tripEventsMock.length; i++) {
  totalSum += tripEventsMock[i].price;
  if (tripEventsMock[i].options) {
    for (let j = 0; j < tripEventsMock[i].options.length; j++) {
      totalSum += tripEventsMock[i].options[j].price;
    }
  }
}

const route = new Route(new Date(), totalSum).getElement();

console.log(route);

// Отрисовка элементов
render(mainInfoContainer, route, Positions.AFTERBEGIN);
menuArray.forEach((menuPoint) => renderMenu(menuPoint));
filtersArray.forEach((filter) => renderFilter(filter));
renderComponent(tripEventsContainer, getSortTemplate(), `afterbegin`);
tripEventsContainer.appendChild(tripDaysList);
renderComponent(tripDaysItem, getTripDate(pointsObjectsArray[0]), `afterbegin`);
const tripEventsBlock = document.querySelector(`.trip-events__list`);
tripEventsMock.forEach((tripEventMock) => renderTripEvent(tripEventMock));

export {POINTS_COUNT, tripEventsMock};


