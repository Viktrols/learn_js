/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */


/* Задания на урок 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

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

const allAdvertising = document.querySelectorAll('.promo__adv img'),
      promoGenre = document.querySelector('.promo__genre'),
      promoBg = document.querySelector('.promo__bg'),
      promoInterList = document.querySelector('.promo__interactive-list'),
      form = document.querySelector('.add'),
      inputFilm = form.querySelector('.adding__input'),
      isFavorite = form.querySelector('input[type=checkbox]');


const deleteElems = (array) =>{
    array.forEach(elem => {
        elem.remove();
    });
};

function createMoviesList (films, parent) {
    parent.innerHTML = '';
    films.sort();
    films.forEach(function(film, index) {
        parent.innerHTML += `<li class="promo__interactive-item">${index+1}. ${film}
                             <div class="delete"></div>
                             </li>`;
    });

    document.querySelectorAll('.delete').forEach((elem, index) => {
        elem.addEventListener('click', () => {
            elem.parentElement.remove();
            films.splice(index, 1);
            createMoviesList(films, parent );
        });
    });
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let film = inputFilm.value.trim();
    if (film) {
        if (film.length > 21){
            film = `${film.substring(0, 22)}...`;
        }
        movieDB.movies.push(film);
        if (isFavorite.checked){
            console.log("Добавляем любимый фильм");
        }
        createMoviesList(movieDB.movies, promoInterList);
        form.reset();
    }
});

deleteElems(allAdvertising);

promoGenre.textContent = 'драма';
promoBg.style.background = "url('img/bg.jpg')";
promoBg.style.backgroundSize = "100%";

createMoviesList(movieDB.movies, promoInterList);
