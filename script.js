const container = document.querySelector(".container");
const refreshButton = document.querySelector(".refresh");

const six = document.getElementById("6-colores");
const eight = document.getElementById("8-colores");
const nine = document.getElementById("9-colores");

let boxes;
const maxColorBoxes = 9;

const generateColor = () => {
    container.innerHTML = "";

    for (let i = 0; i < maxColorBoxes; i++) {
        let randomHexColor = Math.floor(Math.random()*0xffffff).toString(16);
        randomHexColor = `#${randomHexColor.padStart(6, "0")}`;

        const colorBox = document.createElement("article");
        colorBox.classList.add("box");
        colorBox.innerHTML = `
            <div class="color-box" style="background: ${randomHexColor}"></div>
            <span class="color-code">${randomHexColor}</span>
        `;
        container.appendChild(colorBox);
    }

    boxes = document.querySelectorAll(".box");
};

function showBox(number) {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.display = i < number ? "" : "none";
    }
}

// Events
refreshButton.addEventListener("click", () => {
    generateColor();
    showBox(getSelectedNumber());
});

six.addEventListener("change", () => showBox(6));
eight.addEventListener("change", () => showBox(8));
nine.addEventListener("change", () => showBox(9));

function getSelectedNumber() {
    if (six.checked) return 6;
    if (eight.checked) return 8;
    if (nine.checked) return 9;
}

// Init
generateColor();
showBox(6);