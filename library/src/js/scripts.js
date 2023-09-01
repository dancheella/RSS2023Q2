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

//carousel
document.addEventListener("DOMContentLoaded", function () {
  const aboutImage = document.querySelectorAll(".about__image");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const paginationButtons = document.querySelectorAll(".about__pagination");

  let currentIndex = 0; // переменная для текущего индекса
  let visibleImages = calculateVisibleImages();
  let savedIndex = 0; // переменная для сохранения индекса

  // количество видимых изображений
  function calculateVisibleImages() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1440) {
      return 3;
    } else if (windowWidth >= 1129) {
      return 2;
    } else {
      return 1;
    }
  }

  // обновление карусели
  function updateCarousel() {
    const maxIndex = aboutImage.length - visibleImages; // максимальный индекс, чтобы не выйти за границы доступных изображений
    currentIndex = Math.min(currentIndex, maxIndex); // ограничение индекса, чтобы не выйти за пределы

    prevButton.classList.toggle("disabled", currentIndex === 0);
    nextButton.classList.toggle("disabled", currentIndex === maxIndex || maxIndex < 0);

    const paginationButtons = document.querySelectorAll(".about__pagination");

    // обновление активной точки пагинации на основе текущего индекса
    paginationButtons.forEach((button, index) => {
      if (index === currentIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    // сдвиг контейнера
    const imageContainer = document.querySelector(".about__image-container");
    const offset = currentIndex * -475;
    imageContainer.style.transform = `translateX(${offset}px)`;
  }

  function navigateCarousel(direction) {
    if ((direction === "prev" && currentIndex > 0) || (direction === "next" && currentIndex < aboutImage.length - visibleImages)) {
      currentIndex += direction === "prev" ? -1 : 1; // изменнение индекса в зависимости от направления
      updateCarousel();
    }
  }

  // обработчики событий на кнопки
  prevButton.addEventListener("click", () => {
    navigateCarousel("prev");
  });

  nextButton.addEventListener("click", () => {
    navigateCarousel("next");
  });

  // проход по всем точкам пагинации
  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index !== currentIndex) {
        savedIndex = index; // сохранение индекса
        currentIndex = index; // чтобы установить текущий индекс карусели равным индексу кнопки, чтобы перейти к соответствующему изображению
        updateCarousel(); // обновление состояния карусели
      }
    });
  });

  window.addEventListener("resize", () => {
    const newVisibleImages = calculateVisibleImages(); // вычисление нового количества видимых изображений при изменении размера окна
    if (newVisibleImages !== visibleImages) {
      visibleImages = newVisibleImages; // если количество видимых изображений изменилось, обновляем переменную
      currentIndex = savedIndex; // восстановление savedIndex, чтобы сохранить текущую позицию карусели
      updateCarousel(); // обновление состояния карусели
    }
  });

  updateCarousel(); // вызов обеспечивает начальный вид карусели, даже до того как событие DOMContentLoaded будет выполнено
});

//carousel Favorite
const inputButtonsSeasons = document.querySelectorAll('.favorites__seasons input');
const seasonsYears = {
  winter: document.querySelector('.favorites__items-winter'),
  spring: document.querySelector('.favorites__items-spring'),
  summer: document.querySelector('.favorites__items-summer'),
  autumn: document.querySelector('.favorites__items-autumn'),
};

function changeSeason(selectedSeason) {
  Object.keys(seasonsYears).forEach(season => {
    if (season !== selectedSeason) {
      seasonsYears[season].classList.add('hidden');
    } else {
      seasonsYears[season].classList.remove('hidden');
    }
  });
}

function inputClick(e) {
  const selectedSeason = e.target.id;
  changeSeason(selectedSeason);
}

inputButtonsSeasons.forEach(button => {
  button.addEventListener('change', inputClick);
});

//menu authorization
const icon = document.querySelector('.icon');
const userMenu = document.querySelector('.icon__user-action');

icon.addEventListener('click', () => {
  userMenu.classList.toggle('active');
  menu.classList.remove('active');
  menuBtn.classList.remove('active');
  body.classList.toggle('lock');
});

document.addEventListener('click', e => {
  if (!userMenu.contains(e.target) && !icon.contains(e.target)) {
    userMenu.classList.remove('active');
    body.classList.remove('lock');
  }
});

//modal register
const modal = document.querySelector('.modal');
const modalRegister = document.querySelector('.modal__register');
const modalRegisterClose = document.querySelector('.modal__register__close');
const iconRegisterLogout = document.querySelector('.icon__register-logout');
const libraryCardInfoRegistrationButton = document.querySelector('.library-card__info-registration__button');

function toggleModalAndRegister() {
  userMenu.classList.toggle('active');
  modal.classList.toggle('open');
  modalRegister.classList.toggle('open');
  body.classList.toggle('lock');
}

modal.addEventListener('click', (event) => {
  if (!event.target.closest('.modal__register')) {
    toggleModalAndRegister();
  }
});

iconRegisterLogout.addEventListener('click', toggleModalAndRegister);
modalRegisterClose.addEventListener('click', toggleModalAndRegister);
libraryCardInfoRegistrationButton.addEventListener('click', toggleModalAndRegister);


//validate
let signUpButton = document.getElementById('sign-up');

function validateForm() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  function validateInput(input, fieldName) {
    if (input === '') {
      alert(`Пожалуйста, введите ${fieldName}!`);
      return false;
    } else if (!/^[A-ZА-Я]/.test(input)) {
      alert(`${fieldName} должно начинаться с заглавной буквы!`);
      return false;
    }
    return true;
  }

  if (!validateInput(firstName, 'Имя')) {
    return false;
  }

  if (!validateInput(lastName, 'Фамилия')) {
    return false;
  }

  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email === '') {
    alert('Пожалуйста, введите email!');
    return false;
  } else {
    if (!emailPattern.test(email)) {
      alert('Пожалуйста, введите корректный email!');
      return false;
    }
  }

  if (password === '') {
    alert('Пожалуйста, введите пароль!');
    return false;
  } else {
    if (!/^(?=.*[A-ZА-Я])(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
      alert('Пароль должен начинаться с заглавной буквы, содержать хотя бы один специальный символ и быть не короче 8 символов!');
      return false;
    }
  }

  return true;
}

signUpButton.addEventListener('click', function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});