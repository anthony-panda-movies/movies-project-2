$(document).ready(function(){


    "use strict";

    const API_URL = 'https://veiled-nonchalant-panama.glitch.me/movies';

    const moviePromise = fetch(API_URL)
    moviePromise.then(result => {
        result.json().then(movies => {
            getMovies(movies);

        })
    })

    function getMovies(movies)
    {
        console.log(movies);
    }

})

