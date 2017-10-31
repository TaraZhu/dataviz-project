import {details} from "./detailsData.js"

function getRatio(side) {
    return (( margin[side] / width ) * 100 + 1) + "%";
}

var margin = {left: 30, top: 20, right: 30, bottom: 20},
    width = 960 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom,
    marginRatio = {
        left: getRatio("left"),
        top: getRatio("top"),
        right: getRatio("right"),
        bottom: getRatio("bottom")
    };

//
// Multi-Series line chart begins here
//

var parseDate = d3.timeParse("%Y");

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var numline = d3.line()
    .x(function (d) {
        return x(d.Year);
    })
    .y(function (d) {
        return y(d.Deaths);
    });

var svg_lineChart = d3.select("div#lineChart")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", marginRatio.top + " " + marginRatio.right + " " + marginRatio.bottom + " " + marginRatio.left)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder")
    .append("g")
    .attr("transform", "translate(" + 2 + "," + 2 + ")");

// change style on click

var currentOpacity = 0.8,
    currentStrokeWidth = 2,
    currentFontWeight = 400,
    currentFontSize = "0.9em";
var eleClicked = false; // if any element is clicked
var activeElement = 0;

// variables for bar chart

var barChartData = [],
    barChartSingleYear = [];

// variables and functions inside onClickToggle()

var causeNames = {
    AllOtherCauses: "All Other Causes",
    DiabetesMellitus: "Diabetes Mellitus",
    DiseasesofHeart: "Diseases of Heart",
    InfluenzaandPneumonia: "Influenza and Pneumonia",
    MalignantNeoplasms: "Malignant Neoplasms"
}
function switchData(activeElement){ // on change disease
    barChartData = []; // reset
    for (var i in details) {
        if (causeNames[activeElement] === details[i].Cause) {
            barChartData.push(details[i]);
        }
    }
}

// onClick -- toggle

function onClickToggle() {
    var obj = this;
    var ifClicked = d3.selectAll("." + obj.className.baseVal).attr("data-click"),   // if the select element is clicked, string
        currentElement = obj.className.baseVal;
    function restyle(obj) {
        currentOpacity = currentOpacity == 0.8 ? 1.0 : 0.8;
        currentStrokeWidth = currentStrokeWidth == 2 ? 4 : 2;
        currentFontWeight = currentFontWeight == 400 ? 600 : 400;
        currentFontSize = currentFontSize == "0.9em" ? "1.2em" : "0.9em";
        ifClicked = !ifClicked; // switch clicked states of selected elements
        eleClicked = ifClicked; // switch clicked states of global elements
        d3.selectAll("." + obj.className.baseVal)
            .style("opacity", currentOpacity)
            .style("stroke-width", currentStrokeWidth)
            .style("font-weight", currentFontWeight)
            .style("font-size", currentFontSize)
            .attr("data-click", ifClicked);
        activeElement = activeElement == obj.className.baseVal ? 0 : obj.className.baseVal;
    }
    if (eleClicked.toString() === ifClicked.toString() && currentElement === activeElement) {
        restyle(obj);
        switchData(activeElement);
    } else if (eleClicked.toString() === ifClicked.toString() && activeElement === 0) {
        restyle(obj);
        switchData(activeElement);
        handler(2007);  // update bar chart when change disease
    }
}

// Render Multi-Series Line Chart

d3.csv("./data/NY_Death.csv", function (error, data) {
    data.forEach(function (d) {
        d.Year = parseDate(d.Year);
        d.Deaths = +d.Deaths;
    });

    x.domain(d3.extent(data, function (d) {
        return d.Year;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.Deaths;
    })]);

    var dataNest = d3.nest()
        .key(function (d) {
            return d.Cause;
        })
        .entries(data);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var legendSpace = width / dataNest.length;

    dataNest.forEach(function (d, i) {

        svg_lineChart.append("path")
            .style("stroke", function () {
                return d.color = color(d.key);
            })
            .style("opacity", 0.8)
            .attr("data-click", false)
            .attr("stroke-width", 2)
            .attr("class", "line")
            .attr("class", d.key.replace(/\s+/g, ""))
            .attr("id", "tag" + d.key.replace(/\s+/g, ''))
            .attr("d", numline(d.values));

        svg_lineChart.append("text")
            .style("opacity", 0.8)
            .style("cursor", "pointer")
            .style("font-weight", 400)
            .style("font-size", "0.9em")
            .style("fill", function () {
                return d.color = color(d.key);
            })
            .attr("data-click", false)
            .attr("transform", "translate(" + (-90) + "," + 0 + ")")
            .attr("class", "legend")
            .attr("class", d.key.replace(/\s+/g, ""))
            .attr("id", "text" + d.key.replace(/\s+/g, ""))
            .attr("x", (legendSpace / 2) + i * legendSpace)
            .attr("y", height + (margin.bottom / 2) + 35)
            .text(d.key)
            .on("click", onClickToggle);

    });

    svg_lineChart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg_lineChart.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

});

//
// Slider and bar chart begin here
//

var svg_groupedBarChart = d3.select("div#groupedBarChart")
    .append("div")
    .attr("id", "svg-container")
    .append("svg")
    .style("padding", marginRatio.top + " " + marginRatio.right + " " + marginRatio.bottom + " " + marginRatio.left)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
    .attr("id", "svg-content-responsive")
    .attr("class", "graph-svg-placeholder");

var slider_x = d3.scaleLinear()
    .domain([2007, 2014])
    .range([0, 840 - margin.left - margin.right])
    .clamp(true);

var slider = svg_groupedBarChart.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + 50 + "," + 30 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", slider_x.range()[0])
    .attr("x2", slider_x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { handler(slider_x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 30 + ")")
    .selectAll("text")
    .data(slider_x.ticks(8))
    .enter().append("text")
    .attr("x", slider_x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });


function updateBarChart(disease, year){
    barChartSingleYear = []; // reset
    for (var i in barChartData) {
        if (barChartData[i].Year === year) {
            barChartSingleYear.push(barChartData[i]);
        }
    }
    console.log(barChartSingleYear);

    drawBarChart(barChartSingleYear);
}

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 8);

function handler(h) {
    h = Math.round(h);
    handle.attr("cx", slider_x(h));
    if (causeNames[activeElement]) {
        updateBarChart(causeNames[activeElement], h);
    }
}



function drawBarChart(barChartSingleYear){
    d3.selectAll(".bar").remove(); // reset

    // Reformat data, horrible performance but let's finish the job first
    var data = [];
    function formatData(barChartSingleYear){
        var race = [];
        for (var i in barChartSingleYear) {
            if (race.indexOf(barChartSingleYear[i].Race) == -1) {
                race.push(barChartSingleYear[i].Race);
                var currentItem = {
                    Race : "",
                    Male: 0,
                    Female: 0
                };
                currentItem.Race = barChartSingleYear[i].Race;
                if (barChartSingleYear[i].Sex == "Male") {
                    currentItem.Male = barChartSingleYear[i].Deaths;
                } else if (barChartSingleYear[i].Sex == "Female"){
                    currentItem.Female = barChartSingleYear[i].Deaths;
                }
                data.push(currentItem);
            } else {
                for (var j in data) {
                    if (data[j].Race == barChartSingleYear[i].Race) {
                        if (barChartSingleYear[i].Sex == "Male") {
                            data[j].Male = barChartSingleYear[i].Deaths;
                        } else if (barChartSingleYear[i].Sex == "Female"){
                            data[j].Female = barChartSingleYear[i].Deaths;
                        }
                    }
                }
            }
        }
        // sort data by race
        var byRace = data.slice(0);
        byRace.sort(function(a,b){
            var x = a.Race.toLowerCase(),
                y = b.Race.toLowerCase();
            return x > y ? -1 : x < y ? 1 : 0;
        });
        data = byRace;
        data.columns = ["Race", "Male", "Female"];
    }
    formatData(barChartSingleYear);
    console.log(data);

    // Append bar chart
    var bar = svg_groupedBarChart.append("g")
        .attr("class", "bar")
        .attr("transform", "translate(" + 50 + "," + 130 + ")");

    var x0 = d3.scaleBand()
        .rangeRound([0, 840 - margin.left - margin.right])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height - 100, 0]);  // height: 400

    var z = d3.scaleOrdinal()
        .range(["#92c5de", "#f4a582"]);

    var keys = data.columns.slice(1);

    x0.domain(data.map(function(d) { return d.Race; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

    bar.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
          .attr("transform", function(d) { return "translate(" + x0(d.Race) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
          .attr("x", function(d) { return x1(d.key); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", x1.bandwidth())
          .attr("height", function(d) { return height - 100 - y(d.value); })
          .attr("fill", function(d) { return z(d.key); });

    bar.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - 100) + ")")
        .call(d3.axisBottom(x0));

    bar.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.8em")
        .attr("fill", "#000")
        .attr("font-weight", 600)
        .attr("text-anchor", "start")
        .text("Deaths");

    var legend = bar.append("g")
        .attr("font-size", "0.9em")
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 100 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 100 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.8em")
        .attr("transform", "translate(0," + (-5) + ")")
        .text(function(d) { 
          return d; 
        });

}

