/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let keyIdx = 0; //키보드에 버튼을 누르면 빨간색으로 변하게
let mouthOpen = 0;

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

function calcMouthOpen(face) {
  let upper = face.keypoints[13];
  let lower = face.keypoints[14];
  let distance = dist(upper.x, upper.y, upper.z, lower.x, lower.y, lower.z); //두 점 사이의 거리 구하기(3차원을 곁들인..)
  return distance;
}

//거리 보정 카메라에 가까이 있을 떄 더 크게 벌린것처럼되기 때문에 거리에 관계없이 같은 크기로 벌리면 같은 값이 나오도록 할 수 도 있다.
//관자놀이를 기준으로 함 21번쨰 점과 251번쨰 점이 좌우 관자놀이쪽의 점이다.
// 입술 사이 거리를 이 값으로 나눠준다?좀 헷갈림 --그래야 보정치가 됨
function calcWidth(face) {
  let left = face.keypoints[21];
  let right = face.keypoints[251];
  let distance = dist(left.x, left.y, left.z, right.x, right.y, right.z);
  return distance;
}

function keyPressed() {
  //===:3 개 숫자로서 0과 글자로서 0이 있다. 세개쓰면 숫자 0 만 인식하고  ==:2개 면 글자, 숫자 둘다 0이면 인식
  if (keyCode === RIGHT_ARROW) {
    keyIdx++;
  } else if (keyCode === LEFT_ARROW) {
    keyIdx--;
  }

  if (keyIdx < 0) {
    keyIdx = 0;
  }
  console.log('Current Idx : ', keyIdx);
}

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      if (keyIdx === j) {
        fill(255, 0, 0);
      } else {
        fill(0, 255, 0);
      }
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
    let faceWidth = calcWidth(face);
    console.log('거리 기준값:', faceWidth);

    let mouthDist = calcMouthOpen(face);

    let normalMouth = mouthDist / faceWidth;
    console.log('정규화된 입: ', normalMouth);
    // let fWeight = map(mouthDist, 0, 100, 100, 900);
    let fWeight = map(normalMouth, 0, 0.33, 100, 900);
    // console.log(mouthDist);

    //document는 js가 실행되고 있는 html을 가리키게 된다.css스타일 적용
    document.documentElement.style.setProperty('--fWeight', fWeight);
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

//얼굴에 저 세개를 찍고 얼굴을 돌렸을떄 값을 계산할 수 있다.
// 챗 지피티 : facemesh를 통해서 얼굴의 정점 데이터를 가지고 있다. 이 중에 세 점을 추려서 얼굴이 어느 방향으로 향하는지 계산할 수 있는 함수를 작성해줘 라고 물어보셈
//xyz 값을 회전시키면 됨 yaw, pitch , roll
