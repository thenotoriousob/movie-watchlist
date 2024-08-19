export function createMovieCard(movieDetails, displayFullCard, addOrRemove) {

    const { Title, Runtime, Genre, Plot, Poster, imdbRating, imdbID, Ratings } = movieDetails;

    let html = "";

    html += `
    <div class="movie-card ${!displayFullCard ? 'movie-card-column' : ''}" data-movie-details="${imdbID}">
        <img class="movie-img" src="${Poster}" alt="" tabindex="0"/>
    `;

    // For grid view we only want the image otherwise show full card
    if (displayFullCard) {
      
        html += `
        <div class="movie-details">
            <div class="movie-header">
                <h2 class="movie-title">${Title}</h2>
                <img src="./images/star.png" />
                <span class="rating" tabindex="0">${imdbRating}
                    <div class="tooltip">
                        <p>Ratings</p>`;

        Ratings.forEach(rating => {
            html += `<p>${rating.Source} - ${rating.Value}</p>`
        })

        html += `
                    </div>
                </span>
                
            </div>
            <div class="movie-info">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <div class="${addOrRemove}-movie" data-movie-id="${imdbID}">
                    <img src="./images/${addOrRemove}.png" /> 
                    <a href="#">${addOrRemove === "add" ? 'Watchlist' : 'Remove'}</a>
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
                        <p>Ratings</p>`;

        Ratings.forEach(rating => {
            html += `<p>${rating.Source} - ${rating.Value}</p>`
        })

        html += `
                    </div>
                </span>
            </div>
            <div class="${addOrRemove}-movie" data-movie-id="${imdbID}">
                <img src="./images/${addOrRemove}.png" /> 
                <a href="#">${addOrRemove === "add" ? 'Watchlist' : 'Remove'}</a>
            </div>
        </div>`;
    };

    html += `
    </div>
    `;

    return html;

};
