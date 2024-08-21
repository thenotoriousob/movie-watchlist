import { renderSort } from './components/sort.js';

export const renderMovieWatchlistPage = () => {

    return `
        ${renderSort()}
        <div id="movie-container" class="movie-container">

        </div>
    `;
};