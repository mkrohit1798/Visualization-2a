function show_table(data){
    node = document.getElementById("imp-features-table-div");

    while(node.hasChildNodes()){
        node.removeChild(node.lastChild);
    }

    var title = document.createElement("h3");
    title.style.width = "300px";
    title.style.height = "50px";
    title.style.position = "absolute";
    title.style.top = "250px";
    title.style.right = "150px";

    title.innerHTML = "Top 4 Features Table";
    document.getElementById("imp-features-table-div").appendChild(title);

    feature_table_vals = data;
    console.log("Feature table values displayed:", feature_table_vals);

    var table = document.createElement("TABLE");

    table.setAttribute("id", "imp-features-table");
    
    
    var tableContainer = document.createElement("div");
    tableContainer.style.width = "300px";
    tableContainer.style.height = "200px";
    //tableContainer.style.overflow = "scroll";
    tableContainer.style.position = "absolute";
    tableContainer.style.top = "300px";
    tableContainer.style.right = "150px";
    tableContainer.appendChild(table);
    
    document.getElementById("imp-features-table-div").appendChild(tableContainer);

    var header = table.createTHead();

    
    
    var row = header.insertRow(0);
    row.setAttribute("class", "head-table");

    
    
    var cell1 = row.insertCell(0)
    cell1.innerHTML = "<b>Features</b>";

    var cell2 = row.insertCell(1);
    cell2.innerHTML = "<b>Sum of Squared Loadings</b>";

    for(var key in feature_table_vals){
        var newRow = table.insertRow(table.length);
        newRow.setAttribute("class", "table-content");
        var cell1 = newRow.insertCell();
        cell1.innerHTML = key.charAt(0).toUpperCase() + key.slice(1);
        var cell2 = newRow.insertCell();
        cell2.innerHTML = feature_table_vals[key];
    }

}
