//222222222222
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
  //get이 아닌 loadpixels 사용
  background(255, 0, 0);
  cp.loadPixels();
  // for (let idx = 0; idx < cp.pixels.length; idx++) {
  for (let idx = 0; idx < cp.pixels.length / 4; idx++) {
    //근데 왜 4로 나누는지...?
    //4배가 되기 떄문
    //2차원 배열을 1차원 배열로, 즉 1열로 쭉 정해준다.
    // let colour = cp.pixels[idx];
    let r = cp.pixels[4 * idx];
    let g = cp.pixels[4 * idx + 1];
    let b = cp.pixels[4 * idx + 2];
    let a = cp.pixels[4 * idx + 3];
    let br = brightness([r, g, b]); //array형태로 값을 받는다.
    let dia = map(br, 0, 255, 0, 20);
    let x = idx % cpW;
    let y = floor(idx / cpW); //floor는 내림처리 함수 -- 정수화하기 위해 사용해준다.
    fill(255);
    circle(x * 10 + 5, y * 10 + 5, dia);
  }
}
//processing에서는 pixel[]한 칸에 [R,G,B,A]가 들어가지만 P5.JS는
//Pixel[n+0] = R
//Pixel[n+1] = G
//Pixel[n+2] = B
//Pixel[n+3] = A 로 따로 저장된다.. 서버로 전송하는 거랑 컴퓨터 내에서 돌리는 것과 차이인듯
//즉 4배가 된다!

//번호로 위치 알아내는 법 너비를 알고있다는 가정 하에
//ex) 6번은 x,y 가 몇인가?
//x = 6 % 너비
//y = 6 / 너비

//반대로 (x,y)은 몇번인가?
// y * 너비 + x 번임
