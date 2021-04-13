/**
 * 
 */



function isEmpty(val){
	if(val == undefined) return true;
	if(val == null) return true;
	if(val == "null") return true;
	
	val = jQuery.trim(Val);
	if(val.length == 0) return true;
	
	return false;
}

	
function getValue(url, key){
	var idx = url.indexOf("?");
	if(idx > -1){
		url = url.substr(idx + 1);
		// url = "userName=아이유&userAge=25"
		
		for(var i=0; i<arr.length; i++){
			//arr.[i] // "userName = "아이유"
			var tmp = arr[i].split("=");
			// ["userName", "아이유"]
			if(tmp.length > 1){
				return tmp[1];
			} else {
				return ""
			}
			
		}
	}
}

/**
 * 핸드폰 번호 포맷
 * @param val
 * @returns
 */
function formatHp(val){
	// val : 01012341234, 010-1234-1234, 010-12341234 등등..
	val = val.replaceAll("-", "").replaceAll(" ", "");
	
	val.replace(/(\d{3})(\d{3,4)(\d{4}) /, "$1-$2-$3");
	
	return str;
	
}