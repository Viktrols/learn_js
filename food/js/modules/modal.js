function modal(){
    const modalTriggers = document.querySelectorAll('[data-modal'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(openModalTimer);
    }
    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    
    modalTriggers.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });
    const openModalTimer = setTimeout(openModal, 500000);

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    function openModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight - 1) {
                openModal();
                window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
}

module.exports = modal;