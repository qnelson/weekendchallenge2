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
          addIndex();
          getArray();
          showPosition();
        }
    });

    //Advance button functionality, carousel advances, displays new person,
    //updates index point
    $('.advance').on('click', function () {
        $(this).parent().parent().find('.person').empty();
        position++;
        if (position > muArray.length - 1) {
          position = 0;
        }

        getArray();
        showPosition();

      });

    //Retreat button functionality, carousel retreats, displays new person,
    //updates index point
    $('.previous').on('click', function () {

        position--;
        if (position < 0) {
          position = muArray.length - 1;
        }
        getArray();
        showPosition();
      });

  //Function that appends the information from the list to the DOM
  //Fade transitions upon button click
  function getArray (){
    var $el = $('.person');
    var mcp = muArray[position];

    $el.fadeOut("fast", function(){
    $el.append('<h3>' + mcp.name + '</h3>');
    $el.append('<p>' + mcp.git_username + '</p>');
    $el.append('<p>' + mcp.shoutout + '</p>');
    $el.fadeIn("fast");
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
     $('.white').removeClass('white');
     $('span:nth-of-type(' + (position + 1) + ')').addClass('white');
   }

});
