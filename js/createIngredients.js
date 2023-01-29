function generateCheckBox(text, element) {
    let arr = text.split(/\r?\n/);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") { continue; }

        let fullName = arr[i];
        let idName = fullName.replace(/ /g,'')

        addHTMLLinesToCodeScreen(element,
            ['<label class="checkbox" id="checkbox_btn_' + idName + '"> <input type="checkbox" id="checkbox_name_' + idName + '" checked> ' + fullName + ' </label>']);
    }
}

function generateHTML_Ingredients() {
    let spiceTxtFile = './information/ingredient/spices.txt'
    let vegTxtFile = './information/ingredient/vegetables.txt'

    let spiceCheckBoxContainerID = document.getElementById("spices_checkBoxes");
    let vegCheckBoxContainerID = document.getElementById("vegetables_checkBoxes");

    fetch(spiceTxtFile)
        .then(response => response.text())
        .then(text => generateCheckBox(text, spiceCheckBoxContainerID))

    fetch(vegTxtFile)
        .then(response => response.text())
        .then(text => generateCheckBox(text, vegCheckBoxContainerID))
}