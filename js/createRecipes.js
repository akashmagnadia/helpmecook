let recipesList = [];

async function getJson(metaFilePath) {
    return fetch(metaFilePath)
        .then((response) => response.json())
        .then((json) => {return json});
}

async function getTextFile(path) {
    return fetch(path)
        .then(response => response.text())
        .then(text => {return text});
    }

async function getTileDesc(path) {
    let text = await getTextFile(path);
    let arr = text.split(/\r?\n/);

    let title = "";
    let desc = "";
    for (let i = 0; i < arr.length; i++) {
        if (i === 0)
        { title += arr[i]; }
        else
        {
            if (arr[i].slice(-1) !== "") {
                desc += arr[i] + " ";
            } else {
                desc += arr[i];
            }

        }
    }

    return { title, desc };
}

async function getRecipeIngredientsList(path) {
    let json_ingr = await getJson(path);
    let recipeIngredientsList = [];
    let ingredientsFullNameList = [];

    for (let i = 0; i < json_ingr.length; i++) {
        recipeIngredientsList.push(json_ingr[i].item)

        if (!ingredientExist(json_ingr[i].item)) {

            let isSpice, isVeg = false;
            if (json_ingr[i].type.toLowerCase() === "spice") {
                isSpice = true;
            } else if (json_ingr[i].type.toLowerCase() === "other") {
                isSpice = true;
            } else if (json_ingr[i].type.toLowerCase() === "veg") {
                isVeg = true;
            }

            ingredientsList.push(new ingredients(
                json_ingr[i].item.replace(/ /g,''),
                firstLetterUppercase(json_ingr[i].item),
                isSpice,
                isVeg
            ));
        }

        ingredientsFullNameList.push(json_ingr[i].quantity + " " + json_ingr[i].item)
    }

    return [recipeIngredientsList, ingredientsFullNameList];
}

async function getInstructionsList(path, ingredientsList) {
    let text = await getTextFile(path);
    let arr = text.split(/\r?\n/);

    let linesToAdd = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length !== 0) {
            let str = arr[i];
            for (let j = 0; j < ingredientsList.length; j++) {
                const searchMask = ingredientsList[j];
                const regEx = new RegExp(searchMask, "ig");
                const replaceMask = '<b> ' + searchMask + '</b>';

                str = str.replace(regEx, replaceMask);
            }
            linesToAdd.push('<li>' + str + '</li>');
        }
    }

    return linesToAdd;
}

async function generateHTML_SpicesCard(function1) {
    let json_recipes = await getJson('recipes/meta_data.json');

    for (let i = 0; i < json_recipes.recipes; i++) {
        let imgPath = 'recipes/recipe_' + i + '/backgroundImage.jpg';
        let titleDescPath = 'recipes/recipe_' + i + '/title_desc.txt';

        let titleDesc = getTileDesc(titleDescPath);
        let title = (await titleDesc).title;
        let description = (await titleDesc).desc;

        let [recipeIngredientsList, ingredientsFullNameList] = await getRecipeIngredientsList('recipes/recipe_' + i + '/ingredients.json')
        let instructionsToPush = await getInstructionsList('recipes/recipe_' + i + '/instructions.txt', recipeIngredientsList)

        recipesList.push(new recipe('recipe_' + i, title, description, recipeIngredientsList, ingredientsFullNameList));

        let linesToAdd = [];

        linesToAdd.push('<div class="container d-col d-wrap float" id="recipe_' + i + '">');
        linesToAdd.push('<div class="accordion">');
        linesToAdd.push('<div class="container d-row d-nowrap">');
        linesToAdd.push('<img class="floatingImg" src="' + imgPath + '" alt="..."/>');
        linesToAdd.push('<div class="container d-col d-wrap" style="position: relative; width: 100%;">');
        linesToAdd.push('<div class="down_arrow">&#8659;</div>');
        linesToAdd.push('<div class="up_arrow">&#8657;</div>');
        linesToAdd.push('<h3 style="align-self: unset; margin-top: 15px;"> ' + title + ' </h3>');
        linesToAdd.push('<p class="recipe_description">');
        linesToAdd.push(description);
        linesToAdd.push('</p> </div> </div> </div>');

        linesToAdd.push('<div class="ingredients_instructions">');
        linesToAdd.push('<b class="ingredients_title"> Things you will need: </b>');
        linesToAdd.push('<ul class="ingredients_in_instructions">');
        // add ingredients for a recipes
        for (let j = 0; j < ingredientsFullNameList.length; j++) {
            linesToAdd.push('<li>' + ingredientsFullNameList[j] + '</li>');
        }
        linesToAdd.push('</ul>');

        linesToAdd.push('<b class="instructions_title"> Instructions: </b>');
        linesToAdd.push('<ol class="instructions">');
        // add instructions for a recipes
        for (let j = 0; j < instructionsToPush.length; j++) {
            linesToAdd.push(instructionsToPush[j]);
        }
        linesToAdd.push('</ol>');
        linesToAdd.push('</div> </div>');

        addHTMLLinesToCodeScreen(document.getElementById("recipe_list"), linesToAdd);
    }

    build_accordion_listeners();

    function1(); // generateHTML_Ingredients
}