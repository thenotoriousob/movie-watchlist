import { createMovieCard } from './movie-card.js';
import { createMovieModal } from './modal-dets.js';

const movieContainerEl = document.getElementById("movie-container");
const movieWatchlistFromLocalStorage = JSON.parse( localStorage.getItem("movieWatchlist"));

let movieWatchlist = [];

document.addEventListener("click", e => {
    if (e.target.matches(".fa-table-cells")) {
        renderWatchList(false);
    }
    else if(e.target.matches(".fa-list")) {
        renderWatchList(true);
    }
    else if(e.target.matches(".movie-img")) {
        renderMovieModal(e);
    }
    else if(e.target.matches(".modal-close-btn")) {
        document.querySelector("dialog").close();
    }
    else if(e.target.matches(".remove-movie")) {
        removeMovie(e.target.dataset.movieId);
    }
});

function renderMovieModal(e) {
    const html = createMovieModal(movieWatchlist.filter(movie => movie.imdbID === e.target.parentElement.dataset.movieDetails)[0]);
    const modalEl = document.getElementById("modal");

    modalEl.innerHTML = html;

    document.querySelector("dialog").showModal();
};

function renderWatchList(addInfo = true) {

    let html = "";

    movieWatchlist.forEach(movieDetails => {

        html += createMovieCard(movieDetails, addInfo, "remove");

    });

    document.getElementById("movie-container").innerHTML = html;  

    if (addInfo) {
        movieContainerEl.classList.add("movie-list");
        movieContainerEl.classList.remove("movie-grid");
        document.querySelector(".fa-list").style.display = "none";
        document.querySelector(".fa-table-cells").style.display = "inline";
    } else {
        movieContainerEl.classList.remove("movie-list");
        movieContainerEl.classList.add("movie-grid");
        document.querySelector(".fa-table-cells").style.display = "none";
        document.querySelector(".fa-list").style.display = "inline";
    };
}

async function retrieveMovieData() {

    for await (const movie of movieWatchlistFromLocalStorage) {

        const resp = await fetch(`http://www.omdbapi.com/?apikey=69effa7b&i=${movie}`);

        const movieDetails = await resp.json();

        movieWatchlist.push(movieDetails);

    };

    renderWatchList();

};

function removeMovie(movieId) {
    movieWatchlist.splice(movieWatchlist.map(movie => movie.imdbID).indexOf(movieId),1);

    // localStorage.setItem("movieWatchlist", JSON.stringify(movieWatchlist));

    renderWatchList();
}

retrieveMovieData();