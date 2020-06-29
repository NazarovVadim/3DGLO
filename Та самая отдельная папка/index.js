'use strict';

const div = document.querySelector('.result');
const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница','Суббота']
let date = new Date(),
    greeting;

if(date.getHours() >= 22 && date.getHours() < 3){
    greeting = 'Доброй ночи!';
} else if (date.getHours() >= 3 && date.getHours() < 12){
    greeting = 'Доброе утро :)';
}else if (date.getHours() >= 12 && date.getHours() < 16){
    greeting = 'Добрый день';
} else{
    greeting = 'Добрый вечер!';
}

function toNewYear(){
    let deadline = `1 january ${date.getFullYear() + 1}`;
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime();
    let timeRemaining = (dateStop - dateNow) / 1000;
    let days = Math.floor(timeRemaining / 60 / 60 / 24);
    return days+1;
}

div.innerHTML = `
    <h4>${greeting}</h4>
    <h4>Сегодня: ${days[date.getDay()]}</h4>
    <h4>Текущее время: ${date.toLocaleTimeString('en')}</h4>
    <h4>До нового года осталось ${toNewYear()} дней</h4>
`;


