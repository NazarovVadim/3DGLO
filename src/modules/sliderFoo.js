const sliderFoo = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
        buttons = document.querySelectorAll('.portfolio-btn'),
        dotsWrapper = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

    let currentSlide = 0, interval, dots;

    const createDots = () => {
        for(let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dotsWrapper.append(dot);
        }
        dots = document.querySelectorAll('.dot');
        dots[0].classList.add('dot-active');
    };
    createDots();

    const prevSlide = (elem, i, strClass) => elem[i].classList.remove(strClass);
    const nextSlide = (elem, i, strClass) => elem[i].classList.add(strClass);

    const autoPlay = () => {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;
        if(currentSlide >= slides.length) currentSlide = 0;
        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 5000) => interval = setInterval(autoPlay, time);
    const stopSlide = () => clearInterval(interval);

    startSlide(5000);

    slider.addEventListener('click', event => {
        event.preventDefault();
        let target = event.target;

        if(target.matches('.portfolio-btn, .dot')){
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) currentSlide++;
        else if(target.matches('#arrow-left')) currentSlide--;
        else if(target.matches('.dot'))
            dots.forEach((item, i) => currentSlide = (target === item) ? i : currentSlide);

        currentSlide = (currentSlide >= slides.length) ? 0 : (currentSlide < 0) ? slides.length - 1 : currentSlide;

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
        }
    });
    slider.addEventListener('mouseover', event => {if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) stopSlide();});
    slider.addEventListener('mouseout', event => {if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) startSlide();});
};

export default sliderFoo;