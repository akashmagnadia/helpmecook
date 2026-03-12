let ingredientsList = [];

async function addHTMLLinesToCodeScreen(element, linesToAdd) {
    let str = '';
    for (let i = 0; i < linesToAdd.length; i++) {
        str += linesToAdd[i];
    }
    element.innerHTML += str;
}

function hideRecipe(element) {
    element.style.maxHeight = "0px";
    element.style.boxShadow = "none";
    element.style.opacity = "0";
    element.style.margin = "0px";
    element.style.borderWidth = "0px";
}

function showRecipe(element) {
    element.style.maxHeight = "2000px";
    element.style.boxShadow = "";
    element.style.opacity = "1";
    element.style.margin = "";
    element.style.borderWidth = "";
}

function searchBarInput(recipesItem) {
    let searchRecipeInput = document.getElementById("recipe_search").value;

    if (searchRecipeInput !== "") {
        const searchWords = searchRecipeInput.split(" ");

        for (let i = 0; i < searchWords.length; i++) {
            if (!recipesItem.description.toLowerCase().includes(searchWords[i].toLowerCase()) &&
                !recipesItem.title.toLowerCase().includes(searchWords[i].toLowerCase())) {
                return false;
            }
        }
    }
    return true;
}

function updateRecipeFilter() {
    for (let i = 0; i < recipesList.length; i++) {

        let allIngredientsPresent = true;
        let recipeContainer = document.getElementById(recipesList[i].recipeID);

        for (let j = 0; j < recipesList[i].ingredientsList.length; j++) {
            // check ingredients for the recipes with available ingredients
            for (let k = 0; k < ingredientsList.length; k++) {

                // if one of the ingredient is missing
                if (recipesList[i].ingredientsList[j].toLowerCase() === ingredientsList[k].nameIngr.toLowerCase() &&
                    ingredientsList[k].isAvailable === false) {

                    allIngredientsPresent = false;

                    // no need to check other ingredients if one is already missing
                    j = recipesList[i].ingredientsList.length;
                    break; // break out of loop for index k, and then it will also exit the loop for index j
                } else {
                    // check other ingredients from checkbox
                }
            }

            // move to the next ingredient from the recipes
        }
        // move to the next recipes in the ingredient listing

        if (allIngredientsPresent) {
            if (searchBarInput(recipesList[i])) {
                showRecipe(recipeContainer);
            } else {
                // make the recipes disappear
                hideRecipe(recipeContainer);
            }
        } else {
            // make the recipes disappear
            hideRecipe(recipeContainer);
        }
    }
}

function firstLetterUppercase(sentence) {
    const words = sentence.split(" ");
    let str = "";

    for (let i = 0; i < words.length; i++) {
        str += words[i][0].toUpperCase() + words[i].substr(1);
        if (i + 1 !== words.length) {
            str += " ";
        }
    }

    return str;
}

function ingredientExist(ingr) {
    for (let i = 0; i < ingredientsList.length; i++) {
        if (ingredientsList[i].nameIngr.toLowerCase() === ingr.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function showRecipeSearchBar() {
    let searchRecipe = document.getElementById("recipe_search");
    searchRecipe.style.maxHeight = "100px";
    searchRecipe.style.padding = "7px";
    searchRecipe.style.marginBottom = "15px";
    searchRecipe.style.marginLeft = "15px";
    searchRecipe.style.marginRight = "15px";

    document.getElementById("recipe_search_form")
        .addEventListener('change', function () {
        document.getElementById("recipe_search").blur()
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(
        function() {
            showRecipeSearchBar();
        }, 3000);
});
