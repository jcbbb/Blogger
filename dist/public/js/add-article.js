(() => {
  const form = document.querySelector('.form');
  const formBtn = form.querySelector('.form__btn');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    formBtn.setAttribute('disabled', 'disabled');
    formBtn.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';
    fetch('/article/add', {
      method: 'POST',
      body: new FormData(form),
    })
      .then(json.validate)
      .then(json.read)
      .then(changeBtnStyle)
      .then(log.message)
      .catch(handleError);
  });
  const log = {
    error: (err) => {
      throw err;
    },
    message: (response) => {
      console.log(response.msg);
    },
  };
  const json = {
    read: (response) => response.json(),
    validate: (response) => {
      if (!response.ok) {
        throw Error(response.msg);
      }
      return response;
    },
  };
  function changeBtnStyle() {
    formBtn.removeAttribute('disabled');
    formBtn.innerHTML = '<i class="fal fa-check"></i>';
    setTimeout(() => {
      formBtn.innerHTML = 'Published';
      setTimeout(() => {
        formBtn.innerHTML = 'Publish';
      }, 1000);
    }, 1000);
  }
  function handleError(error) {
    formBtn.removeAttribute('disabled');
    formBtn.innerHTML = 'Publish';
    console.error(error);
  }
})();
function d(requestURL, classToRemove, classToAdd) {
  return async function(e) {
    e.stopImmediatePropagation();
    e.target.innerHTML = '<i class="fad fa-circle-notch fa-spin"></i>';
    const id = e.target.dataset.id;

    const response = await fetch(requestURL + id, { method: 'POST' });

    if (response.ok) {
      e.target.innerHTML = '<i class="fal fa-bookmark"></i>';
      e.target.classList.remove(classToRemove);
      e.target.classList.add(classToAdd);
    }
  };
}
