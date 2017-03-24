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
  //this function makes and ajax call to todolist/ gets selects datbase to display
  //brings back an array of objects
  //success calls displayData(response);
  var response = "temporary response";
  displayData(response);
}//ends getDisplay
