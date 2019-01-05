var gifButtons = ["blackhawks", "chicago bears", "chicago cubs", "chicago bulls", "ironman", "the offiice", "turtles","dogs"]
var searchInput;

// Adding click event listen listener to all buttons
function gifResults() {

    // Constructing a queryURL using the Gif name
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchInput + "&limit=25&offset=0&rating=G&lang=en"


    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
           for (var i = 0; i < response.data.length; i++) {

           
            var animateURL = response.data[i].images.fixed_height.url;
            var stillURL = response.data[i].images.fixed_height_still.url;

            var resultsDiv = $("<div>");
            var gif = $("<img>");
            var ratingParagraph = $("<p>").text ("Rating: " + response.data[i].rating);

            gif.attr("src", animateURL);
            gif.attr("data-state", "animate");
            gif.attr("data-animate", animateURL);
            gif.attr("data-still", stillURL);
            gif.addClass("gif");

            $(resultsDiv).prepend(gif)
            $(resultsDiv).prepend(ratingParagraph)

            $("#results").prepend(resultsDiv)

           }
        });
};

// $(".gif").on("click", function () {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

function renderButtons() {
    $("#seach-history-chips").empty();

    for (var j = 0; j < gifButtons.length; j++) {
        var searchHistoryButton = $("<button>");
        
        searchHistoryButton.addClass("gif-btn");
        searchHistoryButton.attr("data-name", gifButtons[j]);
        searchHistoryButton.text(gifButtons[j]);

        $("#seach-history-chips").append(searchHistoryButton)
    }
}


$("#submit").on("click", function () {
    searchInput = $("#search").val();
    gifButtons.push(searchInput);
    renderButtons();
});

$("#clear").on("click", function () {
    $("#results").empty();
});

$(document).on("click", ".gif-btn", function(){
    searchInput = $(this).attr("data-name");
    gifResults();

});
renderButtons();

$(document).on("click", ".gif", function() {

    console.log("still after render");

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate");
    }else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still");
    }
});