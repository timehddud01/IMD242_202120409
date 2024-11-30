//https://www.youtube.com/watch?v=cLXNxn5N-2Y 보면서 이해

// // module aliases
// var Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;
//짧게 쓰기 위한 변수 처리
//Object Destructuring
const { Engine, Render, Runner, Bodies, Composite } = Matter; //이 한줄로 위의 코드를 대신할 수 있다.
//Composite가 내가 만든 변수와 겹칠때,, :을 쓰고 뒤에 내가 부를 이름을 적어서 혼동을 없앤다.

// create an engine
// var engine = Engine.create();
//물리 시뮬레이션을 위한 엔진 생성(필수)
const anyEngine = Engine.create(); //any가 들어간 부분은 이름을 다르게 설정해줘도 됨

// create a renderer
// var render = Render.create({
//   //[]는 넣어도 되고, 안넣어도 됨 여기 안에는 object가 들어가야 함
//   //배열과 차이가 뭐냐? object는 필드가 있다. array는 필드가 없다 0,1,2순서대로 들어가기 때문(이게 무슨 뜻이지..).
//   //{}은 options에 해당한다. engine: 의 앞, engine은 필드다.
//   element: document.body, //element는 html의 어떤 부분에 matter를 넣어줄지,,body는 html전체(root)위치에 넣어주는 것이다.
//   engine: engine,
// });
//화면에 그리기 위한 렌더러 생성(P5에서 그릴 거라면 필수 아님)
const anyRender = Render.create({
  //{}부분은 option임/
  element: document.body,
  engine: anyEngine,
  options: { width: 600, height: 800 },
});

// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
//isStatic 은 외부의 힘에 상관없이 국건해짐(뚫을 수 없음)
//월드에 집어넣을 바디를 생성
//두개는 박스, 하나는 같은 박스지만, 스태틱 처리돼서 바닥으로 역할함.
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);
let circle = Bodies.circle(200, 100, 80, 80);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true }); //바닥으로 쓰기 위해 ground라고 명명

// add all of the bodies to the world
// Composite.add(engine.world, [boxA, boxB, ground]);//[]는 어레이

//월드에다가 만든 녀석들을 탈탈 집어넣기. 집어넣기 위해서 콤포지트를 사용함.
Composite.add(anyEngine.world, [boxA, boxB, ground]); //[]는 어레이 /, 뒤에 어레이와 오브젝트 둘중헤 하나가 들어갈 수 있다.
Composite.add(anyEngine.world, circle); //원 추가 윗줄의[]안에 써도 되긴함

// run the renderer
// Render.run(render);
//렌더모듈에게 만든 런더객체 넣어서 굴리라고 말하기
Render.run(anyRender);

// create runner
// var runner = Runner.create(); //무한 실행 가능하게 해줌
//계속 실행을 보장하는 러너 생성
const anyRunner = Runner.create();

// run the engine
// Runner.run(runner, engine); //무한 실행 가능하게 해줌
//러너 모듈에세 생성된 러너와 생성된 엔진을 집어넣고 시동 걸기(무한실행보장)
Runner.run(anyRunner, anyEngine);

//world는 물체를 그리는 공간
// Body: 생성된 객체의 물리 속성을 조작하거나 수정하는 데 사용되는 기본 클래스.
// Bodies: 사전 정의된 모양(사각형, 원 등)을 생성하는 팩토리.프리셋

//convex, concave 오목한 부분이 있다면 두 물체로 나눠야 물리엔진 잘 적용됨
//composite 안에는 여러 바디가 들어갈 수 있다.
//render : 기본적으로 matter.js는 render할 수 있지만 추천하지 않음 계산만 하고 p5.js로 가져와서 렌더하는게 더 좋다고 생각,,어쩃든 render가 들어가 있는 것
//Runner는 ..
//우리는 render를 제외하고 다 써볼 것임
