const filmsList = document.querySelector('.films-list');
const alertDialog = document.querySelector('.delete-alert');
let filmToDelete = null;

filmsList.addEventListener('click', e => {
    // клик по кнопке "Просмотрено"
    const watchedBtn = e.target.closest('.film-card__btn--watched');
    if (watchedBtn) {
        watchedBtn.classList.toggle('is-active');
        return;
    }

    // клик по кнопке "Смотреть"
    const watchBtn = e.target.closest('.film-card__btn--watch');
    if (watchBtn) {
        const card = watchBtn.closest('.film-card');
        const title = card.querySelector('.film-card__title').textContent.trim();
        const query = encodeURIComponent(`смотреть ${title} онлайн бесплатно в хорошем качестве`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    // Удаление фильма по кнопке
    const deleteBtn = e.target.closest('[data-film-card-deleteBtn]');
    if(deleteBtn) {
        filmToDelete = deleteBtn.closest('.film-card');
        const dialogInlineName = alertDialog.querySelector('.delete-alert__info p');
        const deleteFilmName = filmToDelete.querySelector('.film-card__title').textContent.trim();
        dialogInlineName.textContent = `Вы действительно хотите удалить фильм ${deleteFilmName}?`
        alertDialog.showModal();
        return;
    }
    
});

// слушатель кнопок да/нет

alertDialog.addEventListener('click', e => {
    if(e.target.closest('[data-alert-yesBtn]')) {
        filmToDelete.remove();
        filmToDelete = null;
        alertDialog.close();
        return;
    }

    if(e.target.closest('[data-alert-noBtn]')) {
        filmToDelete = null;
        alertDialog.close();
        return;
    }
})


const dialog = document.querySelector('.addFilm');
const openDialogBtn = document.querySelector('.welcome__showPopup');
openDialogBtn.addEventListener('click', e => {
    dialog.showModal();
})


const closeDialogBtn = dialog.querySelector('.closeDialogButtton');
closeDialogBtn.addEventListener('click', e => {
    dialog.close();
})

const rateInput = dialog.querySelector('#filmRate');
const rateOutput = dialog.querySelector('output[for="filmRate"]');
rateInput.addEventListener('input', e => {
    rateOutput.textContent = rateInput.value;
})

const cardForm = document.querySelector('.addFilm__form');
const cardfilmsList = document.querySelector('.films-list');
const cardtemplate = document.querySelector('#filmTemplate');


const posterInput = document.querySelector('#filmPoster');
const posterPreview = document.querySelector('.addFilm__preview');

let posterUrl = '';

posterInput.addEventListener('change', () => {
    const file = posterInput.files[0];
    if (!file) return;

    posterUrl = URL.createObjectURL(file);
    posterPreview.src = posterUrl;
    posterPreview.classList.add('is-visible');
});



cardForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = cardForm.elements.filmName.value.trim();
    const rate = cardForm.elements.filmRate.value;
    const length = cardForm.elements.filmLength.value;

    const cardFilmCard = cardtemplate.content.cloneNode(true);
    cardFilmCard.querySelector('.film-card__title').textContent = name;
    cardFilmCard.querySelector('.film-card__rate').textContent = `Rate : ${rate} / 10`;
    cardFilmCard.querySelector('.film-card__length').textContent = `Length: ${length}`;
    cardFilmCard.querySelector('.film-card__poster img').src = posterUrl;

    cardfilmsList.appendChild(cardFilmCard);
    cardForm.reset();
    posterUrl = '';
    posterPreview.src = '';
    posterPreview.classList.remove('is-visible');
    dialog.close();
})






