export const createMovieModal = movieDetails => {

    const { Title, Released, Director, Writer, Actors, Awards, BoxOffice } = movieDetails;

    return `
        <dialog id="movie-modal">
            <div class="close-modal-btn-container">
                <button type="button" class="modal-close-btn" id="modal-close-btn">X</button>
            </div>
            <div class="movie-modal-container">

                    <span class="label">Title:</span>
                    <span>${Title}</span>

                    <span class="label">Released:</span>
                    <span>${Released}</span>

                    <span class="label">Director:</span>
                    <span>${Director}</span>

                    <span class="label">Writer:</span>
                    <span>${Writer}</span>

                    <span class="label">Actors:</span>
                    <span>${Actors}</span>

                    <span class="label">Awards:</span>
                    <span>${Awards}</span>

                    <span class="label">Box Office:</span>
                    <span>${BoxOffice}</span>

            </div>
        </dialog>
    `;

};
