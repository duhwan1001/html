function getValue(strUrl, strKey) {
	
	var val = "";
	//strUrl 에서 strKey에 해당하는 값을 추출해서
	val = "~"
		
	return val;
}

function isEmpty(val) {
	//val이 빈 값이거나 null이거나 undefined이거나 " "
	return true;
	
	//return false;
}

function format(val, type) {
	if(type == "hpno"){
		val = val.replaceAll("-", "").replaceAll(" ", "");
		val = val.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3")
		
		// 2020년 04월 08일
		// val.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1년-$2월-$3일")
		return val;
	}
}