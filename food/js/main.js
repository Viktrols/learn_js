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

    // Menu cards
    class MenuItem {
        constructor (name, description, price, imageLink, imageAlt, parentSelector, ...classes) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.imageLink = imageLink;
            this.imageAlt = imageAlt;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.imageLink} alt=${this.imageAlt}>
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    const getData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }   
        return await response.json();
    };
    getData('http://127.0.0.1:8000/menus/')
    .then(data => {
        data.forEach(({name, description, price, image}) => {
            new MenuItem(name, description, price, image, name, '.menu__field .container').render();
        });
    });
    
    // Forms
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

    // Slider
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          totalElements = document.querySelector('#total'),
          currentElement = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper '),
          slidesField = document.querySelector('.offer__slider-inner'),
          slidesWidth = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // Вариант для ровных пацанов:

    if (slides.length < 10) {
        totalElements.textContent = `0${slides.length}`;
        currentElement.textContent = `0${slideIndex}`;
    } else {
        totalElements.textContent = slides.length;
        currentElement.textContent = slideIndex;
    }
    
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = slidesWidth;
    });
    // next.addEventListener('click', () => {
    //     if (offset == +slidesWidth.slice(0, slidesWidth.length - 2) * (slides.length - 1)) {
    //         offset = 0;
    //     } else {
    //         offset += +slidesWidth.slice(0, slidesWidth.length - 2);
    //     }
    //     slidesField.style.transform = `translateX(-${offset}px)`;
    //     if (slideIndex == slides.length) {
    //         slideIndex = 1;
    //     } else {
    //         slideIndex++;
    //     }
    //     if (slides.length < 10) {
    //         currentElement.textContent = `0${slideIndex}`;
    //     } else {
    //         currentElement.textContent = slideIndex;
    //     }
    // });

    function moveSlider (direction) {
        if (direction === 'forward') {
            if (offset == +slidesWidth.slice(0, slidesWidth.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +slidesWidth.slice(0, slidesWidth.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        } else if (direction === 'back') {
            if (offset === 0) {
                offset = +slidesWidth.slice(0, slidesWidth.length - 2) * (slides.length - 1);
            } else {
                offset -= +slidesWidth.slice(0, slidesWidth.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
        }
        if (slides.length < 10) {
            currentElement.textContent = `0${slideIndex}`;
        } else {
            currentElement.textContent = slideIndex;
        }
    }
    next.addEventListener('click', () => {
        moveSlider('forward');
    });
    prev.addEventListener('click', () => {
        moveSlider('back');
    });

    setInterval(moveSlider, 5000, 'forward');


    // prev.addEventListener('click', () => {
    //     if (offset === 0) {
    //         offset = +slidesWidth.slice(0, slidesWidth.length - 2) * (slides.length - 1);
    //     } else {
    //         offset -= +slidesWidth.slice(0, slidesWidth.length - 2);
    //     }
    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if (slideIndex == 1) {
    //         slideIndex = slides.length;
    //     } else {
    //         slideIndex--;
    //     }
    //     if (slides.length < 10) {
    //         currentElement.textContent = `0${slideIndex}`;
    //     } else {
    //         currentElement.textContent = slideIndex;
    //     }
    // });

    // Вариант для лохов:

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     totalElements.textContent = `0${slides.length}`;
    // } else {
    //     totalElements.textContent = slides.length;
    // }

    // function showSlides(index) {
    //     if (index > slides.length) {
    //         slideIndex = 1;
    //     } else if (index < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(slide => slide.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slideIndex < 10) {
    //         currentElement.textContent = `0${slideIndex}`;
    //     } else {
    //         currentElement.textContent = slideIndex;
    //     }
    // }

    // function plusSllides(n) {
    //     showSlides(slideIndex += n);
    // }
    // prev.addEventListener('click', () => {
    //     plusSllides(-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSllides(1);
    // });

});