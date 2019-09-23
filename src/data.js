// Карточки событий

let allCities = [`Lima`, `New York`, `Capetown`, `Sydney`, `London`, `Dublin`, `Tokyo`, `Quito`];
let descriptionTextArr = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const POINTS_COUNT = 3;

const createSet = (array, maxSize, minSize = 1, probability = 0.5) => {
  let resultSet = new Set();
  for (let i = 0; i < array.length; i++) {
    if (Math.random() > probability) {
      resultSet.add(array[i]);
    }
    if (resultSet.size === maxSize) {
      break;
    }
  }
  if (resultSet.size === 0 && minSize === 1) {
    resultSet.add(array[0]);
  }
  return resultSet;
};

const getPoint = () => ({
  type: [`bus to`, `check-in at`, `drive to`, `flight to`, `restaurant at`, `ship to`, `sightseeing at`, `taxi to`, `train to`, `transport to`][Math.floor(Math.random() * 10)],
  city: Array.from(createSet(allCities, 1))[0],
  photo: [`http://picsum.photos/300/150?r=${Math.random()}`, `http://picsum.photos/300/150?r=${Math.random()}`, `http://picsum.photos/300/150?r=${Math.random()}`],
  description: Array.from(createSet(descriptionTextArr, 3)).join(` `),
  isFavorite: Boolean(Math.round(Math.random())),
  date: Date.now() + Math.floor(Math.random() * 30 + 30) * 24 * 60 * 60 * 1000,
  timeStart: {
    hours: Math.floor(Math.random() * 4) + 7,
    mins: Math.floor(Math.random() * 5 + 1) * 10
  },
  timeEnd: {
    hours: Math.floor(Math.random() * 10) + 12,
    mins: Math.floor(Math.random() * 5 + 1) * 10
  },
  price: Math.floor(Math.random() * 100 + 1) * 10,
  options: [
    {
      name: `Add luggage`,
      price: 10,
      isApply: Boolean(Math.random() > 0.8),
    },
    {
      name: `Switch to comfort class`,
      price: 150,
      isApply: Boolean(Math.random() > 0.8),
    },
    {
      name: `Add meal`,
      price: 2,
      isApply: Boolean(Math.random() > 0.8),
    },
    {
      name: `Choose seats`,
      price: 9,
      isApply: Boolean(Math.random() > 0.8),
    },
    {
      name: `Travel by train`,
      price: 40,
      isApply: Boolean(Math.random() > 0.8),
    }
  ],
});

let pointsObjectsArray = new Array(POINTS_COUNT).fill(``).map(getPoint);
// Меню

const getMenu = () => ([
  {
    point: `Table`,
  },
  {
    point: `Stat`,
  },
]);

// Фильтры

const getFilters = () => ([
  {
    title: `Everything`,
    count: 5,
  },
  {
    title: `Future`,
    count: 4,
  },
  {
    title: `Past`,
    count: 1,
  }
]);

// Общая стоимость

export {getPoint, pointsObjectsArray, getMenu, getFilters};
