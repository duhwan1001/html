/**
 * 
 */
function searchZipCode(){
	var reqDong = $("#searchDong").val();

	$.ajax({
		url : "/memberPj/ZipServlet"
		,type : "post"
		,data : {"dong" : reqDong}
		,dataType : "json"
		,success : function(data){
			console.log(data);
			makeZipTable(data);
		}
		,error : function(xhr){
			console.error(xhr);
			console.error(xhr.status)
			console.error(xhr.responseText)
			alert("오류");
		}
	});
}

function makeZipTable(data){
	$("#divZipResult").show();
	$("#tbZipResult tbody").empty();
	
	var strHtml = "";
	for(var i=0 ; i<data.length ; i++) {
		console.log(data[i]);
		//          <tr onclick='fntest( "300-801", "대전", "중구", "문화1동", "1번지" );'>
//		strHtml += "<tr onclick='fntest( \"" + data[i].zipcode + "\", \"" + data[i].sido + "\");'>" // "300-801"
		strHtml += "<tr>"
				+ "<td>" + data[i].zipcode + "</td>"
				+ "<td>" + data[i].sido + " "
				+ data[i].gugun + " "
				+ data[i].dong + " " 
				+ data[i].bunji + "</td>"
				+ "</tr>";
	}
	
	$("#tbZipResult tbody").html(strHtml);
	
//	$("#tbZipResult tbody").dblclick();
	
}
	