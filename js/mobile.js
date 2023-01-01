"use strict";

const box = document.querySelector('.box');

box.addEventListener('touchstart', (e) => {
    e.preventDefault();
    console.log('start');
});
box.addEventListener('touchmove', (e) => {
    e.preventDefault();
    box.style.background = 'red';
});
box.addEventListener('touchend', (e) => {
    e.preventDefault();
    box.style.background = 'black';
});