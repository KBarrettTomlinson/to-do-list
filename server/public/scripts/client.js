//globals

//document ready
$(document).ready(function(){
  console.log("We are here for you too!");
  console.log("You're going to do great!");
  getDisplay();
  eventListeners();
});//ends document ready

//functions function are arranged alphabetically
function addTask(){
  console.log("inside addTask");
  //add task makes an ajax POST to the database via todolist/add
  //response is returned and then getDisplay(); is called
  getDisplay();
}//ends addTask

function buildObject(){
  console.log("inside buildObject");
  //builds an object to send it across the void to the server
}//ends buildObject

function completeTask(){
  console.log("inside completeTask");
  //completeTask makes an ajax PUT to the database
  //response is returned and teh getDisplay() is called
  getDisplay();
}//ends completeTask

function deleteTask(){
  console.log("inside deleteTask");
  //deleteTask makes an ajax DELETE to the database
  //response is returned and then getDisplay() is called
  getDisplay();
}//ends deleteTask

function displayData(dataArray){
  console.log("inside displayData");
  //this function appends the dataArray of objects to the DOM
  //while apending to the DOM it crates buttons for Completed and Delete
  //When those buttons get created data is attached to the buttons for future
  //reference
  $('#outputDiv').empty();
  for (var i = 0; i < dataArray.length; i++){
    var currentObject = dataArray[i];
    //picks apart the object
    var id= currentObject.id;
    var task = currentObject.task;
    var priority = parseInt(currentObject.priority);
    var next = currentObject.next_step;
    var completed = currentObject.completed;
    //appends dataRowDiv to the outputDiv
    $('#outputDiv').append('<div class = "dataRowDiv"></div>');
    var $el = $('#outputDiv').children().last();
    //appends object to the rows
    $el.append('<td class="table-item">'+task+'</td>');
    $el.append('<td class="table-item">'+priority+'</td>');
    $el.append('<td class="table-item">'+next+'</td>');

    //break this out into two different appends, that way it will be easier to attach data to the buttons
    $el.append('<td class="table-button"><button class="completeButton">'+completed+'</button></td>');
    $el.append('<td class="table-button"><button class="deleteButton">Delete</button></td>');
    //adds data to buttons

  }//ends for loop that appends to DOM
}//ends displayData

function eventListeners(){
  console.log("inside eventListeners");
  //on submit event listener calls addTask() and passes var $this to it
  addTask();
  //on click complete calls completeTask() and passes var $this to it
  completeTask();
  //on click delete calls deleteTask() and passes var $this to it
  deleteTask();
}//ends eventListeners

function getDisplay(){
  console.log("inside getDisplay");
  $.ajax({
    type: 'GET',
    url: '/todolist',
    success: function(response){
      console.log("We send someone to the other side, and they have returned with this:", response);
      displayData(response);
    }//ends success
  });//ends ajax get
}//ends getDisplay
