async function getRecipeCount(metaFilePath) {
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
        { desc += arr[i]; }
    }

    return { title, desc };
}

async function generateHTML_SpicesCard() {
    let json_recipes = await getRecipeCount('information/recipe/meta_data.json');

    for (let i = 1; i < json_recipes.recipes + 1; i++) {
        let imgPath = 'information/recipe/recipe_' + i + '/dish_img.jpg';
        let titleDescPath = 'information/recipe/recipe_' + i + '/title_desc.txt';

        let titleDesc = getTileDesc(titleDescPath);
        let title = (await titleDesc).title;
        let description = (await titleDesc).desc;

        let linesToAdd = [];
        linesToAdd.push('<div class="container d-col d-wrap float" id="recipe_' + title.replace(/ /g,'') + '">');
        linesToAdd.push('<div class="container d-row d-nowrap">');
        linesToAdd.push('<img class="floatingImg" src="' + imgPath + '" alt="..."/>');
        linesToAdd.push('<div class="container d-col d-wrap">');
        linesToAdd.push('<h3 style="align-self: unset; margin-top: 15px;"> ' + title + ' </h3>');
        linesToAdd.push('<p style="margin: 5px;">');
        linesToAdd.push(description);
        linesToAdd.push('</p> </div> </div> </div>');

        addHTMLLinesToCodeScreen(document.getElementById("recipe_list"), linesToAdd);
    }
}