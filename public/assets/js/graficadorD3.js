'use strict'
export const graph = (x, a, c, m, options) => {
    // let myChart = d3.select('myChart');
    console.log(`graficadorD3: entrando en el graficador`)
    let myChart;
    let url = `/data?x=${ x }&a=${ a }&c=${ c }&m=${ m }&options=${ options }`;
    fetch(url)
        .then(res => res.json())
        .then(myJson => {
            console.log(`graficadorD3: graph: respuesta de 'data': ${ myJson }`);

            // Set the dimensions of the canvas / graph
            let margin = {
                top: 30,
                right: 20,
                bottom: 30,
                left: 50
            };
            let width = 600 - margin.left - margin.right;
            let height = 270 - margin.top - margin.bottom;

            // Parse the date / time
            // let parseDate = d3.time.format("%d-%b-%y").parse;

            // Set the ranges
            let x = d3.time.scale().range([0, width]);
            let y = d3.scale.linear().range([height, 0]);

            // Define the axes
            let xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);
            let yAxis = d3.svg.axis().scale(y)
                .orient("left").ticks(5);

            // Define the line
            let valueline = d3.svg.line()
                .x(d => x(d.length))
                .y(d => y(d.data));

            // Adds the svg canvas
            myChart = d3.select('myChart')
                // .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `"translate(${ margin.left }, ${ margin.top })"`);

            // Scale the range of the data
            x.domain(d3.extent(myJson, d => d.length));
            y.domain([0, d3.max(myJson, d => d.data)]);

            // Add the valueline path.
            myChart.append("path")
                .attr("class", "line")
                .attr("d", valueline(myJson));

            // Add the X Axis
            myChart.append("g")
                .attr("class", "x axis")
                .attr("transform", `"translate(0, ${ height })"`)
                .call(xAxis);

            // Add the Y Axis
            myChart.append("g")
                .attr("class", "y axis")
                .call(yAxis);
        });
};
