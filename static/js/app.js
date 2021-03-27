// from data.js

var tableData = data;

// YOUR CODE HERE!

//get table references or get all attributes tbody
//that i target
var tbody = d3.select("tbody");

function buildTable(data){
    //First clear out any existing data
    tbody.html("");

    //Loop through each object in the data
    //append a row and cell for each value in the row

    data.forEach(function(dataRow){
        //Append a row to the table
        var row = tbody.append("tr");

        //Loop through each field in the dataRow and add
        //Each value as a table cell

        Object.values(dataRow).forEach(function(val){
            var cell = row. append("td");
            cell.text(val);
        })    

    })
}

//Keep track of all filters
var filters = {};

function filterTable(){
    //Set the filteredData to tableData
    let filteredData = tableData;

    //Loop through all the filters and keep any data that matches 
    //the filtered values
    Object.entries(filters).forEach(function([key, value]){
        filteredData = filteredData.filter((row) => row[key]===value);
    })

    buildTable(filteredData);
}

function updateFilters(){
    //Save the elements, values and id of the filter that was changed
    var changeElement = d3.select(this).select("input");
    var elementValue = changeElement.property("value");
    var filterId = changeElement.attr("id");

    //If a filter value was entered then add that filterId and value
    //to the filters list.  Otherwise clear that filter from the filter

    if(elementValue){
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }

    //Call function to apply all filters and rebuild table
    //To do create a filterTable function

    filterTable()

}

//Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);



// Build the table when the page loads
buildTable(tableData);


