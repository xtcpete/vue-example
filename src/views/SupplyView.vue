<template>
    <div class="SupplyChart">
        <h1 class='title'>Pet Product & Service Providers</h1>
        <div class="row">
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Number of Employees in Pet Industry</div>
                        <span class="stat-icon">📈</span>
                    </div>
                    <div class="stat-number">310,000</div>
                </div>
            </div>
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">PPI of Processed Pet Food</div>
                        <span class="stat-icon">🥣</span>
                    </div>
                    <div class="stat-number">339</div>
                </div>
            </div>
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Average Weekly Earnings</div>
                        <span class="stat-icon">💰</span>
                    </div>
                    <div class="stat-number">$667.52</div>
                </div>
            </div>

        </div>

        <br>

        <div class="row">
            <div class="col-md-6" id="chart1-div">
                <div class="card" style="height: 100%;">
                    <div class="card-body">
                        <h6> Number of Employees vs PPI (base=100, 2012)</h6>
                        <svg id="doubleLineChart" width="100%" height=450></svg>
                    </div>
                </div>
            </div>
            <div class="col-md-6" id="chart2-div">
                <div class="card" style="height: 100%;">
                    <div class="card-body">
                <label for="yearSelector">Select Year:</label>
                <select class="form-control" id="yearSelector">
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option selected>2022</option>
                </select>
                <h6 style="margin-top: 20px;">Employee Sex Distribution</h6>
                    <svg id="pieChart" width="100%" height=350></svg>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    name: 'SupplyChart',
    mounted: function () {
        d3.csv("employees.csv").then(function (data) {
            d3.select('#doubleLineChart').selectAll("*").remove();

            var margin = { top: 20, right: 20, bottom: 50, left: 60 };
            var width = document.getElementById("doubleLineChart").clientWidth - margin.left - margin.right;
            var height = document.getElementById("doubleLineChart").clientHeight - margin.top - margin.bottom;

            var parseDate = d3.timeParse("%Y %b");

            var svg = d3.select('#doubleLineChart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var xScale = d3.scaleTime()
                .domain(d3.extent(data, d => parseDate(d.label)))
                .range([0, width]);

            var yScale = d3.scaleLinear()
                .domain([100, 345])
                .range([height, 0])
                ;


            var xAxisGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat('').ticks(5);
            var yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat('').ticks(10);


            // Add the line to the chart
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(parseDate(d.label)) })
                    .y(function (d) { return yScale(d.total) })
                );

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "orange")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return xScale(parseDate(d.label)) })
                    .y(function (d) { return yScale(d.ppi) })
                );


            svg.append('g')
                .attr('class', 'x-axis-grid')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxisGrid);

            svg.append('g')
                .attr('class', 'y-axis-grid')
                .call(yAxisGrid);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale).ticks(5));

            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2) // Position it in the middle of the x-axis
                .attr("y", height + margin.top + 20) // Position it below the x-axis
                .text("Year");

            svg.append("g")
                .call(d3.axisLeft(yScale).ticks(Math.max(height / 50, 2)));

            svg.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -height / 2)
                .attr("y", margin.left / 2 - 70)
                .attr('transform', 'rotate(-90)')
                .text("Number of Employees (in thousands) vs PPI(base 2012)");

            var legend = svg.append("g")
                .attr("transform", "translate(" + (30) + "," + 30 + ")");

            legend.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 20)
                .attr("y2", 0)
                .attr("stroke-width", 3)
                .attr("stroke", "blue");

            legend.append("text")
                .attr("x", 30)
                .attr("y", 4)
                .text("# of Employees");

            legend.append("line")
                .attr("x1", 0)
                .attr("y1", 20)
                .attr("x2", 20)
                .attr("y2", 20)
                .attr("stroke-width", 3)
                .attr("stroke", "orange");

            legend.append("text")
                .attr("x", 30)
                .attr("y", 24)
                .text("PPI");


        })

        // Function to update the chart based on selected year
        function updateChart(year) {
            d3.select('#pieChart').selectAll("*").remove();

            var employeeBySex = [
                { "year": 2018, "female": 83.45, "male": 54.58 },
                { "year": 2019, "female": 87.35, "male": 52.42 },
                { "year": 2020, "female": 84.22, "male": 46.79 },
                { "year": 2021, "female": 89.54, "male": 46.92 },
                { "year": 2022, "female": 83.91, "male": 49.28 }
            ];

            var years = employeeBySex.map(d => d.year);
            var selectedData = employeeBySex.find(d => d.year === year);

            var width = document.getElementById("pieChart").clientWidth;
            var height = document.getElementById("pieChart").clientHeight;


            var pie = d3.pie().value(d => d);
            var data_ready = pie(selectedData);

            var color = d3.scaleOrdinal()
                .domain(data_ready.map(d => d.data.key))
                .range(["#ff9999", "#66b3ff"]);

            var radius = width / 3;
            var arc = d3.arc().outerRadius(radius).innerRadius(radius * 0.6);
            var outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9)

            var svg = d3.select("#pieChart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var dataValues = [selectedData.female, selectedData.male];

            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function (event, d) {
                tooltip.style("opacity", 1)
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
                var employees = d.data;
                var percentage = employees / (selectedData.female + selectedData.male) * 100;
                tooltip
                    .html("Employees: " + employees + "<br>" + "Percentage: " + percentage.toFixed(2) + "%")
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            }

            var mouseout = function (d) {
                tooltip
                    .style("opacity", 0)
                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
            }

            var arcs = svg.selectAll("arc")
                .data(pie(dataValues))
                .enter()
                .append("g")
                .attr("class", "arc")
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);

            var legendColors = ['#ff9999', '#66b3ff']; // Colors corresponding to female and male
            const legend = svg.selectAll('.legend')
                .data(legendColors)
                .enter()
                .append('g')
                .attr('class', 'legend');

            legend.append('rect')
                .attr('width', 18)
                .attr('height', 18)
                .attr('x', -(width / 2) + 20)
                .attr('y', function (d, i) { return -150 + i * 30 })
                .style('fill', function (d, i) { return legendColors[i]; });

            legend.append('text')
                .attr('x', -(width / 2) + 40)
                .attr('y', function (d, i) { return -140 + i * 30 })
                .attr('dy', '.35em')
                .style('text-anchor', 'start')
                .text(function (d, i) { return i === 0 ? 'Female' : 'Male'; });
        }

        // Initial chart rendering
        var selectedYear = 2022;
        updateChart(selectedYear);

        // Event listener for dropdown change
        d3.select("#yearSelector")
            .on("change", function () {
                selectedYear = +this.value; // Convert the selected value to a number
                updateChart(selectedYear);
            })

    }
}
</script>

<style>
#bar-chart {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Style the bars */
.men-arc {
    fill: #66b3ff;
    /* Blue for UK */
}

/* Style the US bars */
.women-arc {
    fill: #ff9999;
    /* Red for US */
}

/* Style the x, y-axis labels */
.x-axis-label {
    font-size: 16px;
    text-anchor: middle;
    font-weight: bold;
}

.y-axis-label {
    font-size: 14px;
    text-anchor: middle;
    font-weight: bold;
}

/* Style the axis lines */
.axis path,
.axis line {
    fill: none;
    shape-rendering: crispEdges;
}

.x-axis-grid,
.y-axis-grid {
    stroke: gray;
    stroke-opacity: 0.2;
}

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

.container {
    height: 100%;
}

.card-title {
    text-align: center;
}

.card-text {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}

.mt-4 {
    height: 80%;
}

.tooltip {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 12px;
    pointer-events: none;
}

.country-text {
    font-size: 1.2em;
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
    height: 100%;
    /*align-items: flex;*/
}

.stat-title {
    font-size: 24px;
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

.home-stat-card {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: flex;*/
}
</style>