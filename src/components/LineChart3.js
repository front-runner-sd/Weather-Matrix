import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart2({ chartData,maxMin3 }) {
  const maxEle = maxMin3.max;
  const minEle = maxMin3.min;
  const options= {
    bezierCurve: true,
    pointDot: false,
    responsive: true, 
    maintainAspectRatio: false,
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
        },
        grid: {
          color: '#f8efff',
          borderColor: '#00357b',
          tickColor: '#00357b'
        },
        ticks: {
          color: '#58005b',
          textStrokeColor:'#00357b',
          textStrokeWidth:0.5,
        }
      },
      y: {
        border: {
          color: 'rgba(219, 4, 47, 0)',
        },
        ticks: {
          color: '#58005b',
          textStrokeColor:'#00357b',
          textStrokeWidth:0.5,
          crossAlign:'far',
          callback: function(value) {
            return value + ' %';
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