let capture;

function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  console.log(capture);
  capture.size(10, 10);
  capture.hide();
}

function draw() {
  background(220);
  image(capture, 0, 0, width, height);
}
