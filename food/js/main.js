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
              
        console.log(diff);
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
    const deadline = '2022-01-20',
          timerSelector = '.timer';
    setTimer(timerSelector, deadline);
   
});