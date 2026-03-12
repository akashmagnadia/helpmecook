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

function setupChipDropdownAnimations() {
    document.querySelectorAll('.chip-dropdown').forEach(details => {
        const summary = details.querySelector('.chip-dropdown-summary');
        const body    = details.querySelector('.chip-dropdown-body');
        if (!summary || !body) return;

        // Initialise already-open dropdowns so they have a real max-height
        if (details.open) {
            body.style.maxHeight = body.scrollHeight + 'px';
        }

        summary.addEventListener('click', e => {
            e.preventDefault(); // stop native instant toggle

            if (details.open) {
                // --- CLOSING ---
                // Snapshot current height then animate to 0
                body.style.maxHeight = body.scrollHeight + 'px';
                body.classList.remove('is-open');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        body.style.maxHeight = '0';
                    });
                });

                // Remove [open] only after the transition finishes
                body.addEventListener('transitionend', function handler() {
                    details.removeAttribute('open');
                    body.removeEventListener('transitionend', handler);
                });
            } else {
                // --- OPENING ---
                details.setAttribute('open', '');
                body.style.maxHeight = body.scrollHeight + 'px';
                body.classList.add('is-open');

                // After transition, set max-height to 'none' so content can reflow freely
                body.addEventListener('transitionend', function handler(ev) {
                    if (ev.propertyName === 'max-height') {
                        body.style.maxHeight = 'none';
                        body.removeEventListener('transitionend', handler);
                    }
                });
            }
        });
    });
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

            // add html code for chip
            await addHTMLLinesToCodeScreen(element,
                [
                    '<div class="chip"> ' +
                    '<input type="checkbox" class="chip-checkbox" id="checkbox_name_' + ingredientsList[i].idIngr + '" checked> ' +
                    '<label class="chip-label" id="checkbox_btn_' + ingredientsList[i].idIngr + '" for="checkbox_name_' + ingredientsList[i].idIngr + '"> ' + ingredientsList[i].nameIngr + ' </label>' +
                    '</div>'
                ]);
        }
    }
    listener_IngredientsCheckBox(); // listener for the checkbox
    setupChipDropdownAnimations();  // animated expand/collapse
}