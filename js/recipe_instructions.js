function build_accordion_listeners() {
    let fullFontSize = window.getComputedStyle(document.getElementsByClassName("up_arrow")[0]).fontSize;
    let zeroFontSize = window.getComputedStyle(document.getElementsByClassName("down_arrow")[0]).fontSize;

    const acc = document.getElementsByClassName("accordion");
    let i;

    console.log(acc.length);
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("accordion_active");
            const panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.marginTop = "0px";
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.marginTop = "10px";
            }

            //toggle up and down arrow
            let upArrow = this.getElementsByClassName("up_arrow")[0];
            let downArrow = this.getElementsByClassName("down_arrow")[0];

            let upArrowFontSize = window.getComputedStyle(upArrow).fontSize;

            if (upArrowFontSize === "0px") {
                upArrow.style.fontSize = fullFontSize;
                downArrow.style.fontSize = zeroFontSize;
            } else {
                upArrow.style.fontSize = zeroFontSize;
                downArrow.style.fontSize = fullFontSize;
            }
        });
    }

}