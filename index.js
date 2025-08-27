'use strict';

import cakeRecipes from "./cake-recipes.json" with { type: 'json'};
import PromptSync from "prompt-sync";

const prompt = PromptSync();

const isRecipesEmpty = (recipes) => {
  if (recipes.length === 0){
    console.log("No recipes found");
    return true;
  }
  return false;
};

const getAllUniqueAuthors = (recipes) => {
  if (isRecipesEmpty(recipes)){return;};
  const authors = new Set();
  recipes.forEach(recipe => {
    authors.add(recipe.Author);
  });
  const authorsArray = [...authors];
  console.log(authorsArray);
  return authorsArray;
};

const printRecipeNames = (recipes) => {
  if (isRecipesEmpty(recipes)){return;};
  for (const recipe of recipes) {
    const { Name } = recipe;
    console.log(Name);
  }
}

const getRecipesOfGivenAuthor = (recipes, author) => {
  if (isRecipesEmpty(recipes)){return;};
  const allRecipes = recipes.filter((recipe) => recipe.Author.trim().toLowerCase() === author.trim().toLowerCase());
  printRecipeNames(allRecipes);
  return allRecipes;
};

const getRecipesWithIngredient = (recipes, ingredient) => {
  if (isRecipesEmpty(recipes)){return;};
  const allRecipes = recipes.filter((recipe) => {
    return recipe.Ingredients.some(ingredients => {
      return ingredients.toLowerCase().includes(ingredient.toLowerCase());
    });
  });
  printRecipeNames(allRecipes);
  return allRecipes;
};

const getRecipeThatMatchesName = (recipes, recipeName) => {
  if (isRecipesEmpty(recipes)){return;};
  const foundRecipe = recipes.find((recipe) => {
    return recipe.Name.toLowerCase().includes(recipeName.toLowerCase());
  })
  if (foundRecipe === undefined){
    console.log("\nNo recipes found");
    return;
  };
  console.log(foundRecipe);
    return foundRecipe;
};

const getAllIngredients = (recipes) => {
  if (isRecipesEmpty(recipes)){return;};
  const allIngredients = recipes.map((recipe) => recipe.Ingredients);
  const flattenedIngredients = allIngredients.reduce((acc, currentValue) => {
    return acc.concat(currentValue);
  });
  console.log(flattenedIngredients);
  return flattenedIngredients;
};

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

const savedRecipes = [];
const insertRecipeList = (recipes) => {
  let choice;
  do {
    choice = displayMenu();

    switch (choice) {
      case 1:
        console.log("\nAll Authors: ")
        getAllUniqueAuthors(recipes);
        break;
      case 2:
        const author = prompt("Enter the name of the Author: ");
        console.log(`\nAll recipes with Author ${author}: `);
        getRecipesOfGivenAuthor(recipes, author);
        break;
      case 3:
        const ingredient = prompt("Enter the name of the ingredient: ");
        console.log(`\nAll recipes with that contain the ingredient ${ingredient}`);
        getRecipesWithIngredient(recipes, ingredient);
        break;
      case 4:
        const recipeName = prompt("Enter the name of the recipe: ");
        const foundRecipe = getRecipeThatMatchesName(recipes, recipeName);
        if (foundRecipe !== undefined){
          console.log(`\nDetails of recipe that is found with name ${recipeName}`);
          const isSaved = prompt("Would you like to save this recipe? (yes, no): ");
          if (isSaved.toLocaleLowerCase() === "yes") {
            savedRecipes.push(foundRecipe);
          };
        };
        break;
      case 5:
        console.log("\nIngredient list of all saved recipes: ")
        getAllIngredients(savedRecipes);
        break;
      case 0:
        console.log("Exiting...");
        break;
      default:
        console.log("Invalid input. Please enter a number between 0 and 5.");
    }
  } while (choice !== 0);

};

insertRecipeList(cakeRecipes);



