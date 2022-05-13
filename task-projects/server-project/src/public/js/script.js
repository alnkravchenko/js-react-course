'use strict';
import tabs from './modules/tabs';
import cards from './modules/cards';
import timer from './modules/timer';
import modal from './modules/modal';
import openModal from "./modules/modal";
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);
  const deadline = new Date(Date.parse(new Date()) + (6 * 24 * 60 * 60 * 1000));

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  cards();
  timer(".timer", deadline);
  modal(".modal", "[data-modal]", modalTimerId);
  forms("form");
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    curCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  calc();
});
