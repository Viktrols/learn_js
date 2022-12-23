"use strict";

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
// console.log(personalMovieDB);

for (let i = 5; i<11; i++) {
    console.log(i);
}
for (let i = 20; i>9; i--) {
    console.log(i);
    if (i == 13) {
        break;
    }
}
for (let i = 2; i<11; i+=2) {
    console.log(i);
}

for (let i = 2; i <= 16; i++) {
    if (i % 2 === 0) {
        continue;
    } else {
        console.log(i);
    }
}
let i = 2;
while (i < 16) {
    i++;
    if (i % 2 === 0) {
        continue;
    } else {
        console.log(i);
    } 
}

const arrayOfNumbers = [];
for (let i = 5; i<11; i++) {
    arrayOfNumbers.push(i);
}
console.log(arrayOfNumbers);

const arr = [3, 5, 8, 16, 20, 23, 50];
const result = [];
for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i];
}
console.log(result);

const data = [5, 10, 'Shopping', 20, 'Homework'];
for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === "number") {
        data[i] = data[i]*2;
    } else if (typeof data[i] === "string") {
        data[i] = data[i] += ' - done';
    }
}
console.log(data);

const data2 = [5, 10, 'Shopping', 20, 'Homework'];
const result2 = [];
for (let i = (data2.length-1); i>=0; i--) {
//    result2.push(data2[i]);
    result2[i - 1] = data2[data2.length - i];
}
console.log(data2);
console.log(result2);


//      *
//     ***
//    *****
//   *******
//  *********
// ***********

const lines = 5;
let result3 = '';

for (let i = 0; i <= lines; i++) {
    for (let j = 0; j < lines - i; j++) {
        result3 += " ";
    }
    for (let j = 0; j < 2 * i + 1; j++) {
        result3 += "*";
    }
    result3 += "\n";
}

// console.log(result3);

const caalc = (a, b) => a + b;
console.log(caalc(2,3));

const calc2 = (a, b) => {return a + b;};
console.log(calc2(9, 10));

function returnNeighboringNumbers(num) {
    return [num-1, num, num+1];
}
console.log(returnNeighboringNumbers(5));

function getMathResult(num, count) {
    if (count <= 0 || typeof count !=="number"){
        return num;
    } else {
        let res = '';
        for (let i=1; i<count+1; i++){
            res += num*i;
            if (i != count) {
                res += '---';
            }
        }
        return res;
    }
}
console.log(getMathResult(3, 10));


let str = 'bla bla xxx';

console.log(str.indexOf('bbb'));

const logg = 'hello world';
console.log(logg.substr(1, 6));

const x = [1,2,3,4,5,6,7];
console.log(x.indexOf(3));

const num = "12.78px";
console.log(parseFloat(num));


function calculateVolumeAndArea(n) {
    if (!Number.isInteger(n)  | Math.sign(n) != 1) {
        return 'При вычислении произошла ошибка';
    } else {
        let area = 6 * (n * n);
        let volume = n * n * n;
        return `Объем куба: ${volume}, площадь всей поверхности: ${area}`;
    }
    
}
console.log(calculateVolumeAndArea(-5));

function getCoupeNumber(n) {
    if (n === 0 | n > 36) {
        return 'Таких мест в вагоне не существует';
    }else  if (!Number.isInteger(n) | Math.sign(n) != 1) {
        return 'Ошибка. Проверьте правильность введенного номера места';
    } else {
        return Math.ceil(n / 4);
    }
}
console.log(getCoupeNumber(0));


function getTimeFromMinutes(n) {
    if (n < 0 | !Number.isInteger(n)) {
        return 'Ошибка, проверьте данные';
    } else {
        const hours = Math.floor(n / 60);
        const minutes = n % 60;
        let hoursStr = '';
        let minutesStr = '';
        if (hours === 1 | hours === 21) {
            hoursStr += 'час';
        } else if ([2, 3, 4, 22, 23].includes(hours)) {
            hoursStr += 'часа';
        } else {
            hoursStr += 'часов';
        }
        const lastMinute = minutes % 10;
        if (lastMinute === 1 && minutes != 11){
            minutesStr += 'минута';
        } else if ([2, 3, 4].includes(lastMinute)) {
            minutesStr += 'минуты';
        } else {
            minutesStr += 'минут';
        }
        return `Это ${hours} ${hoursStr} и ${minutes} ${minutesStr}`;
    }
}
console.log(getTimeFromMinutes(1311));


// 2) Напишите функцию, которая принимает в себя 4 числа и возвращает самое большее из них.
// Если один из аргументов не является числом или их меньше 4 - возвращается 0. Дробные числа разрешены.
// Пример:
// findMaxNumber(1, 5, 6.6, 11); =>  11
// findMaxNumber(1, 5, '6', '10');  =>  0

function findMaxNumber(a, b, c, d) {
    if (arguments.length < 4 | !Number.isFinite(a) | !Number.isFinite(b) | !Number.isFinite(c) | !Number.isFinite(d)) {
        return 0;
    } else {
        return Math.max(a,b,c,d);
    }
}
console.log(findMaxNumber(1,21,3,4));

function fib(num) {
    if (typeof(num) !== 'number' || num <= 0 || !Number.isInteger(num)) {
        return "";
    }

    let result = '';
    let first = 0;
    let second = 1;

    for (let i = 0; i < num; i++) {
        if (i + 1 === num) {
            result += `${first}`;
            // Без пробела в конце
        } else {
            result += `${first} `;
        }

        let third = first + second;
        first = second;
        second = third;
    }

    return result;
}

console.log(fib(5));



const arr2 = ['a', 'b', 'c'];

arr2.test = 'bad';
// arr2.test;
console.log(arr2[1] === arr2['1']);

for (let i in arr2) {
    console.log(arr2[i]);
}
console.log(arr2);
for (let i2 of arr2) {
    console.log(arr2[i2]);
}


const personalPlanPeter = {
    name: "Peter",
    age: "29",
    skills: {
        languages: ['ru', 'eng'],
        programmingLangs: {
            js: '20%',
            php: '10%'
        },
        exp: '1 month'
    }
};

function showExperience(plan) {
    const {languages, programmingLangs, exp} = plan.skills;
    return exp;
}
// console.log(showExperience(personalPlanPeter));

function showProgrammingLangs(plan) {
    const {languages, programmingLangs, exp} = plan.skills;
    let res = '';
    for (let key in programmingLangs) {
        res += `Язык ${key} изучен на ${programmingLangs[key]}\n`;
    }
    return res;
}
// console.log(showProgrammingLangs(personalPlanPeter));

personalPlanPeter.showAgeAndLangs = function (obj) {
    const {languages, programmingLangs, exp} = obj.skills;
    const upperElems = languages.map(element => {return element.toUpperCase();});
    return `Мне ${obj.age} и я владею языками: ${upperElems.join(' ')}`;
};
console.log(personalPlanPeter.showAgeAndLangs(personalPlanPeter));


const family = ['Peter', 'Ann', 'Alex', 'Linda'];

function showFamily(arr) {
    if (arr.length === 0) {
        return 'Семья пуста';
    } else {
        return `Семья состоит из: ${arr.join(' ')}`;
    }
}

const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

function standardizeStrings(arr) {
    for (let key of arr) {
        console.log(key.toLowerCase());
    }
}

const someString = 'This is some strange string';

function reverse(str) {
    if (typeof str !== 'string'){
        return 'Ошибка';
    }else {
        let arr = str.split('');
        let revarr = arr.reverse();
        console.log(revarr.join(''));
    }
   
}

reverse(5);
reverse(someString);

const baseCurrencies = ['USD', 'EUR'];
const additionalCurrencies = ['UAH', 'RUB', 'CNY'];

function availableCurr(arr, missingCurr) {
    if (arr.length === 0) {
        return 'Нет доступных валют';
    } else {
        let result = 'Доступные валюты:' + '\n';
        arr.forEach(function(item, arr){
            if (item !== missingCurr) {
                result += item + '\n';
            }
            
        });
        return result;
    }}

console.log(availableCurr(additionalCurrencies, 'CNY'));

const shoppingMallData = {
    shops: [{width: 10, length: 5}, {width: 15, length: 7}, {width: 20, length: 5}, {width: 8, length: 10}],
    height: 5,
    moneyPer1m3: 30,
    budget: 50000
};

function isBudgetEnough(data) {
    let s = 0;
    data.shops.forEach(function(item){
        let shopS = item.length * item.width;
        s += shopS;
    }
    );
    let result = s * data.height * data.moneyPer1m3;
    if (result <= data.budget){
        return 'Бюджета достаточно';
    } else {
        return 'Бюджета недостаточно';
    }
    
}
isBudgetEnough(shoppingMallData);


const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam', 'Vasys'];

function sortStudentsByGroups(arr) {
    const sortedArr = arr.sort();
    let notPlayStudents = 'Оставшиеся студенты: ';
    const notPlayCount = arr.length - 9;
    if (notPlayCount > 0) {
        notPlayStudents += sortedArr.slice(-notPlayCount).join(', ');
    } else {
        notPlayStudents += '-';
    }
    
    const result = [sortedArr.slice(0, 3), sortedArr.slice(3, 6), sortedArr.slice(6, 9), notPlayStudents];
    return result;
}
sortStudentsByGroups(students);



const restorantData = {
    menu: [
        {
            name: 'Salad Caesar',
            price: '14$'
        },
        {
            name: 'Pizza Diavola',
            price: '9$'
        },
        {
            name: 'Beefsteak',
            price: '17$'
        },
        {
            name: 'Napoleon',
            price: '7$'
        }
    ],
    waitors: [
        {name: 'Alice', age: 22}, {name: 'John', age: 24}
    ],
    averageLunchPrice: '20$',
    openNow: true
};

function isOpen(prop) {
    if (prop){
        return 'Открыто';
    } else {
        return 'Закрыто';
    }
}

console.log(isOpen(restorantData.openNow));

function isAverageLunchPriceTrue(fDish, sDish, average) {
    console.log(+fDish.price.slice(0, -1));
    console.log(+sDish.price.slice(0, -1));
    console.log(+average.slice(0, -1));
    if ((+fDish.price.slice(0, -1) + (+sDish.price.slice(0, -1))) > +average.slice(0, -1)) {
        return 'Цена выше средней';
    } else {
        return 'Цена ниже средней';
    }
}

console.log(isAverageLunchPriceTrue(restorantData.menu[0], restorantData.menu[1], restorantData.averageLunchPrice));

function transferWaitors(data) {
    const copy = Object.assign({}, data);
    copy.waitors = [{name: 'Mike', age: 32}];
    return copy;
}

transferWaitors(restorantData);
console.log(transferWaitors(restorantData));


function factorial(n) {
    if (!Number.isInteger(n)){
        return "Variable isn't valid integer";
    } else if (n < 1) {
        return 1;
    } else{
        return factorial(n-1) * n;
    }
}

console.log(factorial(5));