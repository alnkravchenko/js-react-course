'use strict';

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  private: false,
  start: function() {
    this.count = +prompt("How many films have you seen?", "");
    
    while (this.count == "" || isNaN(this.count)) {
      this.count = +prompt("How many films have you seen?", "");
    }
  },

  rememberMyFilms: function() {
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
      this.movies[lastWatchedFilm] = rating;
    }
  },

  detectPersonalLevel: function() {
    if (this.count > 0 && this.count < 10) {
      console.log("It's not so many");
    } else if (10 <= this.count && this.count < 30) {
      console.log("You seem to be an average watcher");
    } else if (this.count > 30) {
      console.log("Wow! You really are a movie enjoyer!");
    } else {
      console.log("Exception!");
    }
  },

  showMyDB: function(hidden) {
    if (!hidden) {
      console.dir(this);
    }
  },

  writeYourGenres: function() { 
    for (let i = 1; i <= 3; i++) {
      const genre = prompt(`What is your top-${i} movie genre?`, "");
      if (!genre) {
        i--;
        continue;
      }
      this.genres.push(genre);
    }

    this.genres.forEach((genre, index) => {
      const message = `Favorite genre #${index + 1} is ${genre}`;
      console.log(message);
    });
  },

  toggleVisibleMyDB: function() { 
    if (this.private) {
      this.private = false; 
    } else {
      this.private = true;
    }
  }
};
