$(document).ready(function() {

    var buttonlist = JSON.parse(localStorage.getItem("buttonInStorage"));

    // Checks to see if the button list exists in localStorage and is an array currently
    // If not, set a local button list variable to an empty array
    // Otherwise set the button list to our current list of buttonInStorage;
    if (!Array.isArray(buttonlist)) {
    buttonlist = [];
    }

    function putOnPage() {

    $("#animalButtons").empty(); // empties out the html

    var insideList = JSON.parse(localStorage.getItem("buttonInStorage"));

    // Checks to see if we have any buttons in localStorage
    // If we do, set the local insideList variable to our buttonInStorage
    // Otherwise set the local insideList variable to an empty array
    if (!Array.isArray(insideList)) {
        insideList = [];
    }

    // render our insideList todos to the page
    for (var i = 0; i < insideList.length; i++) {
        var b = $("<button type='button' class='animal'>").text(insideList[i]);
        $("#animalButtons").prepend(b);
    }
    }

    // render our todos on page load
    putOnPage();

    $("#animalButtons").on("click", ".animal", function() {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).text();
        var api_key = "eyyLnF1DMRz5NApAxqBRWLqgUMwg7IAv";
        var numberLimit = 10;
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=" + api_key + "&limit=" + numberLimit;

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After data comes back from the request
            .then(function(response) {  
              console.log(response);
              // empty images container;
              $("#animals").empty();
              // storing the data from the AJAX request in the results variable
              var results = response.data;
    
              // Looping through each result item
              for (var i = 0; i < results.length; i++) {
    
                // Creating and storing a div tag
                var animalDiv = $("<div class='col'>");
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
    
                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
    
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
    
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#animals").prepend(animalDiv);
              }
            });
    });

    $("#animals").on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });

    $("input[type='submit']").on("click", function(event) {
    event.preventDefault();
    // Setting the input value to a variable and then clearing the input
    console.log(this);
    var val = $("input[type='text']").val();
    $("input[type='text']").val("");

    // Adding our new todo to our local list variable and adding it to local storage
    buttonlist.push(val);
    localStorage.setItem("buttonInStorage", JSON.stringify(buttonlist));

    putOnPage();
    });
});