$(document).ready(function () {
    console.log("ready!");

    var topics = ["callofduty", "valorant", "fortnite", "halo", "battlefield", "destiny", "goldeneye", "pubg", "csgo", "overwatch"]


    $('#search-button').on("click", function () {
        var userInput = $("#input-search").val()
        topics.push(userInput)
        $('#topics-array').empty();
        generateButtons()
    });


    function generateButtons() {
        for (i = 0; i < topics.length; i++) {
            var buttons = $('<button class="topic-buttons">' + topics[i] + '</button>')
            buttons.appendTo('#topics-array');

        }

        $(".topic-buttons").on("click", function () {
            query = $(this).text()
            console.log(query)
            var queryURL = "https:api.giphy.com/v1/gifs/search?api_key=10e3V5R9fcc5fYell9SrouJbTcqRbE1J&q=" + query + "&limit=10"


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (resp) {
                var response = resp.data
                console.log(response)

                for (i = 0; i < response.length; i++) {

                    var rating = response[i].rating

                    var image = $('<img class="gif">');
                    image.attr('src', response[i].images.original.url)
                    image.attr('data-still', response[i].images.original_still.url)
                    image.attr('data-animate', response[i].images.original.url)

                    $("#response-dump-div").append(image, "    Rating: " + rating.toUpperCase())

                }

                $(".gif").on("click", function () {

                    var animationUrl = $(this).attr("data-animate");
                    var stillUrl = $(this).attr("data-still")
                    var imageSrc = $(this).attr("src")

                    console.log(animationUrl)

                    if (animationUrl === imageSrc) {
                        $(this).attr("src", $(this).attr("data-still"));
                    } else {
                        $(this).attr("src", $(this).attr("data-animate"));
                    }
                });



            });
        })
    }

    generateButtons();

})