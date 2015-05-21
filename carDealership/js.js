"use strict";

//global variables
var guid = 0;
var id = 0;
var storage = [];

//object constructor

function Auto(autoMake, autoModel, autoColor, autoYear, id) {
    this.make = autoMake;
    this.model = autoModel;
    this.color = autoColor;
    this.year = autoYear;
    this.id = id;
    this.isDeleted = false;

}

//create function
function create() {
    //jquery selector $ = bling
    //target by id [ # ]
    //target by class [ . ]
    //val extracts value of an input field
    var autoMake = $("#selectAutoMake").val();
    var autoModel = $("#inputAutoModel").val(); // equalt to document.getElementById
    var autoColor = $("#inputAutoColor").val();
    var autoYear = $("#inputAutoYear").val();


    //use auto object constructor to build a auto object
    var auto = new Auto(autoMake, autoModel, autoColor, autoYear, id);

    //add to storage array
    storage.push(auto);

    //increment id
    id++;

    //display changes to our tbody
    $("#tableDisplayInventory tr:last").after('<tr id="tableRow'+ auto.id +'"><td>' + auto.make + '</td><td>' + auto.model + '</td>\
                                                   <td>' + auto.color + '</td>\
                                                   <td>' + auto.year + '</td>\
                                                   <td>\
                                                   <input type="button" value="Delete" onclick="removeTableRow('+ auto.id + ')"/>\
                                                   <input type="button" value="Edit" onclick="showModal(' + auto.id + ')" />\
                                                   </td></tr>');




}

//display function

// soft delete function
function removeTableRow(key) {
    //change isDeleted boolean from false to true
    //soft delete retains the records  but removes the ablitlity to display the record for certains users
    storage[key].isDeleted = true;
    $("#tableRow" + key).remove();
}

//show edit modal function
function showModal(key) {
    //extract auto out of the storage and store to var
    var auto = storage[key];
    $("#editAutoMake").val(auto.make);
    $("#editAutoModel").val(auto.model);
    $("#editAutoColor").val(auto.color);
    $("#editAutoYear").val(auto.year);

    //assign value of key to guid
    guid = key;

    //show modal
    $("#modalEdit").modal("show");
}


// update function
function updateAuto() {
    storage[guid].make = $("#editAutoMake").val();
    storage[guid].model = $("#editAutoModel").val();
    storage[guid].color = $("#editAutoColor").val();
    storage[guid].year = $("#editAutoYear").val();

    //extract auto
    var auto = storage[guid];

    $("#tableRow" + guid).html('<td>' + auto.make + '</td>\
                                 <td>' + auto.model + '</td>\
                                 <td>' + auto.color + '</td>\
                                 <td>' + auto.year + '</td>\
                                 <td>\
                                    <input type="button" value="Delete" onclick="removeTableRow('+ guid + ')"/>\
                                    <input type="button" value="Edit" onclick="showModal(' + guid + ')" />\
                                 </td></tr>');

    //hide modal
    $("#modalEdit").modal("hide");

}

// jquery event listeners
$("#inputButton").click(create);
$("#editButton").click(updateAuto);
