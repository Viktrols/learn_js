function forms() {
    const formContactMe = document.querySelectorAll('form');
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    formContactMe.forEach(elem => {
        postNewContact(elem);
    });

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
                    },
            body: data
        });
        return await response.json();
    };
    function postNewContact(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
          
            const contactFormData = new FormData(form);
            const formJSON = JSON.stringify(Object.fromEntries(contactFormData.entries()));
            
            postData('http://127.0.0.1:8000/contacts/', formJSON)
            .then(data => {
                 showThanksModal(message.success);
                }).catch(() => {
                        showThanksModal(message.failure);
                    }).finally(() => {
                        form.reset();
                        });
        });
    }
    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
         `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 7000);

    }
}

module.exports = forms;