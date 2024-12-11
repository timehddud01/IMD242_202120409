let slider = document.querySelector('input'); //document는 소문자 대문자 둘다 가능한데 둘의 차이가 있다.
let valuePlace = document.querySelector('p');
console.log(slider);
console.log(valuePlace);
valuePlace.textContent = slider.value; //vlaue goes here을 바꾸려면..

slider.addEventListener('change', (event) => {
  console.log(slider.value);
  valuePlace.textContent = slider.value; //움직일 때마다(변경될 때마다) 값을 바꿔준다. 이를 ㅜ이해서는 위의 vlauePlace가 존재해야함 --> 기존것이 있어야 변경도 가능하기 때문에..
}); //콜백문법 (event) => {} ()에 어떤 것을 적더라도 {}은 정해져있다..?
//바깥 구조를 먼저 치고 내용을 채우려고 하는 것이 크게 보는데 도움이 된다. ()=>{}를 먼저치고 안의 event나 여려 것들을 채워넣는 방법
