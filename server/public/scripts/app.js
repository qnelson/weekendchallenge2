//Waits for document to load before executing
$(document).ready(function () {

  //position variable keeps track of where the selected person is in the carousel
  var position = 0;

  //Initializes empty array
  var muArray = [];

  //All of the functions are called when the browser successfully receives
  //data from the server
  $.ajax({
      type: "GET",
      url: "/data",
      success: function (data) {
          muArray = data.mu;

          //Group of funtions that get called upon success message from server
          cycle();
          addIndex();
          getArray();
          showPosition();
        }
    });

setInterval(autoNext, 5000);
    //Advance button functionality, carousel advances, displays new person,
    //updates index point
    $('.advance').on('click', function () {
        $(this).parent().parent().find('.person').empty();
        position++;
        cycle();
        getArray();
        showPosition();

      });

    //Retreat button functionality, carousel retreats, displays new person,
    //updates index point
    $('.previous').on('click', function () {
        $(this).parent().parent().find('.person').empty();
        position--;
        cycle();
        getArray();
        showPosition();
      });

  //Function that appends the information from the list to the DOM
  //Fade transitions upon button click
  function getArray (){
    var $el = $('.person');
    var mcp = muArray[position];

    $el.fadeOut(50, function(){
    $el.append('<h3>' + mcp.name + '</h3>');
    $el.append('<p>' + mcp.git_username + '</p>');
    $el.append('<p>' + mcp.shoutout + '</p>');
    $el.fadeIn(50);
    }
  )};

  //Adds the index points to keep track of carousel position
  function addIndex(){
     for (var i = 0; i < muArray.length; ++i){
       $('.index').append('<span>.</span>');
     }
   }

   //Changes index point from black to white to show position
   function showPosition() {
     $('.selected').removeClass('selected');
     $('span:nth-of-type(' + (position + 1) + ')').addClass('selected');
   }

   //This function creates the loop functionality in the carousel
   function cycle() {
     if (position < 0) {
       position = muArray.length - 1;
     }
     else if (position > muArray.length - 1) {
       position = 0;
   }
 }

    //This function pairs with setInterval to create the auto advance functionality
    function autoNext(){
     $('.person').empty();
     position++;
     cycle();
     getArray();
     showPosition();

   }
});
