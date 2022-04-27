'use strict';

const movieDB = {
    movies: [
        "Scott Pilgrim vs. the World",
        "Logan",
        "Justice League",
        "Whiplash",
        "La La Lend"
    ]
};

const ads = document.querySelectorAll(".promo__adv img");
ads.forEach(item => { item.remove(); });


const poster = document.querySelector(".promo__bg");
const genre = poster.querySelector(".promo__genre");
genre.textContent = "drama";


poster.style.backgroundImage = "url('./img/bg.jpg')";


const movieList = document.querySelector(".promo__interactive-list");
// Delete old
const movies = movieList.querySelectorAll(".promo__interactive-item");
movies.forEach(item => { item.remove(); });

const sortedMovies = movieDB.movies.sort();

sortedMovies.forEach((movie, i) => {
  movieList.innerHTML += `
    <li class="promo__interactive-item">${i + 1}. ${movie}
      <div class="delete"></div>
    </li>
  `;
});
