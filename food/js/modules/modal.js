function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){
    const modalTriggers = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTriggers.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    function openModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight - 1) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};