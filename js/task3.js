'use strict';

let numberOfFilms;

const start = () => {
  numberOfFilms = +prompt("How many films have you seen?", "");
  
  while (numberOfFilms == "" || isNaN(numberOfFilms)) {
    numberOfFilms = +prompt("How many films have you seen?", "");
  }
};

start();

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false
};

const rememberMyFilms = () => {
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
};

rememberMyFilms();

const detectPersonalLevel = () => {
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
};

detectPersonalLevel();

const showMyDB = (hidden) => {
  if (!hidden) {
    console.dir(personalMovieDB);
  }
};

showMyDB(personalMovieDB.private);

const writeYourGenres = () => { 
  for (let i = 1; i <= 3; i++) {
    const genre = prompt(`What is your top-${i} movie genre?`, "");
    personalMovieDB.genres.push(genre);
  }
};

writeYourGenres();
