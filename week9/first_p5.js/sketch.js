function setup() {
  //void 대신fuction사용
  createCanvas(640, 480); //size대신 createCanvas 사용
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}
