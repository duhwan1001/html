/**
 * 
 */

		
		function fnGet(){
			// sumbit 실행
			var fm = document.getElementById("fm"); // form
			fm.action = "../sample/html1.ex1.html";
			fm.method = "post";
			fm.submit();
		}
		
		function fnAjax(){s
			$.ajax({
				url : "jQuery9.intro.html"
				,type : "get"
				//,data :
				//,dataType :
				,success : function(data){
					$("#result").text(data);
				}
				,error : function(){
					
				}
			});
		}
		
		function fnText(){
			$.ajax({
				//url : "../sample/TextFile.txt"				
				url : "/JqueryPro/html/sample/TextFile.txt" // WebContent가 루트임
				//,TYPE : "get"
				//,date : {}
				,dateType : "text" // 안써도 무관함
				,success : function(data){
					$("#result").html(data);
				}
				,error : function(){
					console.error("fnText 에러");
				}
			})
		}
		
		function fnJsonObj(){
			$.ajax({
				url : "/JqueryPro/html/sample/data_json_obj.txt"
				,dataType : "json" // 안써주면 일반 Text타입으로 인식함.
				,success : function(data){
					console.log(data);
					console.log(data.name);
					// div에 이름 : ~, 나이 : ~,
					
					var str = "";
					str += "이름 : " + data.name + "<br>" // text로 넣을때는 \n || html로 넣을때는 <br>
						+ "나이 : " + data.age + "<br>"
						+ "성별 : " + data.gender + "<br>"
						+ "직업 : " + data.job
						
					$("#result").html(str);
					
				}
			});
		}
		
		function fnJsonArr(){
			$.ajax({
				url : "/JqueryPro/html/sample/data_json_arr.txt"
				,dataType : "json"
				,success : function(data){
					console.log(data);
					
					var str = "<ol>";
					/* for(var i=0; i<data.length; i++){
						str += "<li>" + data[i] + "</li>"
					} */
					$.each(data, function(idx){
						str += "<li>" + data[idx] + "</li>";
					})
					str += "</ol>";
					
					$("#result").html(str);
				}
			})
		}
		
		function fnJsonList(){
			$.ajax({
				url : "/JqueryPro/html/sample/data_json_list.txt"
				,dataType : "json"
				,success : function(data){
					var str = "<table border='1' style='text-align: center;'>"
								+ "<th></th><th>이름</th><th>나이</th><th>성별</th><th>직업</th>"
				
					$.each(data, function(idx){
						str += "<tr>"
							+ "<td>" + (idx+1) + "</td>"
							+ "<td>" + data[idx].name + "</td>"
							+ "<td>" + data[idx].age + "</td>"
							+ "<td>" + data[idx].gender + "</td>"
							+ "<td>" + data[idx].job + "</td>"
					})
					str += "</tr>" + "</table>"
					 
					$("#result").html(str);
				}
				,error : function(){
					console.error("fnJsonList 에러");
				}
			});
		}
		
		function fnXmlSinger(){
			$.ajax({
				url : "cd_catalog.xml"
				//,type : "get" // "post"
				//,data :
				,dataType : "xml"
				,success : function(data){
					//console.log(data.getElementsByTagName("CATALOG"));
					//console.log(data.getElementsByTagName("CD"));
					makeArtistList(data);
				}
				,error : function(xhr){
					console.error(xhr);
					alert("오류발생");
				}
			});
		}
		
		function fnXmlTitle(){
			$.ajax({
				url : "cd_catalog.xml"
				//,type : "get" // "post"
				//,data :
				,dataType : "xml"
				,success : function(data){
					//console.log(data.getElementsByTagName("CATALOG"));
					//console.log(data.getElementsByTagName("CD"));
					makeTitleList(data);
				}
				,error : function(xhr){
					console.error(xhr);
					alert("오류발생");
				}
			});
		}
		
		function makeArtistList(param){
			//console.log(param)
			var arr = param.getElementsByTagName("ARTIST");
			/* console.log(arr);
			console.log(arr[0]);
			console.log(arr[0].innerHTML); */
			var str = "";
			for(var i=0; i<arr.length; i++){
				str += arr[i].innerHTML + "<br>"; //가수 이름
				//Bob Dylan
			}
			$("#result").html(str);
		}
		
		function makeTitleList(param){
			var arr = param.getElementsByTagName("TITLE");
			var arti = param.getElementsByTagName("ARTIST");
			var coun = param.getElementsByTagName("COUNTRY");
			var comp = param.getElementsByTagName("COMPANY");
			var price = param.getElementsByTagName("PRICE");
			var year = param.getElementsByTagName("YEAR");
			console.log(arr[0]);
			console.log(arr[0].childNodes);
			console.log(arr[0].childNodes[0]);
			
			console.log(arr[0].childNodes[0].nodeValue);
			console.log(arti[0].childNodes[0].nodeValue);
			console.log(coun[0].childNodes[0].nodeValue);
			console.log(comp[0].childNodes[0].nodeValue);
			console.log(price[0].childNodes[0].nodeValue);
			console.log(year[0].childNodes[0].nodeValue);
			
			
			// HTML 교재 10 - DOM 순회
			var str = "";
 			for(var i=0; i<arr.length; i++){
				str += arr[i].childNodes[0].nodeValue + "<br>";
			}
			$("#result").html(str);
		}
		
		function fnXmlTable(){
			$.ajax({
				url : "cd_catalog.xml"
				,dataType : "xml"
				,success : function(data){
					
					var str = "<table border='1' style='text-align: center;'><tr><th>NO</th>" +
							"<th>TITLE</th><th>Artist</th><th>Country</th><th>Company</th>" +
							"<th>Price</th><th>Year</th></tr>";
					
					var setData = data.getElementsByTagName("CD");
					
					console.log(setData);
					console.log(setData.length);
					
					var title = data.getElementsByTagName("TITLE");
					var arti = data.getElementsByTagName("ARTIST");
					var coun = data.getElementsByTagName("COUNTRY");
					var comp = data.getElementsByTagName("COMPANY");
					var price = data.getElementsByTagName("PRICE");
					var year = data.getElementsByTagName("YEAR");
					
					console.log(data.length);
					
					for(var i=0; i<setData.length; i++){
						str += "<tr>"
							+ "<td>"+ (i+1) + "</td>" 
							+ "<td>"+ title[i].childNodes[0].nodeValue + "</td>"        
							+ "<td>"+ arti[i].childNodes[0].nodeValue + "</td>" 
							+ "<td>"+ coun[i].childNodes[0].nodeValue + "</td>"  
							+ "<td>"+ comp[i].childNodes[0].nodeValue + "</td>" 
							+ "<td>"+ price[i].childNodes[0].nodeValue + "$" + "</td>" 
							+ "<td>"+ year[i].childNodes[0].nodeValue + "</td>"
							+ "</tr>" 
					}                        
					str += "</table>";
					$("#result").html(str);
					
				}
				,error : function(){
					console.error("fnXmlTable 에러");
				}
			});
		}
		
		
		
		
		
		
		