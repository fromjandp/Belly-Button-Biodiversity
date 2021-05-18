// Map to the dataset name identified as id="selDataset" in the index.html code
var select_tag = d3.select("#selDataset");

// Import the data, from the json file, into the javascript code for use.
d3.json("./static/data/samples.json").then((inputFileData) => {
  console.log("inputFileData: ");
  console.log(inputFileData);

  // dump the input id numbers (names) into subject_ids
  var subject_ids = inputFileData.names;
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

  d3.json("./static/data/samples.json").then((data) => {
    // **************************************************************
    // Create a horizontal bar chart with a dropdown menu 
    // to display the top 10 OTUs found in that individual.
    // "sample_values" - values for the bar chart.
    // "otu_ids"       - values for the labels for the bar chart.
    // "otu_labels"    - values for the hovertext for the chart.
    // **************************************************************

    var samples = data.samples;
    console.log("samples: ");
    console.log(samples);

    var results = samples.filter(sampleObj => sampleObj.id == selected_id);
    console.log("results: ");
    console.log(results);

    var result = results[0];
    console.log("result: ");
    console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;

    var sample_values = result.sample_values;
    console.log("sample_values: ");
    console.log(sample_values.slice(0, 10).reverse());

    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    console.log("y_label: ");
    console.log(y_label);
 
    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [bar_trace];

    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

    // **************************************************************
    // Create a bubble chart that displays each sample.
    // 'x' values     - "otu_ids" 
    // 'y' values     - "sample_values" 
    //  marker size   - "sample_values" 
    //  marker colors - "otu_ids"      
    //  text values   - "otu_labels"    
    //  **************************************************************

    var results = samples.filter(sampleObj => sampleObj.id == selected_id);
    var result = results[0];

    var otu_ids = result.otu_ids;
    console.log("otu_ids: ");
    console.log(otu_ids);

    var otu_labels = result.otu_labels;
    console.log("otu_labels: ");
    console.log(otu_labels);

    var sample_values = result.sample_values;
    console.log("samples_values: ");
    console.log(sample_values);

    var bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    var data = [bubble_trace];

    var bubble_layout = {
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    Plotly.newPlot("bubble", [bubble_trace], bubble_layout);
  });

  // ****************
  // Demographic info
  // ****************

  // Import the metadata, from the json file, into the javascript code for use.
  d3.json("./static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    console.log("metadata");
    console.log(metadata);

    var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
    console.log("results");
    console.log(results);

    var result = results[0];
    console.log("result");
    console.log(result);

    // Map to the dataset name identified as id="sample-metadata" in the index.html code
    var fig = d3.select("#sample-metadata");

    //Initialize the demographics fig area before loading the key and values for display
    fig.html("");

    // Display the demographic values
    Object.entries(results[0]).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);
    });

  });
}