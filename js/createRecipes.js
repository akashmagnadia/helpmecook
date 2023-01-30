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

async function getIngredientsList(path) {
    let json_ingr = await getJson(path);
    let ingredientsList = [];
    let ingredientsFullNameList = [];

    for (let i = 0; i < json_ingr.length; i++) {
        ingredientsList.push(json_ingr[i].item)
        ingredientsFullNameList.push(json_ingr[i].quantity + " " + json_ingr[i].item)
    }

    return [ingredientsList, ingredientsFullNameList];
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
                console.log(str);
            }
            linesToAdd.push('<li>' + str + '</li>');
        }
    }

    return linesToAdd;
}

async function generateHTML_SpicesCard() {
    let json_recipes = await getJson('information/recipe/meta_data.json');

    for (let i = 1; i < json_recipes.recipes + 1; i++) {
        let imgPath = 'information/recipe/recipe_' + i + '/dish_img.jpg';
        let titleDescPath = 'information/recipe/recipe_' + i + '/title_desc.txt';

        let titleDesc = getTileDesc(titleDescPath);
        let title = (await titleDesc).title;
        let description = (await titleDesc).desc;

        let linesToAdd = [];

        linesToAdd.push('<div class="container d-col d-wrap float" id="recipe_' + title.replace(/ /g,'') + '">');
        linesToAdd.push('<div class="accordion">');
        linesToAdd.push('<div class="container d-row d-nowrap">');
        linesToAdd.push('<img class="floatingImg" src="' + imgPath + '" alt="..."/>');
        linesToAdd.push('<div class="container d-col d-wrap" style="position: relative; width: 100%;">');
        linesToAdd.push('<div class="down_arrow">&#8659;</div>');
        linesToAdd.push('<div class="up_arrow">&#8657;</div>');
        linesToAdd.push('<h3 style="align-self: unset; margin-top: 15px;"> ' + title + ' </h3>');
        linesToAdd.push('<p style="margin: 5px;">');
        linesToAdd.push(description);
        linesToAdd.push('</p> </div> </div> </div>');

        linesToAdd.push('<div class="ingredients_instructions">');
        linesToAdd.push('<b class="ingredients_title"> Things you will need: </b>');
        linesToAdd.push('<ul class="ingredients_in_instructions">');
        // add ingredients for a recipe
        let [ingredientsList, ingredientsFullNameList] = await getIngredientsList('information/recipe/recipe_' + i + '/ingredients.json')
        for (let j = 0; j < ingredientsFullNameList.length; j++) {
            linesToAdd.push('<li>' + ingredientsFullNameList[j] + '</li>');
        }
        linesToAdd.push('</ul>');

        linesToAdd.push('<b class="instructions_title"> Instructions: </b>');
        linesToAdd.push('<ol class="instructions">');
        // add instructions for a recipe
        let instructionsToPush = await getInstructionsList('information/recipe/recipe_' + i + '/instructions.txt', ingredientsList)
        for (let j = 0; j < instructionsToPush.length; j++) {
            linesToAdd.push(instructionsToPush[j]);
        }
        linesToAdd.push('</ol>');
        linesToAdd.push('</div> </div>');

        addHTMLLinesToCodeScreen(document.getElementById("recipe_list"), linesToAdd);
    }

    build_accordion_listeners()
}