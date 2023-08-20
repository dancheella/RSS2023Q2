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

// carosuel
document.addEventListener("DOMContentLoaded", function () {
  const carouselImages = document.querySelectorAll(".about__image-img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let visibleImages = calculateVisibleImages();
  let savedIndex = 0; // переменная для сохранения индекса

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

  function updateCarousel() {
    const maxIndex = carouselImages.length - visibleImages;
    currentIndex = Math.min(currentIndex, maxIndex); // ограничение индекса, чтобы не выйти за пределы

    prevButton.classList.toggle("disabled", currentIndex === 0);
    nextButton.classList.toggle("disabled", currentIndex === maxIndex || maxIndex < 0);

    carouselImages.forEach((image, index) => {
      if (index >= currentIndex && index < currentIndex + visibleImages) {
        image.style.display = "flex";
      } else {
        image.style.display = "none";
      }
    });

    const activeButton = document.querySelector(".about__pagination.active");
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    const paginationButtons = document.querySelectorAll(".about__pagination");
    paginationButtons[currentIndex].classList.add("active");
  }

  function navigateCarousel(direction) {
    if (
      (direction === "prev" && currentIndex > 0) ||
      (direction === "next" &&
        currentIndex < carouselImages.length - visibleImages)
    ) {
      currentIndex += direction === "prev" ? -1 : 1;
      updateCarousel();
    }
  }

  prevButton.addEventListener("click", () => {
    navigateCarousel("prev");
  });

  nextButton.addEventListener("click", () => {
    navigateCarousel("next");
  });

  const paginationButtons = document.querySelectorAll(".about__pagination");
  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (index !== currentIndex) {
        savedIndex = index; // сохранение индекса при клике
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  window.addEventListener("resize", () => {
    const newVisibleImages = calculateVisibleImages();
    if (newVisibleImages !== visibleImages) {
      visibleImages = newVisibleImages;
      currentIndex = savedIndex;
      updateCarousel();
    }
  });

  updateCarousel();
});
