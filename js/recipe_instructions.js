function openRecipeDialog(index) {
    const r = recipesList[index];
    const dialog = document.getElementById('recipe-dialog');
    
    // Set basic info
    document.getElementById('dialog-title').innerText = r.title;
    
    // Set ingredients
    const ingredientsList = document.getElementById('dialog-ingredients-list');
    ingredientsList.innerHTML = '';
    r.ingredientsFullNameList.forEach(ing => {
        const li = document.createElement('li');
        li.innerText = ing;
        ingredientsList.appendChild(li);
    });
    
    // Set instructions
    const instructionsList = document.getElementById('dialog-instructions-list');
    instructionsList.innerHTML = r.instructions.join('');
    
    // Show dialog
    dialog.showModal();
}

function closeRecipeDialog() {
    const dialog = document.getElementById('recipe-dialog');
    if (dialog) {
        dialog.close();
    } else {
        console.error("Recipe dialog element not found");
    }
}

// Initializing event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('recipe-dialog');

    // Explicit listeners for close buttons
    const closeX = document.querySelector('.close-x');
    const closeBtn = document.querySelector('.close-btn');

    if (closeX) {
        closeX.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeRecipeDialog();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeRecipeDialog();
        });
    }

    // Close on backdrop click
    if (dialog) {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    }
});

// Legacy function kept as empty to avoid errors
function build_accordion_listeners() {}