//  seaWeather.js
$(document).ready( function() {
    //console.log("seaWeather.js Ready!!!");

    $("#seaWeatehrInfo").show();
    $("#seaWeatehrInfoNo").hide();

    seaWeather( "12A10000" );
});

$(document).on("vclick", ".wSea",function(){

    $("#seaWeatehrInfo").show();
    $("#seaWeatehrInfoNo").hide();

    var regionId = $(this).attr("val");

    $(".wSea").removeClass("active");
    $(this).addClass("active");

    if( regionId == "ETCDATA" ) {
        etcSeaWeather();
    } else {
        seaWeather( regionId );
    }
});

/*
 * 해상예보 자료 표출 함수 - 한반도 정보
 *
 * 서해북부, 서해중부, 서해남부,
 * 서해서부, 제주도, 남해동부,
 * 동해남부, 동해중부, 동해북부
 *
 */
function seaWeather( regionId ) {

    ku.req.addParam("type", "forecast");
    ku.req.addParam("regionId", regionId);
    ku.req.addParam("_DT", "MMR:WEATHERMAN:SEA");
    ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanSea.kajx", function(data,err) {

        if ( err ) {
            $("#seaWeatehrInfo").hide();
            $("#seaWeatehrInfoNo").show();
            $.mobile.hidePageLoadingMsg();

            return;

        } else {

            //단기해생예보자료
            var fctDay = data.fct_sea_day;
            makeDayHtml(fctDay);


            //중기해생예보자료
            var fctWeek = new Array();
            fctWeek.push(data.fct_sea_week);
            makeWeekHtml(fctWeek);

            $.mobile.hidePageLoadingMsg();
        }
    });
}


/*
 * 해상예보 자료 표출 함수 - 기타해상
 *
 * 대화퇴, 연해주, 동중국해, 규수(서해), 규수(남해)
 *
 */
function etcSeaWeather() {

    var tmpFctDay = new Array();
    var tmpFctWeek= new Array();

    var chkDataVal = 4;

    ku.req.addParam("type", "forecast");
    ku.req.addParam("regionId", '12D00000');
    ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanSea.kajx", function(data,err) {

        if ( err ) {
            chkDataVal = chkDataVal - 1;
        } else {
            tmpFctDay.push(data.fct_sea_day);
            tmpFctWeek.push(data.fct_sea_week);
        }

        ku.req.addParam("type", "forecast");
        ku.req.addParam("regionId", '12G00000');
        ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanSea.kajx", function(data,err) {

            if ( err ) {
                chkDataVal = chkDataVal - 1;
            } else {
                tmpFctDay.push(data.fct_sea_day);
                tmpFctWeek.push(data.fct_sea_week);
            }

            ku.req.addParam("type", "forecast");
            ku.req.addParam("regionId", '12E00000');
            ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanSea.kajx", function(data,err) {

                if ( err ) {
                    chkDataVal = chkDataVal - 1;
                } else {
                    tmpFctDay.push(data.fct_sea_day);
                    tmpFctWeek.push(data.fct_sea_week);
                }

                ku.req.addParam("type", "forecast");
                ku.req.addParam("regionId", '12F00000');
                ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanSea.kajx", function(data,err) {

                    if ( err ) {
                        chkDataVal = chkDataVal - 1;
                    } else {

                        var tmpDay = data.fct_sea_day;
                        for(var i=0; i<tmpDay.length; i++){
                            tmpFctDay.push(tmpDay[i]);

                        }
                        tmpFctWeek.push(data.fct_sea_week);

                        makeDayHtml(tmpFctDay);
                        makeWeekEtcHtml(tmpFctWeek);
                    }
                });
            });
        });
    });

    if( chkDataVal < 1 )  {
        $("#seaWeatehrInfo").hide();
        $("#seaWeatehrInfoNo").show();
    }
}

function getIconCode(wfSkyCd, wfPreCd){
	if(wfPreCd == "0"){    													 // 강수 아닐 시
		if( wfSkyCd == "DB01" ) {	return "01";} 								// 맑음
		else if( wfSkyCd == "DB02" ) {return "03";}									// 구름조금
		else if( wfSkyCd == "DB03" ) {return "05";} 							// 구름많음
		else if( wfSkyCd == "DB04" ) {return "07";}								// 흐림
    }else if(wfPreCd == "1"){  				                                 // 강수 일 때
		if( wfSkyCd == "DB03") {												// 구름많고 한 때 비
			return "09";
		}else if(wfSkyCd == "DB04"){                                            // 흐리고 가끔 비
			return "10"
		}
	}else if(wfPreCd == "2"){  				                                 // 비/눈
		if( wfSkyCd == "DB03") {return "14";}			 					 	// 구름많고 한 때 비/눈
		if( wfSkyCd == "DB04") {return "13";}			 					 	// 흐리고 비/눈
	}else if(wfPreCd == "3"){  				                                 // 한때 눈
		if( wfSkyCd == "DB03" || wfSkyCd == "DB04") {return "12";}			 	// 구름많고 한때 눈
	}else{
		if( wfSkyCd == null || wfSkyCd == "" ) {
			if(wfPreCd == null || wfPreCd == "" ){
				return "01";
			}else{
				if( wfPreCd == "11" || wfPreCd == "12") {return "12";}
				else if( wfPreCd == "13" || wfPreCd == "14") {	return "14";}
				else if( wfPreCd == "17") {return "17";}
				else {	return "01";}
			}
		}
		return "03";
	}
}

function makeDayHtml(fctDay) {

    //console.log("------------------------------------------------------------");
    //console.log("makeDayHtml");
    //console.log("------------------------------------------------------------");
    //console.log("fctDay : ", fctDay);
    //console.log("------------------------------------------------------------");

    //header html
    var dayHeadHtml = '';
    var fct_day_head = fctDay[0].fct_sea_d;
    var tm_fc = fctDay[0].tm_fc;
    var shortDay = makeDate( fct_day_head[0].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var firstDay = shortDay.getDate()+'일('+convertWeekKo(shortDay.getDay())+')';
    var shortNextDay = addDays(shortDay, 1);
    var scondDay = shortNextDay.getDate()+'일('+convertWeekKo(shortNextDay.getDay())+')';
    var shortNextTomarrow = addDays(shortDay, 1);
    var thirdDay = shortNextTomarrow.getDate()+'일('+convertWeekKo(shortNextTomarrow.getDay())+')';

    var rowLen = fct_day_head[0].tm_ef;
    rowLen = rowLen.substring(11,13);

    dayHeadHtml += '<tr>';
    dayHeadHtml += '<th rowspan="2" style="width:12%">해상<br/>구역</th>';

    if (rowLen == '12') {
        dayHeadHtml += '<th colspan="1">' + firstDay + '</th>';
    } else {
        dayHeadHtml += '<th colspan="2">' + firstDay + '</th>' ;
    }


    dayHeadHtml += '<th colspan="2">'+scondDay+'</th>';
    dayHeadHtml += '<th colspan="2">'+shortNextTomarrow.getDate()+'일('+convertWeekKo(shortNextTomarrow.getDay())+')</th>';
    dayHeadHtml += '</tr>';
    dayHeadHtml += '<tr>';

    for(var i=0; i<fct_day_head.length; i++){
        var amPm = fct_day_head[i].tm_ef;

        if(amPm.substring(11,13) == '12'){
            dayHeadHtml += '<th>오후</th>';
        } else {
            dayHeadHtml += '<th>오전</th>';
        }
    }

    dayHeadHtml += '</tr>';

    $('#tbl_fctday_head').html(dayHeadHtml);

    //body html
    var dayBodyHtml = '';

    for(var i=0; i<fctDay.length; i++){

        var fct_sea_data = fctDay[i].fct_sea_d;
        var fctDayLen = fct_sea_data.length;
        var reg_id = fctDay[i].reg_id;
        var reg_name = fctDay[i].reg_name;

        reg_name = reg_name.replace("서부","<br/>서부");
        reg_name = reg_name.replace("동부","<br/>동부");
        reg_name = reg_name.replace("중부","<br/>중부");
        reg_name = reg_name.replace("남부","<br/>남부");
        reg_name = reg_name.replace("북부","<br/>북부");
        reg_name = reg_name.replace("먼바다","<br/>먼바다");
        reg_name = reg_name.replace("앞바다","<br/>앞바다");
        reg_name = reg_name.replace("동중","동중<br/>");
        reg_name = reg_name.replace("규슈","규슈<br/>");
        reg_name = reg_name.replace("인천・경기","인천<br/>・<br/>경기");

        var tm_fc = fctDay[i].tm_fc;
        var tm_mk = fctDay[i].tm_mk;

        var dayBodyHtml1 = '<tr><th rowspan="4">'+reg_name+'</th>';
        var dayBodyHtml2 = '<tr>';
        var dayBodyHtml3 = '<tr>';
        var dayBodyHtml4 = '<tr>';

        for(var j=0; j<fct_sea_data.length; j++){

            var tm_ef = fct_sea_data[j].tm_ef;
            var wd = fct_sea_data[j].wd;
            var ws = fct_sea_data[j].ws;
            var wh = fct_sea_data[j].wh;
            var wf = fct_sea_data[j].wf;
            var wf_sky = fct_sea_data[j].wf_sky;
            var wf_pre = fct_sea_data[j].wf_pre;
            var iconName = "ico_WF_" + getIconCode(wf_sky, wf_pre);
//            wf_sky = "ico_WF_" + wf_sky.substring(wf_sky.length - 2, wf_sky.length)
            var sky = '<img src="/htdocs/images/mmr/'+iconName+'.png"/>';

            dayBodyHtml1 += '<td class="date DB03">'+sky+'</td>';
            dayBodyHtml2 += '<td class="date">'+wd+'</td>';
            dayBodyHtml3 += '<td class="date">'+ws+'m/s</td>';
            dayBodyHtml4 += '<td class="date">'+wh+'m</td>';
        }

        dayBodyHtml1 += '</tr>';
        dayBodyHtml2 += '</tr>';
        dayBodyHtml3 += '</tr>';
        dayBodyHtml4 += '</tr>';

        dayBodyHtml+= dayBodyHtml1 + dayBodyHtml2 + dayBodyHtml3 + dayBodyHtml4;

    }
    $('#fctday_title').html("단기(" + tm_fc + ") 발표");
    $('#tbl_fctday_body').html(dayBodyHtml);

}

function makeWeekHtml(fctWeek) {

    var weekHtml = '';
    var reg_id = fctWeek[0].reg_id;
    var reg_name = fctWeek[0].reg_name;
    reg_name = reg_name.replace("서해","서해<br/>");
    reg_name = reg_name.replace("남해","남해<br/>");
    reg_name = reg_name.replace("동해","동해<br/>");
    reg_name = reg_name.replace("동중","동중<br/>");
    reg_name = reg_name.replace("규슈","규슈<br/>");
    var tm_fc = fctWeek[0].tm_fc;
    var tm_mk = fctWeek[0].tm_mk;
    var weekData = fctWeek[0].fct_sea_w;

    var weekDay0 = makeDate( weekData[0].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay1 = makeDate( weekData[1].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay2 = makeDate( weekData[2].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay3 = makeDate( weekData[3].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay4 = makeDate( weekData[4].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay5 = makeDate( weekData[5].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay6 = makeDate( weekData[6].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay7 = makeDate( weekData[7].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay8 = makeDate( weekData[8].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay9 = makeDate( weekData[9].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay10= makeDate( weekData[10].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay11= makeDate( weekData[11].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay12= makeDate( weekData[12].tm_ef );       //  mmrGlobal.js 에 있다!!!

    weekHtml +='<tr class="thead">';
    weekHtml +='<th rowspan="2" style="width:11.6%">해상<br/>구역</th>';
    weekHtml +='<th colspan="2">'+weekDay0.getDate()+'일('+convertWeekKo(weekDay0.getDay())+')</th>';
    weekHtml +='<th colspan="2">'+weekDay2.getDate()+'일('+convertWeekKo(weekDay2.getDay())+')</th>';
    weekHtml +='<th colspan="2">'+weekDay4.getDate()+'일('+convertWeekKo(weekDay4.getDay())+')</th>';
    weekHtml +='</tr>';
    weekHtml +='<tr class="thead">';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='</tr>';

    for(var i=0; i<fctWeek.length; i++){
        weekHtml +='<tr>';
        weekHtml +='<th rowspan="3" style="text-align:center;">'+reg_name+'</th>';
        weekHtml +='<td><img src="'+converToImg(weekData[0].wf_sky + weekData[0].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[1].wf_sky+ weekData[1].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[2].wf_sky+ weekData[2].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[3].wf_sky+ weekData[3].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[4].wf_sky+ weekData[4].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[5].wf_sky+ weekData[5].wf_pre)+'"/></td>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<td style="font-size:10px">'+weekData[0].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+weekData[1].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+weekData[2].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+weekData[3].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+weekData[4].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+weekData[5].wh+'m</td>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<td colspan="6" style="padding:0;">';
        weekHtml +='<table style="width:100%">';
        weekHtml +='<tr class="thead">';
        weekHtml +='<th colspan="2">'+weekDay6.getDate()+'일('+convertWeekKo(weekDay6.getDay())+')</th>';
        weekHtml +='<th colspan="2">'+weekDay8.getDate()+'일('+convertWeekKo(weekDay8.getDay())+')</th>';
        weekHtml +='<th rowspan="2">'+weekDay10.getDate()+'일('+convertWeekKo(weekDay10.getDay())+')</th>';
        weekHtml +='<th rowspan="2">'+weekDay11.getDate()+'일('+convertWeekKo(weekDay11.getDay())+')</th>';
        weekHtml +='<th rowspan="2">'+weekDay12.getDate()+'일('+convertWeekKo(weekDay12.getDay())+')</th>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<th>오전</th>';
        weekHtml +='<th>오후</th>';
        weekHtml +='<th>오전</th>';
        weekHtml +='<th>오후</th>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<td><img src="'+converToImg(weekData[6].wf_sky + weekData[6].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[7].wf_sky + weekData[7].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[8].wf_sky + weekData[8].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[9].wf_sky + weekData[9].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[10].wf_sky + weekData[10].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[11].wf_sky + weekData[11].wf_pre)+'" /></td>';
        weekHtml +='<td><img src="'+converToImg(weekData[12].wf_sky + weekData[12].wf_pre)+'" /></td>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[6].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[7].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[8].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[9].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[10].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[11].wh+'m</td>';
        weekHtml +='<td style="width:12.77%;font-size:9px">'+weekData[12].wh+'m</td>';
        weekHtml +='</tr>';
        weekHtml +='</table>';
        weekHtml +='</td>';
        weekHtml +='</tr>';
    }


    $('#fctweek_title').html("중기(" + tm_fc + ") 발표");
    $('#tbl_fctweek').html(weekHtml);
    $('#tbl_fctweek2').html('');
}

function makeWeekEtcHtml(fctWeek) {

    var weekHtml = '';
    var weekHtml2 = '';
    var reg_id = fctWeek[0].reg_id;
    var reg_name = fctWeek[0].reg_name;
    var tm_fc = fctWeek[0].tm_fc;
    var tm_mk = fctWeek[0].tm_mk;
    var weekData = fctWeek[0].fct_sea_w;


    var weekDay0 = makeDate( weekData[0].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay1 = makeDate( weekData[1].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay2 = makeDate( weekData[2].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay3 = makeDate( weekData[3].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay4 = makeDate( weekData[4].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay5 = makeDate( weekData[5].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay6 = makeDate( weekData[6].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay7 = makeDate( weekData[7].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay8 = makeDate( weekData[8].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay9 = makeDate( weekData[9].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay10= makeDate( weekData[10].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay11= makeDate( weekData[11].tm_ef );       //  mmrGlobal.js 에 있다!!!
    var weekDay12= makeDate( weekData[12].tm_ef );       //  mmrGlobal.js 에 있다!!!

    weekHtml +='<tr class="thead">';
    weekHtml +='<th rowspan="2" style="width:11.6%">해상<br/>구역</th>';
    weekHtml +='<th colspan="2">'+weekDay0.getDate()+'일('+convertWeekKo(weekDay0.getDay())+')</th>';
    weekHtml +='<th colspan="2">'+weekDay2.getDate()+'일('+convertWeekKo(weekDay2.getDay())+')</th>';
    weekHtml +='<th colspan="2">'+weekDay4.getDate()+'일('+convertWeekKo(weekDay4.getDay())+')</th>';
    weekHtml +='</tr>';
    weekHtml +='<tr class="thead">';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='<th style="width:14.3%">오전</th>';
    weekHtml +='<th style="width:14.3%">오후</th>';
    weekHtml +='</tr>';

    for(var i=0; i<fctWeek.length; i++){

        var rname = fctWeek[i].reg_name;

        rname = rname.replace("동중","동중<br/>");
        rname = rname.replace("규슈","규슈<br/>");

        var wdata = fctWeek[i].fct_sea_w;

        weekHtml +='<tr>';
        weekHtml +='<th rowspan="2" style="text-align:center;">'+rname+'</th>';
        weekHtml +='<td><img src="'+converToImg(wdata[0].wf_sky + wdata[0].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(wdata[1].wf_sky+ wdata[1].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(wdata[2].wf_sky+ wdata[2].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(wdata[3].wf_sky+ wdata[3].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(wdata[4].wf_sky+ wdata[4].wf_pre)+'"/></td>';
        weekHtml +='<td><img src="'+converToImg(wdata[5].wf_sky+ wdata[5].wf_pre)+'"/></td>';
        weekHtml +='</tr>';
        weekHtml +='<tr>';
        weekHtml +='<td style="font-size:10px">'+wdata[0].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+wdata[1].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+wdata[2].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+wdata[3].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+wdata[4].wh+'m</td>';
        weekHtml +='<td style="font-size:10px">'+wdata[5].wh+'m</td>';
        weekHtml +='</tr>';
    }

    weekHtml2 +='<tr class="thead">';
    weekHtml2 +='<th rowspan="2" style="width:12%">해상<br/>구역</th>';
    weekHtml2 +='<th colspan="2">'+weekDay6.getDate()+'일('+convertWeekKo(weekDay6.getDay())+')</th>';
    weekHtml2 +='<th colspan="2">'+weekDay8.getDate()+'일('+convertWeekKo(weekDay8.getDay())+')</th>';
    weekHtml2 +='<th rowspan="2">'+weekDay10.getDate()+'일('+convertWeekKo(weekDay10.getDay())+')</th>';
    weekHtml2 +='<th rowspan="2">'+weekDay11.getDate()+'일('+convertWeekKo(weekDay11.getDay())+')</th>';
    weekHtml2 +='<th rowspan="2">'+weekDay12.getDate()+'일('+convertWeekKo(weekDay12.getDay())+')</th>';
    weekHtml2 +='</tr>';
    weekHtml2 +='<tr>';
    weekHtml2 +='<th>오전</th>';
    weekHtml2 +='<th>오후</th>';
    weekHtml2 +='<th>오전</th>';
    weekHtml2 +='<th>오후</th>';
    weekHtml2 +='</tr>';

    for(var i=0; i<fctWeek.length; i++){

        var rname = fctWeek[i].reg_name;

        rname = rname.replace("동중","동중<br/>");
        rname = rname.replace("규슈","규슈<br/>");

        var wdata = fctWeek[i].fct_sea_w;

        weekHtml2 +='<tr>';
        weekHtml2 +='<th rowspan="2" style="text-align:center;"><b>'+rname+'</b></th>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[6].wf_sky+ wdata[6].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[7].wf_sky+ wdata[7].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[8].wf_sky+ wdata[8].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[9].wf_sky+ wdata[9].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[10].wf_sky+ wdata[10].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[11].wf_sky+ wdata[11].wf_pre)+'" /></td>';
        weekHtml2 +='<td><img src="'+converToImg(wdata[12].wf_sky+ wdata[12].wf_pre)+'" /></td>';
        weekHtml2 +='</tr>';
        weekHtml2 +='<tr>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[6].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[7].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[8].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[9].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[10].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[11].wh+'m</td>';
        weekHtml2 +='<td style="width:12.77%;font-size:9px">'+wdata[12].wh+'m</td>';
        weekHtml2 +='</tr>';
    }

    $('#fctweek_title').html("중기(" + tm_fc + ") 발표");
    $('#tbl_fctweek').html(weekHtml);
    $('#tbl_fctweek2').html(weekHtml2);
}
