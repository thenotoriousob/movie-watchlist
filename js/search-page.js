import { renderSearchBar } from './search-bar.js';
import { renderSort } from './sort.js';

export const renderSearchPage = () => {
    return `
        ${renderSearchBar()}
        ${renderSort()}
        <section class="movie-list" id="movie-container">

        </section>
    `
};

