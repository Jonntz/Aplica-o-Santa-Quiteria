document.addEventListener("DOMContentLoaded", () => {

    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {

        const slides = slider.querySelectorAll("img");
        const prevBtn = slider.parentElement.querySelector(".prev");
        const nextBtn = slider.parentElement.querySelector(".next");

        let index = 0;
        let interval = null;

        const autoplay = slider.dataset.autoplay === "true";
        const time = parseInt(slider.dataset.time) || 5000;

        if (slides.length <= 1) {
            if (prevBtn) prevBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
            return;
        }

        const showSlide = (i) => {
            slides.forEach(s => s.classList.remove("ativo"));
            slides[i].classList.add("ativo");
        };

        const nextSlide = () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        };

        const prevSlide = () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        };

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetAutoplay();
            });
        }

        const startAutoplay = () => {
            if (autoplay) {
                interval = setInterval(nextSlide, time);
            }
        };

        const stopAutoplay = () => {
            if (interval) clearInterval(interval);
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        slider.addEventListener("mouseenter", stopAutoplay);
        slider.addEventListener("mouseleave", startAutoplay);

        /* Swipe no mobile */
        let startX = 0;

        slider.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            stopAutoplay();
        });

        slider.addEventListener("touchend", e => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                resetAutoplay();
            }
        });

        startAutoplay();
    });
});