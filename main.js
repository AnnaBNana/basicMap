(function(){
  var height = window.innerHeight,
  width = document.body.clientWidth;

  var svg = d3.select("#map")
      .append("svg")
      .append("g")

  d3.queue()
    .defer(d3.json, "countries.topojson")
    .await(ready)

  var projection = d3.geoMercator()
      .translate([width/2,height/2 + 100])
      .scale(170)

  var path = d3.geoPath()
      .projection(projection)

  var tooltip = d3.select("body")
      .append("div")
      .attr("class","inactive")
  
  function ready(error, data){
    console.log(data)
    var countries = topojson.feature(data, data.objects.subunits).features
    svg.selectAll(".country")
        .data(countries)
        .enter().append("path")
        .attr("class", "country")
        .attr("d",path)
        .attr("data-toggle", "false")
        .on("click", function(d){
          toggle = (d3.select(this).attr("data-toggle") == "true")
          if (toggle) {
            d3.select(this)
              .classed("selected", false)
              .attr("data-toggle", "false")
          } else {
            d3.select(this)
              .classed("selected", true)
              .attr("data-toggle", "true");
          }
        })
        .on("mouseover", function(d){
          tooltip.attr("class","active")
          .html("<p class='tooltip-text'>" + d.properties.name + "</p>");
          d3.select(".active")
          .style("top", d3.event.pageY + "px")
          .style("left", d3.event.pageX + "px")
        })
        .on("mouseout", function(d){
          tooltip.attr("class", "inactive");
        });
        ;
    }
})();