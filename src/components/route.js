import {months} from './tripEvent.js';

const getCitiesFormat = (cities) => {
  if (cities.length <= 3) {
    return `${cities[0]} — ${cities[1]} — ${cities[2]}`;
  } else {
    return `${cities[0]} — ... — ${cities[cities.length - 1]}`;
  }
};

const getRouteTemplate = ({cities, date}, totalSum) => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getCitiesFormat(Array.from(cities))}</h1>

    <p class="trip-info__dates">${months[new Date(date).getMonth()]} ${new Date(date).getDate()}&nbsp;&mdash;&nbsp;${new Date(date).getDate() + 3}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
  </p>`;
};

export {getRouteTemplate};
