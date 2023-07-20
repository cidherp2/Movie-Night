
function fetchMovieByGenre(genre) {
const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd78f69cbd8msh18dc54772a2ad83p1e414fjsnb5d11933ae1d',
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