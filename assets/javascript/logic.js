$(document).ready(function() {

var tweet = "Today I am making good on my promise to defend our Farmers & Ranchers from unjustified trade retaliation by foreign nations. I have authorized Secretary Perdue to implement the 2nd round of Market Facilitation Payments. Our economy is stronger than ever–we stand with our Farmers!"
var images = [];
var state = $(this).attr("data-state");
var rowID = -1;


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("./assets/javascript/master_2018.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});

function displayGif(tweet) {
    var APIkey = "b98xRER1URXt0Nhz68BEVXWnfI43okvO";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tweet + "&api_key=" + APIkey + "&limit=1"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        for (i=0; i < response.data.length; i++) {
            var gifDivCol = $("<div>").addClass("col-md");
            var p = $("<p>");
            var img = $("<img>");
            var altText = $(response.data[i].title);
            var imgSrc = response.data[i].images.fixed_height.url;
            var imgStill = response.data[i].images.fixed_height_still.url;
            var imgAnimate = response.data[i].images.fixed_height.url;
            img.attr("src", imgSrc).attr("alt", altText);
            img.attr("data-id", response.data.id);
            img.attr("data-still", imgStill);
            img.attr("data-animate", imgAnimate);
            p.append(img);
            console.log(p);
            gifDivCol.append(p);
            // images.push(gifDiv);
            $("#gifDiv").prepend(gifDivCol);
        }
    });
}

displayGif(tweet);

}); // End of document ready function