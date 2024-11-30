let tileNumX = 16;
let tileNumY = 12;

function setup() {
  //void 대신fuction사용
  createCanvas(640, 480); //size대신 createCanvas 사용
}

function draw() {
  background('#333333');
  noStroke();
  fill('cornflowerblue');
  // for (let column = 0; column < width; column += 40) {
  //   for (let row = 0; row < height; row += 40) {
  //     let x = 20 + column;
  //     let y = 20 + row;
  //     let diameter = 30;
  //     circle(x, y, diameter);
  //   }
  //
  // }
  for (let row = 0; row < tileNumY; row++) {
    for (let column = 0; column < tileNumX; column++) {
      let tileW = width / tileNumX;
      let tileH = height / tileNumY;
      let x = tileW * 0.5 + column * tileW;
      let y = tileH * 0.5 + row * tileH;
      ellipse(x, y, tileW, tileH);
    }
  }
}

//타입의 구분이 없다.글자나 숫자 정도만 구분하고, 정수냐 자연수냐는 고려하지 않음

//자바스크립트에는 int, float구분하지 않는다. 무조건 let 또는 var을 사용한다. 요즘에는 let을 사용하는 추세 같은 변수를 한번에 바꾸려면 선택하고 fn+f2로 검색한 후 바꾸고 싶은 변수 엔터
//아니면 ctrl shift L
