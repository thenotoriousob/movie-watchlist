import { renderSearchBar } from './components/search-bar.js';
import { renderSort } from './components/sort.js';

export const renderSearchPage = () => {

    return `
        ${renderSearchBar()}
        ${renderSort()}
        <div class="movie-container" id="movie-container">

        </div>
    `;
};

