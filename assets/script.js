var selectedchoice = document.querySelector('#inputrequest')
var btn = document.querySelector('#nextbtn')
var allChoices = document.querySelectorAll('.choice')
var flag = 0;

//request a list of drinks based on liquor type
async function getCocktails(userInput) {
    const url = 'https://the-cocktail-db.p.rapidapi.com/filter.php?i=';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4676b27f95mshdbca90ca01fd3ddp1bbae7jsn4ddba016d87a',
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

      const drinkUrl = 'https://the-cocktail-db.p.rapidapi.com/search.php?s=';
      const drinkResponse = await fetch(drinkUrl + randomDrinkName, options);
      const drinkData = await drinkResponse.json();
      console.log('Random Drink Details: ', drinkData);

    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };
  
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

var liquorOptions = [
	{opt: "Tequila"},
	{opt: "Vodka"},
	{opt: "Rum"},
	{opt: "Whisky"}
]

var movieGenre = [
	{opt: "Booo"},
	{opt: "Kaboom"},
	{opt: "LOL"},
	{opt: "In Love"}
]


function setValues(info){
	for(var i = 0; i < allChoices.length;i++){
		allChoices[i].textContent = info[i].opt
		allChoices[i].value = info[i].opt
	}
}

setValues(liquorOptions);

btn.addEventListener('click',function(e){
	e.preventDefault();
	getCocktails(selectedchoice.value)
	setValues(movieGenre)
})


