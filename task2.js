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
  if (!lastWatchedFilm || lastWatchedFilm.length > 50) {
    i--;
    continue;
  }
  const rating = prompt("How would you rate it?", "");
  if (!rating) {
    i--;
    continue;
  }
  personalMovieDB.movies[lastWatchedFilm] = rating;
}

console.log(personalMovieDB);

const count = personalMovieDB.count;
if (count > 0 && count < 10) {
  console.log("It's not so many");
} else if (10 <= count && count < 30) {
  console.log("You seem to be an average watcher");
} else if (count > 30) {
  console.log("Wow! You really are a movie enjoyer!");
} else {
  console.log("Exception!");
}
