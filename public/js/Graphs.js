

let canvas = document.getElementById("Graph");
let ctx = canvas.getContext("2d");

const labels = [0, 1, 2, 3, 4, 5]

const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temp [C]',
        data: [0, 10, 20, 30, 40, 50],
        borderColor: "#FF5733",
        backgroundColor: "#FF5733",
        yAxisID: 'temp',
      },
      {
        label: 'Relative Humidity %',
        data: [0, 40, 50, 60, 70, 80],
        borderColor: "#175DD8",
        backgroundColor: "#175DD8",
        yAxisID: 'hum',
      }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: false,
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

const chart = new Chart(canvas, config);