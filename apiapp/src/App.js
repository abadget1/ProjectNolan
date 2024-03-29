import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    const options = {
      method: 'GET',
      // This is the api i found online that i pulled
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
      params: {
        tags: 'vegetarian',
        number: '1'
      },
      headers: {
        // free public key
        'X-RapidAPI-Key': '4dcf9c0544mshb812bc2bd441b4fp1c8b78jsn90580a18b7bd',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRecipe(response.data.recipes[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    setLoading(true);
    fetchRecipe();
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  return (
    <div>
      <h1>Random Vegetarian Recipe</h1>
    // Click button to get a different recipe
      <button onClick={handleClick}>Get Another Recipe</button>
      <br />
      <div>
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        <h2>Ingredients:</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
        <h2>Instructions:</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
      </div>
    </div>
  );
}

export default App;
