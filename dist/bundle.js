/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__detailsData_js__ = __webpack_require__(1);


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
    for (var i in __WEBPACK_IMPORTED_MODULE_0__detailsData_js__["a" /* details */]) {
        if (causeNames[activeElement] === __WEBPACK_IMPORTED_MODULE_0__detailsData_js__["a" /* details */][i].Cause) {
            barChartData.push(__WEBPACK_IMPORTED_MODULE_0__detailsData_js__["a" /* details */][i]);
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



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return details; });
var details = [
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 1680,
    DeathRate: 117.1,
    AgeAdjustedDeathRate: 81.5
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 988,
    DeathRate: 90.6,
    AgeAdjustedDeathRate: 142.6
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 1749,
    DeathRate: 130.7,
    AgeAdjustedDeathRate: 115.9
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1163,
    DeathRate: 136.5,
    AgeAdjustedDeathRate: 162.4
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 221,
    DeathRate: 45.7,
    AgeAdjustedDeathRate: 61.2
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 182,
    DeathRate: 35.3,
    AgeAdjustedDeathRate: 44.6
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1230,
    DeathRate: 116.8,
    AgeAdjustedDeathRate: 113.4
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 43,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 27,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 820,
    DeathRate: 70.2,
    AgeAdjustedDeathRate: 85.6
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 15,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 24,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 67,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 1706,
    DeathRate: 118.9,
    AgeAdjustedDeathRate: 78.6
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1268,
    DeathRate: 121,
    AgeAdjustedDeathRate: 116.1
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 19,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 1824,
    DeathRate: 135.9,
    AgeAdjustedDeathRate: 119.9
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 42,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 214,
    DeathRate: 40.2,
    AgeAdjustedDeathRate: 50.3
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1069,
    DeathRate: 96.7,
    AgeAdjustedDeathRate: 139.5
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 885,
    DeathRate: 74.9,
    AgeAdjustedDeathRate: 90.2
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1216,
    DeathRate: 143.2,
    AgeAdjustedDeathRate: 163.5
  },
  {
    Year: 2008,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 238,
    DeathRate: 47.8,
    AgeAdjustedDeathRate: 63.3
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 220,
    DeathRate: 40.1,
    AgeAdjustedDeathRate: 48.9
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 1818,
    DeathRate: 135.1,
    AgeAdjustedDeathRate: 118.5
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 55,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1305,
    DeathRate: 124.6,
    AgeAdjustedDeathRate: 117.3
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 220,
    DeathRate: 43.1,
    AgeAdjustedDeathRate: 56.1
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 18,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1067,
    DeathRate: 95,
    AgeAdjustedDeathRate: 138.1
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 26,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 1684,
    DeathRate: 117.2,
    AgeAdjustedDeathRate: 77.2
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1246,
    DeathRate: 146.7,
    AgeAdjustedDeathRate: 167.7
  },
  {
    Year: 2009,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 775,
    DeathRate: 64.7,
    AgeAdjustedDeathRate: 75.3
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 32,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 308,
    DeathRate: 59.2,
    AgeAdjustedDeathRate: 77.2
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 27,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 238,
    DeathRate: 42.3,
    AgeAdjustedDeathRate: 51.6
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 2034,
    DeathRate: 151.6,
    AgeAdjustedDeathRate: 130.9
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 18,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 2140,
    DeathRate: 149.7,
    AgeAdjustedDeathRate: 93.9
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 25,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1007,
    DeathRate: 82.7,
    AgeAdjustedDeathRate: 94.6
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1326,
    DeathRate: 126.5,
    AgeAdjustedDeathRate: 117.4
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1167,
    DeathRate: 102.1,
    AgeAdjustedDeathRate: 150
  },
  {
    Year: 2010,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1230,
    DeathRate: 144.5,
    AgeAdjustedDeathRate: 166.2
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 14,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1025,
    DeathRate: 83.7,
    AgeAdjustedDeathRate: 94.8
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 2165,
    DeathRate: 162.3,
    AgeAdjustedDeathRate: 139.5
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 38,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 38,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 27,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 2445,
    DeathRate: 172.6,
    AgeAdjustedDeathRate: 105.4
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 278,
    DeathRate: 48.7,
    AgeAdjustedDeathRate: 57.4
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1337,
    DeathRate: 156.7,
    AgeAdjustedDeathRate: 181.7
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1207,
    DeathRate: 104.7,
    AgeAdjustedDeathRate: 151.1
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 340,
    DeathRate: 64.3,
    AgeAdjustedDeathRate: 85.1
  },
  {
    Year: 2011,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1473,
    DeathRate: 140.7,
    AgeAdjustedDeathRate: 128.8
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1320,
    DeathRate: 154.3,
    AgeAdjustedDeathRate: 175
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 24,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 78,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 333,
    DeathRate: 61.6,
    AgeAdjustedDeathRate: 79.7
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1199,
    DeathRate: 102.6,
    AgeAdjustedDeathRate: 150.5
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 327,
    DeathRate: 56,
    AgeAdjustedDeathRate: 65
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 2444,
    DeathRate: 172.3,
    AgeAdjustedDeathRate: 105.1
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 53,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 22,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1109,
    DeathRate: 89.5,
    AgeAdjustedDeathRate: 98.8
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 2316,
    DeathRate: 172.9,
    AgeAdjustedDeathRate: 145.7
  },
  {
    Year: 2012,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1483,
    DeathRate: 141.9,
    AgeAdjustedDeathRate: 127.3
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1557,
    DeathRate: 149.1,
    AgeAdjustedDeathRate: 129.5
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 79,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 39,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 139,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 2595,
    DeathRate: 182.5,
    AgeAdjustedDeathRate: 111.1
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1193,
    DeathRate: 101,
    AgeAdjustedDeathRate: 146.4
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 2293,
    DeathRate: 170.3,
    AgeAdjustedDeathRate: 143.3
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 395,
    DeathRate: 71.3,
    AgeAdjustedDeathRate: 89.8
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1082,
    DeathRate: 86.7,
    AgeAdjustedDeathRate: 94
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1341,
    DeathRate: 156.3,
    AgeAdjustedDeathRate: 175.7
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 42,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 320,
    DeathRate: 53.3,
    AgeAdjustedDeathRate: 59
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 424,
    DeathRate: 73.9,
    AgeAdjustedDeathRate: 90.4
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 96,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 48,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 59,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 74,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1195,
    DeathRate: 100.1,
    AgeAdjustedDeathRate: 143.3
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1135,
    DeathRate: 89.6,
    AgeAdjustedDeathRate: 96
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 339,
    DeathRate: 54.2,
    AgeAdjustedDeathRate: 59
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 2578,
    DeathRate: 181.9,
    AgeAdjustedDeathRate: 110.7
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1375,
    DeathRate: 159.3,
    AgeAdjustedDeathRate: 177.8
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1536,
    DeathRate: 146.4,
    AgeAdjustedDeathRate: 126.4
  },
  {
    Year: 2014,
    Cause: 'All Other Causes',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 2275,
    DeathRate: 169.4,
    AgeAdjustedDeathRate: 141.3
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 205,
    DeathRate: 17.6,
    AgeAdjustedDeathRate: 22.6
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 246,
    DeathRate: 28.9,
    AgeAdjustedDeathRate: 38.1
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 47,
    DeathRate: 9.7,
    AgeAdjustedDeathRate: 13.6
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 9,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 358,
    DeathRate: 34,
    AgeAdjustedDeathRate: 32.5
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 34,
    DeathRate: 6.6,
    AgeAdjustedDeathRate: 8.3
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 177,
    DeathRate: 16.2,
    AgeAdjustedDeathRate: 27.6
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 237,
    DeathRate: 17.7,
    AgeAdjustedDeathRate: 15
  },
  {
    Year: 2007,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 231,
    DeathRate: 16.1,
    AgeAdjustedDeathRate: 9.8
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 210,
    DeathRate: 14.6,
    AgeAdjustedDeathRate: 8.8
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 191,
    DeathRate: 17.3,
    AgeAdjustedDeathRate: 31.3
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 380,
    DeathRate: 36.3,
    AgeAdjustedDeathRate: 34.3
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 246,
    DeathRate: 18.3,
    AgeAdjustedDeathRate: 15.6
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 265,
    DeathRate: 31.2,
    AgeAdjustedDeathRate: 40.2
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 12,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 52,
    DeathRate: 10.4,
    AgeAdjustedDeathRate: 14.9
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 228,
    DeathRate: 19.3,
    AgeAdjustedDeathRate: 24.1
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 47,
    DeathRate: 8.8,
    AgeAdjustedDeathRate: 11.3
  },
  {
    Year: 2008,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 290,
    DeathRate: 21.6,
    AgeAdjustedDeathRate: 18.2
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 215,
    DeathRate: 18,
    AgeAdjustedDeathRate: 22.2
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 384,
    DeathRate: 36.7,
    AgeAdjustedDeathRate: 33.7
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 229,
    DeathRate: 15.9,
    AgeAdjustedDeathRate: 9.5
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 55,
    DeathRate: 10,
    AgeAdjustedDeathRate: 12.7
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 285,
    DeathRate: 33.6,
    AgeAdjustedDeathRate: 41.4
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 48,
    DeathRate: 9.4,
    AgeAdjustedDeathRate: 13.3
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 172,
    DeathRate: 15.3,
    AgeAdjustedDeathRate: 25.4
  },
  {
    Year: 2009,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 384,
    DeathRate: 36.6,
    AgeAdjustedDeathRate: 33
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 219,
    DeathRate: 18,
    AgeAdjustedDeathRate: 21.5
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 5,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 51,
    DeathRate: 9.1,
    AgeAdjustedDeathRate: 11.3
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 279,
    DeathRate: 32.8,
    AgeAdjustedDeathRate: 41
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 64,
    DeathRate: 12.3,
    AgeAdjustedDeathRate: 15.5
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 5,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 7,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 187,
    DeathRate: 16.4,
    AgeAdjustedDeathRate: 27.3
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 258,
    DeathRate: 18,
    AgeAdjustedDeathRate: 11.1
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 245,
    DeathRate: 18.3,
    AgeAdjustedDeathRate: 15.6
  },
  {
    Year: 2010,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 7,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 196,
    DeathRate: 16,
    AgeAdjustedDeathRate: 18.5
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 258,
    DeathRate: 19.3,
    AgeAdjustedDeathRate: 16.3
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 51,
    DeathRate: 8.9,
    AgeAdjustedDeathRate: 10.7
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 307,
    DeathRate: 36,
    AgeAdjustedDeathRate: 43.9
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 14,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 60,
    DeathRate: 11.4,
    AgeAdjustedDeathRate: 14.3
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 7,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 253,
    DeathRate: 17.9,
    AgeAdjustedDeathRate: 11.1
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 200,
    DeathRate: 17.3,
    AgeAdjustedDeathRate: 29.2
  },
  {
    Year: 2011,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 410,
    DeathRate: 39.2,
    AgeAdjustedDeathRate: 34.7
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 9,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 240,
    DeathRate: 16.9,
    AgeAdjustedDeathRate: 10.3
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 409,
    DeathRate: 39.1,
    AgeAdjustedDeathRate: 33.8
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 57,
    DeathRate: 9.8,
    AgeAdjustedDeathRate: 11.4
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 200,
    DeathRate: 16.1,
    AgeAdjustedDeathRate: 18.4
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 308,
    DeathRate: 36,
    AgeAdjustedDeathRate: 42.9
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 15,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 194,
    DeathRate: 16.6,
    AgeAdjustedDeathRate: 26.1
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 76,
    DeathRate: 14.1,
    AgeAdjustedDeathRate: 18
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 292,
    DeathRate: 21.8,
    AgeAdjustedDeathRate: 18.1
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 300,
    DeathRate: 35,
    AgeAdjustedDeathRate: 41.1
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 410,
    DeathRate: 39.3,
    AgeAdjustedDeathRate: 33.1
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 192,
    DeathRate: 16.3,
    AgeAdjustedDeathRate: 24.9
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 96,
    DeathRate: 17.3,
    AgeAdjustedDeathRate: 21.1
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 19,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 60,
    DeathRate: 10,
    AgeAdjustedDeathRate: 10.9
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 265,
    DeathRate: 19.7,
    AgeAdjustedDeathRate: 16.4
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 15,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 238,
    DeathRate: 16.7,
    AgeAdjustedDeathRate: 10.4
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 10,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 17,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 221,
    DeathRate: 17.7,
    AgeAdjustedDeathRate: 19.6
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 71,
    DeathRate: 12.4,
    AgeAdjustedDeathRate: 14.2
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 292,
    DeathRate: 21.7,
    AgeAdjustedDeathRate: 18.1
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 209,
    DeathRate: 16.5,
    AgeAdjustedDeathRate: 17.9
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 50,
    DeathRate: 8,
    AgeAdjustedDeathRate: 8.5
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 318,
    DeathRate: 36.8,
    AgeAdjustedDeathRate: 42.2
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 18,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 228,
    DeathRate: 16.1,
    AgeAdjustedDeathRate: 10
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 398,
    DeathRate: 37.9,
    AgeAdjustedDeathRate: 31.6
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 9,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diabetes Mellitus',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 186,
    DeathRate: 15.6,
    AgeAdjustedDeathRate: 23.2
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 2121,
    DeathRate: 248.9,
    AgeAdjustedDeathRate: 340.2
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1418,
    DeathRate: 121.5,
    AgeAdjustedDeathRate: 164.3
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 496,
    DeathRate: 102.5,
    AgeAdjustedDeathRate: 157.8
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 428,
    DeathRate: 83.1,
    AgeAdjustedDeathRate: 115.2
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2722,
    DeathRate: 258.6,
    AgeAdjustedDeathRate: 247.3
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 86,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 43,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 5632,
    DeathRate: 421,
    AgeAdjustedDeathRate: 350.7
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 36,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 7050,
    DeathRate: 491.4,
    AgeAdjustedDeathRate: 250.7
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1327,
    DeathRate: 121.7,
    AgeAdjustedDeathRate: 238.4
  },
  {
    Year: 2007,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 82,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1330,
    DeathRate: 120.3,
    AgeAdjustedDeathRate: 228
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 2077,
    DeathRate: 244.6,
    AgeAdjustedDeathRate: 330.2
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 5503,
    DeathRate: 410,
    AgeAdjustedDeathRate: 342.3
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 6836,
    DeathRate: 476.2,
    AgeAdjustedDeathRate: 245.5
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2725,
    DeathRate: 260.1,
    AgeAdjustedDeathRate: 243.6
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 456,
    DeathRate: 85.6,
    AgeAdjustedDeathRate: 117.7
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 546,
    DeathRate: 109.6,
    AgeAdjustedDeathRate: 166.3
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 39,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 92,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 108,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1445,
    DeathRate: 122.3,
    AgeAdjustedDeathRate: 160.7
  },
  {
    Year: 2008,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 35,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1382,
    DeathRate: 123.1,
    AgeAdjustedDeathRate: 227.9
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 448,
    DeathRate: 81.6,
    AgeAdjustedDeathRate: 108.7
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 40,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 38,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 94,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 554,
    DeathRate: 108.5,
    AgeAdjustedDeathRate: 158.8
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 5168,
    DeathRate: 384.2,
    AgeAdjustedDeathRate: 319.8
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 111,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2535,
    DeathRate: 242.1,
    AgeAdjustedDeathRate: 220.9
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1349,
    DeathRate: 112.7,
    AgeAdjustedDeathRate: 143.8
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 2068,
    DeathRate: 243.5,
    AgeAdjustedDeathRate: 318.9
  },
  {
    Year: 2009,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 6297,
    DeathRate: 438.3,
    AgeAdjustedDeathRate: 226.2
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 5351,
    DeathRate: 374.2,
    AgeAdjustedDeathRate: 189.2
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 2015,
    DeathRate: 236.7,
    AgeAdjustedDeathRate: 307.7
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 478,
    DeathRate: 91.8,
    AgeAdjustedDeathRate: 130
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 394,
    DeathRate: 70.1,
    AgeAdjustedDeathRate: 89.7
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1316,
    DeathRate: 108.1,
    AgeAdjustedDeathRate: 133.2
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2282,
    DeathRate: 217.7,
    AgeAdjustedDeathRate: 194.2
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 4495,
    DeathRate: 335.1,
    AgeAdjustedDeathRate: 277
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1354,
    DeathRate: 118.5,
    AgeAdjustedDeathRate: 215.5
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 70,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 50,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 70,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 52,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1201,
    DeathRate: 104.2,
    AgeAdjustedDeathRate: 180.8
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1840,
    DeathRate: 215.7,
    AgeAdjustedDeathRate: 268.3
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 402,
    DeathRate: 70.5,
    AgeAdjustedDeathRate: 86.1
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2243,
    DeathRate: 214.3,
    AgeAdjustedDeathRate: 186.7
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 43,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 31,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 42,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 4220,
    DeathRate: 316.4,
    AgeAdjustedDeathRate: 260.2
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1348,
    DeathRate: 110,
    AgeAdjustedDeathRate: 131.8
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 62,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 452,
    DeathRate: 85.5,
    AgeAdjustedDeathRate: 117.8
  },
  {
    Year: 2011,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 5016,
    DeathRate: 354.1,
    AgeAdjustedDeathRate: 179.8
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 402,
    DeathRate: 68.8,
    AgeAdjustedDeathRate: 81.2
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1263,
    DeathRate: 102,
    AgeAdjustedDeathRate: 118.4
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1251,
    DeathRate: 107.1,
    AgeAdjustedDeathRate: 182.5
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 76,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 39,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 4719,
    DeathRate: 332.7,
    AgeAdjustedDeathRate: 167.7
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 99,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 469,
    DeathRate: 86.8,
    AgeAdjustedDeathRate: 116.9
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 48,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1940,
    DeathRate: 226.8,
    AgeAdjustedDeathRate: 280.7
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 4156,
    DeathRate: 310.3,
    AgeAdjustedDeathRate: 252.4
  },
  {
    Year: 2012,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2269,
    DeathRate: 217.1,
    AgeAdjustedDeathRate: 183.9
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2365,
    DeathRate: 226.4,
    AgeAdjustedDeathRate: 187.3
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 4535,
    DeathRate: 319,
    AgeAdjustedDeathRate: 160.6
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1307,
    DeathRate: 110.7,
    AgeAdjustedDeathRate: 183.3
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 437,
    DeathRate: 72.8,
    AgeAdjustedDeathRate: 81.8
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1868,
    DeathRate: 217.7,
    AgeAdjustedDeathRate: 258.5
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 41,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 106,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 72,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 531,
    DeathRate: 95.8,
    AgeAdjustedDeathRate: 123.7
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 4085,
    DeathRate: 303.5,
    AgeAdjustedDeathRate: 244.3
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 151,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1261,
    DeathRate: 101,
    AgeAdjustedDeathRate: 113.6
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 115,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1958,
    DeathRate: 226.8,
    AgeAdjustedDeathRate: 264.7
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1281,
    DeathRate: 107.3,
    AgeAdjustedDeathRate: 170.5
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 462,
    DeathRate: 73.8,
    AgeAdjustedDeathRate: 81.1
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 95,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 68,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 4507,
    DeathRate: 318,
    AgeAdjustedDeathRate: 161
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3990,
    DeathRate: 297.1,
    AgeAdjustedDeathRate: 238.4
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 2194,
    DeathRate: 209.1,
    AgeAdjustedDeathRate: 169.1
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 63,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1230,
    DeathRate: 97.1,
    AgeAdjustedDeathRate: 106.7
  },
  {
    Year: 2014,
    Cause: 'Diseases of Heart',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 554,
    DeathRate: 96.5,
    AgeAdjustedDeathRate: 118.5
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 295,
    DeathRate: 28,
    AgeAdjustedDeathRate: 26.9
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 190,
    DeathRate: 16.3,
    AgeAdjustedDeathRate: 22.3
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 530,
    DeathRate: 39.6,
    AgeAdjustedDeathRate: 32.9
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 659,
    DeathRate: 45.9,
    AgeAdjustedDeathRate: 23.2
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 13,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 58,
    DeathRate: 11.3,
    AgeAdjustedDeathRate: 15.8
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 229,
    DeathRate: 26.9,
    AgeAdjustedDeathRate: 40.1
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 189,
    DeathRate: 17.3,
    AgeAdjustedDeathRate: 36.7
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 66,
    DeathRate: 13.6,
    AgeAdjustedDeathRate: 25.7
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 7,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 222,
    DeathRate: 26.1,
    AgeAdjustedDeathRate: 37.6
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 529,
    DeathRate: 39.4,
    AgeAdjustedDeathRate: 32.7
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 73,
    DeathRate: 13.7,
    AgeAdjustedDeathRate: 19.1
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 621,
    DeathRate: 43.3,
    AgeAdjustedDeathRate: 22.2
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 90,
    DeathRate: 18.1,
    AgeAdjustedDeathRate: 30.2
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 318,
    DeathRate: 30.4,
    AgeAdjustedDeathRate: 28.6
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 14,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 5,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 227,
    DeathRate: 19.2,
    AgeAdjustedDeathRate: 25.5
  },
  {
    Year: 2008,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 187,
    DeathRate: 16.9,
    AgeAdjustedDeathRate: 35.5
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 5,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 84,
    DeathRate: 16.5,
    AgeAdjustedDeathRate: 26.1
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 83,
    DeathRate: 15.1,
    AgeAdjustedDeathRate: 20.3
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 17,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 183,
    DeathRate: 16.3,
    AgeAdjustedDeathRate: 30.9
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 281,
    DeathRate: 26.8,
    AgeAdjustedDeathRate: 24.5
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 555,
    DeathRate: 41.3,
    AgeAdjustedDeathRate: 34.3
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 207,
    DeathRate: 24.4,
    AgeAdjustedDeathRate: 33.3
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 14,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 216,
    DeathRate: 18,
    AgeAdjustedDeathRate: 22.8
  },
  {
    Year: 2009,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 629,
    DeathRate: 43.8,
    AgeAdjustedDeathRate: 23.1
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 275,
    DeathRate: 26.2,
    AgeAdjustedDeathRate: 23.6
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 108,
    DeathRate: 20.7,
    AgeAdjustedDeathRate: 31.7
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 614,
    DeathRate: 45.8,
    AgeAdjustedDeathRate: 37.6
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 228,
    DeathRate: 18.7,
    AgeAdjustedDeathRate: 23.1
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 74,
    DeathRate: 13.2,
    AgeAdjustedDeathRate: 16.9
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 201,
    DeathRate: 23.6,
    AgeAdjustedDeathRate: 31.8
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 707,
    DeathRate: 49.4,
    AgeAdjustedDeathRate: 24.8
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 235,
    DeathRate: 20.6,
    AgeAdjustedDeathRate: 38.9
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 83,
    DeathRate: 14.5,
    AgeAdjustedDeathRate: 17.8
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 218,
    DeathRate: 17.8,
    AgeAdjustedDeathRate: 21.5
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 243,
    DeathRate: 28.5,
    AgeAdjustedDeathRate: 38
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 7,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 646,
    DeathRate: 48.4,
    AgeAdjustedDeathRate: 39.3
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 209,
    DeathRate: 18.1,
    AgeAdjustedDeathRate: 34.4
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 94,
    DeathRate: 17.8,
    AgeAdjustedDeathRate: 28.7
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 273,
    DeathRate: 26.1,
    AgeAdjustedDeathRate: 22.8
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 696,
    DeathRate: 49.1,
    AgeAdjustedDeathRate: 25.4
  },
  {
    Year: 2011,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 242,
    DeathRate: 28.3,
    AgeAdjustedDeathRate: 37.4
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 209,
    DeathRate: 16.9,
    AgeAdjustedDeathRate: 19.6
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 205,
    DeathRate: 17.5,
    AgeAdjustedDeathRate: 31.5
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 74,
    DeathRate: 12.7,
    AgeAdjustedDeathRate: 15.1
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 540,
    DeathRate: 40.3,
    AgeAdjustedDeathRate: 32.3
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 295,
    DeathRate: 28.2,
    AgeAdjustedDeathRate: 24.1
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 0,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 576,
    DeathRate: 40.6,
    AgeAdjustedDeathRate: 20.2
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 76,
    DeathRate: 14.1,
    AgeAdjustedDeathRate: 20.9
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 8,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 18,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 622,
    DeathRate: 43.7,
    AgeAdjustedDeathRate: 22.1
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 274,
    DeathRate: 31.9,
    AgeAdjustedDeathRate: 40
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 102,
    DeathRate: 18.4,
    AgeAdjustedDeathRate: 26.8
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 285,
    DeathRate: 27.3,
    AgeAdjustedDeathRate: 22.5
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 6,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 233,
    DeathRate: 19.7,
    AgeAdjustedDeathRate: 33.1
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 78,
    DeathRate: 13,
    AgeAdjustedDeathRate: 14.6
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 618,
    DeathRate: 45.9,
    AgeAdjustedDeathRate: 36.7
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 204,
    DeathRate: 16.3,
    AgeAdjustedDeathRate: 18.5
  },
  {
    Year: 2013,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 24,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 105,
    DeathRate: 18.3,
    AgeAdjustedDeathRate: 25
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 563,
    DeathRate: 39.7,
    AgeAdjustedDeathRate: 20.4
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 14,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 502,
    DeathRate: 37.4,
    AgeAdjustedDeathRate: 29.7
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 9,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 80,
    DeathRate: 12.8,
    AgeAdjustedDeathRate: 14.1
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 266,
    DeathRate: 25.3,
    AgeAdjustedDeathRate: 20.6
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 218,
    DeathRate: 17.2,
    AgeAdjustedDeathRate: 18.8
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 242,
    DeathRate: 28,
    AgeAdjustedDeathRate: 33.9
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Influenza and Pneumonia',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 199,
    DeathRate: 16.7,
    AgeAdjustedDeathRate: 26.6
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 45,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3356,
    DeathRate: 250.9,
    AgeAdjustedDeathRate: 213.7
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 22,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 969,
    DeathRate: 83,
    AgeAdjustedDeathRate: 100.7
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1800,
    DeathRate: 171,
    AgeAdjustedDeathRate: 161.7
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3518,
    DeathRate: 245.2,
    AgeAdjustedDeathRate: 167.4
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 29,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 395,
    DeathRate: 76.7,
    AgeAdjustedDeathRate: 88.4
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 51,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 528,
    DeathRate: 109.1,
    AgeAdjustedDeathRate: 145.9
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1523,
    DeathRate: 178.7,
    AgeAdjustedDeathRate: 229.4
  },
  {
    Year: 2007,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1013,
    DeathRate: 92.9,
    AgeAdjustedDeathRate: 163.5
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 60,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 36,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 473,
    DeathRate: 95,
    AgeAdjustedDeathRate: 123.5
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1046,
    DeathRate: 88.5,
    AgeAdjustedDeathRate: 104.7
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 33,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1756,
    DeathRate: 167.6,
    AgeAdjustedDeathRate: 156.3
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3361,
    DeathRate: 250.4,
    AgeAdjustedDeathRate: 214.3
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 344,
    DeathRate: 64.6,
    AgeAdjustedDeathRate: 73.8
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 21,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1080,
    DeathRate: 97.7,
    AgeAdjustedDeathRate: 165.9
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1464,
    DeathRate: 172.4,
    AgeAdjustedDeathRate: 220.4
  },
  {
    Year: 2008,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3366,
    DeathRate: 234.5,
    AgeAdjustedDeathRate: 160.5
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 506,
    DeathRate: 99.1,
    AgeAdjustedDeathRate: 127
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1180,
    DeathRate: 105.1,
    AgeAdjustedDeathRate: 172.2
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3346,
    DeathRate: 232.9,
    AgeAdjustedDeathRate: 159
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1097,
    DeathRate: 91.6,
    AgeAdjustedDeathRate: 107.2
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3236,
    DeathRate: 240.5,
    AgeAdjustedDeathRate: 205.6
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1557,
    DeathRate: 183.4,
    AgeAdjustedDeathRate: 228.8
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 19,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 398,
    DeathRate: 72.5,
    AgeAdjustedDeathRate: 83.5
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 41,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 12,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1735,
    DeathRate: 165.7,
    AgeAdjustedDeathRate: 151.1
  },
  {
    Year: 2009,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 47,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1045,
    DeathRate: 85.9,
    AgeAdjustedDeathRate: 98.5
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3408,
    DeathRate: 254.1,
    AgeAdjustedDeathRate: 216.6
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 29,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1540,
    DeathRate: 180.9,
    AgeAdjustedDeathRate: 224.1
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3438,
    DeathRate: 240.4,
    AgeAdjustedDeathRate: 163
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 34,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1768,
    DeathRate: 168.6,
    AgeAdjustedDeathRate: 151.8
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1057,
    DeathRate: 92.5,
    AgeAdjustedDeathRate: 150
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 526,
    DeathRate: 101,
    AgeAdjustedDeathRate: 124.5
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 25,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 46,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2010,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 414,
    DeathRate: 73.6,
    AgeAdjustedDeathRate: 79.9
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1918,
    DeathRate: 183.2,
    AgeAdjustedDeathRate: 163.3
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 550,
    DeathRate: 104.1,
    AgeAdjustedDeathRate: 130.4
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3371,
    DeathRate: 238,
    AgeAdjustedDeathRate: 161.1
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 11,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 36,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3222,
    DeathRate: 241.6,
    AgeAdjustedDeathRate: 206.1
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 451,
    DeathRate: 79.1,
    AgeAdjustedDeathRate: 86.1
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1085,
    DeathRate: 88.6,
    AgeAdjustedDeathRate: 99.6
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1144,
    DeathRate: 99.2,
    AgeAdjustedDeathRate: 157.7
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 33,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 27,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2011,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1590,
    DeathRate: 186.4,
    AgeAdjustedDeathRate: 224.4
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1563,
    DeathRate: 182.7,
    AgeAdjustedDeathRate: 215.3
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 34,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1126,
    DeathRate: 96.4,
    AgeAdjustedDeathRate: 151
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 461,
    DeathRate: 78.9,
    AgeAdjustedDeathRate: 83.8
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 622,
    DeathRate: 115.1,
    AgeAdjustedDeathRate: 138.4
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1912,
    DeathRate: 182.9,
    AgeAdjustedDeathRate: 159.1
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1125,
    DeathRate: 90.8,
    AgeAdjustedDeathRate: 100.5
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 53,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3256,
    DeathRate: 229.6,
    AgeAdjustedDeathRate: 157.3
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 29,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 36,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2012,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3184,
    DeathRate: 237.7,
    AgeAdjustedDeathRate: 200.7
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 467,
    DeathRate: 77.8,
    AgeAdjustedDeathRate: 79.6
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1149,
    DeathRate: 92.1,
    AgeAdjustedDeathRate: 99.9
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1592,
    DeathRate: 185.5,
    AgeAdjustedDeathRate: 212.8
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 633,
    DeathRate: 114.2,
    AgeAdjustedDeathRate: 130.9
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 43,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 94,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 99,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3187,
    DeathRate: 224.2,
    AgeAdjustedDeathRate: 153.3
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1784,
    DeathRate: 170.8,
    AgeAdjustedDeathRate: 145.5
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3132,
    DeathRate: 232.7,
    AgeAdjustedDeathRate: 194.5
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 32,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2013,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1146,
    DeathRate: 97.1,
    AgeAdjustedDeathRate: 148.5
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Other Race/ Ethnicity',
    Deaths: 66,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Asian and Pacific Islander',
    Deaths: 657,
    DeathRate: 114.5,
    AgeAdjustedDeathRate: 129.5
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Black Non-Hispanic',
    Deaths: 1852,
    DeathRate: 176.5,
    AgeAdjustedDeathRate: 148.4
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Hispanic',
    Deaths: 1146,
    DeathRate: 96,
    AgeAdjustedDeathRate: 143.5
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Black Non-Hispanic',
    Deaths: 1532,
    DeathRate: 177.5,
    AgeAdjustedDeathRate: 199.6
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Not Stated/Unknown',
    Deaths: 50,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Asian and Pacific Islander',
    Deaths: 502,
    DeathRate: 80.2,
    AgeAdjustedDeathRate: 80.6
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Not Stated/Unknown',
    Deaths: 73,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'Other Race/ Ethnicity',
    Deaths: 50,
    DeathRate: 0,
    AgeAdjustedDeathRate: 0
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'Hispanic',
    Deaths: 1154,
    DeathRate: 91.1,
    AgeAdjustedDeathRate: 97.4
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Male',
    Race: 'White Non-Hispanic',
    Deaths: 3142,
    DeathRate: 234,
    AgeAdjustedDeathRate: 195.1
  },
  {
    Year: 2014,
    Cause: 'Malignant Neoplasms',
    Sex: 'Female',
    Race: 'White Non-Hispanic',
    Deaths: 3153,
    DeathRate: 222.5,
    AgeAdjustedDeathRate: 150.2
  }
];

/***/ })
/******/ ]);