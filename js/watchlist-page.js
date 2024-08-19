import { renderSort } from './sort.js';

export const renderMovieWatchlistPage = (route) => {

    return `
        ${renderSort()}
        <section class="movie-list" id="movie-container">

        </section>
    `;
};