// ======================================
// MOVIE DATA
// ======================================

const movies = [

    {
        id: 1,
        title: "Shadow Protocol",
        genre: "Action",
        year: 2026,
        rating: 8.7,
        duration: "2h 18m",
        emoji: "🔥",
        description:
            "An elite agent is pulled into a dangerous mission where every decision could change the future."
    },

    {
        id: 2,
        title: "Beyond the Stars",
        genre: "Sci-Fi",
        year: 2026,
        rating: 9.1,
        duration: "2h 25m",
        emoji: "🚀",
        description:
            "A group of astronauts discovers a mysterious signal coming from a distant galaxy."
    },

    {
        id: 3,
        title: "The Last Letter",
        genre: "Drama",
        year: 2025,
        rating: 8.4,
        duration: "2h 05m",
        emoji: "💌",
        description:
            "A forgotten letter brings two families together and reveals a secret from the past."
    },

    {
        id: 4,
        title: "Crazy Campus",
        genre: "Comedy",
        year: 2026,
        rating: 8.2,
        duration: "1h 52m",
        emoji: "😂",
        description:
            "A group of college friends turns their final semester into an unforgettable adventure."
    },

    {
        id: 5,
        title: "Dark Horizon",
        genre: "Thriller",
        year: 2025,
        rating: 8.8,
        duration: "2h 12m",
        emoji: "🌑",
        description:
            "A detective races against time to uncover the truth behind a series of mysterious events."
    },

    {
        id: 6,
        title: "Velocity",
        genre: "Action",
        year: 2026,
        rating: 8.6,
        duration: "2h 20m",
        emoji: "🏎️",
        description:
            "A young racing driver gets one final chance to prove himself on the world's biggest track."
    },

    {
        id: 7,
        title: "Quantum Code",
        genre: "Sci-Fi",
        year: 2026,
        rating: 9.0,
        duration: "2h 30m",
        emoji: "🧬",
        description:
            "A brilliant programmer discovers an algorithm capable of predicting the future."
    },

    {
        id: 8,
        title: "Laugh Out Loud",
        genre: "Comedy",
        year: 2025,
        rating: 7.9,
        duration: "1h 48m",
        emoji: "🤣",
        description:
            "Three best friends start a business that goes hilariously wrong."
    }

];


// ======================================
// ELEMENTS
// ======================================

const movieGrid =
    document.getElementById("movieGrid");

const trendingMovies =
    document.getElementById("trendingMovies");

const favoriteGrid =
    document.getElementById("favoriteGrid");

const emptyFavorites =
    document.getElementById("emptyFavorites");

const noResults =
    document.getElementById("noResults");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const filters =
    document.querySelectorAll(".filter");

const modal =
    document.getElementById("movieModal");

const closeModal =
    document.getElementById("closeModal");

const themeBtn =
    document.getElementById("themeBtn");

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


// ======================================
// FAVORITES
// ======================================

let favorites =
    JSON.parse(
        localStorage.getItem("cineFavorites")
    ) || [];


// ======================================
// MOVIE CARD
// ======================================

function createMovieCard(movie) {

    const isFavorite =
        favorites.includes(movie.id);

    const posterClass =
        movie.genre.toLowerCase().replace(
            " ",
            ""
        );

    return `

        <article
            class="movie-card"
            data-id="${movie.id}"
            onclick="openMovie(${movie.id})">

            <div
                class="movie-poster ${posterClass}">

                <span>
                    ${movie.emoji}
                </span>

                <button
                    class="favorite-btn ${
                        isFavorite ? "active" : ""
                    }"
                    onclick="toggleFavorite(
                        event,
                        ${movie.id}
                    )">

                    ${isFavorite ? "♥" : "♡"}

                </button>

            </div>

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <p>
                    ${movie.year} • ${movie.duration}
                </p>

                <div class="movie-meta">

                    <span class="rating">
                        ⭐ ${movie.rating}
                    </span>

                    <span class="movie-genre">
                        ${movie.genre}
                    </span>

                </div>

            </div>

        </article>
    `;
}


// ======================================
// DISPLAY MOVIES
// ======================================

function displayMovies(movieList) {

    movieGrid.innerHTML = "";

    if (movieList.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    movieList.forEach(function (movie) {

        movieGrid.innerHTML +=
            createMovieCard(movie);

    });

}


// ======================================
// TRENDING MOVIES
// ======================================

function displayTrending() {

    const trending =
        [...movies]
            .sort(
                (a, b) =>
                    b.rating - a.rating
            )
            .slice(0, 4);

    trendingMovies.innerHTML = "";

    trending.forEach(function (movie) {

        trendingMovies.innerHTML +=
            createMovieCard(movie);

    });

}


// ======================================
// FAVORITE MOVIES
// ======================================

function displayFavorites() {

    const favoriteMovies =
        movies.filter(function (movie) {

            return favorites.includes(movie.id);

        });

    favoriteGrid.innerHTML = "";

    if (favoriteMovies.length === 0) {

        emptyFavorites.style.display =
            "block";

        return;

    }

    emptyFavorites.style.display =
        "none";

    favoriteMovies.forEach(function (movie) {

        favoriteGrid.innerHTML +=
            createMovieCard(movie);

    });

}


// ======================================
// TOGGLE FAVORITE
// ======================================

function toggleFavorite(event, movieId) {

    event.stopPropagation();

    if (favorites.includes(movieId)) {

        favorites =
            favorites.filter(
                id => id !== movieId
            );

    } else {

        favorites.push(movieId);

    }

    localStorage.setItem(
        "cineFavorites",
        JSON.stringify(favorites)
    );

    displayMovies(
        getCurrentMovies()
    );

    displayTrending();

    displayFavorites();

}


// ======================================
// CURRENT MOVIE LIST
// ======================================

let currentGenre = "All";
let currentSearch = "";


function getCurrentMovies() {

    return movies.filter(function (movie) {

        const matchesGenre =
            currentGenre === "All" ||
            movie.genre === currentGenre;

        const searchText =
            currentSearch.toLowerCase();

        const matchesSearch =
            movie.title
                .toLowerCase()
                .includes(searchText);

        return matchesGenre &&
            matchesSearch;

    });

}


// ======================================
// FILTERS
// ======================================

filters.forEach(function (filter) {

    filter.addEventListener(
        "click",
        function () {

            filters.forEach(function (item) {

                item.classList.remove(
                    "active"
                );

            });

            filter.classList.add("active");

            currentGenre =
                filter.dataset.genre;

            displayMovies(
                getCurrentMovies()
            );

        }
    );

});


// ======================================
// SEARCH
// ======================================

function performSearch() {

    currentSearch =
        searchInput.value;

    displayMovies(
        getCurrentMovies()
    );

    document
        .getElementById("movies")
        .scrollIntoView({
            behavior: "smooth"
        });

}


searchBtn.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);


// ======================================
// MOVIE MODAL
// ======================================

function openMovie(movieId) {

    const movie =
        movies.find(
            item => item.id === movieId
        );

    if (!movie) return;

    document.getElementById(
        "modalPoster"
    ).textContent = movie.emoji;

    document.getElementById(
        "modalGenre"
    ).textContent = movie.genre;

    document.getElementById(
        "modalTitle"
    ).textContent = movie.title;

    document.getElementById(
        "modalRating"
    ).textContent =
        "⭐ " + movie.rating;

    document.getElementById(
        "modalYear"
    ).textContent =
        movie.year;

    document.getElementById(
        "modalDuration"
    ).textContent =
        movie.duration;

    document.getElementById(
        "modalDescription"
    ).textContent =
        movie.description;

    const modalFavorite =
        document.getElementById(
            "modalFavorite"
        );

    modalFavorite.textContent =
        favorites.includes(movie.id)
            ? "♥ Remove Favorite"
            : "❤️ Favorite";

    modalFavorite.onclick =
        function () {

            if (favorites.includes(movie.id)) {

                favorites =
                    favorites.filter(
                        id => id !== movie.id
                    );

            } else {

                favorites.push(movie.id);

            }

            localStorage.setItem(
                "cineFavorites",
                JSON.stringify(favorites)
            );

            modalFavorite.textContent =
                favorites.includes(movie.id)
                    ? "♥ Remove Favorite"
                    : "❤️ Favorite";

            displayMovies(
                getCurrentMovies()
            );

            displayTrending();

            displayFavorites();

        };

    document.getElementById(
        "trailerBtn"
    ).onclick = function () {

        alert(
            "🎬 Trailer feature will open here!"
        );

    };

    modal.classList.add("show");

}


// ======================================
// CLOSE MODAL
// ======================================

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("show");

    }
);


modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// ======================================
// DARK / LIGHT MODE
// ======================================

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light"
        );

        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeBtn.textContent = "☀️";

            localStorage.setItem(
                "cineTheme",
                "light"
            );

        } else {

            themeBtn.textContent = "🌙";

            localStorage.setItem(
                "cineTheme",
                "dark"
            );

        }

    }
);


// Load saved theme

if (
    localStorage.getItem("cineTheme")
    === "light"
) {

    document.body.classList.add("light");

    themeBtn.textContent = "☀️";

}


// ======================================
// MOBILE MENU
// ======================================

menuBtn.addEventListener(
    "click",
    function () {

        nav.classList.toggle("show");

    }
);


// Close mobile menu

nav.querySelectorAll("a").forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                nav.classList.remove(
                    "show"
                );

            }
        );

    }
);


// ======================================
// INITIAL LOAD
// ======================================

displayMovies(movies);

displayTrending();

displayFavorites();

document.getElementById(
    "movieCount"
).textContent =
    movies.length + " Movies";
