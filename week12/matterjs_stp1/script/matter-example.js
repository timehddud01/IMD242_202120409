//https://www.youtube.com/watch?v=cLXNxn5N-2Y 보면서 이해

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create(); //새로운 엔진 인스턴스를 생성

// create a renderer
var render = Render.create({
  element: document.body, //캔버스를 body 요소에 추가한다는 의미다. HTML에 표시하기 위한 것
  engine: engine, //렌더링을 할 엔진은 engine을 사용하겠다고 말하는 것
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
//isStatic 은 움직이지 않도록 고정하는 것

// add all of the bodies to the world -- 객체를 월드에 추가
Composite.add(engine.world, [boxA, boxB, ground]);
//이때 배열로 묶어서 한번에

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//world는 물체를 그리는 공간
// Bodies: 사전 정의된 모양(사각형, 원 등)을 생성하는 팩토리.
// Body: 생성된 객체의 물리 속성을 조작하거나 수정하는 데 사용되는 기본 클래스.
//convex, concave 오목한 부분이 있다면 두 물체로 나눠야 물리엔진 잘 적용됨
//composite 안에는 여러 바디가 들어갈 수 있다.
//render : 기본적으로 matter.js는 render할 수 있지만 추천하지 않음 계산만 하고 p5.js로 가져와서 렌더하는게 더 좋다고 생각,,어쩃든 render가 들어가 있는 것
//Runner는 ..
//우리는 render를 제외하고 다 써볼 것임
