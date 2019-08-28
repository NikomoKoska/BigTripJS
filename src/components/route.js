import {months} from './tripEvent.js';
import {tripEventsMock} from '../main.js';

const getCitiesFormat = () => {
  if (tripEventsMock.length <= 3) {
    return `${tripEventsMock[0].city} — ${tripEventsMock[1].city} — ${tripEventsMock[2].city}`;
  } else {
    return `${tripEventsMock[0].city} — ... — ${tripEventsMock[tripEventsMock.length - 1].city}`;
  }
};

const getRouteTemplate = ({date}, totalSum) => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getCitiesFormat()}</h1>

    <p class="trip-info__dates">${months[new Date(date).getMonth()]} ${new Date(date).getDate()}&nbsp;&mdash;&nbsp;${new Date(date).getDate() + 3}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
  </p>`;
};

export {getRouteTemplate};
