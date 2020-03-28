// export const fetchAndRemoveFromDom = (req, method) => async (e) => {
//   e.stopImmediatePropagation();
//   e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';

//   const { id } = e.target.dataset;

//   const response = await fetch(req + id, { method });

//   if (method == 'DELETE' && response.ok) {
//     e.target.closest('.card').remove();
//   }
//   if (method == 'POST' && response.ok) {
//     e.target.innerHTML = '<i class="fal fa-bookmark"></i>';
//     e.target.classList.remove('.card__btn--saved');
//     e.target.classList.add('.card__btn--save');
//   }
// };

export const bookmark = (req, method, classToRemove, classToAdd) => async (
  e,
) => {
  e.stopImmediatePropagation();
  e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';

  const { id } = e.target.dataset;

  const response = await fetch(req + id, { method });

  if (response.ok) {
    e.target.innerHTML = '<i class="fal fa-bookmark"></i>';
    e.target.classList.remove(classToRemove);
    e.target.classList.add(classToAdd);
  }
};

// export const unbookmarkAndRemoveFromDom = (request, method) => async (e) => {
//   e.stopImmediatePropagation();
//   e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';

//   const { id } = e.target.dataset;

//   const response = await fetch(request + id, { method });

//   if (response.ok) {
//     e.target.closest('.card').remove();
//   }
// };

export const removeFromDOM = (req, method) => async (e) => {
  e.stopImmediatePropagation();
  e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';
  const { id } = e.target.dataset;

  const response = await fetch(req + id, { method });

  if (response.ok) {
    e.target.closest('.card').remove();
  }
};
