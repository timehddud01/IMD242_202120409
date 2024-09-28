void setup() {
  size(640, 480);
  rectMode(CENTER);
}

void draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  line(0, 120, width, height / 4); // 4칸을 구분하는 3개의 선
  line(0, 240, width, height / 2);
  line(0, 360, width, height / 4 *3);

  fill(66, 135, 245);
  stroke(14, 71, 161);
  strokeWeight(5);

  if (mouseY < height / 4) {
    line(280, 20, 360, 100);
  } else if (mouseY <  height / 2) {  // (mouseY >=120 && mouseY < 240)
    square(320, 180, 80);
  } else if ( mouseY < height / 4 *3) { // (mouseY >=240 && mouseY < 360)
    rect(320, 300, 160, 80);
  } else {                    // (mouseY>=360)
    circle(320, 420, 80);
  }
}
