/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Шрек",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// const advertising = document.querySelector('.promo__adv');
// advertising.remove();

const allAdvertising = document.querySelectorAll('.promo__adv img');
allAdvertising.forEach(elem => elem.remove());


const promoGenre = document.querySelector('.promo__genre');
// promoGenre.innerHTML = 'драма';
promoGenre.textContent = 'драма';

const promoBg = document.querySelector('.promo__bg');
promoBg.style.background = "url('img/bg.jpg')";
promoBg.style.backgroundSize = "100%";

const promoInterList = document.querySelector('.promo__interactive-list');
promoInterList.innerHTML = '';
movieDB.movies.sort();

movieDB.movies.forEach(function(item, index) {
    // const li = document.createElement('li');
    // li.classList.add('promo__interactive-item');
    // li.innerHTML = `${index+1}. ${item}<div class="delete"></div>`;
    // promoInterList.append(li);
    promoInterList.innerHTML += `<li class="promo__interactive-item">${index+1}. ${item}
                 <div class="delete"></div>
                 </li>`;
});