import { createMovieCard } from './movie-card.js';
import { createMovieModal } from './modal-dets.js';
import { renderSearchPage } from './search-page.js';
import { renderMovieWatchlistPage } from './watchlist-page.js';
import { renderHeader } from './header.js';
import { movieData } from './data.js';

const movieWatchlistFromLocalStorage = JSON.parse( localStorage.getItem("movieWatchlist"));
const header = document.querySelector("#header");
const main = document.querySelector('#main');

let listView = true;

const routes = {
    '/': new Page('Find your film', 'movielist', 'My Watchlist', renderSearchPage),
    '/movielist': new Page('My Watchlist', '', 'Search for movies', renderMovieWatchlistPage)
};
const home = routes['/'];
const movieWatchlist = routes['/movielist'];

function Page(title, path, label, contentFunction) {
    this.title = title
    this.linkPath = path
    this.linkLabel  = label
    this.header = renderHeader(this)
    this.content = contentFunction()
    this.movies = []
    this.addMovie = function(movie) {
        // addMovieDets is going to be an array, so don't want to push an array onto an array
        // The spread merges addMovieDets into the array
        this.movies.push(...movie)
    }
    this.removeMovie = function(movieId) {
      this.movies.splice(this.movies.map(movie => movie.imdbID).indexOf(movieId),1);
    }
    this.clearMovies = function() {
      this.movies.length = 0;
    }
}

if (movieWatchlistFromLocalStorage) {
    movieWatchlist.addMovie(movieWatchlistFromLocalStorage);
}

document.addEventListener("click", e => {

    e.preventDefault();

    if (e.target.matches(".links")) {
        const { href } = e.target;
        history.pushState({}, "", href);
        navigate(e);
    }
    else if (e.target.matches(".fa-table-cells")) {
        listView = false;
        renderMovies();
    }
    else if(e.target.matches(".fa-list")) {
        listView = true;
        renderMovies();
    }
    else if(e.target.matches(".movie-img")) {
        renderMovieModal(e);
    }
    else if(e.target.matches(".modal-close-btn")) {
        document.querySelector("dialog").close();
    }
    else if(e.target.matches(".search-btn")) {
        searchMovies();
    }
    else if(e.target.matches(".add-movie")) {
        saveMovie(e);
    }
    else if(e.target.matches(".remove-movie")) {
        removeMovie(e.target.dataset.movieId);
    }
});

function renderMovieModal(e) {
    const html = createMovieModal(movieWatchlist.movies.filter(movie => movie.imdbID === e.target.parentElement.dataset.movieDetails)[0]);
    const modalEl = document.getElementById("modal");

    modalEl.innerHTML = html;

    document.querySelector("dialog").showModal();
};

async function searchMovies() {

    const searchCriteria = document.querySelector(".search-input").value;

    try {
        home.clearMovies();
        // const resp = await fetch("http://www.omdbapi.com/?apikey=69effa7b&s='Home Alone'");

        // if (!resp.ok) {
        //     throw new Error("failed");
        // }

        // const data = await resp.json();

        // searchedMovies = await getAdditionalMovieDetails(data.Search);

        // routes[location.pathname].addMovie(...await getAdditionalMovieDetails(movieData));

        const searchedMovies = await getAdditionalMovieDetails(movieData);

        home.addMovie(searchedMovies);

        renderMovies();

    }

    catch(error) {
        console.error(error);
    }

}

async function getAdditionalMovieDetails(movieArray) {

    return await Promise.all(movieArray.map(async (movie) => {

        const resp = await fetch(`http://www.omdbapi.com/?apikey=69effa7b&i=${movie.imdbID}`);

        const movieDetails = await resp.json();

        return movieDetails;

    }));

}

function renderMovies() {

    const moviesArr = routes[location.pathname].movies;

    if(moviesArr.length === 0) {
        return;
    }

    const movieContainerEl = document.getElementById("movie-container");

    let html = "";

    moviesArr.forEach(movieDetails => {
        html +=  `
            ${createMovieCard(movieDetails, listView, movieWatchlist.movies.find(movie => movie.imdbID === movieDetails.imdbID) ? "remove" : "add")}
        `;
    });

    movieContainerEl.innerHTML = html;

    renderMovieView();
}

function renderMovieView() {

    const movieContainerEl = document.getElementById("movie-container");
    const listIconEl = document.querySelector(".fa-list");
    const gridIconEl = document.querySelector(".fa-table-cells");
    const listClass= "movie-list";
    const gridClass = "movie-grid";

    movieContainerEl.classList.add(listView ? listClass : gridClass);
    movieContainerEl.classList.remove(!listView ? listClass : gridClass);
    listIconEl.style.display = listView ? "none" : "inline";
    gridIconEl.style.display = !listView ? "none" : "inline";

}

async function saveMovie(e) {

    const addMovieDets = await getAdditionalMovieDetails([{imdbID: e.target.dataset.movieId}]);

    movieWatchlist.addMovie(addMovieDets);

    localStorage.setItem("movieWatchlist", JSON.stringify(movieWatchlist.movies));

    renderMovies();

}

function removeMovie(movieId) {

    movieWatchlist.removeMovie(movieId);

    localStorage.setItem("movieWatchlist", JSON.stringify(movieWatchlist.movies));

    renderMovies();
}

const renderContent = async route => {
    header.innerHTML = routes[route].header;
    main.innerHTML = routes[route].content;

    renderMovies(routes[route].movies);
}

const registerBrowserBackAndForth = () => {
    window.onpopstate = function (e) {
        const route = location.pathname;
        renderContent(route);
    };
};

const navigate = e => {
    const route = e.target.pathname;
    renderContent(route);
};

// IIFE - Immediately Invoked Function Expression
(function startApplication() {
    registerBrowserBackAndForth();
    renderContent(location.pathname);
})();
