// Setup Data for Chart
var yeardata = [
    {
        value: 25.6,
        color:"#1C1D21",
        label: "Freshman"
    },
    {
        value: 23.1,
        color: "#31353D",
        label: "Sophomore"
    },
    {
        value: 23.1,
        color: "#445878",
        label: "Junior"
    },
    {
        value: 12.8,
        color: "#92CDCF",
        label: "Senior"
    },
    {
        value: 15.4,
        color: "#EEEFF7",
        label: "Grad"
    }
]

var majordata = [
  {
      value: 47.4,
      color: "#EEEFF7",
      label: "Computer Science"
  },
  {
      value: 13.2,
      color: "#92CDCF",
      label: "Engineering"
  },
  {
      value: 7.9,
      color: "#445878",
      label: "Economics"
  },
  {
      value: 15.8,
      color: "#31353D",
      label: "Mgmt Info Sys"
  },
  {
      value: 15.8,
      color: "#1C1D21",
      label: "Other"
  }
]








var options = {
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop: true,
    //String - The colour of the label backdrop
    scaleBackdropColor: "rgba(255,255,255,0.75)",
    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero: true,
    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY: 2,
    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX: 2,
    //Boolean - Show line for each value in the scale
    scaleShowLine: true,
    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke: false,
    //String - The colour of the stroke on each segement.
    segmentStrokeColor: "#fff",
    //Number - The width of the stroke value in pixels
    segmentStrokeWidth: 1,
    //Number - Amount of animation steps
    animationSteps: 100,
    //String - Animation easing effect.
    animationEasing: "easeOutQuart",
    //Boolean - Whether to animate the rotation of the chart
    animateRotate: true,
    //Boolean - Whether to animate scaling the chart from the centre
    animateScale: false,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<yeardata.length; i++){%><li><span style=\"background-color:<%=yeardata[i].color%>\"></span><%if(yeardata[i].label){%><%=yeardata[i].label%><%}%></li><%}%></ul>",
    //String - ToolTip Template
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
  }

  var options2 = {
      scaleShowLabelBackdrop: true,
      scaleBackdropColor: "rgba(255,255,255,0.75)",
      scaleBeginAtZero: true,
      scaleBackdropPaddingY: 2,
      scaleBackdropPaddingX: 2,
      scaleShowLine: true,
      segmentShowStroke: false,
      segmentStrokeColor: "#fff",
      segmentStrokeWidth: 1,
      animationSteps: 100,
      animationEasing: "easeOutQuart",
      animateRotate: true,
      animateScale: false,
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<majordata.length; i++){%><li><span style=\"background-color:<%=majordata[i].color%>\"></span><%if(majordata[i].label){%><%=majordata[i].label%><%}%></li><%}%></ul>",
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
    }



// Initiate Chart
var ctx = $("#yearChart").get(0).getContext("2d");
var myDoughnutChart = new Chart(ctx).Doughnut(yeardata,options);

var ctx = $("#majorChart").get(0).getContext("2d");
var myDoughnutChart2 = new Chart(ctx).Doughnut(majordata,options2);

//then you just need to generate the legend
var legend = myDoughnutChart.generateLegend();
var legend2 = myDoughnutChart2.generateLegend();

//and append it to your page somewhere
$('#yearChart-Legend').append(legend);
$('#majorChart-Legend').append(legend2);
