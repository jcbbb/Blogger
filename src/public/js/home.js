import { bookmark, removeFromDOM } from './helpers.js';

const bookmarkButtons = document.querySelectorAll('.card__btn--save');
const unbookmarkButtons = document.querySelectorAll('.card__btn--saved');
const deleteButtons = document.querySelectorAll('.card__btn--del');

deleteButtons.forEach((btn) => {
  btn.addEventListener('click', removeFromDOM('/article/delete/', 'DELETE'));
});

unbookmarkButtons.forEach((btn) => {
  btn.addEventListener(
    'click',
    bookmark(
      '/article/unbookmark/',
      'POST',
      'card__btn--saved',
      'card__btn--save',
    ),
  );
});

bookmarkButtons.forEach((btn) => {
  btn.addEventListener(
    'click',
    bookmark(
      '/article/bookmark/',
      'POST',
      'card__btn--save',
      'card__btn--saved',
    ),
  );
});
