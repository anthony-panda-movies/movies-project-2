$(document).ready(function(){


    "use strict";

    //=====================  Movie API call
    const moviePromise = fetch(API_URL)
    moviePromise.then(result => {
        result.json().then(movies => {
            movie.innerHTML = getMovies(movies);
            $("#video").fadeOut(1500);
        })
    });
    const movie = document.getElementById("movie")


    const testImg =  "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
    const posterEndPoint = 'https://image.tmdb.org/t/p/w400'

    //==================    window on load event for loading page
    // $(window).on("load", function() {
    //
    // })

    //===================  toggle event for movie submission
    $('.material-icons').on('click', () => {
        $('.toggle').toggle("invisible")
    })


    //======================  Movie API call for poster images
    const posterPromise = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=IT`)
        posterPromise.then(result => {
            result.json().then(poster => {
                console.log(poster);
            })
        });

    //================  add movie
    $("#submit-btn").on('click', async() => {
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
       await fetch(API_URL, postMovie)
           const newMovies = await fetch(API_URL)
           .then( response => {
            return  response.json().then(movies => {
                   return movies                       //// REFACTOR  rerender function

               })
           })
           .catch(console.error)
        movie.innerHTML = getMovies(newMovies)
    });


  //=============  delete movie
  async function removeMovie(id) {
       await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
         .then(result => console.log(result))
      const newMovies = await fetch(API_URL)
          .then( response => {
              return  response.json().then(movies => {
                  return movies                       //// REFACTOR  rerender function

              })
          })
          .catch(console.error)
      movie.innerHTML = getMovies(newMovies)
    }

    $(document).on("click", '.btn-medium', async(e) => {
        let id = $(e.currentTarget).attr("onwheel")
       await removeMovie(id)
    })



   //for PUT dropdown menu
    $(document).on('click', '.dropdown-trigger', () => {
        $('#dropdown').slideToggle(600)
    })

    $(document).on('click', '.waves-light', async(e) => {
      let id = $(e.currentTarget).attr('oninput')
        console.log(id)
        let newInput = {
            title: $("#title").val(),
            rating: $("#rating").val(),
            year: $("#year").val(),
            actors: $("#actors").val(),
            plot: $("#plot").val()
        }
        let putMovie = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInput)
        };
        await fetch(`${API_URL}/${id}`, putMovie)
            const updateData = await fetch(API_URL)
            .then(response => {
                return response.json().then(movies => {
                    return movies
                })
            })
            .catch(console.error)
        movie.innerHTML = getMovies(updateData)
    });




    //Render Movies function
    function getMovies(movies) {
        let html = ''
            console.log(movies);
        movies.forEach(movie => {
            //let moviePoster = movie.poster
            html += `<div class="card hoverable col s12 m6" >
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${posterEndPoint+testImg}">
                  </div>
                  <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${movie.title}<i class="material-icons right">more_vert</i></span>
                    <p>Rating: ${movie.rating}</p>                                                      
                     <a class="btn-floating btn-medium waves-effect waves-light red" onwheel="${movie.id}"><i class="material-icons">do_not_disturb_on</i></a> 
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Actors: ${movie.actors}<i class="material-icons right">close</i></span>
                        <p>Plot: ${movie.plot}</p>
                        <p>Year: ${movie.year}</p> 
                    <a class="btn-floating pulse dropdown-trigger btn" data-target="dropdown1" ><i class="material-icons">menu</i></a>
                         <div class="input-field inline invisible" id="dropdown" style="display: none;">
                              <input id="title" type="text" class="validate" value="${movie.title}">
                              <label for="title" class="black-text active">Title</label>

                          <div class="input-field ">
                              <input id="rating" type="text" class="validate" value="${movie.rating}">
                              <label for="rating" class="black-text active">Rating</label>
        
                          <div class="input-field ">
                              <input id="year" type="text" class="validate" value="${movie.year}">
                              <label for="year" class="black-text active">Year</label>
                              
                          <div class="input-field ">
                              <input id="actors" type="text" class="validate" value="${movie.actors}">
                              <label for="actors" class="black-text active">Actors</label>
        
                          <div class="input-field ">
                              <input id="plot" type="text" class="validate" value="${movie.plot}">
                              <label for="plot" class="black-text active">Plot</label>
                              <a id="put-btn" class="waves-effect waves-light btn" oninput="${movie.id}">Submit</a>
                              </div>
                            </div>                                
                          </div>
                        </div>
                    </div>       
                  </div>
                </div> `
        })
        return html

    }


});

