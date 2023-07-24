let userInputEl = document.getElementsByClassName('choice');
let submitBtnEl = document.getElementById('nextbtn');
let cocktailThumbnailEl = document.getElementById('cocktailThumbnail');
let cocktailNameEl = document.getElementById('cocktailName');

submitBtnEl.addEventListener('click', function() {
  let userInput = userInputEl.value;
  getCocktails(userInput);

})

/*function displayCocktail(apiResponse) {
  let drink = apiResponse.drinks.
  
}*/

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
      
      const drink = randomDrinkName
      const drinkImg = drinkData.drinks[0].strDrinkThumb
      const drinkRecipe = drinkData.drinks.strInstructions

      console.log(drinkImg + "123")
      /*displayCocktail()*/

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
