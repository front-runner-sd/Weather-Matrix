import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart2({ chartData,maxMin2 }) {
  const maxEle = maxMin2.max;
  const minEle = maxMin2.min;
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
          color: '#58005b',
          // width:3
        },
        grid: {
          color: '#f5e7ff',
          borderColor: 'grey',
          tickColor: 'grey'
        },
        ticks: {
          color: '#58005b',
          textStrokeColor:'#00357b',
          textStrokeWidth:0.5,
        }
      },
      y: {
        border: {
          color: '#f5e7ff',
        },
        ticks: {
          color: '#58005b',
          textStrokeColor:'#00357b',
          textStrokeWidth:0.5,
          crossAlign:'far',
          callback: function(value) {
            return value + ' mm';
        }
        },
          suggestedMin: minEle,
          suggestedMax: maxEle
      }
  }
  }
  return <Line data={chartData} options={options}/>;
}

export default LineChart2;