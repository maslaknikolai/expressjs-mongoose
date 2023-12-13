// ==UserScript==
// @name        Scrapper - kinopoisk.ru
// @namespace   Violentmonkey Scripts
// @match       https://www.kinopoisk.ru/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/13/2023, 4:52:04 AM
// @run-at      document-end
// ==/UserScript==


async function main() {
    list()
    stills()
}

function list() {
    const names = Array.from(document.querySelectorAll('[class*="base-movie-main-info_mainInfo"]'))

    const savedFilms = JSON.parse(localStorage.getItem('al_films') || '[]');

    const found = names.map((el) => {
        const name = el.parentElement.querySelector('[class*="desktop-list-main-info_secondaryTitle__"]')?.innerText;
        const link = el.parentElement.getAttribute('href');
        return { name, link }
    })

    const newFilms = found.filter(film => !savedFilms.find(it => it.link === film.link));

    if (newFilms.length === 0) {
        return
    }

    console.log('MYMY NEW FILMS', newFilms);

    savedFilms.push(...newFilms);

    localStorage.setItem('al_films', JSON.stringify(savedFilms));
}

function stills() {
    // https://www.kinopoisk.ru/film/1008798/screenshots/page/1/
    const filmId = document.location.href.match(/https:\/\/www.kinopoisk.ru\/film\/(\d+)\/stills\//)?.[1];

    if (!filmId) return;

    const gallery = document.querySelector('[class*="styles_gallery"]')

    if (!gallery) return;

    const savedFilms = JSON.parse(localStorage.getItem('al_films') || '[]');
    const film = savedFilms.find(it => it.link === '/film/' + filmId + '/');

    if (!film || film.images) return;


    const imgs = gallery.querySelectorAll('[alt="Просмотр фото"]')

    const filmImages = Array.from(imgs)
        .map(el => {
            const rawLink = el.src;
            const s = rawLink.split('/');
            const withoutLast = s.slice(0, s.length - 1);
            const newLink = withoutLast.join('/') + '/orig';
            return newLink;
        })

    film.images = filmImages;

    console.log('MYMY', film);


    localStorage.setItem('al_films', JSON.stringify(savedFilms));
}

setInterval(main, 2000);

// TODO
// names.forEach(el => {
//     if (el.classList.contains('al')) return;
//     el.classList.add('al');

//     const isAdded = savedFilms.find(it => it.link === el.parentElement.getAttribute('href'));

//     const btn = document.createElement('button');
//     btn.innerText = isAdded ? 'Remove' : 'ADD';

//     el.parentElement.parentElement.append(btn)
// })