
function fetchMovieByGenre(genre) {
const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '579595fad3mshc871b6bdda37995p10ea89jsna3a5b1323ff7',
    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
  }
};

const genreSelect = document.getElementById('genreSelect');
const selectedGenre = genreSelect.value;

fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const moviesFilteredByGenre = data.filter(movie => movie.genre.includes(selectedGenre));
    console.log(moviesFilteredByGenre);
  })
  .catch(error => console.error('Error:', error));
}