(() => {
  const removeFromDOM = (el: HTMLAnchorElement) => {
    el.closest('.card').remove();
  };

  const deleteButtons: NodeList = document.querySelectorAll('.card__btn--del');

  deleteButtons.forEach((btn: HTMLAnchorElement) => {
    btn.addEventListener('click', async (e: Event) => {
      const id = (<HTMLAnchorElement>e.target).dataset.id;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await fetch(`/article/delete/${id}`, options);
      await removeFromDOM(<HTMLAnchorElement>e.target);
    });
  });
})();
