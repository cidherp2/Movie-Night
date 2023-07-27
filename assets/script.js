var selectedchoice = document.querySelector('#inputrequest')
var btn = document.querySelector('#nextbtn')
var promptEl = document.getElementById('prompt');
document.querySelector('.results').style.display = "none";
var cocktail =  ''
var movie =  ''
var flag = 0;

const seeFavoritesSpan = document.getElementById('seeFavorites');
const favoritesDiv = document.getElementById('favoritesDiv');

// Add click event listener to the SEE FAVORITES
seeFavoritesSpan.addEventListener('click', () => {
  // Toggle the visibility of the div
  favoritesDiv.classList.toggle('hidden');
});

//request a list of drinks based on liquor type
async function getCocktails(userInput) {
    const url = 'https://the-cocktail-db.p.rapidapi.com/filter.php?i=';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6e39ff3dc7mshef2cc7f2d0cd2f8p10909ajsn29fea5c5d165',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url + userInput, options);
      const data = await response.json();
      console.log(data);

      //2nd request to get specific drink information
      const randomDrinkName = getRandomDrink(data);
      console.log('Random Drink: ', randomDrinkName);
	  cocktail = randomDrinkName;

      const drinkUrl = 'https://the-cocktail-db.p.rapidapi.com/search.php?s=';
      const drinkResponse = await fetch(drinkUrl + randomDrinkName, options);
      const drinkData = await drinkResponse.json();
	  const recipe = drinkData.drinks[0].strInstructions;
	  const drinkImg = drinkData.drinks[0].strDrinkThumb;
	  const ingredients = getIngredients(drinkData.drinks[0]);

	  displayCocktail(drinkImg, randomDrinkName, recipe, ingredients);
	  
	
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
};

  function getIngredients(drink) {
	const ingredientsArray = [];
	for (let i = 1; i <= 15; i++) {
	  const ingredientKey = `strIngredient${i}`;
	  const ingredientValue = drink[ingredientKey];
	  if (ingredientValue) {
		ingredientsArray.push(ingredientValue);
	  }
	}
	return ingredientsArray;
}

function displayCocktail(imageUrl, cocktailName, recipe, ingredients) {
	let cocktailThumbnailEl = document.getElementById('cocktailThumbnail');
	let cocktailNameEl = document.getElementById('cocktailName');
	let ingredientsListEL = document.getElementById('ingredientsList');
	let recipeEl = document.getElementById('recipe');

	cocktailThumbnailEl.src = imageUrl;
	cocktailNameEl.textContent = cocktailName;
	
	// Clear previous ingredient list if any
	ingredientsListEL.innerHTML = '';

	for (i = 0; i < ingredients.length; i++) {
		let ingredientItemEl = document.createElement('li');
		ingredientItemEl.textContent = `${i + 1}. ${ingredients[i]}`;
		ingredientsListEL.appendChild(ingredientItemEl);
	}
	
	recipeEl.textContent = recipe;

}


  
  //gets the info from the 1st fetch and selects a random drink to send to the 2nd fetch
  function getRandomDrink(apiResponse) {
    try {
        const drinksList = apiResponse.drinks;

        if (drinksList.length === 0) {
            console.error('Error: No drinks found in the API response.');
            return null;
        }

        // Get a random index to pick a random drink name from the list
        const randomIndex = Math.floor(Math.random() * drinksList.length);
        const randomDrinkName = drinksList[randomIndex].strDrink;

        return randomDrinkName;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

function fetchMovieByGenre(genre) {
	const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': '6e39ff3dc7mshef2cc7f2d0cd2f8p10909ajsn29fea5c5d165',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	  }
	};
	const selectedGenre = genre
	fetch(url, options)
	  .then(response => response.json())
	  .then(data => {
		const moviesFilteredByGenre = data.filter(movie => movie.genre.includes(selectedGenre));
		if (moviesFilteredByGenre.length > 0) {
			const randomMovie = moviesFilteredByGenre[Math.floor(Math.random() * moviesFilteredByGenre.length)];
			let movieThumbnailEl = document.getElementById('movieThumbnail');
			let movieTitleEl = document.getElementById('movieName');
			let imgUrl = randomMovie.image
			movie = randomMovie.title
			let movieYear = randomMovie.year
	
			movieThumbnailEl.src = imgUrl
			movieTitleEl.textContent = (movie + " (" + movieYear +")")
			
		  } else {
			console.log('No movies found for the selected genre.');
		  }
	  })
	  .catch(error => console.error('Error:', error));
};




var liquorOptions = [
	{opt: "Tequila", val:"Tequila"},
	{opt: "Vodka", val:"Vodka"},
	{opt: "Rum", val:"Rum"},
	{opt: "Whisky", val:"Whisky"},
	{opt: "Gin", val:"Gin"},
	{opt: "Bourbon", val:"Bourbon"},
	{opt: "Mezcal", val:"Mezcal"},
	{opt: "Beer", val:"Beer"},
]

var movieGenre = [
	{opt: "Boo!👻", val: "Horror"},
	{opt: "Kaboom!💥", val: "Action"},
	{opt: "LOL😂", val: "Comedy"},
	{opt: "In Love😍", val: "Drama"},
	{opt: "Hands up!👮", val: "Crime"},
	{opt: "OMG😱", val: "Thriller"},
	{opt: "Who did it?🕵️‍♂️", val: "Mystery"}
]

var liquorPrompt = "CHOOSE YOUR POISON.."
var moviePrompt = "CHOOSE YOUR MOOD.."

function createOpt(obj, prompt){
	selectedchoice.innerHTML = ''
	for(var i = 0; i < obj.length;i++){
		var newElement = document.createElement('option');
		newElement.classList.add('choice');
		selectedchoice.append(newElement);

		promptEl.textContent = prompt
	}
}


createOpt(liquorOptions, liquorPrompt);

var allChoices = document.getElementsByClassName('choice');

function setValues(info){
	for(var i = 0; i < info.length;i++){
		allChoices[i].textContent = info[i].opt
		allChoices[i].value = info[i].val
	}
} 

setValues(liquorOptions);

btn.addEventListener('click',function(e){
	e.preventDefault();
	if (flag == 0){
		getCocktails(selectedchoice.value)
		createOpt(movieGenre, moviePrompt);
		setValues(movieGenre);
	}else if (flag == 1){
		fetchMovieByGenre(selectedchoice.value)
		document.querySelector('#centrar-todo').style.display = "none";
		document.querySelector('.results').style.display = "flex";
	}
	flag++
})


var refreshpage = document.querySelector('#refresh');

refreshpage.addEventListener('click', function(){
	location.reload()
})