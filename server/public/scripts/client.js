//globals

//document ready
$(document).ready(function(){
  console.log("We are here for you too!");
  console.log("You're going to do great!");
  getDisplay();
  eventListeners();
});//ends document ready

//function list
  // addTask - ajax call for adding a new task
  // buildObject - builds an object from input fields
  // clearForm - clears out the input form, puts focus on first input
  // completeTask -  ajax call to change completed status
  // deleteTask - ajax call to delete task
  // displayData - appends data to DOM
  // eventListeners - sets click behavior
  // getDisplay - ajax call to get current table


//functions function are arranged alphabetically
function addTask(object){
  console.log("inside addTask");
  $.ajax({
    type: 'POST',
    url : '/todolist/add',
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
  $("select").each(function(){
    this.selectedIndex = 0;});
  $('#next').val('');
  $('#task').focus();
}//clears input form

function completeTask(thisButton){
  console.log("inside completeTask");

  // collecting data from button
  var id = thisButton.data('id');
  var completed = thisButton.data('completed');
  completed = !completed;

  // building Object from data
  var dataObject = {};
  dataObject.id = id;
  dataObject.completed = completed;

  //ajax PUT
  $.ajax({
    type: 'PUT',
    url: '/todolist/completed',
    data: dataObject,
    success: function(response){
      console.log("We sent someone over with the change:", response);
      getDisplay();
    }//ends success
  });//ends ajax PUT
}//ends completeTask

function deleteTask(thisButton){
  console.log("inside deleteTask");

  //collecting data from button
  var id = thisButton.data('id');
  console.log("id inside deleteTask",id);
  //ajax deleteTask
  $.ajax({
    type: 'DELETE',
    url: '/todolist/delete/'+id,
    success: function(response){
      console.log("We sent someone over to break the news and delete a task",response);
      getDisplay();
    }//ends success
  });//ends ajax DELETE
}//ends deleteTask

function displayData(dataArray){
  console.log("inside displayData");

  //empties out the display
  $('#outputDiv').empty();

  //creates header
  $('#outputDiv').append('<div class = "dataRowDiv"></div>');
  var $el = $('#outputDiv').children().last();
  $el.append('<table></table>');
  var $el1 = $el.children().last();
  $el1.append('<th class="table-item">TASK</th>');
  $el1.append('<th class="table-item">PRIORITY</th>');
  $el1.append('<th class="table-item">NEXT STEP</th>');
  $el1.append('<th class="table-item">COMPLETED</th>');
  $el1.append('<th class="table-item">DELETE TASK</th>');

  //iterates through dataArray
  for (var i = 0; i < dataArray.length; i++){
    $('#outputDiv').append('<div class = "dataRowDiv"></div>');

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
    if (completed === true){
      completeButtonText = "Complete";
    }//end if
    else{
      completeButtonText = "TO DO";
    }//end else

    //appends dataRowDiv to the outputDiv
    $('#outputDiv').append('<div class = "data-row-div"></div>');
    $eld = $('#outputDiv').children().last();
    $eld.data('id',id);

    //creates table
    $eld.append('<table></table>');
    $el = $eld.children().last();

    //appends object to the rows as a table
    $el.append('<td class="table-item">'+task+'</td>');
    $el.append('<td class="table-item">'+priority+'</td>');
    $el.append('<td class="table-item">'+next+'</td>');

    //appends button to the row and adds data tags
    $el.append('<td class="table-item"></td>');
    switch (priority){
      case 5:
      case 4:
        $el.addClass('priority-high-div');
        break;
      case 3:
      case 2:
        $el.addClass('priority-med-div');
        break;
      case 1:
        $el.addClass('priority-low-div');
    }//ends switch
    if (completed === true){
      $el.addClass('highlight-div');
    }//ends if
    $el1 = $el.children().last();
    $el1.append('<button class="complete-button">'+completeButtonText+'</button>');
    var $el2 = $el1.children().last();
    $el2.data('id',id);
    $el2.data('completed',completed);

    //appends button to the row and adds data tags
    $el.append('<td class="table-item"></td>');
    var $el3 = $el.children().last();
    $el3.append('<button class="delete-button">Delete</button>');
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
  $('#outputDiv').on('click','.complete-button',function(){
      console.log("inside complete button on click");
      var $this = $(this);
      var id = $this.data('id');
      $parentDiv = $this.parent().parent();
      $parentDiv.fadeOut('medium',function(){completeTask($this);});
  });//ends on click complete

  //on click delete
  $('#outputDiv').on('click','.delete-button',function(){
      console.log("inside delete button on click");
      confirm("Are you sure you want to delete this task?");
      var $this = $(this);
      var id = $this.data('id');
      console.log("id in on click delete", id);
      $parentDiv = $this.parent().parent();
      $parentDiv.fadeOut('medium',function(){deleteTask($this);});
  });//ends on click delete
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
