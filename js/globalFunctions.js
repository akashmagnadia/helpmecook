let ingredientsList = [];

async function addHTMLLinesToCodeScreen(element, linesToAdd) {
    let str = '';
    for (let i = 0; i < linesToAdd.length; i++) {
        str += linesToAdd[i];
    }
    element.innerHTML += str;
}

function hideRecipe(element) {
    element.style.display = "none";
}

function showRecipe(element) {
    element.style.display = "flex";
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
    const doFilter = () => {
        for (let i = 0; i < recipesList.length; i++) {
            let allIngredientsPresent = true;
            let recipeContainer = document.getElementById(recipesList[i].recipeID);

            for (let j = 0; j < recipesList[i].ingredientsList.length; j++) {
                for (let k = 0; k < ingredientsList.length; k++) {
                    if (recipesList[i].ingredientsList[j].toLowerCase() === ingredientsList[k].nameIngr.toLowerCase() &&
                        ingredientsList[k].isAvailable === false) {
                        allIngredientsPresent = false;
                        j = recipesList[i].ingredientsList.length;
                        break;
                    }
                }
            }

            if (allIngredientsPresent && searchBarInput(recipesList[i])) {
                showRecipe(recipeContainer);
            } else {
                hideRecipe(recipeContainer);
            }
        }
    };

    if (document.startViewTransition) {
        document.startViewTransition(() => doFilter());
    } else {
        doFilter();
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
