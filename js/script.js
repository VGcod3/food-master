import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal'
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal'

window.addEventListener('DOMContentLoaded', function () {

	const timerId = setTimeout(() => {
		openModal(modalSelector, timerId)
	}, 30000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
	timer('.timer', `${new Date().getFullYear() + 1}-05-20`)
	modal('[data-modal]', '.modal', timerId)
	forms('form', timerId)
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	calc()
});

