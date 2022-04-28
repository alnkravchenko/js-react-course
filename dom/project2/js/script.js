'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
        "Scott Pilgrim vs. the World",
        "Logan",
        "Justice League",
        "Whiplash",
        "La La Lend"
    ]
  };

  const ads = document.querySelectorAll(".promo__adv img"),
        poster = document.querySelector(".promo__bg"),
        genre = poster.querySelector(".promo__genre"),
        movieList = document.querySelector(".promo__interactive-list"),
        inputForm = document.querySelector("form.add"),
        input = inputForm.querySelector(".adding__input"),
        checkbox = inputForm.querySelector("[type='checkbox']");

  const sortArr = (arr) => {
    arr.sort();
  };

  const deleteAdv = (arr) => {
    arr.forEach(item => { item.remove(); });
  };

  const makeChanges = () => {
    genre.textContent = "drama";
    poster.style.backgroundImage = "url('./img/bg.jpg')";
  };

  const createMovieList = (films, parent) => {
    parent.innerHTML = "";

    sortArr(films);
    films.forEach((movie, i) => {
      parent.innerHTML += `
      <li class="promo__interactive-item">${i + 1}. ${movie}
      <div class="delete"></div>
      </li>
      `;
    });

    // Event for deleting movie from list
    document.querySelectorAll(".delete").forEach((button, i) => {
      button.addEventListener("click", () => {
        button.parentElement.remove();
        films.splice(i, 1);

        createMovieList(films, parent);
      });
    });
  };

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let newFilm = input.value.trim();
    const favorite = checkbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = newFilm.slice(0, 21) + "...";
      }
      movieDB.movies.push(newFilm);
      createMovieList(movieDB.movies, movieList);

      if (favorite) {
        console.log("Add favorite film");
      }
    }

    event.target.reset();
  });
  
  deleteAdv(ads);
  makeChanges();
  createMovieList(movieDB.movies, movieList);
});