let rot = 0;
let rotSpeed = 0.1;

function setup() {
  // p5.js 캔버스 생성
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0, 0, 0, 0); // 검정색 배경

  // 회전하는 녹색 박스
  push();
  rotateY(rot);
  fill(100, 240, 100);
  box(50);
  pop();

  // 왼쪽에 빨간 박스
  push();
  translate(-80, 0, 0);
  fill(240, 100, 100);
  box(50);
  pop();

  // 오른쪽에 파란 박스
  push();
  translate(80, 0, 0);
  fill(100, 100, 240);
  box(50);
  pop();

  // 회전 속도 업데이트
  rot += rotSpeed;
}
