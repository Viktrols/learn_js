import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    const formContactMe = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    formContactMe.forEach(elem => {
        postNewContact(elem);
    });

    
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 7000);

    }
}

export default forms;