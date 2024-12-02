/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh; //기능을 담을 변수 변수이름은 알아보기 쉽게
let video;
let faces = []; //여러개가 될 수 있기 때문에 배열로
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
//maxfaces 인식 얼굴 개수 정할 수 있음
//refineladmarks 를 true로 하면 더 정교하게 인식--속도 느려짐
//fliphorixontal -- 결과를 좌우 반전시켜서 보여줌

//https://docs.ml5js.org/#/reference/facemesh
//참조
//function preload 꼭 필요
//로딩할 것들을 다 가져온 후 시작할 수 있도록 해줌(다 안가져 왔는데 출발하면 안됨) 폰트,이미지,등등
function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options); //ml5의 facemesh라는 함수()--처음 실행 시 로딩 뜨는 이유--이 함수가져오는데 시간 좀 걸림
}
//options에는 어떤것이 들어올 수 있나? -->
// const faceMesh = ml5.faceMesh(?options, ?callback); ?는 넣어도 되고 안넣어도 됨

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  //faceMesh.detectStart(media, callback); //callback은 함수임 즉 여기에는 함수를 넣어줘야 한다는 것 작동방식: 이미지를 보고, 얼굴인지 아닌지
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    // for (let j = 0; j < face.keypoints.length; j++) {
    //   //키포인트 : 얼굴에 찍을 점 개수 //box, faceoval 등등 얼굴 부위별로 조가 나눠져 잇다. console.log 들어가면 나옴
    //   let keypoint = face.keypoints[j];
    //   fill(0, 255, 0);
    //   noStroke();
    //   circle(keypoint.x, keypoint.y, 5);
    // }
    let leftEye = face.leftEye; //왼쪽 눈썹만 그려보기

    for (let n = 0; n < leftEye.keypoints.length; n++) {
      let keypoint = leftEye.keypoints[n];
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results; //어레이인 faces안에 얼굴인 results를 넣어줌
}

function keyPressed() {
  if (key === 'o' || key === 'O') {
    console.log(faces);
  }
} //인식한 얼굴 개수 표시
