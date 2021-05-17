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
  console.log("Subject_Ids: ")
  console.log(subject_ids);

  subject_ids.map((id) => {
  select_tag
      .append("option")
      .property("value", id)
      .text(id);
  });

});  
