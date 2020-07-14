window.addEventListener('DOMContentLoaded',function() {
    'use strict';

    //timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');


            function getTimeRemaining(){
                let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60); //% 24 если необходимо количество дней!
                //day = Math.floor(timeRemaining / 60 / 60 / 24);

                if(timeRemaining <= 0){
                    seconds = 0;
                    minutes = 0;
                    hours = 0;
                }
                return {timeRemaining, hours ,minutes, seconds};
            }

            function update(){
                let timer = getTimeRemaining();
                timerHours.textContent = (timer.hours < 10) ? `0${timer.hours}` : timer.hours;
                timerMinutes.textContent = (timer.minutes < 10) ? `0${timer.minutes}` : timer.minutes;
                timerSeconds.textContent = (timer.seconds < 10) ? `0${timer.seconds}` : timer.seconds;
                return (timer > 0) ? true : false;
            }

            update();
            if(update){
                let interval = setInterval(update, 1000);
            } else{
                clearInterval(interval);
            }
    }
    countTimer('30 june 2021');

    //menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            closeBtn = document.querySelector('.close-btn'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        document.addEventListener('click', event => {
            let target = event.target;
            if (target.closest('.menu') || target.classList.contains('close-btn') || (target.closest('menu') && target.tagName === 'A')) handlerMenu();
            if ((menu.classList.contains('active-menu') && target !== target.closest('menu')) && !target.closest('.menu') && target.tagName !== 'LI') handlerMenu();
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
        popupBtns.forEach(item => item.addEventListener('click', () => {
            if(window.innerWidth > 768){
                popup.style.cssText = `
                opacity: 0;
                transition: all .2s;
                display: block;
                `;
                setTimeout(() => {popup.style.opacity = '1'}, 50);
            } else {
                popup.style.display = 'block';
            }
        }));
        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')){
                if(window.innerWidth > 768){
                    popup.style.cssText = `display: none;`;
                    setTimeout(() => {popup.style.opacity = '1'}, 50);
                } else { 
                    popup.style.display = 'none';
                }
            } else{
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }
        })
    };
    togglePopup();

    window.addEventListener('resize', togglePopup);

    //next slide scroll
    const smoothScroll = () => {
        const html = document.querySelector('html');
        html.style.cssText = `scroll-behavior: smooth`;
    }
    smoothScroll();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            tabContent.forEach((item, i) => {
                if (i === index){
                    tabs[i].classList.add('active');
                    item.classList.remove('d-none');
                } else{
                    tabs[i].classList.remove('active');
                    item.classList.add('d-none');
                }
            });
        };

            tabHeader.addEventListener('click', event => {
                let target = event.target;
                target = target.closest('.service-header-tab');
                if(target.classList.contains('service-header-tab')){
                    tabs.forEach((item, i) => {
                        if(item === target){
                            toggleTabContent(i);
                        }
                    });
                }
            });
    };
    tabs();

    //slider
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
    sliderFoo();

    //изменеие фотографий по наведению в блоке "Наша команда"
    const changePhotoOnHover = () => {
        const photos = document.querySelectorAll('.command__photo');
        
        const changePhoto = e => {
            const src = e.target.src;
            e.target.src = e.target.dataset.img;
            e.target.dataset.img = src;
        };

        photos.forEach(item => {
            item.addEventListener('mouseenter', changePhoto);
            item.addEventListener('mouseleave', changePhoto);
        });
    };
    changePhotoOnHover();

    //калькулятор
    const calculator = (price = 100) => {
        const calcInputs = document.querySelectorAll('input.calc-item');
        calcInputs.forEach(item => {
            item.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[\D]/g, '');
            });
        });

        const countSum = () => {
            let total = 0,
                typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value,
                countValue = 1,
                dayValue = 1;
            if(calcCount.value > 1) countValue += (calcCount.value - 1) / 10;
            if(calcDay.value && calcDay.value < 5)
               dayValue *= 2;
            else if (calcDay.value && calcDay.value < 10)
               dayValue *= 1.5;
            
            if(typeValue && squareValue){
                total = price * typeValue * squareValue * countValue * dayValue;
            };

            let count = +totalValue.textContent;
            let delta = total - count;

            const totalAnimation = () => {
                if(delta === 0 || count === total) {
                    cancelAnimationFrame(requestId);
                    return;
                }
                const deltaStr = Math.abs(delta) + '',
                    length = deltaStr.length;
                let step = 10 ** (length-2);
                if(Math.abs(+totalValue.textContent - total) <= step) {
                    totalValue.textContent = total;
                    cancelAnimationFrame(requestId);
                    return;
                }
                if (delta < 0) {
                    count -= step;
                    totalValue.textContent = count;
                    requestAnimationFrame(totalAnimation);
                } else if (delta > 0) {
                    count += step;
                    totalValue.textContent = count;
                    requestAnimationFrame(totalAnimation);
                } 
            }
            let requestId = requestAnimationFrame(totalAnimation);
    }

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if(target === calcType || target === calcSquare || target === calcDay  || target === calcCount){
                countSum();
            }
        });

    };
    calculator(100);

    //send-ajax=form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = `<div class="sk-rotating-plane"></div>`,
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        const form1 = document.getElementById('form1'),
            form2 = document.getElementById('form2'),
            form3 = document.getElementById('form3');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2rem;`;

        const validePhone = (form) => {
            if(form.querySelector('.form-phone')){ 
                form.querySelector('.form-phone').addEventListener('input', (e) => e.target.value = e.target.value.replace(/(?<!^)\+|[^\d+]/g, ''));
            }
            if(form.querySelector('.form-name')){
                form.querySelector('.form-name').addEventListener('input', (e) => e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ''));
            }
            if(form.querySelector('.form-message')){
                form.querySelector('.form-message').addEventListener('input', e => e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ''));
            }
        };
        validePhone(form1);
        validePhone(form2);
        validePhone(form3);
        
        form1.addEventListener('submit', e => {
            e.preventDefault();
            form1.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(form1);
            let body= {};
            formData.forEach((value,key) => body[key] = value);
            postData(body)
                .then((response) => {
                    if(response.status !== 200) throw new Error('status network not 200')
                    statusMessage.innerHTML = successMessage
                })
                .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage;});
                
            form1.querySelectorAll('input').forEach(item => item.value = '');
        });
        form2.addEventListener('submit', e => {
            e.preventDefault();
            form2.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(form2);
            let body= {};
            formData.forEach((value,key) => body[key] = value);
            postData(body)
                .then((response) => {
                    if(response.status !== 200) throw new Error('status network not 200')
                    statusMessage.innerHTML = successMessage
                })
                .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage;});

            form2.querySelectorAll('input').forEach(item => item.value = '');
        });
        form3.addEventListener('submit', e => {
            e.preventDefault();
            form3.appendChild(statusMessage);
            statusMessage.style.color='#fff';
            statusMessage.innerHTML = loadMessage;
            
            const formData = new FormData(form3);
            let body= {};
            formData.forEach((value,key) => body[key] = value);
            postData(body)
                .then((response) => {
                    if(response.status !== 200) throw new Error('status network not 200')
                    statusMessage.innerHTML = successMessage
                })
                .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage;});

            form3.querySelectorAll('input').forEach(item => item.value = '');
        });
        //отправка данных на сервер
        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        } 
    }
    sendForm();

});

