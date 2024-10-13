int hour, min, sec; // 시, 분 , 초를 저장할 변수 선언

void setup() {
  size(800, 800);
}

void draw() {
  background(255);
  fill(239, 231, 218);
  strokeWeight(8);
  stroke(83, 113, 61);
  circle(width*.5, height*.5, 700);
 
  hour = hour(); //시, 분 , 초를 반환하는 함수의 값을 각각의 변수에 대입
  min = minute();
  sec = second();
  
  textSize(30);
  noStroke();
  fill(83, 113, 61);
  text(hour, 330,260 ); //변수를 사용하여 숫자표기도 하면 좋을 것 같아 넣어보았습니다.
  text(":",370,260  );  // 텍스트를 화면에 표기할 수 있는 text()함수 사용
  text(min, 385,260 );
  text(":",425,260  );
  text(sec, 440,260 );
  
  for (int x = 0; x < 60; x++) { // 숫자 바 표시 1칸당 6도씩, 60번 반복하며 한바퀴 회전 
    pushMatrix(); 
    translate(width * .5, height * .5);
    rotate(radians(6*x)); //화면 회전은 6을 곱하여 한번에 6도씩 회전할 수 있도록 한다. 
    if (x % 5 ==0) { // 회전 시 5의 배수가 되면(나머지 == 0) 굵은 선을 표기하게 한다.
      stroke(83, 113, 61);
      strokeWeight(5);
      line(0, -330, 0, -300);
    } else {
      stroke(0); //아닐 경우 얇은 선 표시
      strokeWeight(.5);
      line(0, -330, 0, -310);
    }

    popMatrix();
  }
  //분침
  pushMatrix();
  translate(width * .5, height * .5);
  rotate(radians(6*min)); //// 360도 나누기 60만큼 /  분침은 60칸이 있기 때문
  stroke(57, 82, 40);
  noFill();
  strokeWeight(4);
  quad(-10, -30, 0, -290, 10, -30, 0, 0); //quad로 분침 그리기
  popMatrix();
  //시침
  pushMatrix();
  translate(width * .5, height * .5);
  rotate(radians(30*hour)); // 360도 나누기 12 만큼 / 시침은 12칸이 있기 때문
  stroke(57, 82, 40);
  noFill();
  strokeWeight(4);
  quad(-15, -20, 0, -200, 15, -20, 0, 0); ////quad로 시침 그리기
  popMatrix();
  //초침
  pushMatrix();
  translate(width * .5, height * .5);
  rotate(radians(6*sec)); // 360도 나누기 60 만큼 /  초침은 60칸이 있기 때문
  stroke(255, 0, 0);
  strokeWeight(5);
  line(0, -300, 0, 30);
  popMatrix();
  noStroke();
  fill(255, 0, 0);
  circle(width * .5, height * .5, 20); //가운데 빨간 원도 그려준다.
}
