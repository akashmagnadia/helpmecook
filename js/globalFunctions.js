let ingredientsList = [];

async function addHTMLLinesToCodeScreen(element, linesToAdd) {
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
        // make the recipes visible from the start, then remove if after checking


        for (let j = 0; j < recipesList[i].ingredientsList.length; j++) {
            // check ingredients for the recipes with available ingredients
            for (let k = 0; k < ingredientsList.length; k++) {

                // if one of the ingredient is missing
                if (recipesList[i].ingredientsList[j].toLowerCase() === ingredientsList[k].nameIngr.toLowerCase() &&
                    ingredientsList[k].isAvailable === false) {

                    // make the recipes disappear
                    recipeContainer.style.display = "none";

                    // no need to check other ingredients if one is already missing
                    j = recipesList[i].ingredientsList.length;
                    break; // break out of loop for index k and then it will also exit the loop for index j
                } else {
                    // check other ingredients from checkbox
                }
            }

            // move to the next ingredient from the recipes
        }
        // move to the next recipes in the ingredient listing
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
