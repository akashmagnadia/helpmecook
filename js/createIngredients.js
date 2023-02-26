// input them in lowercase
// this assumes that you always have the following items
let ingredientsToIgnoreForCheckbox = ["coconut sesame peanut mix", "chili paste", "pan", "chilli paste", "mixer", "prepared dal", "water", "instant pot", "stackable container", "pot", "oil"];

function listener_IngredientsCheckBox() {
    for (let i = 0; i < ingredientsList.length; i++) {
        if (ingredientsList[i].idIngr != null) {

            if (ingredientsToIgnoreForCheckbox.includes(ingredientsList[i].nameIngr.toLowerCase())) {
                continue;
            }

            document.getElementById("checkbox_name_" + ingredientsList[i].idIngr)
                .addEventListener('change', function () {
                    ingredientsList[i].isAvailable = this.checked;
                    updateRecipeFilter();
                });
        }
    }
}

async function generateHTML_Ingredients() {
    let spiceCheckBoxContainerID = document.getElementById("spices_checkBoxes");
    let vegCheckBoxContainerID = document.getElementById("vegetables_checkBoxes");

    for (let i = 0; i < ingredientsList.length; i++) {
        if (ingredientsList[i].idIngr !== null) {

            if (ingredientsToIgnoreForCheckbox.includes(ingredientsList[i].nameIngr.toLowerCase())) {
                continue;
            }

            let element = null;
            if (ingredientsList[i].isSpice) {
                element = spiceCheckBoxContainerID;
            } else if (ingredientsList[i].isVegetable) {
                element = vegCheckBoxContainerID;
            }

            // add html code for checkbox
            await addHTMLLinesToCodeScreen(element,
                [
                    '<label class="checkbox" id="checkbox_btn_' + ingredientsList[i].idIngr + '"> ' +
                    '<input type="checkbox" id="checkbox_name_' + ingredientsList[i].idIngr + '" checked> ' +
                    ingredientsList[i].nameIngr + ' </label>'
                ]);
        }
    }
    listener_IngredientsCheckBox(); // listener for the checkbox
}