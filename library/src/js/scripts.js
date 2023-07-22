const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer__data');
yearElement.textContent = currentYear.toString();

const libraryCardInput = document.querySelectorAll('.library-card__info-form__input');

libraryCardInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    const regex = /[^A-Za-zА-Яа-яЁё0-9-]/g;
    e.target.value = e.target.value.replace(regex, '');
  });
});