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

        btnMenu.addEventListener('click',handlerMenu);
        closeBtn.addEventListener('click',handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));
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
        popupClose.addEventListener('click', () =>{
            if(window.innerWidth > 768){
                popup.style.cssText = `display: none;`;
                setTimeout(() => {popup.style.opacity = '1'}, 50);
            } else {
                popup.style.display = 'none';
            }
        });
    };
    togglePopup();

    window.addEventListener('resize', togglePopup);

    //next slide scroll
    const html = document.querySelector('html');
    html.style.cssText = `scroll-behavior: smooth`;
















});