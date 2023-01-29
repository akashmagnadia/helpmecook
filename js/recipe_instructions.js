let fullFontSize = window.getComputedStyle(document.getElementsByClassName("up_arrow")[0]).fontSize;
let zeroFontSize = window.getComputedStyle(document.getElementsByClassName("down_arrow")[0]).fontSize;

const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("accordion_active");
        const panel = this.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

        //toggle up and down arrow
        let upArrow = this.getElementsByClassName("up_arrow")[0];
        let downArrow = document.getElementsByClassName("down_arrow")[0];

        let upArrowFontSize = window.getComputedStyle(upArrow).fontSize;
        let downArrowFontSize = window.getComputedStyle(downArrow).fontSize;

        if (upArrowFontSize === "0px") {
            upArrow.style.fontSize = fullFontSize;
        } else {
            upArrow.style.fontSize = zeroFontSize;
        }

        if (downArrowFontSize === "0px") {
            downArrow.style.fontSize = fullFontSize;
        } else {
            downArrow.style.fontSize = zeroFontSize;
        }

    });


}
