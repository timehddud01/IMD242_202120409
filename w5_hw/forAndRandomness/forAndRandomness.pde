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
  noiseMult = pow(10, map(mouseY, 0, height, -2, -5)); //지수적으로 감소하는 값
  float tileSize = float(width) / float(tileNum);
  float circleSize = float(mouseY) / float(tileNum);
  float circleColor = int(map(mouseY,0,255,200,255)); // 새로 바꿔 본 것
  
  for (int row = 0; row < tileNum; row++) {
    for (int col = 0; col < tileNum; col++) {
      float rectX = tileSize * col;
      float rectY = tileSize * row;
      float centerX = tileSize * .5 + rectX;
      float centerY = tileSize * .5 + rectY;
      noStroke();

      fill(circleColor, 71, 95);
      circle( centerX, centerY, circleSize);
      float noiseVal = noise(centerX * noiseMult, centerY*noiseMult);
      pushMatrix();
      translate(centerX, centerY);
      rotate(radians(360*noiseVal));
      stroke(4, 135, 8);
      strokeWeight(3);
      line(0, 0, tileSize*.5, 0);
      fill(4, 135, 8);
      circle(tileSize*.5, 0, 15);
      popMatrix();
    }
  }
}
