let capture;

function setup() {
  createCanvas(400, 400);
  capture = createCapture(VIDEO);
  console.log(capture);
  capture.size(10, 10); //모자이크 처리-- 비디오의 해상도를 낮추는 것임
  capture.hide(); //setup에서 숨겨주고, draw에서 image로 출력
}

function draw() {
  background(220);
  image(capture, 0, 0, width, height);
}
