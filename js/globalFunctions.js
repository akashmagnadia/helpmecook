function addHTMLLinesToCodeScreen(element, linesToAdd) {
    for (let i = 0; i < linesToAdd.length; i++) {
        element.innerHTML += linesToAdd[i];
    }
}