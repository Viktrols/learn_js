window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabsContent () {
        tabsContent.forEach(tab => {
            tab.classList.remove('show', 'fade');
            tab.classList.add('hide');

        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (elem = 1) {
        tabsContent[elem].classList.add('show', 'fade');
        tabsContent[elem].classList.remove('hide');
        tabs[elem].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, idx) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(idx);
                }
            });
        }
    });
    // Timer
    function getTimeRemaining(deadline) {
        let days, hours, minutes, seconds;
        const now = Date.now(),
              enddate = Date.parse(deadline),
              diff =   enddate - now;
        if (diff <=0) {
            days = hours = minutes = seconds = 0;
        } else {
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours =  Math.floor((diff / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((diff / (1000 * 60)) % 60);
            seconds = Math.floor((diff / 1000) % 60);
        }
              
        return {
            diff, days, hours, minutes, seconds
        };
    }
    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, deadline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateTimer, 1000);
        updateTimer();
        function updateTimer() {
            const remain = getTimeRemaining(deadline); 
            days.innerHTML =  addZero(remain.days);
            hours.innerHTML = addZero(remain.hours);
            minutes.innerHTML = addZero(remain.minutes);
            seconds.innerHTML = addZero(remain.seconds);

            if (remain <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    const deadline = '2023-01-20',
          timerSelector = '.timer';
    setTimer(timerSelector, deadline);
   
    // Modal
    const modalTriggers = document.querySelectorAll('[data-modal'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close');

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

    const openModalTimer = setTimeout(openModal, 5000);

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal){
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

    // Menu cards
    class MenuItem {
        constructor (name, description, price, imageLink, imageAlt, parentSelector) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.imageLink = imageLink;
            this.imageAlt = imageAlt;
            this.parent = document.querySelector(parentSelector);
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                <img src=${this.imageLink} alt=${this.imageAlt}>
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
                </div>`;
            this.parent.append(element);
        }
    }
    new MenuItem(
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. ' +
        'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        600,
        'img/tabs/vegy.jpg',
        'vegy',
        '.menu__field .container'
        ).render();
    new MenuItem(
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. ' +
        'Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        800,
        'img/tabs/elite.jpg',
        'elite',
        '.menu__field .container'
        ).render();
    new MenuItem(
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного ' +
        'происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за ' +
        'счет тофу и импортных вегетарианских стейков.',
        700,
        'img/tabs/post.jpg',
        'post',
        '.menu__field .container'
    ).render();
    
});