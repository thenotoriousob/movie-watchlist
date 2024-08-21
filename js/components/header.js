export const renderHeader = (route) => {
    return `
        <div class="container">
            <h1 class="title"><nobr>${route.title}</nobr></h1>
            <a class="links watchlist-link" href="./${route.linkPath}">${route.linkLabel}</a>
        </div>
    `;
};