// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function(){
  // edit the devoured state of the burger by calling a put to the api and sending the opposite of the current devoured state
  $(".change-devoured").on("click", function(event) {

    var id = $(this).data("id");
    var devoured = $(this).data("devoured");

    var newDevouredState = {
      devoured: !devoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", devoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // delete burger by passing the id of the burger that is included in the delete button
  $(".btn_delete").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/"+ id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // create a new burger by calling the POST and passing a new burger object.   
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // if image not set by user, then use default
    if ($("#burgerImage").val()=="")
      $("#burgerImage").val( $("#imgBurger").attr("src").trim());

    var newBurger = {
      name: $("#newBurger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(), //get the radio button selected
      image: $("#burgerImage").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // update the image of the new burger when the input value changes
  $(".burgerImage").on("change", function(event){
    $("#imgBurger").attr("src",$(this).val().trim());
    $("#burgerImage").val($(this).val().trim());
    $("#modalAddImage").modal('toggle');
  });
 
});
