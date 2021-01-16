// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
require("chartkick")
require("chart.js")
require("chartjs-gauge")
// import Highcharts from 'highcharts';
// require("highcharts/modules/data")(Highcharts)
// require("highcharts/modules/exporting")(Highcharts)
// require("highcharts/modules/offline-exporting")(Highcharts)
// require("highcharts/modules/map")(Highcharts)
// window.Highcharts = Highcharts;

export default class extends Controller {
  static targets = []

  connect() {
    var temperatureFormat = '℉';

    var airChart = document.getElementById("at_speedometer");
    var airMeasurement = airChart.getAttribute('data-measurement');

    var humidityChart = document.getElementById("humidity_speedometer")
    var humidityMeasurement = humidityChart.getAttribute('data-measurement');

    var tdsChart = document.getElementById("tds_speedometer")
    var tdsMeasurement = tdsChart.getAttribute('data-measurement');

    var waterTempChart = document.getElementById("water_temp_speedometer")
    var waterTempMeasurement = waterTempChart.getAttribute('data-measurement');

    var phLevelChart = document.getElementById("ph_level_speedometer")
    var phLevelMeasurement = phLevelChart.getAttribute('data-measurement');

    var air_chart_options = {
      title: 'Air Temp',
      sublabel: 'Temp',
      container: 'at_speedometer',
      format: '℉',
      data: [parseFloat(airMeasurement)],
      maxValue: 100,
      plotBands: [
        {from: 0,
          to: 40,
          color: '#DF5353' // red
        }, {
          from: 40,
          to: 55,
          color: '#DDDF0D' // yellow
        }, {
          from: 55,
          to: 75,
          color: '#55BF3B' // green
        }, {
          from: 75,
          to: 85,
          color: '#DDDF0D' // yellow
        },
        {from: 85,
          to: 100,
          color: '#DF5353' // red
        }

      ]
    }
    var humidity_chart_options = {
      title: 'Humidity',
      sublabel: 'Humidity',
      container: 'humidity_speedometer',
      format: '%',
      data: [parseFloat(humidityMeasurement)],
      maxValue: 100,
      plotBands: [
        {from: 0,
          to: 30,
          color: '#DF5353' // red
        }, {
          from: 30,
          to: 50,
          color: '#DDDF0D' // yellow
        }, {
          from: 50,
          to: 70,
          color: '#55BF3B' // green
        }, {
          from: 70,
          to: 80,
          color: '#DDDF0D' // yellow
        },
        {from: 80,
          to: 100,
          color: '#DF5353' // red
        }

      ]
    }
    var tds_chart_options = {
      title: 'Total Dissolved Solids',
      sublabel: 'TDS',
      container: 'tds_speedometer',
      format: 'ppm',
      data: [parseFloat(tdsMeasurement)],
      maxValue: 2000,
      plotBands: [
        {from: 0,
          to: 400,
          color: '#DF5353' // red
        }, {
          from: 400,
          to: 800,
          color: '#DDDF0D' // yellow
        }, {
          from: 800,
          to: 1200,
          color: '#55BF3B' // green
        }, {
          from: 1200,
          to: 1600,
          color: '#DDDF0D' // yellow
        },
        {from: 1600,
          to: 2000,
          color: '#DF5353' // red
        }

      ]
    }
    var water_temp_chart_options = {
      title: 'Water Temp',
      sublabel: 'Water Temp',
      container: 'water_temp_speedometer',
      format: '℉',
      data: [parseFloat(waterTempMeasurement)],
      maxValue: 100,
      plotBands: [
        {from: 0,
          to: 40,
          color: '#DF5353' // red
        }, {
          from: 40,
          to: 55,
          color: '#DDDF0D' // yellow
        }, {
          from: 55,
          to: 75,
          color: '#55BF3B' // green
        }, {
          from: 75,
          to: 85,
          color: '#DDDF0D' // yellow
        },
        {from: 85,
          to: 100,
          color: '#DF5353' // red
        }

      ]
    }
    var ph_level_chart_options = {
      title: 'PH Level',
      sublabel: 'PH',
      container: 'ph_level_speedometer',
      format: '℉',
      data: [parseFloat(phLevelMeasurement)],
      maxValue: 14,
      plotBands: [
        {from: 0,
          to: 2.8,
          color: '#DF5353' // red
        }, {
          from: 2.8,
          to: 5.6,
          color: '#DDDF0D' // yellow
        }, {
          from: 5.6,
          to: 8.4,
          color: '#55BF3B' // green
        }, {
          from: 8.4,
          to: 11.2,
          color: '#DDDF0D' // yellow
        },
        {from: 11.2,
          to: 14,
          color: '#DF5353' // red
        }

      ]
    }
    this.renderHighchart(air_chart_options);
    this.renderHighchart(humidity_chart_options);
    this.renderHighchart(tds_chart_options);
    this.renderHighchart(water_temp_chart_options);
    this.renderHighchart(ph_level_chart_options);
  }

  renderGraph(chart, measurement, formatter, range) {
    var ctx = chart.getContext("2d");
    var chart = new Chart(ctx, {
      type: 'gauge',
      data: {
        datasets: [{
          value: measurement,
          data: range,
          backgroundColor: ['red', 'yellow', 'green', 'yellow', 'red'],
        }]
      },
      options: {
        needle: {
          radiusPercentage: 2,
          widthPercentage: 3.2,
          lengthPercentage: 80,
          color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
          display: true,
          formatter: (value) => {
            return measurement + formatter;
          },
          color: 'rgba(255, 255, 255, 1)',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: 5,
          padding: {
            top: 10,
            bottom: 10
          }
        }
      }
    });

  }

  renderHighchart(options) {
    Highcharts.chart(options['container'], {

      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },

      title: {
        text: options['title']
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

      // the value axis
      yAxis: {
        min: 0,
        max: options['maxValue'],

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: options['format']
        },
        plotBands: options['plotBands'] 
        },

      series: [{
        name: options['sublabel'],
        data: options['data'],
        tooltip: {
          valueSuffix: options['format']
        }
      }]

    },
    // Add some life
    function (chart) {
      if (!chart.renderer.forExport) {
        // setInterval(function () {
        //   var point = chart.series[0].points[0],
        //     newVal,
        //   inc = Math.round((Math.random() - 0.5) * 20);

        //   newVal = point.y + inc;
        //   if (newVal < 0 || newVal > 200) {
        //     newVal = point.y - inc;
        //   }

        //   point.update(newVal);

        // }, 3000);
      }
    });

  }
}
