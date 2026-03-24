// ---------------- SELECTORS ----------------

const container = document.querySelector(".container");
const refreshButton = document.querySelector(".refresh");
const formatSelect = document.getElementById("format");

const six = document.getElementById("6-colores");
const eight = document.getElementById("8-colores");
const nine = document.getElementById("9-colores");

let boxes;
const maxColorBoxes = 9;

// ⭐ SOURCE OF TRUTH
let colors = [];


// ---------------- GENERATE COLORS ----------------

const generateColor = () => {
    colors = []; // reset array

    for (let i = 0; i < maxColorBoxes; i++) {
        let randomHexColor = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHexColor = `#${randomHexColor.padStart(6, "0")}`;

        colors.push(randomHexColor); // save color
    }

    renderColors(); // display them
};


// ---------------- RENDER COLORS ----------------

function renderColors() {
    container.innerHTML = "";

    for (let i = 0; i < colors.length; i++) {

        let hex = colors[i];
        let displayColor = hexToRGB (hex);

        // convert format
        if (formatSelect.value === "HSL") {
            displayColor = hexToHSL(hex);
        }
        let tittle = "Código RGB"
        if (formatSelect.value === "HSL"){
            tittle = "Código HSL"
        }

        const colorBox = document.createElement("article");
        colorBox.classList.add("box");

        colorBox.innerHTML = `
            <div class="color-box" style="background: ${hex}"></div>
            <h3 class= "color-text">${tittle}</h3>
            <p class="color-code">${displayColor}</p>
        `;

        container.appendChild(colorBox);
    }

    boxes = document.querySelectorAll(".box");
}


// ---------------- SHOW / HIDE BOXES ----------------

function showBox(number) {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.display = i < number ? "" : "none";
    }
}


// ---------------- GET SELECTED RADIO ----------------

function getSelectedNumber() {
    if (six.checked) return 6;
    if (eight.checked) return 8;
    if (nine.checked) return 9;
}


// ---------------- HEX → HSL ----------------
function hexToRGB (hex) {
    
   hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `RGB(${r}, ${g}, ${b})`;

}

function hexToHSL(hex) {



    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l;
    l = (max + min) / 2;

    if (max === min) {
        h = 0;
        s = 0;
    } else {
        let d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h = h / 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}


// ---------------- EVENTS ----------------

// generate NEW colors
refreshButton.addEventListener("click", () => {
    generateColor();
    showBox(getSelectedNumber());
});

// change format (same colors!)
formatSelect.addEventListener("change", () => {
    renderColors();
    showBox(getSelectedNumber());
});

// radio buttons
six.addEventListener("change", () => showBox(6));
eight.addEventListener("change", () => showBox(8));
nine.addEventListener("change", () => showBox(9));


const hero = document.querySelector(".hero");

for (let i = 0; i < 10; i++) {
  const wave = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  wave.setAttribute("viewBox", "0 0 120 40");
  wave.classList.add("wave");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0 20 Q 15 5, 30 20 T 60 20 T 90 20 T 120 20");

  wave.appendChild(path);

  wave.style.top = Math.random() * 100 + "%";
  wave.style.left = Math.random() * 100 + "%";
  wave.style.transform = `scale(${Math.random()})`;

  hero.appendChild(wave);
}

// ---------------- INIT ----------------

generateColor();
showBox(getSelectedNumber());