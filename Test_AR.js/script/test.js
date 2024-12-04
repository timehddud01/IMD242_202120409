let rot = 0;
let rotSpeed = 0.1;

function setup() {
  // AR.js와 연동된 p5 캔버스를 생성
  createARCanvas();
}

function draw() {
  // 배경을 투명하게 유지하여 AR 카메라와 연동
  clear();

  // 회전 박스(녹색)
  push();
  rotateY(rot);
  fill(100, 240, 100);
  box(20);
  pop();

  // 왼쪽의 빨간 박스
  push();
  translate(-30, 0, 0);
  fill(240, 100, 100);
  box(20);
  pop();

  // 오른쪽의 파란 박스
  push();
  translate(30, 0, 0);
  fill(100, 100, 240);
  box(20);
  pop();

  // 회전 속도 업데이트
  rot += rotSpeed;
}

// function setup() {
//   createARCanvas();
// }

// let rot = 0;
// let rotSpeed = 0.1;

// function draw() {
//   rot += rotSpeed;
//   rotateY(rot);
//   fill(100, 240, 100);

//   box(20);

//   translate(-20, 0, 0);
//   fill(240, 100, 100);
//   box(20);

//   translate(40, 0, 0);
//   fill(100, 100, 240);
//   box(20);
// }
