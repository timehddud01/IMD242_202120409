int sum; // 총합
int avg; // 평균값을 저장할 정수형 변수 선언- float가 아닌 int로 한다. 
int[] fruitAmt; //배열의 값들을 저장
String[] fruitNames = {"Mango", "Strawberry", "Kiwi", "Plum", "Blueberry"}; // 배열이름을 저장
int start_X = int((width)* 0.2); // 시작지점 X값을 위한 변수(화면 크기 조정 시); float끼리의 계산을 위해 float와 . 을 찍어주었다.
int start_Y  = int((height)* 0.5);// 시작지점 Y 값을 위한 변수
int bar_width = 80;
; //바의 넓이
int bar_gap = 100;
; //바의 간격


void setup() {
  size(1280, 720);
  fruitAmt = new int[fruitNames.length]; //Name의 크기만큼 공간 만들어줌
  for (int n = 0; n < fruitAmt.length; n++) { //크기만큼 반복문을 반복하면서 랜덤값 생성
    fruitAmt[n] = int(random(0, width - 380)); //크기에 따라 달라질 수 있도록 width를 활용
    //fruitAmt[n] = int(random(0, 10)); //test
  }
}

void draw() {
  background(255, 251, 244);
  sum = 0; //draw할 때마다  sum이  계속 커질 수 없으므로 0으로 초기화해준다.
  avg = 0; //마찬가지로 0으로 초기화해준다.
  for (int x = 0; x < fruitAmt.length; x++) { //1부터 시작하고 <=를 사용하여 크기만큽 반복한다. 위치값을 구할때 간단하게 적용하기 위함
    noFill();
    strokeWeight(2);
    if ( x == 0) {  // 색상 지정  0번은 망고, 1번 딸기, 2번 키위, 3번 자두, 4번 블루베리
      noStroke();
      fill(255, 195, 0);
      stroke(255, 195, 0);
    } else if (x ==1) {
      noStroke();
      fill(195, 61, 61);
      stroke(195, 61, 61);
    } else if (x ==2) {
      noStroke();
      fill(122, 150, 15);
      stroke(122, 150, 15);
    } else if (x ==3) {
      noStroke();
      fill(61, 26, 57);
      stroke(61, 26, 57);
    } else if (x ==4) {
      noStroke();
      fill(79, 134, 247);
      stroke(79, 134, 247);
    } 
    rect(start_X, bar_gap * x + start_Y, fruitAmt[x], bar_width); //화면크기에 따라 달라지는 bar그리기 
    textAlign(LEFT, TOP); //텍스트의 기준점을 바꿔주기 -- x값과 y값을 모서리에 지정할 수 있다.
    textSize(width / 20);
    text(fruitNames[x], width-350, bar_gap * x + start_Y);
    textSize(width / 40);
    textAlign(LEFT, BOTTOM);
    text( fruitAmt[x], width-350, bar_gap * x + start_Y + bar_width);
    noFill();
    rect(start_X, bar_gap * x + start_Y, width-380, bar_width); //바탕이 되는 bar 칸 그리기

    sum +=fruitAmt[x];  //배열을 하나씩 읽고 sum에 하나씩 더해주면서  총합을 계산한다.
  }
  avg = sum / fruitAmt.length; //더한 총합을 평균 값으로 계산한다.
  
  //총합과 평균값을 출력-  화면 크기에 따라 위치가 달라 질 수 있도록 한다.
  fill(0);
  textAlign(LEFT, TOP);    
  textSize(width / 32);
  text("Total Fruit Inventory :", start_X*4, 600);
  textAlign(RIGHT, TOP);
  text(sum, width*.5 - width /16, 600);
  textAlign(LEFT, TOP);
  text("Average Number of Fruits :", width*.5, 600);
  textAlign(RIGHT, TOP);
  text(avg, width - width /16, 600);
}
