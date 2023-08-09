//year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer__data');
yearElement.textContent = currentYear.toString();

//input
const libraryCardInput = document.querySelectorAll('.library-card__info-form__input');

libraryCardInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    const regex = /[^A-Za-zА-Яа-яЁё0-9-]/g;
    e.target.value = e.target.value.replace(regex, '');
  });
});

//burger
const menu = document.querySelector('.menu__body');
const menuBtn = document.querySelector('.menu__icon');
const body = document.body;

if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active')
    menuBtn.classList.toggle('active')
    body.classList.toggle('lock')
  })

  menu.addEventListener('click', e => {
    if (e.target.classList.contains('menu__body')) {
      menu.classList.remove('active')
      menuBtn.classList.remove('active')
      body.classList.remove('lock')
    }
  })

  menu.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active')
      menuBtn.classList.remove('active')
      body.classList.remove('lock')
    })
  })
}