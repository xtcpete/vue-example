<template>
  <div class="MarketChart">
    <h1 class="title">Pet Market Sale & Spending</h1>
    <!-- Row for the Dashboard Cards -->
    <div class="row">
      <!-- Sale Card -->
      <div class="col">
        <div class="stat-card">
          <div class="d-flex justify-content-between">
            <div class="stat-title">2023 Market Sale</div>
            <span class="stat-icon">📈</span>
          </div>
          <div class="stat-number">$143.6B</div>
        </div>
      </div>
      <!-- Food Card -->
      <div class="col">
        <div class="stat-card">
          <div class="d-flex justify-content-between">
            <div class="stat-title">Pet Food & Treats</div>
            <span class="stat-icon">🥣</span>
          </div>
          <div class="stat-number">$62.7B</div>
        </div>
      </div>
      <!-- Dog Card -->
      <div class="col">
        <div class="stat-card">
          <div class="d-flex justify-content-between">
            <div class="stat-title">Dog Annual Cost</div>
            <span class="stat-icon">🐶</span>
          </div>
          <div class="stat-number">$1201</div>
        </div>
      </div>
      <!-- Cat Card -->
      <div class="col">
        <div class="stat-card">
          <div class="d-flex justify-content-between">
            <div class="stat-title">Cat Annual Cost</div>
            <span class="stat-icon">🐱</span>
          </div>
          <div class="stat-number">$687</div>
        </div>
      </div>

    </div>

    <!-- Row for Line Chart & Pie Chart -->
    <div class="row" style="margin-bottom: 20px;">
      <div class="col-md-6">
        <!-- Line Chart -->
        <div class="chart-container" style="height: 100%;">
          <div class="chart-title chart-header">Market Trend</div>
          <canvas id="line-chart" width="480" height="459"></canvas>
        </div>
      </div>

      <div class="col-md-6">
        <!-- Pie Chart -->
        <div class="chart-container" style="height: 100%;">
          <div class="chart-header">
            <div class="chart-title">Market Segment</div>
            <div class="chart-year">
              <label for="year-select">Year:</label>
              <select id="year-select" onchange="updatePieChartForYear(this.value)">
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
          </div>

          <!-- Create a div where the graph will take place -->

          <canvas id="pie-chart" width="280" height="450"></canvas>

        </div>
      </div>
    </div>

    <!-- Bar Chart (DIV) -->
    <div class="row">
      <div class="col">
        <div class="chart-container" style="max-height: 600px; padding-bottom: 50px;">
          <div class="chart-header">
            <div class="chart-title my-3">2023 Pet Spending Patterns</div>
          </div>
          <canvas id="bar-chart"></canvas>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import * as Papa from 'papaparse';

export default {
  name: 'MarketChart',
  mounted: function () {
    // -------- Line Chart --------
let lineChart;
const lineChartData = {
  labels: [],
  datasets: [{
    label: 'Sales',
    data: [],
    fill: false,
    borderColor: '#916956',
    tension: 0.1
  }]
};

const lineChartConfig = {
  type: 'line',
  data: lineChartData,
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Market Trend'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales ($ Billion)'
        }
      }
    },
    onClick: function (evt) {
      const activePoints = lineChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
      if (activePoints.length) {
        const firstPointIndex = activePoints[0].index;
        const year = lineChart.data.labels[firstPointIndex];
        updatePieChartForYear(year);
      }
    }
  }
};

// Fetch and process the line chart data
fetch('market_sale_data.csv')
  .then(response => response.text())
  .then(csv => {
  
    const results = Papa.parse(csv, { header: true, dynamicTyping: true });
    const data = results.data;


    lineChartConfig.data.labels = data.map(d => d.year);
    lineChartConfig.data.datasets[0].data = data.map(d => d.total);


    const ctx = document.getElementById('line-chart').getContext('2d');
    lineChart = new Chart(ctx, lineChartConfig);
  })
  .catch(error => console.error('Error loading the data: ', error));

// -------- Pie Chart --------
let pieChart;
const pieChartConfig = {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [ '#EAC04D', '#51964B','#A56F95', '#FE929D'],
      hoverOffset: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Sales Distribution by Category'
      }
    }
  }
};

let csvData = {};

function processCSVData(results) {

  csvData = results.data.reduce((acc, cur) => {
    const year = cur.Year;
    const category = cur.Category;
    const value = parseFloat(cur.Value);
    
    if (!acc[year]) {
      acc[year] = {};
    }

    acc[year][category] = value;
    
    return acc;
  }, {});

  updatePieChartForYear(document.getElementById('year-select').value);
}

function updatePieChartForYear(year) {
  document.getElementById('year-select').value = year;
  const data = csvData[year];
  pieChartConfig.data.labels = Object.keys(data);
  pieChartConfig.data.datasets[0].data = Object.values(data);

  pieChart.update();
}


const piectx = document.getElementById('pie-chart').getContext('2d');
pieChart = new Chart(piectx, pieChartConfig);

// Load CSV data for the pie chart
Papa.parse('market_segment_data.csv', {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: processCSVData
});

// Event listener for the year selection dropdown
document.getElementById('year-select').addEventListener('change', function() {
  updatePieChartForYear(this.value);
});


// ------ bar chart -------
const barChartCanvas = document.getElementById('bar-chart').getContext('2d');
let barChart;

// Function to fetch and parse the CSV data
function fetchBarChartData() {
  fetch('pet_spending_data.csv')
    .then(response => response.text())
    .then(csv => {
      const results = Papa.parse(csv, { header: true, dynamicTyping: true });
      const data = results.data;
      const categories = data.map(d => d.category);
      const dogData = data.map(d => d.Dog);
      const catData = data.map(d => d.Cat);

      const barChartData = {
        labels: categories,
        datasets: [
          {
            label: 'Dog Owner',
            data: dogData,
            backgroundColor: '#456F9B'
          },
          {
            label: 'Cat Owner',
            data: catData,
            backgroundColor: '#EF8132'
          }
        ]
      };

      const barChartOptions = {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Category', // X-axis label
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount Spent ($)', // Y-axis label
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
            onClick: (e, legendItem, legend) => {
              const index = legendItem.datasetIndex;
              const chart = legend.chart;
              chart.getDatasetMeta(index).hidden = !chart.getDatasetMeta(index).hidden;
              chart.update();
            }
          },
          title: {
            display: true,
            text: 'Dog vs. Cat Owners: Annual Spending Breakdown'
          }
        },
        maintainAspectRatio: false
      };
      

      if (barChart) {
        console.log('destroying old chart');
        barChart.destroy(); // Destroy the old chart instance before creating a new one
      }


      barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
      });
    })
    .catch(error => console.error('Error loading the CSV data: ', error));
}

// Initial fetch of the bar chart data
fetchBarChartData();

}

}
</script>

<style>
.title {
  text-align: center;  
  font-family: "Arial", sans-serif;  
  font-size: 24px;  
  color: #333;  
  margin-top: 30px;  
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(134, 130, 130, 0.5);
}


/* Style for the title */
.chart-title {
  font-size: 18px;  
  font-weight: bold; 
  padding-top: 10px; 
  padding-bottom: 1px;
  margin-bottom: 10px;

}

/* Style for the table */
.table-style {
  width: 100%;  
  border-collapse: collapse; 
  font-family: Arial, sans-serif;  
  margin-top: 20px;
  margin-left: 10px;
}

/* Style table headers */
.table-style th {
  background-color: #f2f2f2;  
  text-align: left;  
  padding: 10px;  
  border: 1px solid steelblue;  
}

/* Style table data cells */
.table-style td {
  padding: 10px; 
  border: 1px solid steelblue; 
}

/* Style alternating rows with different background colors */
.table-style tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Style the table caption */
.table-style caption {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-container {
  border: 1px solid #ccc;  
  background-color: #ffffff;  
  border-radius: 10px;  
  padding: 20px; /* Spacing inside the container */
  margin-top: 20px; /* Spacing outside the container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-header {
  align-self: start; /* Aligns the header content to the start */
  padding-left: 20px; 
}

.chart-title, .chart-year {
  text-align: left; /* Ensures text is aligned to the left */
}
 
.stat-card {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border-radius: 10px;
  padding: 20px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 10%;
  height: 100%;
  /*align-items: flex;*/
}

.stat-title {
  font-size: 18px;
  margin-bottom: 5px; 
}

.stat-icon {
  font-size: 26px;
  margin-left: 20px; 
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  margin-top: 5px; 
}
</style>