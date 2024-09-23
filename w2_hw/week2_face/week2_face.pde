void setup() {
  size(400, 400);
}

void draw() {
  background(255);
  
  // 막대기의 시작점(축)을 화면 중앙으로 설정
  float centerX = width / 2;
  float centerY = height / 2;
  
  // 마우스와 중앙점 사이의 각도 계산
  float angle = atan2(mouseY - centerY, mouseX - centerX);
  
  // 막대기의 길이
  float stickLength = 150;
  
  // 화면 중앙에 축을 기준으로 막대기 그리기
  pushMatrix();
  translate(centerX, centerY);  // 기준점을 화면 중앙으로 이동
  rotate(angle);  // 계산한 각도만큼 회전
  stroke(0);
  strokeWeight(5);
  line(0, 0, stickLength, 0);  // 막대기 그리기
  popMatrix();
}
