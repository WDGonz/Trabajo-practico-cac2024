let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('prevButton').addEventListener('click', () => {
  moveToSlide(currentSlide - 1);
});

document.getElementById('nextButton').addEventListener('click', () => {
  moveToSlide(currentSlide + 1);
});

function moveToSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  updateCarousel();
}

function updateCarousel() {
  const newTransformValue = -currentSlide * 100;
  for (let slide of slides) {
    slide.style.transform = `translateX(${newTransformValue}%)`;
  }
}

window.addEventListener('load', updateCarousel);
