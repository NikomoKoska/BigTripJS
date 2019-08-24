const months = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
const getTimeDuration = (startTime, endTime) => {
  let startTimeMins = startTime.hours * 60 + startTime.mins;
  let endTimeMins = endTime.hours * 60 + endTime.mins;
  let diff = endTimeMins - startTimeMins;
  let diffTime = {
    hours: Math.floor(diff / 60),
    mins: diff % 60
  };
  return diffTime;
};

const getTripEventTemplate = ({type, timeStart, timeEnd, price, options}) => {
  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type[0].toUpperCase() + type.slice(1)}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart.hours}:${timeStart.mins}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd.hours}:${timeEnd.mins}</time>
        </p>
        <p class="event__duration">${getTimeDuration(timeStart, timeEnd).hours}H ${getTimeDuration(timeStart, timeEnd).mins}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${options.map((option) => `<li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
          </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

const getTripDate = ({date}) => {
  return `<div class="day__info">
    <span class="day__counter">${new Date(date).getDate()}</span>
    <time class="day__date" datetime="2019-03-18">${months[new Date(date).getMonth()]} ${(new Date().getFullYear()).toString().slice(2, 5)}</time>
  </div>`;
};

export {getTripEventTemplate, getTripDate, months};
