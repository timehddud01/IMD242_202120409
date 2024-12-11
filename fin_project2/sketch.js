let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose();
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  //손 인식
  handPose.detectStart(video, gotHands);
}

function draw() {
  // 좌우 반전하기
  push();
  translate(width, 0);
  scale(-1, 1); //
  image(video, 0, 0, width, height);
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(255, 0, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }

    let handDist = handWidth(hand);
    console.log('손의 거리', handDist);
    // let circleWeight = map(handDist,0,5,)
  }
}

function handWidth(hand) {
  let left = hand.keypoints[5];
  let right = hand.keypoints[17];
  let distance = dist(left.x, left.y, left.z, right.x, right.y, right.z);
  return distance;
}
