import {getMenuTemplate} from '../src/components/menu.js';
import {getFiltersTemplate} from './components/filters.js';
import {getSortTemplate} from './components/sort.js';
import {getTripEventTemplate, getTripDate} from './components/tripEvent.js';
import {getEditFormTemplate} from './components/editForm.js';
import {getRouteTemplate} from './components/route.js';
import {getPoint, pointsObjectsArray, getMenu, getFilters, totalSum} from './data.js';


const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
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

// Отрисовка элементов
renderComponent(mainInfoContainer, getRouteTemplate(getPoint(), totalSum), `afterbegin`);
renderComponent(tripControlContainer, getMenuTemplate(getMenu()), `afterbegin`);
renderComponent(tripControlContainer, getFiltersTemplate(getFilters()), `beforeend`);
renderComponent(tripEventsContainer, getSortTemplate(), `afterbegin`);
tripEventsContainer.appendChild(tripDaysList);
renderComponent(tripDaysItem, getTripDate(pointsObjectsArray[0]), `afterbegin`);
renderComponent(tripEventsList, getEditFormTemplate(), `beforeend`);
renderComponent(tripEventsList, pointsObjectsArray.map(getTripEventTemplate).join(``), `beforeend`);

