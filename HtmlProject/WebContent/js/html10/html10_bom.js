var pop;

function proc() {
	pop = open("http://google.com"); // window 생략 가능
}

function proc2() {
	pop.close();
}

function showMsg() {
	//window.setTimeout() window 생략
	setTimeout(alertMsg, 3000);
	setTimeout()
}

function alertMsg() {
	alert("타이머 씀");
}

function changeBgColor() {
	setInterval(changeColor(), 3000);
}

function changeColor(){
	//랜덤으로 색을 만들어서 p태그의 배경을 넣어주기
	//1.랜덤 색 뽑기
	var r = 0, g = 0, b = 0;
	r = parseInt(Math.random() * 256)
	g = parseInt(Math.random() * 256)
	b = parseInt(Math.random() * 256)
	//2.p태그에 배경색 주기
	document.getElementById("pInterval").style.backgroundColor = "rgb("+r+","+g+","+b+")";
	// "red", "#ff0055", "rgb(255, 0, 255)"
}