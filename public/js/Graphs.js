let canvas = document.getElementById("Graph");
let ctx = canvas.getContext("2d");

const labels = Utils.months({count: 7});

const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temp [C]',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        yAxisID: 'temp',
      },
      {
        label: 'Relative Humidity %',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: 'hum',
      }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis'
        }
      },
      scales: {
        temp: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        hum: {
          type: 'linear',
          display: true,
          position: 'right',
  
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
};