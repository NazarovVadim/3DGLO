'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
let Promise = require('es6-promise').Promise;
import 'fetch-polyfill';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import sliderFoo from './modules/sliderFoo';
import changePhotoOnHover from './modules/changePhotoOnHover';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';




//timer
countTimer('30 june 2021');
//menu
toggleMenu();
//popup
togglePopup();
window.addEventListener('resize', togglePopup);
//next slide scroll
smoothScroll();
//tabs
tabs();
//slider
sliderFoo();
//изменеие фотографий по наведению в блоке "Наша команда"
changePhotoOnHover();
//калькулятор
calculator(100);
//send-ajax=form
sendForm();
