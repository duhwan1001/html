/**
 * 
 */
		
$(document).ready(function(){
		// 화면 초기화 작업을 진행
		
		// 1. 직업코드 세팅
		initJobSelect()
		// 2. '기념일코드' 세팅
		initMemorialSelect()
		// 3. '광고메일 수신 여부' 기본값 세팅 - 미수신
		$("#recvEmailNo").prop("checked", true)
		// 4. '취미코드' 세팅(체크박스)
		initHobbyCheck()
		
		// 5. '우편번호찾기 화면-시' 세팅
		initCitySelect()
		
		// ↓ 동적요소 포함 미포함
		//$("#tbZipResult tbody").dblclick(function(){});
		$("#tbZipResult tbody").on("dblclick", "tbody tr",function() {
			//this => tr
			var zipcode = $(this).children("td:eq(0)").text();
			var addr = $(this).children("td:eq(1)").text();
			
			// 메인화면(부모창)의 우편번호, 주소 input에 데이터 세팅
			$("#memZip").val(zipcode);
			$("#memAdd1").val(addr);
			
		})
		
		// 직업코드 조회해서 세팅하기
});

/**
 * 시 세팅
 * @returns
 */
function initCitySelect() {
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeCitySelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("Error");
		}
	})
}

/**
 * 취미
 * @returns
 */
function initHobbyCheck(){
	
}

function initMemorialSelect(){
	
}

/**
 * 직업코드 목록 불러오기
 * @returns
 */
function initJobSelect(){
	$.ajax({
		url : "/JqueryPro/CodeServlet"
		,type : "post"
		,data : {"groupCode" : 'A02'} // 직업코드 조회
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeJobSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			console.log(xhr.responseText);
			console.log(xhr.status);
			alert("jobSelect Error");
		}
	})
};

function setDong(){
	var param = {
			'sido' : $("#city").val()
			,'gugun' : $("#gu").val()
			,'flag' : 'DONG'
	};
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
//			console.log(data);
			makeDongSelect(data);
			
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}
	});
}

function setGu(){
	
	var param = {
			'sido' : $("#city").val()
			,'flag' : 'GU' 
		};
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeGugunSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("Error");
		}
	})
}	

function makeGugunSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for (var i = 0; i < data.length; i++) {
		strHtml += "<option value='" + data[i].gugun + "'>" + data[i].gugun + "</option>";
		//<option value="대전">대전</option>
	}
	$("#gu").html(strHtml);
	$("#gu").prop("disabled", false);
}

function makeDongSelect(data){
	var strHtml = '<option value=>선택하세요</option>';
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].dong +'">' + data[i].dong + '</option>';
	}
	$("#dong").html(strHtml);
	$("#dong").prop("disabled", false);
}

function makeCitySelect(data) {
	var strHtml = "";
	for (var i = 0; i < data.length; i++) {
		strHtml += "<option value='" + data[i].sido + "'>" + data[i].sido + "</option>";
		//<option value="대전">대전</option>
	}
	$("#city").html(strHtml);
	
	// 방법2)
	//setGu();
	// 방법3)
	// trigger로 change 이벤트 호출
}

function checkId(){
	var memId = $("#memId").val();
	//
	if(isEmpty(memId)){
		alert("ID 값이 입력되지 않았습니다.");
		$("#memId").focus();
		$("#spMemId").show();
		return;
	}
	
	// 유효성 검사 - 영어소문자와 숫자로 구성. 3글자 이상 10글자 이하
	var regExp = /^[a-z0-9{3,10}]$/;
	if(regExp.test(memId)){
		alert("ID 값이 유효하지 않습니다.");
		$("#memId").focus();
		return;
	}
	
	// DB에서 중복검사 수행
	$.ajax({
		url : "/JqueryPro/MemberServlet"
		,type : "post"
		,data : {"memId" : memId, "flag" : "CHKID"}
		,dataType : "json"
		,success : function(data){
			console.log(data);
			
		}
		,error : function(xhr){
			console.error(xhr);
			console.error(xhr.status);
			alert("ID 중복 검사 중 오류가 발생했습니다.");
		}
	})
}

function makeJobSelect(data){
	/* // 방법1
	var strHtml = "";
	$("#job").html(strHtml); */
	
	// 방법2
	/* $("#job").empty();
	$("#job").append(ele1);
	$("#job").append(ele2); */
	
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0; i<data.length; i++){
		strHtml += "<option value=" + data[i].value + ">" + data[i].name + "</option>"
		//<option value="07">군인</option>
	}
	//
	$("#job").html(strHtml);
	
}

function isEmpty(val){
	if(val == undefined) return true;
	if(val == null) return true;
	if(val == "null") return true;
	
	val = jQuery.trim(val);
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

function formatHp(val){
	// val : 01012341234, 010-1234-1234, 010-12341234 등등..
	val = val.replaceAll("-", "").replaceAll(" ", "");
	
	val.replace(/(\d{3})(\d{3,4)(\d{4}) /, "$1-$2-$3");
	
	return val;
	
}

function test() {
	
}

function openZip(){
	//시 셀렉트 박스 조회하고 초기화
	initCitySelect();
	// 테이블 초기화
	$("#tbZipResult tbody").empty();
	
	// 주소창(모달창) 열기 - 부트스트랩의 modal 메소드 호출
	$("#zipModal").modal();
}

// 회원정보 저장하기
function save() {
	// 회원정보 유효성 체크
	var result = validate();
	if(!result){
		return;
	}
	
	// 사용자 컨펌
	if(!confirm("저장하시겠습니까?")){
		return;
		
	// DB에 저장하는 ajax 호출
	$("formFlag").val("C");
	$.ajax({
		url: "JqueryPro/MemberServlet"
		,type : "post"
		,data : $("#fm").serialize()
		,dataType : "json"
		,success : function(data) {
			alert("저장되었습니다.");
			
			//페이지 이동
			changePage();
		}
		,error : function(xhr) {
			alert("실패하였습니다.")		
			console.error(xhr);
		}
	});
	}
}

function changePage(){
	// 방법1
	// window.location.href = "/JqueryPro/html/member/memberList2.html..
	
	// 방법2
	var fm = document.getElementById("fm");
	fm.action = "/";
	// 서블릿을 호출하기도 함
	fm.method = "post";
	fm.submit();
}

function validate(){
	//....
	return false;
	
	//체크가 끝나면
	return true;
}













