export const renderSearchBar = () => {
    return `
        <section class="search-container">
            <i class="fas fa-search search-icon-position"></i>
            <input type="input" class="search-input" placeholder="Search for a movie" />
            <button type="button" class="search-btn">Search</button>
        </section>
    `;
};
