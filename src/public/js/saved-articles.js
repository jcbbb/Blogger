import { removeFromDOM } from './helpers.js';

const unbookmarkButtons = document.querySelectorAll('.card__btn--saved');
unbookmarkButtons.forEach((btn) => {
  btn.addEventListener('click', removeFromDOM('/article/unbookmark/', 'POST'));
});
