function draw_line_chart(data , chart_name , long_width , long_height) {

		console.log(data);
	
		// Set the dimensions of the canvas / graph
		var margin = {top: 100, right: 40, bottom: 30, left: 100},
			width = long_width - margin.left - margin.right,
			height = long_height - margin.top - margin.bottom;

		//get min/max	
		var minX = d3.min(data, function(d){return d.x});
		var maxX = d3.max(data, function(d){return d.x});
		var minY = d3.min(data, function(d){return d.y});
		var maxY = d3.max(data, function(d){return d.y});
				
		// Set the ranges
		var scale_x = d3.time.scale()
						.range([0, width])
						.domain([minX *1000, maxX *1000]);

		
		var scale_y = d3.scale.linear()
						.range([height, 0])
//						.domain([minY, maxY]);
						.domain(d3.extent(data, function(d) { return d.y; } ) );

		
			
		var xAxis = d3.svg.axis()
			.scale(scale_x)
			.orient("bottom")
//			.ticks(d3.time.minute, 15)
//			.tickFormat(d3.time.format('[%H:%M %p]'))
			.tickSize(-height, 0, 0)
			.tickPadding(5);
			;

		var yAxis = d3.svg.axis()
			.scale(scale_y)
			.orient("left")
//			.ticks(10)
			.tickSize(-width, 0, 0)
			.tickPadding(10);
			;
		
	
		var line = d3.svg.line()
			.x(function(d) { return scale_x(d.x * 1000); })
			.y(function(d) { return scale_y(d.y); });
	
		var svg = d3.select("body")
					.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		var zoom = d3.behavior.zoom()
			.x(scale_x)
//			.y(scale_y)
			.on("zoom", draw);

/*			
		var gradient = svg.append("defs").append("linearGradient")
			.attr("id", "gradient")
			.attr("x2", "0%")
			.attr("y2", "100%");
		
		gradient.append("stop")
			.attr("offset", "0%")
//			.attr("stop-color", "#fff")
			.attr("stop-opacity", .5);

		gradient.append("stop")
			.attr("offset", "100%")
//			.attr("stop-color", "#999")
			.attr("stop-opacity", 1);
		
*/		
		svg.append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", width)
			.attr("height", height);
			
		svg.append("text")
			.attr("x", (width/2))
			.attr("y", 0-(margin.top/2))
			.attr("text-anchor", "middle")
			.style({
				"font-size": "16px",
				"text-decoration": "underline",
			} )
			.text(chart_name);
			
		
		svg.append("g")
			.attr("class", "x_axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
            .style("text-anchor", "end")
			;
			
		svg.append("g")
			.attr("class", "y_axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			;
		
		svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("clip-path", "url(#clip)")
			.attr("marginLeft","100")
			.attr("d", line);
			  
		svg.append("rect")
			.attr("class", "pane")
			.attr("width", width)
			.attr("height", height)
			.call(zoom);
	
		if(chart_name == 'glucose') {
			svg.append("svg:line")
                        .attr("x1", 0)
                        .attr("x2", width)
                        .attr("y1", scale_y(130))
                        .attr("y2", scale_y(130))
                        .style("stroke", "rgb(256, 0, 0)");
						
/*			svg.append("svg:line")
                        .attr("x1", 0)
                        .attr("x2", width)
                        .attr("y1", scale_y(80))
                        .attr("y2", scale_y(80))
                        .style("stroke", "rgb(189, 0, 0)");			
*/
		}
	
	
//		zoom.x(scale_x);
//		zoom.y(scale_y);
		
//		svg.select("path.line").data([data]);
//		draw();
		
	function draw() {
	  svg.select("g.x_axis").call(xAxis);
	  svg.select("g.y_axis").call(yAxis);
	  svg.select("path.line").attr("d", line);
	}
	
}

