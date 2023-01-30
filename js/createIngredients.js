let ingredientsList = [];

function listener_IngredientsCheckBox() {
    for (let i = 0; i < ingredientsList.length; i++) {
        if (ingredientsList[i].idIngr != null) {

            document.getElementById(ingredientsList[i].idIngr)
                .addEventListener('change', function() {
                    ingredientsList[i].isAvailable = this.checked;

                    updateRecipeFilter();
                });
        }
    }
}

function generateCheckBox(text, element, ingr) {
    let arr = text.split(/\r?\n/);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") { continue; }

        let fullName = arr[i];
        let idName = fullName.replace(/ /g,'')

        addHTMLLinesToCodeScreen(element,
            ['<label class="checkbox" id="checkbox_btn_' + idName + '"> <input type="checkbox" id="checkbox_name_' + idName + '" checked> ' + fullName + ' </label>']);

        if (ingr === "Spice") {
            ingredientsList.push(new ingredients('checkbox_name_' + idName, fullName, true, false));
        } else if (ingr === "Veg") {
            ingredientsList.push(new ingredients('checkbox_name_' + idName, fullName, false, true));
        }
    }

    listener_IngredientsCheckBox();
}

function generateHTML_Ingredients() {
    let spiceTxtFile = './information/ingredient/spices.txt'
    let vegTxtFile = './information/ingredient/vegetables.txt'

    let spiceCheckBoxContainerID = document.getElementById("spices_checkBoxes");
    let vegCheckBoxContainerID = document.getElementById("vegetables_checkBoxes");

    fetch(spiceTxtFile)
        .then(response => response.text())
        .then(text => generateCheckBox(text, spiceCheckBoxContainerID, "Spice"))

    fetch(vegTxtFile)
        .then(response => response.text())
        .then(text => generateCheckBox(text, vegCheckBoxContainerID, "Veg"))

    // ingredients available at all times
    ingredientsList.push(new ingredients(null, "Water", false, false));
}