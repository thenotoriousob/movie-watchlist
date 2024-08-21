import { renderHeader } from './header.js';

export function Page(title, path, label, contentFunction) {
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
};
