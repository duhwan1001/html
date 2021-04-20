/**
 *
 */
$(document).ready(function(){
	
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
	
	
	// 서버로 전달할 데이터 만들기
	var userId = $("#userId").val();
	var userName = $("#userName").val();
	
	var param = {
			memId : userId
			, memName : userName
			, flag : "L"
	};
	// ==> {memId : "test" , memName : ""}
	
	$("#btnSearch").click(function(){
		$.ajax({
			url : "/JqueryPro/MemberServlet"
			,type : "post"
			,data : param
			,dataType : "json"
			,success : function(data){
				console.log(data);
				makeTable(data);
			}
			,error : function(xhr){
				console.log(xhr);
				console.log(xhr.responseText);
				console.log(xhr.status);
				alert("오류발생");
			}
		});
	});
	
	function makeTable(data){
		var str = "";
		
		for(var i=0; i<data.length; i++){
			str += "<tr>"
				+ "<td>"+ data[i].memId +"</td>"
				+ "<td>"+ data[i].memName +"</td>"
				+ "<td>"+ data[i].memPass +"</td>"
				+ "<td>"+ data[i].memBir +"</td>"
				//+ "<td>"+ data[i].memHp +"</td>"
				+ "<td>"+ formatHp(data[i].memHp) +"</td>"
				+ "<td>"+ data[i].memMail +"</td>"
				+ "<td>"+ data[i].memJobName +"</td>"
				+ "</tr>";
		}
		$("#tbResult tbody").html(str);
	}
	

	
	
});
















