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
          color: '#00357b',
          // width:3
        },
        grid: {
          color: '#fbfbfb',
          borderColor: 'grey',
          tickColor: 'grey'
        },
        ticks: {
          color: '#00357b',
          textStrokeColor:'#00357b',
          textStrokeWidth:0.5,
        }
      },
      y: {
        border: {
          color: '#fbfbfb',
        },
        ticks: {
          color: '#00357b',
          textStrokeColor:'#00357b',
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