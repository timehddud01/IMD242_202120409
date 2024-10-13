float noiseSeed;
float noiseMult;
int tileNum ;

void setup() {
  size(800, 800);
}
void draw() {
  noiseSeed(0);
  background(255);
  tileNum = int(map(mouseX, 0, width, 3, 16+1)); // 3~16 개의 타일 설정
  noiseMult = pow(10, map(mouseY, 0, height, -2, -4)); //지수적으로 감소하는 값
  float tileSize = float(width) / float(tileNum);

  float circleSize = float(mouseY) / float(tileNum); //마우스 Y값에 따라 크기 달라기게 하기
  float circleColorX = int(map(mouseX, 0, 800, 0, 255)); // 마우스 X값에 따른 색 변화 0~800의 범위를 0~255로 변환
  float circleColorY = int(map(mouseY, 0, 800, 0, 255)); // 마우스 Y값에 따른 색 변화

  for (int row = 0; row < tileNum; row++) {
    for (int col = 0; col < tileNum; col++) {
      float rectX = tileSize * col;
      float rectY = tileSize * row;
      float centerX = tileSize * .5 + rectX;
      float centerY = tileSize * .5 + rectY;
      noStroke();

      fill(circleColorX, circleColorY, 100); //색 변화 적용
      
      circle( centerX, centerY, circleSize);
      float noiseVal = noise(centerX * noiseMult, centerY*noiseMult);
      pushMatrix();
      translate(centerX, centerY);
      rotate(radians(360*noiseVal));
      stroke(4, 135, 8);
      strokeWeight(3);
      line(0, 0, 0, tileSize*.48); // 직선 그리기
      fill(4, 135, 8);
      triangle(-(tileSize*.05), tileSize*.4, 0, tileSize*.48, tileSize*.05, tileSize*.4); //화살표 그리기
      popMatrix();
    }
  }
}
