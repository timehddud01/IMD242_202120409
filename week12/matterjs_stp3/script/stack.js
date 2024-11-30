const Engine = Matter.Engine,
  // Render = Matter.Render,
  // Runner = Matter.Runner,
  Composites = Matter.Composites,
  //정의: 여러 바디를 특정 패턴(격자, 타워, 체인 등)으로 자동 생성하여 Composite으로 반환하는 유틸리티
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies;

// create engine
const engine = Engine.create(),
  world = engine.world;

// add bodies
var stack = Composites.stack(
  //똑같은 개체를 한번에 만들어주는 함수
  200, // x좌표
  606 - 25.25 - 5 * 40, // y좌표
  10, // 한줄 가로에 배치할 사각형 개수
  5, // 세로에 배치할 사각형 개수
  0, // 각 사각형 사이 가로 간격
  0, // 각 사각형 사이 세로 간격
  function (x, y) {
    // 각 위치(x, y)에서 생성할 바디를 정의하는 함수
    return Bodies.rectangle(x, y, 40, 40); // (x, y) 위치에 크기 40x40인 사각형 생성
  }
);

Composite.add(world, [stack]);

//walls - 고정할 벽
let walls = [
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(400, 606, 800, 50.5, { isStatic: true }),
];

Composite.add(world, [walls]);

// add mouse control
// var mouse = Mouse.create(render.canvas), //p5.js에서 사용하면 화질 문제 생길 수도 일단 건드리지 않음
//   mouseConstraint = MouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint: {
//       stiffness: 0.2,
//       render: {
//         visible: false,
//       },
//     },
//   });

// Composite.add(world, mouseConstraint);

function setup() {
  createCanvas(800, 600);
  background(255);
  console.log(stack);
}

function draw() {
  //stack과 walls의 바디를 렌더링

  background(255);
  //stack.bodies: 스택에 포함된 모든 바디.
  stack.bodies.forEach((aBody) => {
    //하나씩 순차적으로 처리하는 foreach
    //for보다 forEach가 낫다
    beginShape();
    aBody.vertices.forEach((aVertex) => {
      vertex(aVertex.x, aVertex.y);
    });
    endShape(CLOSE);
  });

  walls.forEach((eachWall) => {
    beginShape();
    eachWall.vertices.forEach((eachVertex) => {
      vertex(eachVertex.x, eachVertex.y);
    });
    endShape(CLOSE);
  }); //walls안의 것들을 하나씩 꺼내줌 에레이.foreach()
}

// 가져오고 작동하게 하는 법
// var Example = Example || {}; 이줄 삭제

// Example.stack = function() {
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         Composites = Matter.Composites,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         Composite = Matter.Composite,
//         Bodies = Matter.Bodies;

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world;

//     // create renderer
//     var render = Render.create({
//         element: document.body,
//         engine: engine,
//         options: {
//             width: 800,
//             height: 600,
//             showAngleIndicator: true
//         }
//     });

//     Render.run(render);

//     // create runner
//     var runner = Runner.create();
//     Runner.run(runner, engine);

//     // add bodies
//     var stack = Composites.stack(200, 606 - 25.25 - 5 * 40, 10, 5, 0, 0, function(x, y) {
//         return Bodies.rectangle(x, y, 40, 40);
//     });

//     Composite.add(world, [
//         stack,
//         // walls
//         Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
//         Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
//         Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
//         Bodies.rectangle(400, 606, 800, 50.5, { isStatic: true })
//     ]);

//     // add mouse control
//     var mouse = Mouse.create(render.canvas),
//         mouseConstraint = MouseConstraint.create(engine, {
//             mouse: mouse,
//             constraint: {
//                 stiffness: 0.2,
//                 render: {
//                     visible: false
//                 }
//             }
//         });

//     Composite.add(world, mouseConstraint);

//     // keep the mouse in sync with rendering
//     render.mouse = mouse;

//     // fit the render viewport to the scene
//     Render.lookAt(render, {
//         min: { x: 0, y: 0 },
//         max: { x: 800, y: 600 }
//     });

//     // context for MatterTools.Demo
//     return {
//         engine: engine,
//         runner: runner,
//         render: render,
//         canvas: render.canvas,
//         stop: function() {
//             Matter.Render.stop(render);
//             Matter.Runner.stop(runner);
//         }
//     };
// };

// Example.stack.title = 'Stack';
// Example.stack.for = '>=0.14.2';

// if (typeof module !== 'undefined') {
// module.exports = Example.stack;
// }
//주석들 모두 삭제 - example stack 괄호 안의 코드만 남기고 --> 맨 밑에 리턴 삭제
