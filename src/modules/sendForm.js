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
            form.querySelector('.form-phone').addEventListener('input', (e) => {
                if(e.target.value.length < 5 || e.target.value.length > 20) form.querySelector('button').setAttribute("disabled", "disabled");
                else form.querySelector('button').removeAttribute("disabled");
            });
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
                statusMessage.innerHTML = successMessage;
                setTimeout(() => statusMessage.innerHTML = '', 3000);
            })
            .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000);});
            
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
                statusMessage.innerHTML = successMessage;
                setTimeout(() => statusMessage.innerHTML = '', 3000);
            })
            .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000);});

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
                statusMessage.innerHTML = successMessage;
                setTimeout(() => statusMessage.innerHTML = '', 3000);
            })
            .catch(error => {console.error(error); statusMessage.innerHTML = errorMessage; setTimeout(() => statusMessage.innerHTML = '', 3000);});

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

export default sendForm;