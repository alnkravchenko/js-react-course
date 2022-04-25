'use strict';

const numberOfFilms = +prompt("How many films have you seen?", 0);

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false
};

for (let i = 0; i < 2; i++) {
  const lastWatchedFilm = prompt("What was the last film you saw?", "");
  const rating = prompt("How would you rate it?", "0");

  personalMovieDB.movies[lastWatchedFilm] = rating;
}

console.log(personalMovieDB);