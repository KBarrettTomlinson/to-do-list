//globals

//document ready
$(document).ready(function(){
  console.log("We are here for you too!");
  console.log("You're going to do great!");
  getDisplay();
  eventListeners();
});//ends document ready

//function list
  // addTask
  // buildObject
  // clearForm
  // completeTask
  // deleteTask
  // displayData
  // eventListeners
  // getDisplay


//functions function are arranged alphabetically
function addTask(object){
  console.log("inside addTask");
  $.ajax({
    type: 'POST',
    url: '/todolist/add',
    data: object,
    success: function(response){
      console.log("We've taken something to the other side:",response);
      getDisplay();
    }//ends success
  });//end ajax POST
}//ends addTask

function buildObject(){
  console.log("inside buildObject");
  var object = {};
  object.task = $('#task').val();
  object.priority = $('#priority').val();
  object.next_step = $('#next').val();
  console.log("we made you an object:",object);
  return object;
}//ends buildObject

function clearForm(){
  console.log("inside clear form");
  $('#task').val('');
  $('#priority').val('');
  $('#next').val('');
  $('#task').focus();
}//clears input form

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

  $('#outputDiv').empty();
  for (var i = 0; i < dataArray.length; i++){

    //grabs the object from the array
    var currentObject = dataArray[i];

    //picks apart the object
    var id= currentObject.id;
    var task = currentObject.task;
    var priority = parseInt(currentObject.priority);
    var next = currentObject.next_step;
    var completed = currentObject.completed;

    //completed button text
    var completeButtonText;
    if (completed ===true){
      completeButtonText = "Complete";
    }//end if
    else{
      completeButtonText = "TO DO";
    }//end else

    //appends dataRowDiv to the outputDiv
    $('#outputDiv').append('<div class = "dataRowDiv"></div>');
    var $el = $('#outputDiv').children().last();

    //appends object to the rows as a table
    $el.append('<td class="table-item">'+task+'</td>');
    $el.append('<td class="table-item">'+priority+'</td>');
    $el.append('<td class="table-item">'+next+'</td>');

    //appends button to the row and adds data tags
    $el.append('<td class="table-button"></td>');
    var $el1 = $el.children().last();
    $el1.append('<button class="completeButton">'+completeButtonText+'</button>');
    var $el2 = $el1.children().last();
    $el2.data('id',id);
    $el2.data('completed',completed);

    //appends button to the row and adds data tags
    $el.append('<td class="table-button"></td>');
    var $el3 = $el.children().last();
    $el3.append('<button class="deleteButton">Delete</button>');
    var $el4 = $el3.children().last();
    $el4.data('id',id);
  }//ends for loop that appends to DOM
}//ends displayData

function eventListeners(){
  console.log("inside eventListeners");
  //on submit
  $('#addTaskForm').on('submit',function(event){
      event.preventDefault();
      console.log("inside on sumbmit");
      var object = buildObject();
      addTask(object);
      clearForm();
  });//ends on submit

  //on click complete
  $('#outputDiv').on('click','.completeButton',function(){
      console.log("inside complete button on click");
      completeTask();
  });//ends on click complete

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
