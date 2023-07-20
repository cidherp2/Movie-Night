
function fetchMovieByGenre(genre) {
const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd78f69cbd8msh18dc54772a2ad83p1e414fjsnb5d11933ae1d',
    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
  }
};

const genreSelect = document.getElementById('inputrequest');
const selectedGenre = genreSelect.value;

fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const moviesFilteredByGenre = data.filter(movie => movie.genre.includes(selectedGenre));
    if (moviesFilteredByGenre.length > 0) {
        const randomMovie = moviesFilteredByGenre[Math.floor(Math.random() * moviesFilteredByGenre.length)];
        console.log(randomMovie);
      } else {
        console.log('No movies found for the selected genre.');
      }
    console.log(moviesFilteredByGenre);
  })
  .catch(error => console.error('Error:', error));
};