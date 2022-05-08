

let canvas = document.getElementById("Graph");
let ctx = canvas.getContext("2d");

let labels = [0, 1, 2, 3, 4, 5];

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
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Temperature and Relative Humidity as function of time'
        }
      },
      scales: {
        x: {
            display: true,
            title: {
            display: true,
            text: "Tid/Sekunder",
            color: "#3D50E3",
            font: {
              family: "Arial",
              size: 20,
              weight: "bold",
              lineheight: 1.2,
            },
            padding: {top: 20, left: 0, right :0, bottom: 0}
          }
        },
        temp: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: "Temperature [C]",
            color: "#3D50E3",
            font: {
              family: "Arial",
              size: 20,
              weight: "bold",
              lineheight: 1.2,
            },
            padding: {top: 30, left: 0, right :0, bottom: 0}
          }
        },
        hum: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: "Relative Humidity %",
            color: "#3D50E3",
            font: {
              family: "Arial",
              size: 20,
              weight: "bold",
              lineheight: 1.2,
            },
            padding: {top: 30, left: 0, right :0, bottom: 0}
          },
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
    },
};

let chart = new Chart(canvas, config);

function updateChart(temp, hum, label){
  chart.data.datasets[0].data = temp;
  chart.data.datasets[1].data = hum;
  chart.data.labels = label;
  chart.update();
}