document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dots = Array.from(slider.querySelectorAll('.hero-slider-dot'));
    const prevButton = slider.querySelector('[data-action="prev"]');
    const nextButton = slider.querySelector('[data-action="next"]');
    let currentIndex = slides.findIndex(slide => slide.classList.contains('active'));
    let autoRotateTimer;

    if (currentIndex === -1) {
        currentIndex = 0;
        slides[0]?.classList.add('active');
        dots[0]?.classList.add('active');
    }

    const activateSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    };

    const showNext = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        activateSlide(nextIndex);
    };

    const showPrev = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        activateSlide(prevIndex);
    };

    const restartTimer = () => {
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(showNext, 7000);
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activateSlide(index);
            restartTimer();
        });
    });

    prevButton?.addEventListener('click', () => {
        showPrev();
        restartTimer();
    });

    nextButton?.addEventListener('click', () => {
        showNext();
        restartTimer();
    });

    if (slides.length > 1) {
        restartTimer();
    }
});
