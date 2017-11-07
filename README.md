# New York City Leading Top Five Causes of Death From 2007 to 2014

## Introduction

This project is WPI CS573 Data visualization course project. By using [D3.js](https://d3js.org), top five leading causes of death in New York City from 2007 to 2014 are presented. An intro-video can be found [here].

## Project URL
A demo of the end result can be seen here:
https://tarazhu.github.io/dataviz-project/.

The code can be found here:
https://github.com/TaraZhu/dataviz-project


## Data Source

The data source of this project is from [New York City Leading Causes of Death](https://data.cityofnewyork.us/Health/New-York-City-Leading-Causes-of-Death/jb7j-dtam), and we pre-process the data by selecting top five causes of death and related features.


## Descriptions of Visualization and Interactions

This visualization mainly consists of two parts. 1) The line chart in the left panel shows the trend of death number vary of each disease from 2007 to 2014, while X axis presents years and Y axis presents number of deaths. The names of the diseases are in the bottom of the line chart with different colors, and the color of the line indicates which disease it associates with. 2) The grouped bar chart in the right panel shows the distribution of death number over gender and race in selected year for selected disease/all. This bar chart also includes a selection bar on the top for year selection. 

In the left panel, by clicking/unclicking the disease name, user can select/unselect the disease he/she want to be updated on the right panel. If no disease is selected, the right panel shows the distribution of total death number over gender and race in selected year. 

In the right panel, by dragging slider on the selection bar, the grouped bar chart below will be updated to present the number of deaths in each race and gender in selected year. Hover on a bar, a tooltip will appear to show detailed information of this bar including year, death number, race and gender.
