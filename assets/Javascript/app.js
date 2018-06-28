 var topics = ["Cat", "Dog","Bird","Tiger","Chameleons"];
        function getGif(){
            var animal = $(this).attr("data-animal");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                for (var i= 0; i< results.length; i++){
                    var gifDiv = $("<div vlass='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating:  " +  rating.toLocaleUpperCase());
                    var image = $("<img>");
                    
                    image.attr("src", results[i].images.fixed_height_still.url);
                    
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    
                    image.attr("data-animate", results[i].images.fixed_height.url );
                
                    
                    image.attr("data-state", "still");
                    
                    image.addClass("images");
                    //console.log(image.attr("class"))
                    gifDiv.prepend(p);
                    gifDiv.prepend(image);
                    
                    $("#gif-area").prepend(gifDiv);
                }
            });
        };
        function newButton(){
            $("#buttons").empty();
             for (var i = 0; i < topics.length; i++) {
                 var a = $("<button>");
                 a.addClass("gif");
                 a.addClass("btn btn-large")
                 a.attr("data-animal", topics[i]);
                 a.text(topics[i]);
                 $("#buttons").append(a);
             }
        }
        $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var thing = $("#gif-input").val().trim();
        topics.push(thing);
        newButton();
      });
      $(document).on("click", ".gif", getGif);
      newButton();
      
//pause gifs   
function pause(){
          var state = $(this).attr("data-state");
          console.log(state);
          if (state === "still"){
            $(this).attr("src", $(this).data("animate"));
            state = "animate"
          }else if (state === "animate"){
              $(this).attr("src", $(this).data("still"));
              state="still";
          }
}
$(document).on("click", ".images", pause);   
console.log("hi");