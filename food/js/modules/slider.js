function slider({container, slide, nextArrow, prevArrow, totalCounter,
                 currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          totalElements = document.querySelector(totalCounter),
          currentElement = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
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

export default slider;