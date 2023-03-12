function scree_plot(data){
    d3.select("#lineplotContainer").selectAll("*").remove()
    d3.select("#scree-plot-graph").selectAll("*").remove()

    var margin = {top:40, bottom: 80, left: 50, right: 60},
    width = 700 -  margin.left,
    height = 500 - margin.top - margin.bottom;

    var feature_count = 0

    data = data.chart_data
    console.log(data)
    data = d3.entries(data)

    data.forEach(d =>{
        d.key = +d.key;
        d.value.cum_variance = +d.value.cum_variance;
        d.value.variance_percentage = +d.value.variance_percentage;
        feature_count += 1
    });

    xVal = d => d.key;
    yVal = d => d.value.cum_variance;
    barVal = d => d.value.variance_percentage;

    console.log(xVal)
    console.log(yVal)
    console.log(barVal)

    var svg = d3.select("#scree-plot-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+30)
    .attr("height", height +margin.top+margin.bottom)
    .append("g")
    .attr("transform", "translate("+(margin.left+10)+", "+margin.top+")");

    svg.append("text")
    .attr('fill', 'black')
    .attr('y', -height/15)
    .attr('x', width / 2)
    .text("Scree plot")
    .style('font-weight','bold')
    .style('text-anchor', 'middle')
    .style("font-size", "16px");
    //add font and other styling later

    var xscale = d3.scaleBand()
    .domain(data.map(function(d){ return d.key; }))
    .range([0, width])
    .paddingInner(1.0)
    .paddingOuter(0.6)
    .align(0.5);

    tickDistance = height/feature_count

    var xAxis = svg.append("g")
    .attr("transform", "translate(0, "+height+")")
    .call(d3.axisBottom(xscale));

    xAxis.append('text')
    .attr('fill', 'black')
        .attr('x', width / 2)
        .attr('y', height/7)
        .text("Component Number")
        .style('text-anchor', 'middle')
        .style('font-weight','bold')
        .style("font-size", "14px");

    var yscale = d3.scaleLinear()
    .domain([0, d3.max(data, yVal)])
    .range([height, 0])
    .nice();

    var yAxis = svg.append("g")
            .call(d3.axisLeft(yscale));

    var yAxis_right = svg.append("g")
                .attr("transform", "translate("+width+", 0)")
                .call(d3.axisRight(yscale));

    yAxis.append('text')
    .attr('fill', 'black')
        .attr('x', -width/4)
        .attr('y', -height/8)
        .text("Percentage Variance Explained")
        .style('text-anchor', 'middle')
        .style("font-size", "14px")
        .style('font-weight','bold')
        .attr('transform', 'rotate(-90)');

    let line = d3.line()
    .x(d => xscale(xVal(d)))
    .y(d => yscale(yVal(d)))
    .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.2)
        .attr("d", line);

    var combine = svg.append("g")
                .attr("class", "rect-circle-scree-combine")
                .selectAll('.rect-bar')
                .data(data)
                .enter()
                .append("g")
                .attr("class", "rect-bar-cover");

        combine.append('rect')
                .attr('class', 'rect-bar')
                .on("click", pca_click)
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .attr('x', function(d){ return xscale(xVal(d)) - (tickDistance/2); })
                .attr('y', d => yscale(barVal(d)))
                .attr('width', tickDistance)
                .attr('height', d => height - yscale(barVal(d)));


        combine.append('circle')
            .attr("class", "circle-point")
            .on("click", pca_click)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout)
            .attr('cy', d => yscale(yVal(d)))
            .attr('cx', d => xscale(xVal(d)))
            .attr('r', 4);


        let div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        

        function mouseover(d){
            for(var i = 0; i <xVal(d); i++){
                d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#338f0e").style("opacity", "1");
                d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#338f0e").style("opacity", "1");
            }
            div.transition()
                .duration(100)
                .style("opacity",1);

            div.html(`Percentage data: ${yVal(d).toFixed(2)}%`)
                .style("left", (d3.event.pageX+10) + "px")
                .style("top", (d3.event.pageY - 45) + "px");
        }

        function mousemove(d){
            div.html(`Percentage data: %${yVal(d).toFixed(2)}`)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
        }

        function mouseout(d){
            if (select_bar) {
                for (var i = 0; i < xVal(d); i++) {
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#338f0e").style("opacity", "1");
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#338f0e").style("opacity", "1");
                }
                for (var i = xVal(d); i < d3.max(data, xVal); i++) {
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#9533BC").style("opacity", "1");
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#9533BC").style("opacity", "1");
                }
            } 
            else {
                for (var i = 0; i < select_bar_idx; i++) {
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#338f0e").style("opacity", "1");
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#338f0e").style("opacity", "1");
                }
                for (var i = select_bar_idx; i < d3.max(data, xVal); i++) {
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#9533BC").style("opacity", "1");
                    d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#9533BC").style("opacity", "1");
                }
            }
            select_bar = false
            div.transition()
                .duration(200)
                .style("opacity", 0);
        }

        function pca_click(d){
            select_bar = true;
        select_bar_idx = xVal(d);
        for (var i = 0; i < select_bar_idx; i++) {
            d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#338f0e").style("opacity", "1");
            d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#338f0e").style("opacity", "1");
        }
        for (var i = select_bar_idx; i < d3.max(data, xVal); i++) {
            d3.select(this.parentNode.parentNode.childNodes[i]).select('.rect-bar').style("fill", "#9533BC").style("opacity", "1")
            d3.select(this.parentNode.parentNode.childNodes[i]).select('.circle-point').style("fill", "#9533BC").style("opacity", "1")
        }
        $("#intrinsic-dimentionality-index").html(xVal(d))
        // console.log(xVal(d))

        $(document).ready(function() {
            let di = $("#intrinsic-dimentionality-index").text()
            console.log(di,typeof di)
            $.ajax({
                type: 'POST',
                url: "http://127.0.0.1:5000/id_index",
                data: { 'data': di },
                success: function(response) {
                    show_table(response["feature_data"])
                    console.log(response["feature_data"])
                    scatterplot_matrix(response["chart_data"])
                    console.log(response["chart_data"])
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });
        }

        $(document).ready(function() {
            let node_rect_circle = d3.select('.rect-circle-scree-combine').node().childNodes;
            for (var i = 0; i < select_bar_idx; i++) {
                d3.select(node_rect_circle[i].childNodes[0]).style("fill", "#338f0e").style("opacity", "1")
                d3.select(node_rect_circle[i].childNodes[1]).style("fill", "#338f0e").style("opacity", "1")
            }
            for (var i = select_bar_idx; i < d3.max(data, xVal); i++) {
                d3.select(node_rect_circle[i].childNodes[0]).style("fill", "#9533BC").style("opacity", "1")
                d3.select(node_rect_circle[i].childNodes[1]).style("fill", "#9533BC").style("opacity", "1")
            }
        });
}