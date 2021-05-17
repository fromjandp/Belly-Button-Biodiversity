// Map to the dataset name identified as id="selDataset" in the .html code
var select_tag = d3.select("#selDataset");

// Import the data, from the json file, into the javascript code for use.
d3.json("samples.json").then((inputFileData) => {
  console.log("inputFileData: ")
  console.log(inputFileData)

  // dump the input id numbers (names) into subject_ids
  var subject_ids = inputFileData.names;
  // var subject_ids = inputFileData["names"];
  //.log(`Subject_Ids: ${subject_ids} `);
  console.log("Subject_Ids: ");
  console.log(subject_ids);

  subject_ids.map((id) => {
  select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });
  
  // The initial value  is set to the first value for the 'test subject ID no' o the
  // dashboard. In this case, it would be 940 based on the data showing in ascending order.
  optionChanged(subject_ids[0]);

});

// The function is triggered by an option change in the Dropdown box of "Test Subject ID No" in index.html
// <select id="selDataset" onchange="optionChanged(this.value)">
function optionChanged(selected_id) {
  console.log("selected_id=", selected_id);
​
  //   Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // * Use`sample_values` as the values for the bar chart.
  // * Use`otu_ids` as the labels for the bar chart.
  // * Use`otu_labels` as the hovertext for the chart.
  d3.json("samples.json").then((data) => {
​
    var samples = data.samples;
    var results = samples.filter(sampleObj => sampleObj.id == selected_id);
​
    console.log("samples: ");
    console.log(samples);
​
    var result = results[0];
​
    console.log("results: ");
    console.log(results);
​
    console.log("result: ");
    console.log(result);
​
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
​
    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
​
    console.log("y_label: ");
    console.log(y_label);
​
    console.log("sample_valuese: ");
    console.log(sample_values.slice(0, 10).reverse());
​
    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };
​
    var data = [bar_trace];
​
    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

;    
​