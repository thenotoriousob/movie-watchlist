export function renderMovies(moviesArr, movieWatchlist, listView, searched) {

    const movieContainerEl = document.getElementById("movie-container");
    const listClass= "movie-list";
    const gridClass = "movie-grid";
    let html = "";

    if(moviesArr.length === 0) {
        // When there are no movies we want to remove the grid/list class from the container
        movieContainerEl.classList.remove(listClass);
        movieContainerEl.classList.remove(gridClass);

        // What should be displayed when there are no movies on the Home page
        if(location.pathname === "/") {
            // If there are no movies when the user has searched let the user know this,
            // otherwise ask them to start exploring
            if(searched) {
                html = `
                    <p class="no-movies-found">Unable to find what you’re looking for. Please try another search.</p>
                `;
            } else {
                html = `
                    <section class="movie-list-blank" tabindex="0">
                        <img src="./images/movie-icon.png" />
                        <p>Start exploring</p>
                    </section>  
                  `;
            };
        }
        // What should be displayed when there are no movies on the Watchlist page
        else {
          html = `
              <div class="no-movies-found">
                  <p>Your watchlist is looking a little empty....</p>
                  <div class="add-movie">
                      <img src="./images/add.png" /> 
                      <a href="/" class="links">Let’s add some movies!</a>
                  </div>
              </div>
          `;
        };

    } else {
        // Toggle between the grid or list class as appropriate
        movieContainerEl.classList.add(listView ? listClass : gridClass);
        movieContainerEl.classList.remove(!listView ? listClass : gridClass);

        moviesArr.forEach(movieDetails => {
            html +=  `
                ${createMovieCard(movieDetails, listView, movieWatchlist.movies.find(movie => movie.imdbID === movieDetails.imdbID) ? "remove" : "add")}
            `;
        });
    };

    movieContainerEl.innerHTML = html;

    renderSortByIcons(moviesArr.length, listView);
};

function createMovieCard(movieDetails, displayFullCard, addOrRemove) {

    const { Title, Runtime, Genre, Plot, Poster, imdbRating, imdbID, Ratings } = movieDetails;

    let html = "";

    html += `
    <div class="movie-card ${!displayFullCard ? 'movie-card-column' : ''}" data-movie-details="${imdbID}">
        <div class="poster-details" tabindex="0">
            <img class="poster-img" src="${Poster}" alt="Poster for ${Title}" onerror="this.src='../../images/blank-poster.png'"/>
            <p class="poster-text">Click for more info</p>
        </div>
    `;

    // For grid view we only want the image otherwise show full card
    if (displayFullCard) {
      
        html += `
        <div class="movie-details">
            <div class="movie-header">
                <h2 class="movie-title">${Title}</h2>
                <span class="rating" tabindex="0">
                    <img src="./images/star.png" />
                    <span>${imdbRating}</span>
                    <div class="tooltip">
                        <h3>Ratings</h3>`;

        Ratings.forEach(rating => {
            html += `<p>${rating.Source} - ${rating.Value}</p>`
        });

        html += `
                    </div>
                </span>
                
            </div>
            <div class="movie-info">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <div class="${addOrRemove}-movie">
                    <img src="./images/${addOrRemove}.png" /> 
                    <a href="#" class="links" data-${addOrRemove}-movie-id="${imdbID}">${addOrRemove === "add" ? 'Watchlist' : 'Remove'}</a>
                </div>
            </div>
            <p class="movie-plot">${Plot}</p>
        </div>
        `;

    } else {
        html += `
        <div class="movie-grid-details">
            <div class="movie-header">
                <img src="./images/star.png" />
                <span class="rating" tabindex="0">${imdbRating}
                    <div class="tooltip">
                        <h3>Ratings</h3>`;

        Ratings.forEach(rating => {
            html += `<p>${rating.Source} - ${rating.Value}</p>`
        });

        html += `
                    </div>
                </span>
            </div>
            <div class="${addOrRemove}-movie">
                <img src="./images/${addOrRemove}.png" /> 
                <a href="#" class="links" data-${addOrRemove}-movie-id="${imdbID}">${addOrRemove === "add" ? 'Watchlist' : 'Remove'}</a>
            </div>
        </div>`;
    };

    html += `
    </div>
    `;

    return html;

};

// Toggle between the grid/list views
function renderSortByIcons(movieCount, listView) {

    const listIconEl = document.querySelector(".fa-list");
    const gridIconEl = document.querySelector(".fa-table-cells");

    // If there are no movies then they should always be hidden, otherwise
    // it depends which view mode is currently selected
    if (listIconEl) {
        listIconEl.style.display = listView || movieCount === 0 ? "none" : "inline";
    };

    if (gridIconEl) {
         gridIconEl.style.display = !listView || movieCount === 0 ? "none" : "inline";
    };

};