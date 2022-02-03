const elFilmsList = document.querySelector('.films__list');
const elFilmTemplate = document.querySelector('#film-template').content;
const elGenreTemplate = document.querySelector('#film-genre-template').content;
const elFilmsFilterForm = document.querySelector('.films-form');
const elFilmsSelect = document.querySelector('.film-select');
const elFilmsSearchInput = document.querySelector('.film-search-input');

const generateGenres = (films) => {
	const genres = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!genres.includes(genre)) {
				genres.push(genre);
			}
		});
	});

	return genres;
};

const renderGenresSelect = (genres, element) => {
	genres.forEach((genre) => {
		const newOption = document.createElement('option');
		newOption.value = genre;
		newOption.textContent = genre;

		element.appendChild(newOption);
	});
};

var renderGenres = (array, element) => {
	element.innerHTML = null;

	const genreFragment = document.createDocumentFragment();

	array.forEach((genre) => {
		var genreTemplate = elGenreTemplate.cloneNode(true);

		genreTemplate.querySelector('.film-genre').textContent = genre;

		genreFragment.appendChild(genreTemplate);
	});

	element.appendChild(genreFragment);
};

var renderFilms = (array, element) => {
	element.innerHTML = null;

	const filmFragment = document.createDocumentFragment();

	array.forEach((film) => {
		const filmTemplate = elFilmTemplate.cloneNode(true);

		filmTemplate.querySelector('.film__title').textContent = film.title;
		filmTemplate.querySelector('.film__image').src = film.poster;
		filmTemplate.querySelector('.film__overview').textContent =
			film.overview;
		filmTemplate.querySelector('.film__time').textContent =
			film.release_date;

		const elGenres = filmTemplate.querySelector('.film__genres');

		renderGenres(film.genres, elGenres);

		filmFragment.appendChild(filmTemplate);
	});

	element.appendChild(filmFragment);
};

renderFilms(films, elFilmsList);
renderGenresSelect(generateGenres(films), elFilmsSelect);

elFilmsFilterForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const selectValue = elFilmsSelect.value.trim();
	const searchValue = elFilmsSearchInput.value.trim();

	let filteredByGenre = [];

	if (selectValue === 'All') {
		filteredByGenre = films;
	} else {
		filteredByGenre = films.filter((film) =>
			film.genres.includes(selectValue),
		);
	}

	const regex = new RegExp(searchValue, 'gi');

	const filteredBySearch = filteredByGenre.filter((film) =>
		film.title.match(regex),
	);

	renderFilms(filteredBySearch, elFilmsList);
});

let theme = window.localStorage.getItem("theme")
const elDiv = document.querySelector('.movies-catalog')

if(theme){
    elDiv.style.backgroundColor = theme
}else{
    elDiv.style.backgroundColor = "white"
}


function funcBtnWhite(){
    window.localStorage.setItem("theme", "white")
    window.location.reload()
}
function funcBtnBlack(){
    window.localStorage.setItem("theme", "black")
    window.location.reload()
}

window.localStorage.clear()
