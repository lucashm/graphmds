import createCanvas from './createCanvas.js';

export default function creating() {
  let element = document.getElementById("maindiv");
  let newCanvas = createCanvas();
  element.appendChild(newCanvas);
}
