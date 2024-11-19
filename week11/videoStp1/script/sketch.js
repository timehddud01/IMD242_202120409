//p5.js의 createCapture 예제 참고함
let cp;
let canvasW, canvasH;
let scale;
let cpW, cpH;

function setup() {
  canvasW = 640;
  canvasH = 480;
  createCanvas(canvasW, canvasH);
  scale = 0.1;
  cpW = canvasW * scale;
  cpH = canvasH * scale;
  cp = createCapture(VIDEO);
  cp.size(cpW, cpH);
  cp.hide();
  // canvas를 숨김처리
}
function draw() {
  background(0);
  // image(cp, 0, 0, width, height); //이미지의 크기(카메라를 늘려서 한 칸당 10px를 차지하게 한다.)
  //cp.get(10, 10); //이미지 안에 들어있는 한 칸의 rgba 값 을 array형태로 돌려준다
  // console.log(cp.get(10, 10));

  for (let y = 0; y < cpH; y++) {
    for (let x = 0; x < cpW; x++) {
      let colour = cp.get(x, y); //colour에는 RGBA 네가지 값이 들어있다.color내장변수가 있는 경우가 있기 떄문에 colour로 써준다.
      noStroke();
      let b = brightness(colour);
      let diameter = map(b, 0, 255, 0, 40);
      fill(255);
      circle(x * 10 + 5, y * 10 + 5, diameter);
      // fill(colour[0], colour[1], colour[2]);
      // circle(x * 10 + 5, y * 10 + 5, 10);
    }
  }
}

//밝기 구하는 방법 (R+G+B)/3..굳이 안써도 됨
//번호로 위치 알아내는 법 너비를 알고있다는 가정 하에
//ex) 6번은 x,y 가 몇인가?
//x = 6 % 너비
//y = 6 / 너비

//반대로 (x,y)은 몇번인가?
// y * 너비 + x 번임
