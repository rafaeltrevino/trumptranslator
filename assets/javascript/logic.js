$(document).ready(function() {

var state = $(this).attr("data-state");
var rowID = -1;
var tweetArray = [];
var tweetText = $
var data;

function getTweets() {
    var jsonUrl = "https://rafaeltrevino.github.io/trumptranslator/assets/javascript/master_2018.json";
    $.ajax({
        url: jsonUrl,
        method: "GET",
    }).then(function(data) {
        console.log(data);
        console.log(data.length);
        for (i=0; i < data.length; i++) {
            var tweetDate = data[i].created_at;
            var tweet = data[i].text;
            tweetArray.push([tweetDate, tweet]);
        }
        console.log(tweetArray);
        var d = $("<div>");
        var p = $("<p>");
        var randTweet = tweetArray[Math.floor(Math.random() * tweetArray.length)];
        var tweetDate = randTweet[0];
        var tweetText = randTweet[1];
        $("#tweetDateDiv").html(tweetDate);
        $("#tweetTextDiv").html(tweetText);
        displayGif(tweetText);
    });
};
getTweets();

console.log(tweetText);

function displayGif(tweetText) {
    var APIkey = "b98xRER1URXt0Nhz68BEVXWnfI43okvO";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tweetText + "&api_key=" + APIkey + "&limit=1"
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

// displayGif(tweetText);

}); // End of document ready function