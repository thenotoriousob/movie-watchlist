import { renderMovies } from './components/movies.js';
import { createMovieModal } from './components/modal-dets.js';
import { Page } from './components/page.js';
import { renderSearchPage } from './search-page.js';
import { renderMovieWatchlistPage } from './watchlist-page.js';

const movieWatchlistFromLocalStorage = JSON.parse( localStorage.getItem("movieWatchlist"));
const routes = {
    '/': new Page('Find your film', 'movielist', 'My Watchlist', renderSearchPage),
    '/movielist': new Page('My Watchlist', '', 'Search for movies', renderMovieWatchlistPage)
};
const home = routes['/'];
const movieWatchlist = routes['/movielist'];

let listView = true;

if (movieWatchlistFromLocalStorage) {
    movieWatchlist.addMovie(movieWatchlistFromLocalStorage);
};

async function searchMovies() {

    const inputEl = document.querySelector(".search-input");

    if (inputEl.value === "") {
        inputEl.classList.add("search-input-error");
        return;
    };

    inputEl.classList.remove("search-input-error");

    try {
        home.clearMovies();
        const resp = await fetch(`https://www.omdbapi.com/?apikey=69effa7b&s='${inputEl.value}'`);

        if (!resp.ok) {
            throw new Error("failed");
        };

        const data = await resp.json();

        if(data.Response === "True") {
            const searchedMovies = await getAdditionalMovieDetails(data.Search);

            home.addMovie(searchedMovies);
        };

        displayMovies(true);

    }

    catch(error) {
        console.error(error);
    };

};

async function getAdditionalMovieDetails(movieArray) {

    return await Promise.all(movieArray.map(async (movie) => {

        const resp = await fetch(`https://www.omdbapi.com/?apikey=69effa7b&i=${movie.imdbID}`);

        const movieDetails = await resp.json();

        return movieDetails;

    }));

};

// Just a helper function to make the code a bit DRYer  
function displayMovies(searched = false) {
    renderMovies(routes[location.pathname].movies, movieWatchlist, listView, searched);
};

function renderMovieModal(e) {

    document.getElementById("modal").innerHTML =
        createMovieModal(routes[location.pathname].movies.filter(movie => movie.imdbID === e.target.parentElement.dataset.movieDetails)[0]);

    document.querySelector("dialog").showModal();
};

async function saveMovie(movieId) {

    // Store the full movie object so we don't need to keep calling the api
    const addMovieDets = await getAdditionalMovieDetails([{imdbID: movieId}]);

    movieWatchlist.addMovie(addMovieDets);

    localStorage.setItem("movieWatchlist", JSON.stringify(movieWatchlist.movies));

    displayMovies();

};

function removeMovie(movieId) {

    movieWatchlist.removeMovie(movieId);

    localStorage.setItem("movieWatchlist", JSON.stringify(movieWatchlist.movies));

    displayMovies();
};

// ROUTER - Start
const renderContent = route => {

    const header = document.querySelector("#header");
    const main = document.querySelector('#main');

    header.innerHTML = routes[route].header;
    main.innerHTML = routes[route].content;

    displayMovies();
};

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

// ROUTER - End

// EVENT LISTENERS - Start
document.addEventListener("click", e => {

  e.preventDefault();
  
  if(e.target.dataset.addMovieId) {
      saveMovie(e.target.dataset.addMovieId);
  }
  else if(e.target.dataset.removeMovieId) {
      removeMovie(e.target.dataset.removeMovieId);
  }
  else if (e.target.matches(".links")) {
      const { href } = e.target;
      history.pushState({}, "", href);
      navigate(e);
  }
  else if (e.target.matches(".fa-table-cells")) {
      listView = false;
      displayMovies();
  }
  else if(e.target.matches(".fa-list")) {
      listView = true;
      displayMovies();
  }
  else if(e.target.matches(".poster-details")) {
      renderMovieModal(e);
  }
  else if(e.target.matches(".modal-close-btn")) {
      document.querySelector("dialog").close();
  }
  else if(e.target.matches(".search-btn")) {
      searchMovies();
  }
  else if(e.target.matches(".movie-list-blank")) {
      document.querySelector(".search-input").focus();
  };

});

// Some events need a keypress to fire from the keyboard
document.addEventListener("keypress", e => {

  if (e.key === "Enter") {
      if (e.target.matches(".fa-table-cells")) {
          listView = false;
          displayMovies();
      }
      else if(e.target.matches(".fa-list")) {
          listView = true;
          displayMovies();
      }
      else if(e.target.matches(".poster-details")) {
          renderMovieModal(e);
      }
      else if(e.target.matches(".movie-list-blank")) {
          document.querySelector(".search-input").focus();
      };
  }; 

});

// EVENT LISTENERS - End
