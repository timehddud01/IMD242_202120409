//Processing홈페이지의 예제에서 < Distance 2D >의 코드를 참고하였습니다.
//https://processing.org/examples/distance2d.html

//Chat GPT 참고 : 질문내용 - 최대거리 밖으로 사각형이 생성되는 것을 막으려면 어떤 방법이 있는지 질문하였습니다.

ArrayList<Wave> waves; // Wave를 저장할 변수 waves 선언
float tileSize = 24; //한 칸의 크기를 24로 선언
int cnt = 0; // 마우스를 누른 시간을 저장할 변수 cnt
int start_x,start_y; //화면 크기가 변경될 경우 , 타일크기인 24로 나누어지지 않는 경우를 대비하여 남은 공간만큼 화면 내부 가장자리의 border가 될 수 있게 한다.

void setup() {
  fullScreen();

  start_x =int(( width%tileSize) *.5); //화면크기를 타일크기로 나누고, 그 나머지를 절반으로 하여 좌우가 같은 여백을 가지게 한다. 나머지연산 : %
  start_y =int(( height%tileSize) *.5); //시작위치는 정수가 되도록 타입을 변환해준다.

  waves = new ArrayList<Wave>(); //새로운 Wave를 waves에 저장
}

void mousePressed() {
  cnt = 0; //마우스를 눌렀을 때 count를 초기화한다.
}

void mouseReleased() {
  Wave aNewWave = new Wave(start_x,start_y,mouseX, mouseY, cnt); //새로운 생성자Wave에 ( )안의 값을 전달하고 , aNewWave에 저장
  //마우스를 뗐을 때, 마우스의 현재위치와 마우스를 눌렀던 시간을 전달한다
  waves.add(aNewWave); //aNewWave를 waves에 저장한다.
}

void draw() {
  background(116, 204, 244);

  if (mousePressed) {
    cnt+=10;  //마우스의 누른 시간만큼 cnt의 크기를 늘려준다.
  }

  for (int row = start_x; row <= width - tileSize; row += 24) {  // 시작지점에 맞추고, 타일 크기에 맞춰 화면을 채운다.
    for (int col = start_y; col <= height - tileSize; col += 24) {
      if ((mouseX<=row+24 && mouseX>row)&&(mouseY<=col+24&&mouseY>col)) {  //생성위치를 마우스를 통해 알려주기 위해 색이다른 사각형을 만들어준다.
        noStroke();
        fill(161,214,255);
        rectMode(CENTER); 
        rect(row+12, col+12, 24, 24);
      }
    }
  }

  for (int idx = waves.size() - 1; idx>=0; idx--) { //wave에 들어간 배열 개수만큼 실행한다. //이때, 시간이 지난 개체를 지울때 idx를 0부터 시작하면 앞 순서부터 비워지기 때문에 하나씩 당겨지게 된다.
    Wave aWave = waves.get(idx);                    //이때 발생하는 문제를 막기 위해 뒤에서부터 시작해준다.
    aWave.generate(start_x,start_y);                // 물결을 생성하는 함수를 호출한다. 이때 역시 사각형을 깔아야 하므로 매개변수로 시작위치를 전달한다.
    aWave.update();                                 // 시간과 각도를 더하기 위한 함수 호출
    if (aWave.timeout()) {                          //boolean 함수의 timeout이 참이 될때 배열을 하나씩 삭제한다.
      waves.remove(idx);
    }
  }
  
  fill(0,125,220);                                  
  textSize(30);
  text(waves.size(),40, 50); //화면 좌상단에 현재 ArrayList의 크기를 표시한다.
}


// 두 개의 탭으로 작업하여 하나의 파일로 합쳤습니다.--------------------------------------------------------------------------------------------------------------------------
//Processing의 예제에서 < Distance 2D >의 코드를 참고하였습니다.
//https://processing.org/examples/distance2d.html
//Chat GPT 참고 : 질문내용 - 최대거리 밖으로 사각형이 생성되는 것을 막으려면 어떤 방법이 있는지 질문하였습니다.

class Wave {
  float[] pos; //위치를 저장할 배열
  float size; // 각 타일에 생성될 사각형의 크기를 저장할 변수
  float max_distance; //원의 크기를 정해줄 변수를 설정해준다.
  float angle = 0; //코사인 함수의 각도저장 변수
  float distance; //기준점과의 거리를 저장할 변수
  float centerX, centerY;
  float edge; //사각형의 가장자리 곡률을 저장할 변수
  float NewDist; //

  Wave( int start_x, int start_y, float x, float y, int counted) {   //생성자 역할의 Wave...매개변수를 받아 초기화한다.
    for (int row = start_x; row <= width - tileSize; row += 24) {
      for (int col = start_y; col <= height - tileSize; col += 24) {
        if ((x<=row+24 && x>row)&&(y<=col+24&&y>col)) {  //마우스를 누른 위치가 특정 사각형 안에 있을 때, 그 사각형의 중심위치를 저장하도록 한다.(물결중심과의 동일한 거리를 구하기 위해)
          x=row+12;
          y=col+12;
        }
      }
    }
    pos = new float[2]; //마우스 클릭 당시의 위치값을 pos배열에 저장한다.
    pos[0] = x;
    pos[1] = y;
    max_distance = counted +1; //counted가 0일 경우를 대비한다. 마우스를 누른 시간만큼 물결의 크기를 크게 해준다.
    angle = 0;    //파동을 치게 하기 위한 각도를 초기화한다.
    NewDist = 0;    // 거리를 각도로 변환하기 위해 필요한 변수 NewDist를 초기화한다.
    
  }

  void generate(int start_x, int start_y) {  //물결생성함수
    for (int row = start_x; row <= width - tileSize; row += 24) {   //시작지점을 바탕으로 사각형을 그린다.
      for (int col = start_y; col <= height - tileSize; col += 24) {
        centerX = row+12;  //사각형을 그릴 
        centerY = col+12;

        getDist(centerX, centerY);  //물결의 중심이 되는 점과의 거리를 구하는 함수 호출 
        getSize();
        display(centerX, centerY);
      }
    }
  }

  void getDist(float circle_x, float circle_y) {   // 생성할 사각형의 중심점을 매개변수로 전달하여, pos 배열에 저장된 중심점과의 거리를 구한다.
    distance = dist( circle_x, circle_y, pos[0], pos[1]);  //중심점과 주변 사각형들과의 거리를 구하기 위해 dist() 라는 함수를 사용 - Processing의 예제를 참고하였습니다.
    edge = map(distance, 0, max_distance, tileSize / 2, 0); //중심에 가까워질수록 사각형이 원이 되도록 하기 위해 0과 tileSize절반 사이만큼 값으로 변환하여 edge에 저장
  }

  void getSize() { 
    NewDist = map(distance, max_distance, 0, 0, TWO_PI); // 물결의 중심과 최대 범위 사이에 있는 distance의 값을 각도로 변환하기 위해 0과 360도 사이로 변환하고, 그 값을 NewDist에 저장한다.
    NewDist+=angle; //NewDist는 계속 변해야 하기 때문에 angle과 더해준다.

    size = map(cos(NewDist), -1, 1, 0, tileSize);  // 코사인은 -1과 1 사이를 반복하기 때문에 그 값을 0과 사각형 한칸크기 사이로 변환해준다. 물결의 중심이 가장 크게 하기 위해 cos을 사용하였습니다.
    //(distance가 0일때 size는 tileSize, 즉 최대가 되도록 의도함) --> 0에 가까울수록 커지고, 180일때 가장 작으며 다시 커진다.
  }

  void display(float centerX, float centerY) {  //사각형을 그리는 함수

    if (distance > max_distance) {               //Chat GPT 참고 : 질문내용 - 최대거리 밖으로 사각형이 생성되는 것을 막으려면 어떤 방법이 있는지 질문하였습니다.
      return;  // 이해한 내용: return은 함수의 나머지 부분을 실행하지 않고 종료하는 역할로, 중심과의 거리가 기존 설정한 최대 범위 밖에 있을 시 함수를 실행하지 않도록 해준다. 
    }
    
    rectMode(CENTER);
    noStroke();
    float grad = map(distance, max_distance*.3, max_distance, 255, 0); //색상의 투명도를 조절할 변수 선언 - 최대거리의 0.3이 되는 부분부터 적용한다.
    fill(201,232,254, grad); //투명도 적용
    if (distance <= max_distance*4) {            //주변의 사각형도 일부 그려주기 위해 기존 최대범위보다 더 크게 설정하고 그 범위 안에 있으면 색을 바꿔줌
      rect(centerX, centerY, size, size, edge);  
    }
  }

  void update() { //
    angle+=0.05;  //시간이 지날수록 각도가 변화하며 물결이 일렁이도록 angle을 계속 더해준다.
    max_distance-=.3; //시간이 지날수록 최대범위를 작아지게 하여 소멸하도록 한다.
    if (angle >=360) { //angle이 너무 커질 것을 방지
      angle=0;
    }
  }


  boolean timeout() { //arrayList의 값을 지우기 위한 boolean형 함수 timeout
    boolean extinct = max_distance<=tileSize; //점점 줄어들던 최대범위가 사각형크기보다 작아졌을때 true를 반환
    return extinct; 
  }
}
