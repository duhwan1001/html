$(document).ready(function(){
	
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
				+ "<td>"+ data[i].id +"</td>"
				+ "<td>"+ data[i].name +"</td>"
				+ "</tr>";
		}
		$("#tbResult tbody").html(str);
	}
	
	
});