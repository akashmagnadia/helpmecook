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
    dialog.close();
}

// Close on backdrop click
document.addEventListener('click', (e) => {
    const dialog = document.getElementById('recipe-dialog');
    if (e.target === dialog) {
        dialog.close();
    }
});

// Legacy function kept as empty to avoid errors
function build_accordion_listeners() {}