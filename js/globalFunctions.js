function addHTMLLinesToCodeScreen(element, linesToAdd) {
    let str = '';
    for (let i = 0; i < linesToAdd.length; i++) {
        str += linesToAdd[i];
    }
    element.innerHTML += str;
}