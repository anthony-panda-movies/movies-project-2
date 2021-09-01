$(document).ready(function(){


    "use strict";
    const movie = document.getElementById("movie")


    const testImg =  "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
    const posterEndPoint = 'https://image.tmdb.org/t/p/w400'

    //window on load event for loading page
    $(window).on("load", function() {
        $("video").fadeOut("slow");
    })

    //Movie API call for poster images
    const posterPromise = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=IT`)
        posterPromise.then(result => {
            result.json().then(poster => {
                console.log(poster);
            })
        });

    //add movie
    $("#submit-btn").on('click', (e) => {
        e.preventDefault();
        let newMovie = {
            title: $("#title_inline").val(),
            rating: $("#rating_inline").val(),
            year: $("#year_inline").val()
        }
        let postMovie = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        };
       return fetch(API_URL, postMovie)
           .then(getMovies)
           .catch(console.error)
    });


  //delete movie
   function removeMovie(id) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
         .then(result => console.log(result))
    }

    $(document).on("click", '.btn-floating', (e) => {
        e.preventDefault();
        let id = $(e.currentTarget).attr("id")
       removeMovie(id)
    })




    // Movie API call
    const moviePromise = fetch(API_URL)
        moviePromise.then(result => {
            result.json().then(movies => {
                movie.innerHTML = getMovies(movies);

            })
        });


    //Render Movies function
    function getMovies(movies) {
        let html = ''
            console.log(movies);
        movies.forEach(movie => {
            //let moviePoster = movie.poster
            html += `<div class="card hoverable">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${posterEndPoint+testImg}">
                  </div>
                  <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${movie.title}<i class="material-icons right">more_vert</i></span>
                    <p>Rating: ${movie.rating}</p>                     
<!--                        <a class="waves-effect waves-teal btn-flat">Remove</a>                                    -->
                     <a class="btn-floating btn-medium waves-effect waves-light red" id="${movie.id}"><i class="material-icons">do_not_disturb_on</i></a> 
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Actors: ${movie.actors}<i class="material-icons right">close</i></span>
                    <p>Plot: ${movie.plot}</p>
                    <p>Year: ${movie.year}</p>           
                  </div>
                </div> `
        })
        return html

    }

});

