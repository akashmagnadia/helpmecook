function addHTMLLinesToCodeScreen(element, linesToAdd) {
    let str = '';
    for (let i = 0; i < linesToAdd.length; i++) {
        str += linesToAdd[i];
    }
    element.innerHTML += str;
}

function updateRecipeFilter() {
    for (let i = 0; i < recipesList.length; i++) {

        let recipeContainer = document.getElementById(recipesList[i].recipeID);
        recipeContainer.style.display = "unset";
        // make the recipe visible from the start, then remove if after checking


        for (let j = 0; j < recipesList[i].ingredientsList.length; j++) {
            // check ingredients for the recipe with available ingredients
            for (let k = 0; k < ingredientsList.length; k++) {
                // if one of the ingredient is missing

                if (recipesList[i].ingredientsList[j].toLowerCase() === ingredientsList[k].nameIngr.toLowerCase() &&
                    ingredientsList[k].isAvailable === false) {

                    // make the recipe disappear
                    recipeContainer.style.display = "none";

                    // no need to check other ingredients if one is already missing
                    j = recipesList[i].ingredientsList.length;
                    break; // break out of loop for index k and then it will also exit the loop for index j
                } else {
                    // check other ingredients from checkbox
                }
            }

            // move to the next ingredient from the recipe
        }
        // move to the next recipe in the ingredient listing
    }
}