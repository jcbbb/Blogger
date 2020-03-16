(() => {
  const removeFromDOM = (el) => {
    el.closest('.card').remove();
  };
  const saveButtons = document.querySelectorAll('.card__btn--save');
  const deleteButtons = document.querySelectorAll('.card__btn--del');

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      stopImmediatePropagation();
      e.target.innerHTML = '<i class="lni lni-spiner-solid"></i>';
      const id = e.target.dataset.id;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`/article/delete/${id}`, options);
      if (response.status === 200) {
        removeFromDOM(e.target);
      }
    });
  });

  saveButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopImmediatePropagation();
      e.target.innerHTML = '<i class="lni lni-spiner-solid"></i>';
      const id = e.target.dataset.id;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = fetch(`/article/bookmark/${id}`, options);

      if (response.status === 200) {
        e.target.textContent = 'Saved';
        e.target.classList.add('action-active-hover', 'action-disabled');
      }
    });
  });
})();
