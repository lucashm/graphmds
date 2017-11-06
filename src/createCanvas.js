export default function createCanvas(){
  let canvas = document.createElement('canvas');
  canvas.id     = "testingCanvas";
  canvas.width  = 1224;
  canvas.height = 768;
  canvas.style.zIndex   = 8;
  canvas.style.position = "absolute";
  canvas.style.border   = "1px solid";

  return canvas;
}
