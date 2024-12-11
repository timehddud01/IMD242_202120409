let slider = document.querySelector('#slider-1'); //id 찾을때 #
//이 파일을 가져온 document 의미(소문자 document임)
console.log(slider); //확인용
console.log(slider.value); //확인용
let aNewDiv = document.createElement('div');

let textContents = document.createTextNode(slider.value);
aNewDiv.appendChild(textContents);
document.body.appendChild(aNewDiv); //prepend append 각각 미리,나중에 붙여줄 것을 의미
