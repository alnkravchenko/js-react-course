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
  const tabs = require('./modules/tabs'),
    cards = require('./modules/cards'),
    timer = require('./modules/timer'),
    modal = require('./modules/modal'),
    forms = require('./modules/forms'),
    slider = require('./modules/slider'),
    calc = require('./modules/calc');

  tabs();
  cards();
  timer();
  modal();
  forms();
  slider();
  calc();
});
