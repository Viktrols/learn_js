/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector('.calculating__result span');
    let gender = 'female',
        weight, height, age,
        ratio = 1.375;
    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    }
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }else if (elem.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div' , 'calculating__choose-item_active');

    function calculateResult() {
        if (!gender || !weight || ! height || !age || !ratio) {
            result.textContent = '___';
            return;
        }
        if (gender === 'female') {
            result.textContent = 
            Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = 
            Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calculateResult();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calculateResult();
            });
        });
    }
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div' , 'calculating__choose-item_active');

    function getInputInfo(inputSelector) {
        const input = document.querySelector(inputSelector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calculateResult();
        });
    }
    getInputInfo('#height');
    getInputInfo('#weight');
    getInputInfo('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function menuCards() {
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
}

module.exports = menuCards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          totalElements = document.querySelector('#total'),
          currentElement = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper '),
          slidesField = document.querySelector('.offer__slider-inner'),
          slidesWidth = window.getComputedStyle(slidesWrapper).width,
          widthInt = +slidesWidth.replace(/\D/g,'');
    let slideIndex = 1;
    let offset = 0;

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

    slider.style.position = 'relative';
    const dots = document.createElement('ol'),
          dotsArray = [];
    dots.classList.add('carousel-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
            
        }
        dots.append(dot);
        dotsArray.push(dot);
    }

    function moveSlider (direction) {
        if (direction === 'forward') {
            if (offset == +widthInt * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +widthInt;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        } else if (direction === 'back') {
            if (offset === 0) {
                offset = +widthInt * (slides.length - 1);
            } else {
                offset -= +widthInt;
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
        dotsArray.forEach(dot => dot.style.opacity = '.5');
        dotsArray[slideIndex - 1].style.opacity = 1;
    }
    next.addEventListener('click', () => {
        moveSlider('forward');
    });
    prev.addEventListener('click', () => {
        moveSlider('back');
    });

    setInterval(moveSlider, 5000, 'forward'); 

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +widthInt * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                currentElement.textContent = `0${slideIndex}`;
            } else {
                currentElement.textContent = slideIndex;
            }
            dotsArray.forEach(dot => dot.style.opacity = '.5');
            dotsArray[slideIndex - 1].style.opacity = 1;
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
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
    const deadline = '2023-02-20',
          timerSelector = '.timer';
    setTimer(timerSelector, deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
    calculator();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map