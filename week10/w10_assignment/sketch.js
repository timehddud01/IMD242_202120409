const colours = ['#257180', '#F2E5BF', '#FD8B51', '#CB6040']; //{} 대신 []를 사용

const gravity = [0, 0.1];
let friction = 0.99;
let cnt = 0;
const mouse = [0, 0];

let confetties = []; //배열은 이미 동적배열이다.

function setup() {
  createCanvas(800, 800);
  confetties = []; //배열 초기화
}

function gen(x, y, n) {
  for (let idx = 0; idx < n; idx++) {
    const randomW = random(4, 20);
    const randomH = random(4, 20);
    const randomForce = random(1, 10);
    const randomAngForce = random(-30, 30);
    let newConfetti = new Confetti(
      x,
      y,
      randomW,
      randomH,
      colours[int(random(colours.length))],
      randomForce,
      randomAngForce
    );
    confetties.push(newConfetti);
  }
}
//---------------------------------------
function mousePressed() {
  cnt = 0;
  mouse[0] = mouseX;
  mouse[1] = mouseY;
}

function mouseReleased() {
  console.log('gen: ' + cnt);
  gen(mouse[0], mouse[1], cnt);
}

function keyPressed() {
  if (key == 'p' || key == 'P') {
    //대문자 P와 소문자 p구분
    console.log('confetties: ' + confetties.length);
  }
}

function draw() {
  if (mouseIsPressed) {
    //p5.js에서 mousePressed는 boolean 타입이 아니다. mouseIsPressed가 되어야 한다!
    cnt++;
  }
  background(255);
  for (let idx = confetties.length - 1; idx >= 0; idx--) {
    let aConfetti = confetties[idx];
    aConfetti.update(gravity, friction);
    if (aConfetti.isOutOfScreen()) {
      confetties.splice(idx, 1); //배열에서 요소를 제거할 때는 splice를 사용한다. 제거할 위치와 개수를 적어준다.p5.js에서 remove는 html요소를 모두 제거하는 함수다.
    }
  }
  for (let idx = 0; idx < confetties.length; idx++) {
    confetties[idx].display();
  }
}

class Confetti {
  constructor(x, y, w, h, colour, force, angForce) {
    this.pos = [0, 0]; //p5.js에서는 타입을 정의하지 않는다.2개의 값이 들어갈 것이라는 크기만 정해준다.
    this.vel = [0, 0];
    this.size = [0, 0];
    this.init(x, y, w, h, colour, force, angForce); //함수 init호출 시 this.를 꼭 붙여준다.
  }
  //보류--
  init(x, y, w, h, colour, force, angForce) {
    this.pos[0] = x;
    this.pos[1] = y;
    this.size[0] = w;
    this.size[1] = h;
    this.colour = colour;

    const randomDir = radians(random(360));
    this.vel[0] = force * cos(randomDir);
    this.vel[1] = force * sin(randomDir);

    this.ang = radians(random(360));
    this.angVel = radians(angForce);
  }

  update(force, friction) {
    for (let idx = 0; idx < 2; idx++) {
      this.vel[idx] += force[idx];
      this.pos[idx] += this.vel[idx];
      this.vel[idx] *= friction;
    }
    this.ang += this.angVel;
    this.angVel *= friction;
  }

  display() {
    push();
    rectMode(CENTER);
    translate(this.pos[0], this.pos[1]);
    rotate(this.ang);
    noStroke();
    fill(this.colour);
    rect(0, 0, this.size[0], this.size[1]);
    pop();
  }

  getDiagonal() {
    const sumSquare =
      Math.pow(this.size[0] * 0.5, 2) + Math.pow(this.size[1] * 0.5, 2);
    return Math.sqrt(sumSquare);
  }
  //제곱을 계산하는 pow는 p5.js에서 Math라는 내장객체를 통해 실행된다! 따라서 앞에 Math를 붙여줘야 한다.

  isOutOfScreen() {
    return (
      this.pos[0] < -this.getDiagonal() ||
      this.pos[0] > width + this.getDiagonal() ||
      this.pos[1] < -this.getDiagonal() ||
      this.pos[1] > height + this.getDiagonal()
    );
  }
}
