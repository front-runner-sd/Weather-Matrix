import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData,maxMin }) {
  const maxEle = maxMin.max;
  const minEle = maxMin.min;
  const options= {
    bezierCurve: true,
    pointDot: false,
    responsive: true, 
    maintainAspectRatio: false,
    // pointStyle: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 30
    },
    

    scales: {
      x: {
        border: {
          color: '#8e021e',
          // width:3
        },
        grid: {
          color: '#fbfbfb',
          borderColor: 'grey',
          tickColor: '#ff4a62'
        },
        ticks: {
          color: '#8e021e',
          textStrokeColor:'#8e021e',
          textStrokeWidth:0.5,
        }
      },
      y: {
        border: {
          color: '#fbfbfb',
        },
        ticks: {
          color: '#8e021e',
          textStrokeColor:'#8e021e',
          textStrokeWidth:0.5,
          crossAlign:'far',
          callback: function(value) {
            return value + '°';
        }
        },
          suggestedMin: minEle,
          suggestedMax: maxEle
      }
  }
  }
  return <Line data={chartData} options={options}/>;
}

export default LineChart;