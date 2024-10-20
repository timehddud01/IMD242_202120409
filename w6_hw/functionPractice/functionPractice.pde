int block_n;
float padding = width * .2;
float box_w, box_h;
int randomSeed;
int buildAmt;

void setup() {
  size(800, 800);
  box_w = width * .2;
  box_h = height * .2;
}

void mousePressed () {
  randomSeed = int(random(100000));
}

void draw() {

  background(91, 180, 80);
  randomSeed(randomSeed);
  int[] build = {2, 2, 2, 2, 2, 2, 2, 2, 2, 2}; //2로 채워진 배열을 만들어주고
  for (int i = 0; i< 4; i++) {  // 5개 미만으로 랜덤하게 1로 바꿔준다.
    build[int(random(0, 10))] = 1;
  }

  int build_read = 0; // 반복문 전체 횟수를 선택한다.
  for (int x = 0; x < 3; x++) { //가로 3칸, 세로 3칸을 만들어 칸 안에서 집을 생성한다.
    for ( int y = 0; y < 3; y++) {
      float Margin_X = width * .2;
      float Margin_Y = width * .2;
      float std_x = box_w * x + Margin_X;
      float std_y = box_h * y  + Margin_Y;
      if (build[build_read] == 2) {  //배열을 읽고 2일 경우에 집을 생성하는 Draw_house를 호출한다.
        pushMatrix(); //한 가운데 그릴 수 있도록 push/pop을 활용한다.
        translate(std_x, std_y);
        draw_house();
        popMatrix();
      }
      build_read +=1; //한번 for문이 진행되면 카운트 해준다.
    }
  }
}

void draw_house() {
  int size_x = int(box_w)-int(random(50, 80)); //집의 넓이를 조절할 x값
  int size_y = int(box_h)-int(random(30, 60)); //집의 높이를 조절할 y값
  strokeWeight(5);

  rectMode(CENTER);
  noStroke();
  fill(random(200, 230), random(200, 224), random(180, 211));
  rect(box_w*.5, box_h*.5, size_x, size_y); //집 그리기
  fill(random(100, 140), random(60, 80), 53); //색을 랜덤으로 바꿔준다.
  rect(box_w*.6-int(random(size_x-90, size_x-50)), box_h*.5 + (size_y)*.5 - 25, 20, 50 ); //문 그리기
  fill(92, random(80, 120), random(80, 120)); //색을 랜덤으로 바꿔준다.
  rect(box_w*.5, box_h*.5 - (size_y)*.5, size_x+10, random(10, 20) );//지붕 그리기
  int window_num = int(random(1, 3)); //색을 랜덤으로 바꿔준다.
  for (int i  = 0; i<= window_num; i++) { //창문은 1개에서 3개 사이로 그린다.
    fill(231, 245, 76);
    rect( box_w*.35 + (size_x)*.25 *i, box_h*.5 - (size_y)*.2, size_x*.18, (size_y)*.2 ); //집의 넓이와 높이에 따라 창문의 크기와 간격을 다르게 한다.
  }
}
