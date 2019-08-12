import {returnMenu} from '../src/components/menu.js';
import {returnFilters} from './components/filters.js';
import {returnSort} from './components/sort.js';
import {returnTripDay} from './components/tripDay.js';
import {returnEditForm} from './components/editForm.js';
import {createRoute} from './components/route.js';

const renderComponent = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

const mainInfoContainer = document.querySelector(`.trip-main__trip-info.trip-info`);
const tripControlContainer = document.querySelector(`.trip-main__trip-controls.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripDaysList = document.createElement(`ul`);
tripDaysList.classList.add(`trip-days`);

renderComponent(mainInfoContainer, createRoute(), `afterbegin`);
renderComponent(tripControlContainer, returnMenu(), `afterbegin`);
renderComponent(tripControlContainer, returnFilters(), `beforeend`);
renderComponent(tripEventsContainer, returnSort(), `afterbegin`);
tripEventsContainer.appendChild(tripDaysList);
renderComponent(tripDaysList, returnEditForm(), `beforeend`);
for (let i = 0; i < 3; i++) {
  renderComponent(tripDaysList, returnTripDay(), `beforeend`);
}
