import { bookmark, removeFromDOM } from './helpers.js';
(() => {
  const bookmarkButtons = document.querySelectorAll('.card__btn--save');
  const unbookmarkButtons = document.querySelectorAll('.card__btn--saved');
  const deleteButtons = document.querySelectorAll('.card__btn--del');

  // Functions
  // const fetchAndRemoveFromDom = (requestURL) => async (e) => {
  //   e.stopImmediatePropagation();
  //   e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';

  //   const { id } = e.target.dataset;

  //   const response = await fetch(requestURL + id, { method: 'DELETE' });

  //   if (response.ok) {
  //     e.target.closest('.card').remove();
  //   }
  // };

  // const fetchAndChangeClasses = (
  //   requestURL,
  //   classToRemove,
  //   classToAdd,
  // ) => async (e) => {
  //   e.stopImmediatePropagation();
  //   e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';

  //   const id = e.target.dataset.id;

  //   const response = await fetch(requestURL + id, {
  //     method: 'POST',
  //   });
  //   if (response.ok) {
  //     e.target.innerHTML = '<i class="fal fa-bookmark"></i>';
  //     e.target.classList.remove(classToRemove);
  //     e.target.classList.add(classToAdd);
  //   }
  // };

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
})();
