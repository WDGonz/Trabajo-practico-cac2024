document.querySelectorAll('.slideshow-container').forEach((container) => {
    const slides = container.querySelectorAll('.slide');
    let slideIndex = 0;

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = index === slideIndex ? 'block' : 'none';
        });
        slideIndex = (slideIndex + 1) % slides.length;
        window.setTimeout(showSlides, 4000);
    }

    if (slides.length > 0) {
        showSlides();
    }
});