$(document).ready(function() {

var tweetArray = [];

function getTweets() {
    var jsonUrl = "https://rafaeltrevino.github.io/trumptranslator/assets/javascript/master_2018.json";
    $.ajax({
        url: jsonUrl,
        method: "GET",
    }).then(function(data) {
        for (i=0; i < data.length; i++) {
            var tweetDate = data[i].created_at;
            var tweet = data[i].text;
            tweetArray.push([tweetDate, tweet]);
        }
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

function displayGif(tweetText) {
    var APIkey = "b98xRER1URXt0Nhz68BEVXWnfI43okvO";
    var queryURL = "https://api.giphy.com/v1/gifs/translate?s=" + tweetText + "&api_key=" + APIkey + "&weirdness=1"
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var gifDivCol = $("<div>").addClass("col-md");
        var p = $("<p>");
        var img = $("<img>");
        var altText = $(response.data.title);
        var imgSrc = response.data.images.fixed_height.url;
        var imgStill = response.data.images.fixed_height_still.url;
        var imgAnimate = response.data.images.fixed_height.url;
        img.attr("src", imgSrc).attr("alt", altText);
        img.attr("data-id", response.data.id);
        img.attr("data-still", imgStill);
        img.attr("data-animate", imgAnimate);
        p.append(img);
        console.log(p);
        gifDivCol.append(p);
        $("#gifDiv").prepend(gifDivCol);
    });
}

getTweets();

$("#clickTranslate").click(function() {
    $("#tweetDateDiv").empty();
    $("#tweetTextDiv").empty();
    $("#gifDiv").empty();
    getTweets();
});

});