/**
 *
 */
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
















