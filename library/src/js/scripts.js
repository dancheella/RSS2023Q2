//year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer__data');
yearElement.textContent = currentYear.toString();

//input
const libraryCardInput = document.querySelectorAll('.library-card__info-form__input');

libraryCardInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    const regex = /[^A-Za-zА-Яа-яЁё0-9-\s]/g;
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
const modalReg = document.getElementById('modal-reg');
const modalRegister = document.querySelector('.modal__register');
const registerClose = document.getElementById('register-close');
const iconRegisterLogout = document.querySelector('.icon__register-logout');
const btnSignUp = document.getElementById('btn-sign-up');

function modalRegisterPerson() {
  userMenu.classList.toggle('active');
  modalReg.classList.toggle('open');
  modalRegister.classList.toggle('open');
  body.classList.toggle('lock');
}

modalReg.addEventListener('click', (event) => {
  if (!event.target.closest('.modal__register')) {
    modalRegisterPerson();
  }
});

iconRegisterLogout.addEventListener('click', modalRegisterPerson);
registerClose.addEventListener('click', modalRegisterPerson);
btnSignUp.addEventListener('click', modalRegisterPerson);


//validate
let signUpButton = document.getElementById('sign-up');
const accessToken = 'true';
const userData = JSON.parse(localStorage.getItem('userData'));

function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

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

  if (userData && userData.email === email) {
    alert('Пользователь с таким email уже существует!');
    return false;
  } else {
    localStorage.removeItem('visitCount');
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

  setAccessToken(accessToken);
  saveUserDataToLocalStorage(firstName, lastName, email, password);
  generateCardNumber();
  visitCount();
  modalRegisterPerson();
  location.reload();
}

// сохранение пользователя в localStorage
function saveUserDataToLocalStorage(firstName, lastName, email, password) {
  let userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}

// генерация числа
function generateCardNumber() {
  // генерация случайного девятизначного числа
  let randomNumber = Math.floor(Math.random() * 900000000) + 100000000;

  // преобразование число в 16-ричное число
  let cardNumber = randomNumber.toString(16).toUpperCase();

  while (cardNumber.length < 9) {
    cardNumber = "0" + cardNumber;
  }

  localStorage.setItem('cardNumber', cardNumber);
}

signUpButton.addEventListener('click', function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

//modal login
const modalLog = document.getElementById('modal-log');
const modalLogin = document.querySelector('.modal__login');
const loginClose = document.getElementById('login-close');
const iconLoginProfile = document.querySelector('.icon__login-profile');
const btnLogIn = document.getElementById('btn-log-in');
const favoritesBtn = document.querySelectorAll('.favorites__item-button');

function modalLoginPerson() {
  userMenu.classList.toggle('active');
  modalLog.classList.toggle('open');
  modalLogin.classList.toggle('open');
  body.classList.toggle('lock');
}

modalLog.addEventListener('click', (event) => {
  if (!event.target.closest('.modal__login')) {
    modalLoginPerson();
  }
});

iconLoginProfile.addEventListener('click', modalLoginPerson);
loginClose.addEventListener('click', modalLoginPerson);
btnLogIn.addEventListener('click', modalLoginPerson);

// валидация login
const emailOrCardInput = document.getElementById('email-or-card');
const passwordLoginInput = document.getElementById('password-login');
const loginButton = document.getElementById('login-in');

function validateEmailOrCard(input) {
  const storageEmail = userData.email;
  const storageCardNumber = localStorage.getItem('cardNumber');
  return input.value === storageEmail || input.value === storageCardNumber;
}

function validatePassword(input) {
  const storagePassword = userData.password;
  return input.value === storagePassword;
}

loginButton.addEventListener('click', function (e) {
  e.preventDefault();

  const isEmailOrCardValid = validateEmailOrCard(emailOrCardInput);
  const isPasswordValid = validatePassword(passwordLoginInput);

  if (isEmailOrCardValid && isPasswordValid) {
    setAccessToken(accessToken);
    visitCount();
    initializeUser();
    modalLoginPerson(false);
  } else {
    alert('Введите верные данные!');
  }
});

// modal change
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');

registerLink.addEventListener('click', () => {
  modalLoginPerson();
  modalRegisterPerson();
});

loginLink.addEventListener('click', () => {
  modalRegisterPerson();
  modalLoginPerson();
});

// изменение страницы после инициализации
function initializeUser() {
  if (localStorage.getItem('userData')) {
    let userIcon = document.getElementById('userIcon');

    if (localStorage.getItem('accessToken') === 'true') {
      userIcon.textContent = userData.firstName[0].toUpperCase() + userData.lastName[0].toUpperCase();
      userIcon.classList.add('icon-user');

      // отображания полного имени пользователя
      userIcon.title = `${userData.firstName} ${userData.lastName}`;

      userMenu.innerHTML =
        `<div class="icon__card">${localStorage.getItem('cardNumber')}</div>
        <div class="icon__my-profile">My profile</div>
        <div class="icon__logout" id="logout-button">Log Out</div>
      </div>`

      updateLibraryCardInfoFind(userData);

      let libraryCardInfoRegistration = document.querySelector('.library-card__info-registration');
      libraryCardInfoRegistration.innerHTML =
        `<h3 class="library-card__info-registration__title">Visit your profile</h3>
       <div class="library-card__info-registration__description">
          With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.
       </div>
       <div class="library-card__info-registration__buttons">
        <button type="button" class="library-card__info-registration__button" id="profile">Profile</button>
       </div>`

      let btnProfile = document.getElementById('profile');
      btnProfile.addEventListener('click', modal__profile);

      let iconMyProfile = document.querySelector('.icon__my-profile');
      iconMyProfile.addEventListener('click', modal__profile);

      let logoutButton = document.getElementById('logout-button');
      logoutButton.addEventListener('click', handleLogoutButtonClick);
    }
  }
}

initializeUser();

// смена информации в блоке Digital Library Cards
function updateLibraryCardInfoFind(userData) {
  let libraryCardInfoFind = document.querySelector('.library-card__info-find');
  libraryCardInfoFind.innerHTML =
    `<h3 class="library-card__info-title">Your Library card</h3>
     <div class="library-card__info-bg">
      <form class="library-card__info-form">
        <h4 class="library-card__info-form__title">Brooklyn Public Library</h4>
        <span class="library-card__info-form__input" id="fullName">${userData.firstName} ${userData.lastName}</span>
        <span class="library-card__info-form__input" id="storageCardNumber">${localStorage.getItem('cardNumber')}</span>
      </form>
      <div class="library-card__info-form__icons">
        <div class="library-card__info-form__icon">
          <span class="library-card__info-form__icon-text">visits</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.5 10C13.2614 10 15.5 7.76142 15.5 5C15.5 2.23858 13.2614 0 10.5 0C7.73858 0 5.5 2.23858 5.5 5C5.5 7.76142 7.73858 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5L0.5 21C0.5 18.3478 1.55357 15.8043 3.42893 13.9289C5.3043 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z"
                  fill="#BB945F"/>
          </svg>
          <span class="library-card__info-form__icon-count">${localStorage.getItem('visitCount')}</span>
        </div>
        <div class="library-card__info-form__icon">
          <span class="library-card__info-form__icon-text">bonuses</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path
              d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z"
              fill="#BB945F"/>
          </svg>
          <span class="library-card__info-form__icon-count">1240</span>
        </div>
        <div class="library-card__info-form__icon">
          <span class="library-card__info-form__icon-text">books</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <rect width="20" height="21" fill="#BB945F"/>
            <rect x="2" width="1" height="19" fill="#826844"/>
            <rect x="1" width="1" height="21" fill="white"/>
          </svg>
          <span class="library-card__info-form__icon-count">0</span>
        </div>
      </div>   
    </div>`

  let libraryCardInfoBg = document.querySelector('.library-card__info-bg');
  libraryCardInfoBg.style.gap = '15px';
  libraryCardInfoBg.style.paddingBottom = '14px';
}

// счетчик books
function visitCount() {
  // проверка, есть ли уже счетчик в Local Storage, и инициализируем его, если не найден
  let visitCount = localStorage.getItem('visitCount');
  if (visitCount === null) {
    visitCount = 0;
  } else {
    visitCount = parseInt(visitCount); // преобразования значения из строки в число
  }

  // увеличнние счетчик при каждом посещении
  visitCount++;
  localStorage.setItem('visitCount', visitCount.toString());
}

//modal books
const modalBook = document.getElementById('modal-book');
const modalBuy = document.querySelector('.modal__buy');
const buyClose = document.getElementById('buy-close');
const btnBuy = document.getElementById('buy');

function modalBookBuy() {
  userMenu.classList.toggle('active');
  modalBook.classList.toggle('open');
  modalBuy.classList.toggle('open');
  body.classList.toggle('lock');
}

modalBook.addEventListener('click', (event) => {
  if (!event.target.closest('.modal__buy')) {
    modalBookBuy();
  }
});

buyClose.addEventListener('click', modalBookBuy);
btnBuy.addEventListener('click', modalBookBuy);

// выбор модального окна для покупки или логина
favoritesBtn.forEach(button => {
  button.addEventListener('click', () => {
    if (localStorage.getItem('accessToken')) {
      modalBookBuy(); // modal books
    } else {
      modalLoginPerson(); // modal login
    }
  });
});

//modal profile
const modalProfile = document.getElementById('modal-profile');
const modalProfileContainer = document.querySelector('.modal__profile');
const profileClose = document.getElementById('profile-close');

function modal__profile() {
  userMenu.classList.toggle('active');
  modalProfile.classList.toggle('open');
  modalProfileContainer.classList.toggle('open');
  body.classList.toggle('lock');
}

modalProfile.addEventListener('click', (event) => {
  if (!event.target.closest('.modal__profile')) {
    modal__profile();
  }
});

profileClose.addEventListener('click', modal__profile);

function handleLogoutButtonClick() {
  localStorage.removeItem('accessToken');
  location.reload();
}

// вместо кнопки Check the card
let libraryCardInfoFind = document.querySelector('.library-card__info-find');
libraryCardInfoFind.addEventListener("click", function (event) {
  const originalHTML = libraryCardInfoFind.innerHTML;
  const checkButton = event.target.closest(".library-card__info-find__button");
  if (checkButton) {
    const storageFirstName = userData.firstName;
    const storageLastName = userData.lastName;
    const storageCardNumber = localStorage.getItem('cardNumber');
    const nameInput = document.querySelector("input[name='name']");
    const numberInput = document.querySelector("input[name='number']");

    if ((nameInput.value === storageFirstName + ' ' + storageLastName || nameInput.value === storageFirstName || nameInput.value === storageLastName) && numberInput.value === storageCardNumber) {
      updateLibraryCardInfoFind(userData);

      setTimeout(() => {
        libraryCardInfoFind.innerHTML = originalHTML;
      }, 10000);
    } else {
      alert('Введенные данные не совпадают с данными в системе!');
    }
  }
});