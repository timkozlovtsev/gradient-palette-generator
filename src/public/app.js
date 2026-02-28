const defaultX = 3;
const defaultY = 2;

const inputX = document.getElementById("input-palette-size-x");
const inputY = document.getElementById("input-palette-size-y");
const inputHue = document.getElementById("input-hue");
const inputSaturation = document.getElementById("input-saturation");
const inputValue = document.getElementById("input-value");

let paletteSizeX = 0;
let paletteSizeY = 0;

let selectedHue;

const palette = document.getElementById("palette");
let paletteElements = [];

function createPaletteElement() {
    let div = document.createElement("div");
    div.style.setProperty("--color-from", "#000000");
    div.style.setProperty("--color-to", "#ffffff");
    div.classList.add("bg-linear-to-t", "from-(--color-from)", "to-(--color-to)");
    return div;
}

function resizePalette() {
    palette.style.gridTemplateColumns = `repeat(${paletteSizeX}, minmax(0, 1fr))`;
    palette.style.gridTemplateRows = `repeat(${paletteSizeY}, minmax(0, 1fr))`;

    let newSize = paletteSizeX * paletteSizeY;
    while (paletteElements.length < newSize) {
        let div = createPaletteElement();
        palette.appendChild(div);
        paletteElements.push(div);
    }
    while (paletteElements.length < newSize) {
        document.remove(palette.lastElementChild);
        paletteElements.pop();
    }
}

function start() {
    inputX.value = defaultX;
    inputY.value = defaultY;
    paletteSizeX = defaultX;
    paletteSizeY = defaultY;
    resizePalette(defaultX, defaultY);
}

function setGradient(element, h, s, v) {
    // TODO
}

inputX.addEventListener("change", () => {
    if (inputX.value === "") {
        inputX.value = paletteSizeX;
    }
    paletteSizeX = inputX.value;
    resizePalette();
});
inputY.addEventListener("change", () => {
    if (inputY.value === "") {
        inputY.value = paletteSizeY;
    }
    paletteSizeY = inputY.value;
    resizePalette();
});

start();
