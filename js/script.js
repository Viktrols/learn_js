let numberOfFilms = +prompt('Cколько фильмов ты уже посмотрел?', '');
let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    gemres: [],
    private: false
};

let lastMovie = prompt('Один из последних фильмов?','');
let lastMovieRate = +prompt('Оцените его?', '');

personalMovieDB.movies[lastMovie] = lastMovieRate;
console.log(personalMovieDB);