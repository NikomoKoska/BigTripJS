import Chart from '../node_modules/chart.js/dist/Chart.js';
import ChartDataLabels from '../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';


const createCharts = (POINTS_COUNT, tripEventsMock) => {
  const moneyCtx = document.querySelector(`.statistics__chart--money`);
  const transportCtx = document.querySelector(`.statistics__chart--transport`);
  const timeCtx = document.querySelector(`.statistics__chart--time`);
  const eventsTypes = [];
  const eventsCost = [];

  for (let i = 0; i < POINTS_COUNT; i++) {
    if (eventsTypes.indexOf(tripEventsMock[i].type) === -1) {
      eventsTypes.push(tripEventsMock[i].type);
    }
  }

  for (let i = 0; i < eventsTypes.length; i++) {
    let priceOfType = 0;
    for (let j = 0; j < tripEventsMock.length; j++) {
      if (eventsTypes[i] === tripEventsMock[j].type) {
        priceOfType += tripEventsMock[j].price;
      }
    }
    eventsCost.push(priceOfType);
  }

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: eventsTypes,
      datasets: [{
        data: eventsCost,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffd054`
      }]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: false,
        }],
        yAxes: [{
          stacked: false,
          barThickness: 35,
        }]
      }
    }
  });
};

export {createCharts};

