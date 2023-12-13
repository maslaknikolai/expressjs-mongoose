function openNextChunk() {
    const CHUNK_SIZE = 30

    const films = JSON.parse(localStorage.al_films)
    const withoutImages = films.filter(film => !film.images)

    const chunk = withoutImages.slice(0, CHUNK_SIZE)

    chunk.forEach(film => {
        window.open(`https://www.kinopoisk.ru/${film.link}/stills/`)
    })

    console.log('MYMY Осталось', withoutImages.length);
}
openNextChunk()


