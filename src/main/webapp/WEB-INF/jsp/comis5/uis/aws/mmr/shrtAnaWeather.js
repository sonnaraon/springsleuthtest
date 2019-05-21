var nt_3day = "201403311700";	// 2일에서 3일로 연장 시작시점
var lastTime= '';
var data= null;
var crrMenu= null;

var slideIndex = 1;
var TM_FC;
var TM_FC_TXT = "";
var TM_EF;
var TM_EF_TXT = "";
var HTML_STR_TBL = "";
var I_CLICK_CNT = 1;

$(document).ready(function(){
	
	TM_FC = ku.date().getNow();
	
	//TM_FC = ku.date("201709030000","yyyymmddhhmi").val();
	
	fnTmFcInit();
	// 기상 요소 변경 시 조회
	$("#data1").change(function(){ 
		fnSubmit();
	});
	
	slideIndex = 1;
    //showSlides(slideIndex);
    $("#openTimeline").click(function() {
    	$("#shrtTimeline").toggle();
    });
});


$(window).load(function() {


	fnSubmit();

});

function fnTmFcInit() {
    // 발효 일시 
	var tm = ku.date(TM_FC, "YYYY.MM.DD.HH:MI");
	var hourmin = Number(tm.toString("HH00"));
	var hiStr = "2300";
	
	//ku.msg.debug(" fnTmFcInit() tm1 : " + tm.toString("YYYYMMDD"));
	
	//ku.msg.debug(" fnTmFcInit() hourmin : " + hourmin);

	if (hourmin >= 2300) {
		hiStr = "2300";
	} else if (hourmin >= 2000) {
		hiStr = "2000";
	} else if (hourmin >= 1700) {
		hiStr = "1700";
	} else if (hourmin >= 1400) {
		hiStr = "1400";
	} else if (hourmin >= 1100) {
		hiStr = "1100";
	} else if (hourmin >= 800) {
		hiStr = "0800";
	} else if (hourmin >= 500) {
		hiStr = "0500";
	} else if (hourmin >= 200) {
		hiStr = "0200";
	} else {
		tm.addDate(-1);
		hiStr = "2300";
	}
	
	//ku.msg.debug(" fnTmFcInit() hiStr : " + hiStr);
	//ku.msg.debug(" fnTmFcInit() tm2 : " + tm.toString("YYYYMMDD"));
	
	var tmStr = tm.toString("YYYYMMDD") + hiStr;
	//tmef  = ku.date(tmefStr, "YYYYMMDDHHMI");
	
	
	TM_FC = ku.date( tmStr  , "yyyyMMDDHHMI" ).val();
	TM_FC_TXT =  ku.date( TM_FC  , "yyyy.MM.DD.HH:MI" );
	////ku.msg.debug(" tm_ef init : tmefStr : " + tmefStr);
	//ku.msg.debug(" fnTmFcInit init : TM_FC : " + TM_FC);
	//ku.msg.debug(" fnTmFcInit init : TM_FC_TXT : " + TM_FC_TXT);
}


//실행
function fnSubmit() {
	I_CLICK_CNT = 1; 
	// 발표일시
	var tmfc = ku.date(TM_FC, "YYYY.MM.DD.HH:MI");
	
	var hourmin = Number(tmfc.toString("HH00"));
	var hiStr = "2300";
	
	////ku.msg.debug(" fnSubmit() hourmin : " + hourmin);

	if (hourmin >= 2300) {
		hiStr = "2300";
	} else if (hourmin >= 2000) {
		hiStr = "2000";
	} else if (hourmin >= 1700) {
		hiStr = "1700";
	} else if (hourmin >= 1400) {
		hiStr = "1400";
	} else if (hourmin >= 1100) {
		hiStr = "1100";
	} else if (hourmin >= 800) {
		hiStr = "0800";
	} else if (hourmin >= 500) {
		hiStr = "0500";
	} else if (hourmin >= 200) {
		hiStr = "0200";
	} else {
		tmfc.addDate(-1);
		hiStr = "2300";
	}
	var tmfcStr = tmfc.toString("YYYYMMDD") + hiStr;
	//fctTime.setValue(ku.date(tmfcStr, "YYYYMMDDHHMI").toString("YYYY.MM.DD.HH:00"), "YYYY.MM.DD.HH:00");
	////ku.msg.debug(" tmfcStr : " + tmfcStr);
	var tmpShrtYmd  = "발표 : " + ku.date(tmfcStr, "YYYYMMDDHHMI").toString("YYYY.MM.DD");
	var tmpShrtHhmi = ku.date(tmfcStr, "YYYYMMDDHHMI").toString("HH:00");
	////ku.msg.debug(" tmpShrtYmd : " + tmpShrtYmd);
	////ku.msg.debug(" tmpShrtHhmi : " + tmpShrtHhmi);
	$("#shrtYmd").html(tmpShrtYmd);
	$("#shrtHhmi").html(tmpShrtHhmi);
	
	var tm = ku.date(tmfcStr, "YYYYMMDDHHMI").toString("YYYYMMDDHH00");
	//var tm_ef = ku.date(TM_EF, "YYYY.MM.DD.HH:MI").toString("YYYYMMDDHH00");
	var data1 = $("#data1").val();
	//var model = $("#model").val();

	if (tm >= 201305301700) {
		data1 = ku.str(data1).replace("R12", "R06").val();
		data1 = ku.str(data1).replace("S12", "S06").val();
	}
	
	var model      = "G";
	var data0      = "GEMD";
	var data1      = data1;
	var dtm        = "H0";
	var map        = "G1";
	var mask       = "M";
	var effect     = "N";
	var color      = "E";
	var size       = "400";
	var overlay    = "S";
	var auto_man   = "m";
	var zoom_rate  = "2";
	var zoom_level = "0";
	var zoom_x     = "0000000";
	var zoom_y     = "0000000";
	var mode       = "I";
	var rand       = "1714";
	
	var cgi_fix = "data0=" + data0;
	//cgi_fix += "&data1=" + data1;
	cgi_fix += "&tm_fc=" + tm;
	//cgi_fix += "&tm_ef=" + tm_ef;
	cgi_fix += "&dtm=" + dtm;
	cgi_fix += "&map=" + map;
	cgi_fix += "&mask=" + mask;
	cgi_fix += "&color=" + color;
	cgi_fix += "&size=" + size;
	cgi_fix += "&effect=" + effect;
	cgi_fix += "&overlay=" + overlay;
	cgi_fix += "&zoom_rate=" + zoom_rate;
	cgi_fix += "&zoom_level=" + zoom_level;
	cgi_fix += "&zoom_x=" + zoom_x;
	cgi_fix += "&zoom_y=" + zoom_y;
	cgi_fix += "&auto_man=" + auto_man;
	cgi_fix += "&mode=" + mode;
	//cgi_fix += "&rand=" + rand;
	
	////ku.msg.debug(" cgi_fix : " + cgi_fix);
	
//	/cgi/dfs/nph-dfs_shrt_ana?
//			data0=GEMD
//			&data1=T3H
//			&tm_ef=201709032100
//			&tm_fc=201709031700
//			&dtm=H0
//			&map=G1
//			&mask=M
//			&color=E
//			&size=240
//			&effect=N
//			&overlay=S
//			&zoom_rate=2
//			&zoom_level=0
//			&zoom_x=0000000
//			&zoom_y=0000000
//			&auto_man=m
//			&mode=I
//			&rand=1714
	// 최고기온용
//	/cgi/dfs/nph-dfs_shrt_ana?
//			data0=GEMD
//			&data1=TMN
//			&tm_ef=201709040300
//			&tm_fc=201709031700
//			&dtm=H0
//			&map=G1
//			&mask=M
//			&color=E
//			&size=150
//			&effect=NTL
//			&overlay=S
//			&zoom_rate=2
//			&zoom_level=0
//			&zoom_x=0000000
//			&zoom_y=0000000
//			&auto_man=m
//			&mode=I
//			&rand=0958
	

	// 테이블용 
	size = "40";
	effect = "NTL";
	
//	if( data1 == "MAX" ) {
//		size = "40";
//	}
	
	var cgi_fix_tbl = "data0=" + data0;
	//cgi_fix_tbl += "&data1=" + data1;
	cgi_fix_tbl += "&tm_fc=" + tm;
	cgi_fix_tbl += "&dtm=" + dtm;
	cgi_fix_tbl += "&map=" + map;
	cgi_fix_tbl += "&mask=" + mask;
	cgi_fix_tbl += "&color=" + color;
	cgi_fix_tbl += "&size=" + size;
	cgi_fix_tbl += "&effect=" + effect;
	cgi_fix_tbl += "&overlay=" + overlay;
	cgi_fix_tbl += "&zoom_rate=" + zoom_rate;
	cgi_fix_tbl += "&zoom_level=" + zoom_level;
	cgi_fix_tbl += "&zoom_x=" + zoom_x;
	cgi_fix_tbl += "&zoom_y=" + zoom_y;
	cgi_fix_tbl += "&auto_man=" + auto_man;
	cgi_fix_tbl += "&mode=" + mode;
	
	
//	/cgi/dfs/nph-dfs_shrt_ana?
//			data0=GEMD
//			&data1=T3H
//			&tm_ef=201709032100
//			&tm_fc=201709031700
//			&dtm=H0
//			&map=G1
//			&mask=M
//			&color=E
//			&size=150
//			&effect=NTL
//			&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714
			
			
	
	//$("#fctGrpTable").html(makeFctGrpTable(tm, cgi_fix, data1, model));
	//makeColorTable(data1, tmfc.toString("MM"))
	
	$("#shrtDiv1").html(makeShrtDiv(tm,cgi_fix,data1,model,cgi_fix_tbl));
	
	$("#shrtDiv2").html(HTML_STR_TBL);
	
	
	showSlides(slideIndex);
}


function cgi_disp_div(on , type , cgi_fix , tm_ef , data3) {
	   var cgi = "/cgi/dfs/nph-dfs_shrt_ana?";
	   var rand = ku.date().toString("HHMI");
	   var tmpTxt = "";
	   var tblCss = ' class="demo cursor" style="width:100%;" ';
	   var altTxt = 'alt="' + tm_ef.substring(0,4) + "." + tm_ef.substring(4,6) + "." + tm_ef.substring(6,8) + "." + tm_ef.substring(8,10) + ":" + tm_ef.substring(10,12) + '"'; 
	   var clickTxt = "";
	   
	   if( type == "div" ) {
		   tblCss = ' class="center" ';
		   clickTxt = '';
	   } else {
		   tblCss = ' class="demo cursor" style="width:100%;" ';
		   clickTxt = ' onclick="currentSlide('+I_CLICK_CNT+');"';
		   I_CLICK_CNT++;
	   }

	   //var data0 = "GEMD";
	   ////ku.msg.debug(" cgi_disp_div cgi_fix : " + cgi_fix);
	  //cgi += "data0=" + data0 + "&data1=" + data3 + "&tm_ef=" + tm_ef + cgi_fix + "&rand=" + rand;
	   cgi += cgi_fix + "&tm_ef=" + tm_ef + "&rand=" + rand + "&data1=" + data3;
		  //return "<td onclick=\"javascript:comp_popup('" + model3 + "','" + data3 + "','" + tm_ef + "');\" style=\"cursor:pointer;\"><img src='" + cgi + "' border=0></td>\n";

	   ////ku.msg.debug(" cgi_disp_div cgi : ------------------------------------------------------------------------------------------ ");
	   ////ku.msg.debug(" cgi_disp_div cgi : " + cgi);
	   ////ku.msg.debug(" cgi_disp_div cgi : ------------------------------------------------------------------------------------------ ");
	   
		  //tmpTxt = tmpTxt + '<div class="mySlides">';
	   if (on) {
		  tmpTxt = tmpTxt + '<img src="'+cgi+'"  '+tblCss+' '+altTxt+'  '+clickTxt+' >';
	   } else {
		  return "&nbsp;" 
	   }
	   
	   
		  //tmpTxt = tmpTxt + '</div>';
	   return tmpTxt;
}

function makeShrtDiv(tm, cgi_fix, data2, model,cgi_fix_tbl) {
	var htmlStr = "";
	var htmlStrTbl = "";
	var tmFc = ku.date(tm, "YYYYMMDDHHMI");
	var nt_fc = tmFc.toString("YYYYMMDDHHMI");
	var HH = tmFc.toString("HH");
	var day1 = 0;
	var day2 = 2;
	
   if(data2 != "MAX" ) { // && data2 != "R06" && data2 != "S06" && data2 != "RAC"
	   $("#shrtTimeline").css("width","100%");
   } else {
	   $("#shrtTimeline").css("width","");
   }
	   
	if (HH == 2) {
		day2 = 1;
	}
	if (HH ==23) {
		day1 = 1;
	}
	var data_name = "";
	// 요소명
//	if (data2 == "T3H") data_name = "기온";
//	else if (data2 == "MAX") data_name = "최고.최저기온";
//	else if (data2 == "SKY") data_name = "하늘상태";
//	else if (data2 == "PTY") data_name = "강수형태";
//	else if (data2 == "POP") data_name = "강수확률";
//	else if (data2 == "R12") data_name = "12H강수";
//	else if (data2 == "S12") data_name = "12H적설";
//	else if (data2 == "R06") data_name = "6H강수";
//	else if (data2 == "S06") data_name = "6H적설";
//	else if (data2 == "RAC") data_name = "누적강수량";
//	else if (data2 == "VEC") data_name = "바람";
//	else if (data2 == "WSD") data_name = "풍속";
//	else if (data2 == "REH") data_name = "상대습도";
//	else if (data2 == "WAV") data_name = "파고";

    // 자료명
	$("#shrtDiv1").html("");
	$("#shrtDiv2").html("");
	
	htmlStr = "";
	htmlStrTbl = "";

    //  한개 자료, 한개 요소에 대하여 일별 표시
	//htmlStr += "<table border=0 cellpadding=1 cellspacing=1 bordercolor=#9d9c9c>\n";
	htmlStrTbl += "<table>\n";
	
	htmlStrTbl += "<colgroup>\n";
	
	if (data2 == "MAX") {
		//htmlStrTbl += "<col width='20%'>\n";
		htmlStrTbl += "<col width='50%'>\n";
		htmlStrTbl += "<col width='50%'>\n";
		
	} else if (data2 == "R06" || data2 == "S06" || data2 == "RAC") {
		htmlStrTbl += "<col width='20%'>\n";
		htmlStrTbl += "<col width='20%'>\n";
		htmlStrTbl += "<col width='20%'>\n";
		htmlStrTbl += "<col width='20%'>\n";
		htmlStrTbl += "<col width='20%'>\n";
	} else {
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
		htmlStrTbl += "<col width='11.11%'>\n";
	}
	htmlStrTbl += "</colgroup>\n";
	
	var iChk = 0;

	for (var day = day1; day <= day2; day++) {
		if(day > 0) {
			tmFc = tmFc.addDate(1);
		}
		var day3 = tmFc.toString("DD");

		// 날짜.시간
		//htmlStr += "<tr height=20 bgcolor=#ffffcc align=center style='font-weight:bold;'>\n";
		
			
		if (data2 != "MAX") {
			if( iChk == 0 ) {
				htmlStrTbl += "<thead><tr>\n";
				htmlStrTbl += "<th>&nbsp;</th>";
			}
		} else {
			htmlStrTbl += "<thead><tr>\n";
			
		}
		
		if (data2 == "MAX") {
			for (var hr = 3; hr <= 24; hr += 12) {
				on = 1;
				if (day == day1) {
					if (HH >= 5 && HH <= 20 && hr == 3) {
						on = 0;
					}
					if (HH >= 14 && HH <= 20 && hr == 15) {
						on = 0;
					}
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14 && hr == 15)
							on = 0;
					}
				}

				if (on) {
					
					//if( iChk == 0 ) {
						if (hr == 3) {
							//htmlStr += "<td>" + day3 + "일 (최저기온)</td>";
							htmlStrTbl += "<th>" + day3 + "일 (최저기온)</th>";
						} else {
							//htmlStr += "<td>" + day3 + "일 (최고기온)</td>";
							htmlStrTbl += "<th>" + day3 + "일 (최고기온)</th>";
						}
					//}
				} else {
					//htmlStr += "<td>&nbsp;</td>";
					//if( iChk == 0 ) {
						//htmlStrTbl += "<th>&nbsp;</th>";
					//}
				}
			}
		} else if (data2 == "R06" || data2 == "S06" || data2 == "RAC") {
			for (var hr = 6; hr <= 24; hr += 6) {
				on = 1;
				if (day == day1) {
					if (hr - 2 <= HH && HH != 23) {
						on = 0;
					}
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14) {
							if (hr > 12) {
								on = 0;
							}
						}
					}
				}

				//if (on) {
					//htmlStr += "<td>" + day3 + "일 " + ku.str(hr - 6).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</td>";
					//htmlStrTbl += "<td>" + day3 + "일 " + ku.str(hr - 6).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</td>";
					if( iChk == 0 ) {
						//htmlStrTbl += "<th>" + ku.str(hr - 6).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</th>";
						htmlStrTbl += "<th>" + ku.str(hr - 6).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "</th>";
					}
				//} else {
					//htmlStr += "<td>&nbsp;</td>";
					//if( iChk == 0 ) {
						//htmlStrTbl += "<th>&nbsp;</th>";
					//}
				//}
			}
		} else {
			for (var hr = 3; hr <= 24; hr += 3) {
				on = 1;
				if (day == day1) {
					if (hr - 2 <= HH && HH != 23) {
						on = 0;
					}
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14) {
							if (hr > 12) {
								on = 0;
							}
						}
					}
				}

				//if (on) { 
					if (data2 == "PTY" || data2 == "POP" || data2 == "SKY") {
						//htmlStr += "<td>" + day3 + "일 " + ku.str(hr - 3).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</td>";
						//htmlStrTbl += "<td>" + day3 + "일 " + ku.str(hr - 3).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</td>";
						if( iChk == 0 ) {
							//htmlStrTbl += "<th>"+ ku.str(hr - 3).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "시</th>";
							htmlStrTbl += "<th>"+ ku.str(hr - 3).lpad(2, '0').val() + "~" + ku.str(hr).lpad(2, '0').val() + "</th>";
						}
					} else {
						//htmlStr += "<td>" + day3 + "일 " + ku.str(hr).lpad(2, '0').val() + "시</td>";
						//htmlStrTbl += "<td>" + day3 + "일 " + ku.str(hr).lpad(2, '0').val() + "시</td>";
						if( iChk == 0 ) {
							//htmlStrTbl += "<th>" + ku.str(hr).lpad(2, '0').val() + "시</th>";
							htmlStrTbl += "<th>" + ku.str(hr).lpad(2, '0').val() + "</th>";
						}
					}
				//} else {
					//htmlStr += "<td>&nbsp;</td>";
					//if( iChk == 0 ) {
						//htmlStrTbl += "<th>&nbsp;</th>";
					//}
				//}
			}
		}
		//htmlStr += "</tr>\n";

		if (data2 != "MAX") {
			if( iChk == 0 ) {
			htmlStrTbl += "</tr>\n";
			htmlStrTbl += "</thead>\n";
			htmlStrTbl += "<tbody id='shrtHtml'>";
			}
			htmlStrTbl += "<th>" + day3 + "일 </th>";
		} else {
				htmlStrTbl += "</tr>\n";
				htmlStrTbl += "</thead>\n";
				htmlStrTbl += "<tbody id='shrtHtml'>";
		}
		//
		// 최고,최저기온
		//
		if (data2 == "MAX") {
			// 발표      +0일  |   +1일  |   +2일
			//         TMN TMX | TMN TMX | TMN TMX
			//  02H     O   O  |  O   O  | 
			//  05H         O  |  O   O  |  O   X
			//  08H         O  |  O   O  |  O   X
			//  11H         O  |  O   O  |  O   X
			//  14H            |  O   O  |  O   X
			//  17H            |  O   O  |  O   O
			//  20H            |  O   O  |  O   O
			//  23H            |  O   O  |  O   O

			//htmlStr += "<tr bgcolor=#ffffff align=center class=text1>\n";

			for (var hr = 3; hr <= 24; hr += 12) {
				on = 1;
				if (day == day1) {
					if (HH >= 5 && HH <= 20 && hr == 3) {
						on = 0;
					}
					if (HH >= 14 && HH <= 20 && hr == 15) {
						on = 0;
					}
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14 && hr == 15)
							on = 0;
					}
				}

				if (hr == 3) {
					data3 = "TMN";
				} else {
					data3 = "TMX";
				}
				
				var tm_ef;
				if(hr == 24) {
					tm_ef = ku.date(tmFc.toString("YYYYMMDD"), "YYYYMMDD").addDate(1).toString("YYYYMMDD0000");
				} else {
					tm_ef = tmFc.toString("YYYYMMDD") + ku.str(hr).lpad(2, '0').val() + "00";
				}
				
				if( on ) {
					htmlStr += '<div class="mySlides">' + cgi_disp_div(on , "div" , cgi_fix, tm_ef,data3) + '</div>';
					htmlStrTbl += '<td class="bg_gray padding_0">' + cgi_disp_div(on , "tbl" , cgi_fix_tbl, tm_ef,data3) + '</td>';
				} else {
					//htmlStrTbl += '<td class="Nodata" style="height:50px;"></td>';
				}
				
				  
			}
			//htmlStr += "</tr>\n";
			htmlStrTbl += "</tr>\n";
		} else if (data2 == "R06" || data2 == "S06" || data2 == "RAC") {
			

			//
			// 6시간 강수량, 적설
			//
			
			//htmlStr += "<tr bgcolor=#ffffff align=center class=text1>\n";

			for (var hr = 6; hr <= 24; hr += 6) {
				on = 1;
				if (day == day1) {
					if (hr - 2 <= HH && HH != 23)
						on = 0;
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14) {
							if (hr > 12) {
								on = 0;
							}
						}
					}
				}

				var tm_ef;
				if(hr == 24) {
					tm_ef = ku.date(tmFc.toString("YYYYMMDD"), "YYYYMMDD").addDate(1).toString("YYYYMMDD0000");
				} else {
					tm_ef = tmFc.toString("YYYYMMDD") + ku.str(hr).lpad(2, '0').val() + "00";
				}
				if( on ) {
					htmlStr += '<div class="mySlides">' + cgi_disp_div(on , "div" , cgi_fix, tm_ef, data2) + '</div>';
					htmlStrTbl += '<td class="bg_gray padding_0">' + cgi_disp_div(on , "tbl" , cgi_fix_tbl, tm_ef, data2) + '</td>';
				} else {
					htmlStrTbl += '<td class="Nodata"></td>';
				}
			}
			//htmlStr += "</tr>\n";
			htmlStrTbl += "</tr>\n";
		} else {
			//
			// 3시간 간격 요소들
			//
			//htmlStr += "<tr bgcolor=#ffffff align=center class=text1>\n";

			for (var hr = 3; hr <= 24; hr += 3) {
				on = 1;
				if (day == day1) {
					if (hr - 2 <= HH && HH != 23) {
						on = 0;
					}
				} else if (day == day2) {
					if (nt_fc >= nt_3day) {
						on = 1;
					} else {
						if (HH >= 5 && HH <= 14) {
							if (hr > 12) {
								on = 0;
							}
						}
					}
				}

				var tm_ef;
				if(hr == 24) {
					tm_ef = ku.date(tmFc.toString("YYYYMMDD"), "YYYYMMDD").addDate(1).toString("YYYYMMDD0000");
				} else {
					tm_ef = tmFc.toString("YYYYMMDD") + ku.str(hr).lpad(2, '0').val() + "00";
				}
				
				if( on ) {
					htmlStr += '<div class="mySlides">' + cgi_disp_div(on , "div" , cgi_fix, tm_ef, data2) + '</div>';
					htmlStrTbl += '<td class="bg_gray padding_0">' + cgi_disp_div(on , "tbl" , cgi_fix_tbl, tm_ef,data2) + '</td>';
				} else {
					htmlStrTbl += '<td class="Nodata"></td>';
				}
			}
			//htmlStr += "</tr>\n";
			htmlStrTbl += "</tr>\n";
		}
		
		iChk++;
	} // end for day
	
	htmlStrTbl += "</tbody>\n";
	htmlStrTbl += "</table>\n";
	
	HTML_STR_TBL = htmlStrTbl;
	return htmlStr;
}





// 이미지 넘기기
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// 현재 이미지
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  
  ////ku.msg.debug(" showSlides : n:[" + n + "] slides.length : [" + slides.length + "]");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


//시간이동바 클릭!!!!
$(document).on("vclick",".timemove>ul>li",function(){

    var goTime = $(this).attr("val");

//	TM_FC = ku.date().getNow();
//	TM_FC = ku.date("201709030000","yyyymmddhhmi").val();
//	TM_FC_TXT =  ku.date( TM_FC  , "yyyy.MM.DD.HH:MI" );

	
    if( goTime == "NOW" ) {
    	TM_FC = ku.date().getNow();                //  현재시간으로 다시 설정
    	TM_FC_TXT =  ku.date( TM_FC  , "yyyy.MM.DD.HH:MI" );
    } else {

    	var tmFcTxt =  ku.date( TM_FC  , "yyyyMMDDHHMI" );
        var chgDate = chgDateFormat( tmFcTxt );
        var cDate = makeDate( chgDate );      //  mmrGlobal.js 에 위치하고 있다!!!!

        var gT = cDate.getTime() + ( Number(goTime) * 60 * 1000 );
        var chgTmFcTxt = chgDateFormatYYYYMMDDhhmm(gT).substring(0,12);
        
        TM_FC = ku.date(chgTmFcTxt,"yyyymmddhhmi").val();
        TM_FC_TXT =  ku.date( TM_FC  , "yyyy.MM.DD.HH:MI" );

//        if( goTime > 0 ) {
//            var chkT = getNowDate();
//            chkT = chkT.substring(0,10);    //  aws table 의 시간을 현재시간으로 설정!!
//            if ( chkT < SET_DATE) {
//                alert("현재시간으로 조회합니다.");
//                SET_DATE = chkT;
//            }
//        }
    }
    //ku.msg.debug(" timeover ul li TM_FC : " + TM_FC);
    //ku.msg.debug(" timeover ul li TM_FC_TXT : " + TM_FC_TXT);
    fnSubmit();

});