//202120409_김동영

float feeler = 5; // 실수 형태로 변수 선언 //더듬이

void setup() {
  size(640, 480);
  //fullScreen();
}

void draw() { //실행 
  background(255);
  
  if (mouseY>=0 && mouseY <=100 // mouseY값이 특정 위치에 있을 경우, 더듬이의 값을 변경한다.
    ) {
    feeler = mouseY;
  }
  
  face_draw(); //얼굴을 그리는 함수
  eyeball_draw(); //눈알을 그리는 함수
  
}

void eyeball_draw() { //눈알을 그리는 함수
  noStroke();
  fill(255);
  if ( mouseY>=160&& mouseY<=245 && mouseX >=300 && mouseX <= 340) {
    circle(mouseX-80, mouseY, 10);
    circle(mouseX+80, mouseY, 10);
  }
}

void face_draw() { //얼굴을 그리는 함수
  noStroke();
  fill(60, 200, 60);

  quad(250, 150, 390, 150, 410, 250, 230, 250); // 중안부의 사각형

  noStroke();
  arc(width/2, 254, 300, 237, PI+radians(60), TWO_PI-radians(60), CHORD); //정수리
  
  //이마의 호 PI = 180도, TWO_PI = 2*PI
  //각도를 라디안값으로 바꾸기 위해 radians(각도)를 사용함
  
  quad(345, 250, 410, 250, 400, 320, 345, 300);
  quad(230, 250, 295, 250, 295, 300, 240, 320 );
  rect(295, 250, 50, 50);
  
  //입1
  fill(80, 200, 40);
  rect(295, 300, 50, 62);
 
  //턱
  stroke(76, 181, 43);
  strokeWeight(2);
  arc(300, 300, 125, 130, PI/2, PI-radians(20), PIE); 
  arc(340, 300, 125, 130, 0+radians(20), PI/2, PIE);

  stroke(120, 210, 40);
  noFill();
  strokeWeight(5);
  arc(width/2, 270, 300, 200, PI+radians(60), TWO_PI-radians(60), OPEN); //이마 선

  //얼굴의 선
  line(270, 190, 280, 220); //대각선1
  line(370, 190, 360, 220); //대각선2
  line(280, 220, 360, 220); // 가로선

  line(285, 220, 295, 250); //두번째 대각선1
  line(355, 220, 345, 250); //두번째 대각선2
  line(295, 250, 345, 250); //가로선2

  line(300, 300, 340, 300); //얼굴과 입 구분 선

  line(295, 250, 300, 300); //얼굴 무늬
  line(345, 250, 340, 300); 
  line(397, 320, 340, 300);
  line(300, 300, 242, 320);

  strokeWeight(2);
  line(245, 240, 265, 310); // 볼쪽 line1
  line(395, 240, 375, 310); //볼쪽 line2

  //입2
  stroke(76, 181, 43);
  strokeWeight(2);
  line(300, 340, 340, 340);
  line(320, 340, 320, 360);

  //눈 
  noStroke();
  fill(84, mouseY-100, 7); //eye Color 마우스의 Y 값에따라 색상이 변하도록 함
  //Left eye
  beginShape(); //bazierVertex를 사용하기 위해 beginShape()로 시작
  vertex(260, 150); // 시작점
  bezierVertex(220, 140, 200, 250, 240, 250); // 첫번째 기준점의 x,y좌표, 두번재 기준점의 x,y좌표와 끝점
  bezierVertex(260, 250, 270, 160, 260, 150);
  //두번째 곡선의 시작점은 첫번째 곡선의 끝점이고, 그 끝은 첫번째 곡선의 시작과 연결되어야 함
  endShape(); //endShape로 bazier부분을 종료

  //Right eye
  beginShape(); //왼쪽눈과 대칭
  vertex(380, 150); // 시작점
  bezierVertex(420, 140, 440, 250, 400, 250);
  bezierVertex(380, 250, 370, 160, 380, 150);
  endShape();


  //왼쪽 더듬이
  beginShape();
  noFill();
  stroke(171, 82, 9);
  strokeWeight(7);
  vertex(355, 190);
  bezierVertex(355, 110, 440, 5, 470, feeler); // 마우스의 위치에따라 더듬이 끝의 위치가 변하도록 설정
  endShape();

  //오른쪽 더듬이
  beginShape();
  noFill();
  stroke(171, 82, 9);
  strokeWeight(7);
  vertex(285, 190);
  bezierVertex(285, 110, 200, 5, 170, feeler );
  endShape();
}
