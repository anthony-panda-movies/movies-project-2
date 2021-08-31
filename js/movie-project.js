$(document).ready(function(){


    "use strict";
    const movie = document.getElementById("movie")


    const testImg =  "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
    const posterEndPoint = 'https://image.tmdb.org/t/p/w400'

    //Movie API call for poster images
    const posterPromise = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=IT`)
        posterPromise.then(result => {
            result.json().then(poster => {
                console.log(poster);
            })
        });

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
            html += `<div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${posterEndPoint+testImg}">
                  </div>
                  <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${movie.title}<i class="material-icons right">more_vert</i></span>
                    <p>Rating: ${movie.rating}</p>
                    <p><a href="#">Hi!</a></p>
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

