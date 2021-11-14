/* eslint-disable no-return-assign */
function createForm() {
  // modal du formulaire
  const btnContact = document.querySelector('#btnContactModal');
  const modalForm = document.querySelector('.modalForm');
  const bground = document.querySelector('.bground');
  const bgValidation = document.querySelector('.bgroundValidation');
  const crossClose = document.querySelector('.crossClose');
  // Dom éléments pour la validation du formulaire
  const inputFirst = document.querySelector('#firstName');
  const inputLast = document.querySelector('#lastName');
  const inputEmail = document.querySelector('#email');
  const inputMessage = document.querySelector('#message');
  const formDatas = document.querySelectorAll('.formData');
  const validationForm = document.querySelector('#validation');
  const modalValidation = document.querySelector('.modalValidation');
  // const inputs = Array.from(document.querySelectorAll('.text-control'));

  btnContact.addEventListener('click', () => {
    modalForm.style.display = 'block';
    modalForm.removeAttribute('aria-hidden', 'true');
    modalForm.setAttribute('aria-hidden', 'false');
    bground.style.display = 'block';
    inputFirst.focus();
  });
  crossClose.addEventListener('click', () => {
    modalForm.style.display = 'none';
    modalForm.removeAttribute('aria-hidden', 'false');
    modalForm.setAttribute('aria-hidden', 'true');
    bground.style.display = 'none';
  });

  // Gestion du formulaire au clavier
  modalForm.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) {
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        // console.log(inputs);
        // const i = inputs.findIndex((input) => input === document.activeElement);
        // console.log(i);
        break;
      case 'ArrowUp':
        // remonter le focus
        break;
      case 'Escape':
        modalForm.style.display = 'none';
        modalForm.removeAttribute('aria-hidden', 'false');
        modalForm.setAttribute('aria-hidden', 'true');
        bground.style.display = 'none';
        break;
      default:
        return;
    }
    e.preventDefault();
  }, true);

  // validation du formulaire :
  // eslint-disable-next-line no-unused-vars
  let formIsValid = false;

  function checkValidityInput() {
    const hasError = [];
    const regexFirstLast = /^([a-zA-Z-\s]){2,30}$/;
    const regexMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // inputFirst validity:
    if (!inputFirst.value || regexFirstLast.test(inputFirst.value) === false) {
      formDatas[0].dataset.errorVisible = 'true';
      hasError.push(true);
    } else {
      formDatas[0].dataset.errorVisible = 'false';
    }

    // inputLast validity:
    if (!inputLast.value || regexFirstLast.test(inputLast.value) === false) {
      formDatas[1].dataset.errorVisible = 'true';
      hasError.push(true);
    } else {
      formDatas[1].dataset.errorVisible = 'false';
    }

    // Validation inputEmail:
    if (!inputEmail.value || regexMail.test(inputEmail.value) === false) {
      formDatas[2].dataset.errorVisible = 'true';
      hasError.push(true);
    } else {
      formDatas[2].dataset.errorVisible = 'false';
    }

    // Validation inputMessage:
    if (!inputMessage.value || inputMessage.length > 10 || inputMessage.length < 100) {
      formDatas[3].dataset.errorVisible = 'true';
      hasError.push(true);
    } else {
      formDatas[3].dataset.errorVisible = 'false';
    }

    if (hasError.length > 0) {
      return formIsValid = false;
    }
    return formIsValid = true;
  }
  validationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkValidityInput();
    if (formIsValid) {
      modalForm.style.display = 'none';
      bground.style.display = 'none';
      modalValidation.style.display = 'block';
      modalValidation.removeAttribute('aria-hidden', 'true');
      modalValidation.setAttribute('aria-hidden', 'false');
      bgValidation.style.display = 'block';
      const formInput = {
        firstName: inputFirst.value,
        lastName: inputLast.value,
        email: inputEmail.value,
        message: inputMessage.value,
      };
      validationForm.reset();
      // eslint-disable-next-line no-console
      console.log(formInput);
    }
  });
  // fermeture de la modal de confirmation:
  const btnCloseConfirm = document.querySelector('.crossCloseValidation');
  btnCloseConfirm.addEventListener('click', () => {
    modalValidation.style.display = 'none';
    modalValidation.removeAttribute('aria-hidden', 'false');
    modalValidation.setAttribute('aria-hidden', 'true');
    bgValidation.style.display = 'none';
  });
  // fermeture de la modal de confirmation au clavier:
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalValidation.style.display = 'none';
      bgValidation.style.display = 'none';
      modalValidation.removeAttribute('aria-hidden', 'false');
      modalValidation.setAttribute('aria-hidden', 'true');
    }
  });
}

// eslint-disable-next-line import/prefer-default-export
export { createForm };
