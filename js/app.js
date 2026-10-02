const watchedBtns = document.querySelectorAll('.film-card__btn--watched');

watchedBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        btn.classList.toggle('is-active');
    })
});


const watchBtns = document.querySelectorAll('.film-card__btn--watch');

watchBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const card = btn.closest('.film-card');
        const title = card.querySelector('.film-card__title').textContent.trim();

        const query = encodeURIComponent(`смотреть ${title} онлайн бесплатно в хорошем качестве`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    })
})