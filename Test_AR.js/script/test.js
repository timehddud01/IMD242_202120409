let rot = 0;
let rotSpeed = 0.1;

function setup() {
  // 일반 캔버스를 생성
  createCanvas(400, 400, WEBGL); // WebGL을 사용해야 3D 객체가 렌더링됨
}

function draw() {
  background(0, 0, 0, 0); // 배경을 투명하게 설정

  // 회전 박스(녹색)
  push();
  rotateY(rot);
  fill(100, 240, 100);
  box(50);
  pop();

  // 왼쪽의 빨간 박스
  push();
  translate(-80, 0, 0);
  fill(240, 100, 100);
  box(50);
  pop();

  // 오른쪽의 파란 박스
  push();
  translate(80, 0, 0);
  fill(100, 100, 240);
  box(50);
  pop();

  // 회전 속도 업데이트
  rot += rotSpeed;
}
