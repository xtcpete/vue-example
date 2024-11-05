<template>
  <div class="OwnershipChart">
    <h1 class="title">Pet Ownership in the U.S.</h1>
        <div class="row">
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Households owning a pet</div>
                        <span class="stat-icon">🏠</span>
                    </div>
                    <div class="stat-number">90.5M</div>
                </div>
            </div>
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Number of owned dogs</div>
                        <span class="stat-icon">🐶</span>
                    </div>
                    <div class="stat-number">78.0M</div>
                </div>
            </div>
            <!-- Sale Card -->
            <div class="col">
                <div class="stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Number of owned <br>cats</div>
                        <span class="stat-icon">🐱</span>
                    </div>
                    <div class="stat-number">85.8M</div>
                </div>
            </div>

        </div>

        <br>

        <div class="card">
            <div class="card-body">
                <h4>Number of U.S. Households That Own a Pet, by Type of Animal (millions)</h4>
                <svg id="households" width=100% height=400></svg>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-body">
                <h4>Sources of Dogs and Cats (millions)</h4>
                <svg id="sources" width=100% height=600></svg>
            </div>
        </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'OwenershipChart',
  mounted: function () {
    d3.csv("households.csv").then(function (data) {
    
    d3.select("#households").selectAll("*").remove();

    var height =document.getElementById("households").clientHeight;
    var width = document.getElementById("households").clientWidth;
    
    const margin = { top: 10, right: 150, bottom: 30, left: 50 }
        
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    const svg = d3.select("#households")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const sumstat = d3.group(data, d => d.pet);

    const x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.year; }))
        .range([0, width]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "12px")
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format('.0f')));

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.household; })])
        .range([height, 0]);

    svg.append("g")
        .style("font-size", "12px")
        .call(d3.axisLeft(y));

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    svg.selectAll(".line")
        .data(sumstat)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", function (d) { return color(d[0]) })
        .attr("stroke-width", 3)
        .attr("d", function (d) {
            return d3.line()
                .x(function (d) { return x(d.year); })
                .y(function (d) { return y(+d.household); })
                (d[1])
        })
        .attr("class", "line")
        .attr("opacity", 1)

    svg.selectAll("legend_lines")
        .data(sumstat.keys())
        .enter()
        .append("line")
        .attr("x1", width + 10)
        .attr("y1", function (d, i) { return 5 + i * 30 })
        .attr("x2", width + 40)
        .attr("y2", function (d, i) { return 5 + i * 30 })
        .style("stroke", function (d) { return color(d) })
        .attr("stroke-width", 3)

    svg.selectAll("legend_labels")
        .data(sumstat.keys())
        .enter()
        .append("text")
        .attr("x", width + 50)
        .attr("y", function (d, i) { return 5 + i * 30 })
        .style("fill", function (d) { return color(d) })
        .text(function (d) { return d })
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
        .on("mouseover", function (event, d) {
            var selectedCategory = d;
            svg.selectAll(".line")
            .transition()
            .delay(100)
            .attr("opacity", function(d) {
                return (d[0] === selectedCategory) ? 1 : 0.2
            });
        })
        .on("mouseout", function(){
            svg.selectAll(".line")
            .transition()
            .delay(100)
            .attr("opacity", 1);
        })

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + 25)
        .text("Year")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -80)
        .text("No. of U.S. households(millions)")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
})

d3.json("sources.json").then(function (data) {

    d3.select("#sources").selectAll("*").remove();

    var height =document.getElementById("sources").clientHeight;
    var width = document.getElementById("sources").clientWidth;

    const margin = { top: 10, right:0, bottom: 10, left: 10 }

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    const svg = d3.select("#sources")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    const root = d3.hierarchy(data).sum(function (d) { return d.value })

    d3.treemap()
        .size([width, height])
        .paddingTop(28)
        .paddingRight(7)
        .paddingInner(3)
        (root)

    const format = d3.format(".2f");

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const scale = d3.scaleLinear()
        .domain([0, 40])
        .range([10, 20]);

    const opacity = d3.scaleLinear()
        .domain([0, 40])
        .range([.5, 1])

    svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", function (d) { return color(d.parent.data.name) })
        .style("opacity", function (d) { return opacity(d.data.value) })

    svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 3 })
        .attr("y", function (d) { return d.y0 + 17 })
        .text(function (d) { return d.data.name })
        .attr("font-size", d => scale(d.data.value) + "px")
        .attr("fill", "white")

    svg
        .selectAll("vals")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.y1 - d.y0 > 30 ? d.x0 + 3 : d.x0 + 50})
        .attr("y", function (d) { return d.y1 - d.y0 > 30 ? d.y0 + 30 : d.y0 + 17})
        .text(function (d) { return format(d.data.value) })
        .attr("font-size", "11px")
        .attr("fill", "white")
    
    console.log(root.leaves());

    svg
        .selectAll("titles")
        .data(root.descendants().filter(function (d) { return d.depth == 1 }))
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 })
        .attr("y", function (d) { return d.y0 + 15 })
        .text(function (d) { return d.data.name })
        .attr("font-size", "19px")
        .attr("fill", function (d) { return color(d.data.name) })
})

  }
}
</script>

<style>
.container{
    height: 100%;
    width: 100vh;
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

.card-title{
    text-align: center;
}

.card-text{
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}

.mt-4{
    height: 80%;
}

.tooltip {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 12px;
    pointer-events: none;
    z-index: 99999;
}

.country-text{
    font-size: 1.2em;
}
</style>