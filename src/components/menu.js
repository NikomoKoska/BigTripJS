const getMenuTemplate = ({menuPoints}) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${menuPoints[0]}</a>
    <a class="trip-tabs__btn" href="#">${menuPoints[1]}</a>
  </nav>`;
};

export {getMenuTemplate};
