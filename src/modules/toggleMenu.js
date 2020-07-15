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

export default toggleMenu;