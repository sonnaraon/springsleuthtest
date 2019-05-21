//  fogInfo.js


 var wdkImgList =[
 'N.png', 'NE.png',
 'E.png', 'SE.png',
 'S.png', 'SW.png',
 'W.png', 'NW.png',
 'N.png', '-.png'
 ];

var lastTime= '';
var data= null;
var zoneList= [];
var crrMenu= null;


$(document).ready(function(){
    fctList();          //  관심지역 설정 : 예보 지역 탭목록 만든다!!!
    landWeatherInit();  //  종합예표를 표출한다.
});

var zoneCd = "";

$(document).on("vclick",".wLand",function(){

    zoneCd = $(this).attr("val");

    $(".wLand").removeClass("active");
    $(this).addClass("active");

    requestForecast(zoneCd);
});

/**
 * 예보지역 리스트 만들기
 */
function fctList() {

    //console.log("---------------------------------------------------------");
    //console.log("fctList()");
    //console.log("---------------------------------------------------------");

    var fctList = $.cookie("mmrFct");
    var fctListLeng = fctList.length;

    //console.log("fctList : " , fctList);
    //console.log("fctListLeng : " , fctListLeng);
    //console.log("---------------------------------------------------------");

    var topM_html = "";
    var activeId = "";
    for (var i = 0 ; i < fctListLeng ; i++ ) {

        if( i == 0 ) {
            activeId = "#" + fctList[i].mmrFctId;
        }

        //console.log("mmrFctId   : " , fctList[i].mmrFctId);
        //console.log("mmrFctName : " , fctList[i].mmrFctName);

        topM_html += '<li id="' + fctList[i].mmrFctId + '" val="' + fctList[i].mmrFctId + '" class="wLand"><a>' + fctList[i].mmrFctName + '</a></li>';
    }

    //console.log("---------------------------------------------------------");

    $("#topM_wLand>ul").html(topM_html);

    $(activeId).addClass("active");
}



//  종합예보 표를 만든다!!!
function landWeatherInit(){

    //console.log("---------------------------------------------------------");
    //console.log("landWeatherInit()");
    //console.log("---------------------------------------------------------");

    // 예보지역 선택 쿠키 불러오기
    var cookie = $.cookie("mmrFct");

    //console.log("cookie : ", cookie);

    if (cookie == null) {
        zoneCd = "11B10101";
    } else {
        zoneCd = cookie[0].mmrFctId;
    }

    requestForecast(zoneCd);
}


//  종합예보 표 만들기!!!!!
function requestForecast(zoneCd){

    //console.log("---------------------------------------------------------");
    //console.log("requestForecast(zoneCd)");
    //console.log("---------------------------------------------------------");
    //console.log("zoneCd    : " , zoneCd);
    //console.log("---------------------------------------------------------");

    $.mobile.showPageLoadingMsg();

    //console.log("zoneCd        : " , zoneCd);
    //console.log("---------------------------------------------------------");

    ku.req.addParam("type", "forecast");
    ku.req.addParam("regionId", zoneCd);
    ku.req.addParam("_DT", "MMR:WEATHERMAN:LAND");

    ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanLand.kajx", function(data, err){
        if (err){
            alert('데이터를 가져오지 못하였습니다.');
            $.mobile.hidePageLoadingMsg();
            return;
        }
        makeHtml(data);
        $.mobile.hidePageLoadingMsg();
    });
}

function nvl(val, alterVal){
    if (!alterVal) alterVal = "-";

    if (!val) return alterVal;
    if (val == "") return alterVal;
    return val;
}


//  날씨 아이콘!!
function getSkyClass(pty, sky){

    var iconeName = "";
    var iconeSrc = "/htdocs/images/mmr/";

    if (pty == 1) {
        iconeName = "ico_WF_09.png";
    }
    else if (pty == 2) {
        iconeName = "ico_WF_13.png";
    }
    else if (pty == 3) {
        iconeName = "ico_WF_11.png";
    }
    else { // pty == 0
        if (sky == 1) {
            iconeName = "ico_WF_01.png";
        }
        else if (sky == 2) {
            iconeName = "ico_WF_03.png";
        }
        else if (sky == 3) {
            iconeName = "ico_WF_05.png";
        }
        else if (sky == 4) {
            iconeName = "ico_WF_07.png";
        }
        else {
            iconeSrc = "/htdocs/images/mmr/";
            iconeName = "ico_WF_00.png";
        }
    }
    return iconeSrc + iconeName;
}

//  날씨 아이콘 큰놈!!
function getSkyClassBic(pty, sky){

    //console.log("pty : " , pty);
    //console.log("sky : " , sky);

    var iconeName = "";
    var iconeSrc = "/htdocs/images/mmr/";

    if (pty == 1) {
        iconeName = "ico_WF_bic_09.png";
    }
    else if (pty == 2) {
        iconeName = "ico_WF_bic_13.png";
    }
    else if (pty == 3) {
        iconeName = "ico_WF_bic_11.png";
    }
    else { // pty == 0
        if (sky == 1) {
            iconeName = "ico_WF_bic_01.png";
        }
        else if (sky == 2) {
            iconeName = "ico_WF_bic_03.png";
        }
        else if (sky == 3) {
            iconeName = "ico_WF_bic_05.png";
        }
        else if (sky == 4) {
            iconeName = "ico_WF_bic_07.png";
        }
        else {
            iconeSrc = "/htdocs/images/mmr/";
            iconeName = "ico_WF_bic_00.png";
        }
    }
    return iconeSrc + iconeName;
}


//  강수량, 적설량
function getRainStr(rain, snow){

    var html = "";

    //  비가 안오면!!!
    if (!rain) {
    } else {
        html += "<p class='sec_weatherText'>비</p>";
        html += "<p class='rainfall'><span class='TextColor_b'>1시간 강수량:</span>" + rain + "mm</p>";
    }

    //  눈이 안오면!!!
    if (!snow) {
    } else {
        html += "<p class='sec_weatherText'>눈</p>";
        html += "<p class='rainfall'><span class='TextColor_b'>1시간 적설량:</span>" + snow + "cm</p>";
    }

    return html;
}


//  육상 종합예보 표출하는 놈이다!!!
function makeHtml(data){

    obsdHtml(data);

    vsrtHtml(data);

    shrtHtml(data);

    medmAmHtml(data);
}

//  현황
function obsdHtml(data) {

    // 현황 채우기

    var stnsData = data.stns;
    var stnsTm_in = stnsData.tm_in;
    var stnsTm_in_hhmm = stnsTm_in.substring(11,16);

    var obsdLength = data.obsd.length;
    var obsdData = data.obsd[obsdLength-1];
    var obsdTm = obsdData.tm;
    var obsdTm_hh = obsdTm.substring(11,13);
    var obsdTm_hhmm = obsdTm.substring(11,16);
    /******* 초단기실황의 타이틀 명칭 수정_20180713 *******/
    //var obsdTitle = obsdTm_hh + "시 현재날씨(" + obsdTm_hhmm + " 발표)";
    var obsdTitle = "현재날씨(" + obsdTm_hhmm + " 발표)";

    $("#obsdTitle").html( obsdTitle );

    var obsdIcone = getSkyClassBic(obsdData.pty, obsdData.sky);
    var weatherText = "";
    var tempor = obsdData.ta;
    
    /******* 강수형태 유무에 따른 아이콘 표시 수정_20180716 start *******/
    //var fcAllTodayHtml = "<div class='sec_weather'><img src='" + obsdIcone + "' /></div>";
    var fcAllTodayHtml = "";
    if (obsdData.pty != 0) {
    	fcAllTodayHtml = "<div class='sec_weather'><img src='" + obsdIcone + "' /></div>";
    } else {
    	fcAllTodayHtml = "<div class='sec_weather'></div>";
    }
    /******* 강수형태 유무에 따른 아이콘 표시 수정_20180716 end *******/

    //  경기도쪽 예보가 비가 내리지 않아도 0.0 으로 데이타가 생성되어서 처리해주는 부분이다.
    var rn1Val = 0;
    if( obsdData.rn1 > 0 ) {
        rn1Val = obsdData.rn1;
    }

    //  경기도쪽 예보가 눈이 내리지 않아도 0.0 으로 데이타가 생성되어서 처리해주는 부분이다.
    var sn3Val = 0;
    if( obsdData.sn3 > 0 ) {
        sn3Val = obsdData.sn3
    }

    fcAllTodayHtml += getRainStr(rn1Val, sn3Val);
    
    /******* 강수형태 유무에 따른 아이콘 표시 수정_20180716 start *******/
    //fcAllTodayHtml += "<div class='sec_tempor'>" + tempor + "˚</div>";
    if (obsdData.pty != 0) {
    	fcAllTodayHtml += "<div class='sec_tempor'>" + tempor + "˚</div>";
    } else {
    	fcAllTodayHtml += "<div class='sec_tempor' style='left:0px; padding-left:15px;''>" + tempor + "˚</div>";
    }
    /******* 강수형태 유무에 따른 아이콘 표시 수정_20180716 end *******/

    //  날씨 예보 표출 - 현황!!!
    $("#FC_ALL_today").html(fcAllTodayHtml);
}

function tmFcCompare(curHours){
	if(curHours >= 23 || curHours < 2){
		curHours = "23:00";
	}else if(curHours >= 20){
		curHours = "20:00";
	}else if(curHours >= 17){
		curHours = "17:00";
	}else if(curHours >= 14){
		curHours = "14:00";
	}else if(curHours >= 11){
		curHours = "11:00";
	}else if(curHours >= 8){
		curHours = "08:00";
	}else if(curHours >= 5){
		curHours = "05:00";
	}else if(curHours >= 2){
		curHours = "02:00";
	}
	return curHours;
}

//  초단기
function vsrtHtml(data) {

    //  초단기 - 시작!!! ----------------------------------------------------------------->

    var vsrtLength = data.vsrt.length;
    var fcAllToday2Html = "";

    for (var i=0; i<vsrtLength; i++) {

        var vsrtData = data.vsrt[i];
        var vsrtEfDate = vsrtData.tm_ef;
        var vsrtEfDate_hh = vsrtEfDate.substring(11,13);
        var vsrtIcone = getSkyClass(vsrtData.pty, vsrtData.sky);

        fcAllToday2Html += '<div class="sec_weather_h">' + vsrtEfDate_hh + '시예보:<img src="' + vsrtIcone + '" /></div>';
    }

    //  초단기 예보 표출!!!
    $( "#FC_ALL_today2" ).html( fcAllToday2Html );

    //  초단기 - 종료!!! ----------------------------------------------------------------->
}


//  동네 예보
function shrtHtml(data) {

    var shrtTmFc = "";                                      // 동네예보 발표시간
    var shrtTmef = "";                                      // 동네예보 Data처리 기준 시간
    var shrtHtml = "";                                      // 동네예보 html
    var shrtLength = data.shrt.length - 1;           //  동네 예보 발생건수 카운트
    var shrtBlankFirsrtThCnt = "";                      //  첫날 예보 발표시점에 따른 공백 카운트

    // 공백 카운트
    var tmefData = parseInt(data.shrt[0].tm_ef.substring(11,13));
    // 현재 시간(동네 예보 발표 1시간 이전 발표시간 비교용)
    var curHours = getTimeStamp().toString().substring(11, 13);


    if(tmefData == '00' || tmefData == '0' || tmefData == 0){
    	shrtBlankFirsrtThCnt = 7;
    }else{
    	shrtBlankFirsrtThCnt = (tmefData - 3) / 3;
    }

    //  동네예보 Data 테이블 생성
    //  00시 data를 전일 24시 data로 수정
    for ( var i=0; i<=shrtLength; i++ ) {

        var shrtData = data.shrt[i];
        shrtTmef = parseInt(shrtData.tm_ef.substring(11,13));

        //  중기예보 발표시간 생성
        if ( i == 0 ) {
            shrtTmFc = shrtData.tm_fc.substring(11,16);
            var shrtHours = shrtData.tm_fc.substring(11,13);
            if(shrtHours > curHours){
            	shrtTmFc = tmFcCompare(curHours);
            }
        }

        //  첫날 th 생성
        if ( i == 0 || (shrtTmef == '03' || shrtTmef == '3' || shrtTmef == 3) ) {
            var d = makeDate( shrtData.tm_ef );        //  mmrGlobal.js 에 위치
            shrtHtml += '<tr>\n';
            shrtHtml += '<th class="">' + d.getDate() + '<br />(' + convertWeekKo ( d.getDay() ) + ')</th>\n';
        }

        // 첫날 예보 발표 시점 공백 생성
        if ( i == 0 && shrtBlankFirsrtThCnt > 0 && shrtBlankFirsrtThCnt < 8) {
            shrtHtml += shrtFirstDayBlankTdMake(shrtBlankFirsrtThCnt);
        }

        // 아이콘 생성
        var shrtIcone = getSkyClass(shrtData.pty, shrtData.sky);

        shrtHtml += '<td class="">\n';
        shrtHtml += '    <div class="sec_Rr"></div>\n';
        shrtHtml += '    <div class="sec_weather"><img src="' + shrtIcone + '" /></div>\n';
        shrtHtml += '    <div class="sec_tempor">' + shrtData.ta + '˚</div>\n';
        shrtHtml += '</td>\n';

        //  종료 <tr> 생성
        if ( i == shrtLength || (shrtTmef == '00' || shrtTmef == '0' || shrtTmef == 0) ) {
            shrtHtml += "</tr>\n";
        }
    }

    $("#shrtTmFc").html(shrtTmFc);

    /*
     * 동네예보 보여줄때 20:00 이후에 발표된 예보는 다음날 00시부터 예보가 생성된다
     */
//    if ( shrtBlankFirsrtThCnt == 8 ) {
//        $("#shrtHtml").html( shrtFirstDayTdMake() + shrtHtml);
//    } else {
//        $("#shrtHtml").html(shrtHtml);
//    }

    $("#shrtHtml").html(shrtHtml);

    // 예보 첫날 td 만드는 함수이다.
    function shrtFirstDayBlankTdMake( shrtBlankFirsrtThCnt )  {

        var html = "";

        for( var i = 0 ; i < shrtBlankFirsrtThCnt ; i++ ) {
            html += '<td class="Nodata">\n';
            html += '    <div class="sec_Rr"></div>\n';
            html += '    <div class="sec_weather"></div>\n';
            html += '    <div class="sec_tempor"></div>\n';
            html += '</td>\n';
        }

        return html;
    }

    /*
     * 저녁 9시 예보는 다음날 00시부터 동네예보가 발표되어서
     * 당일 저녁 9시 예보를 만드는 넘이다!!!
     */
    function shrtFirstDayTdMake() {

        var obsdLength = data.obsd.length - 1;
        var obsdData = data.obsd[obsdLength];

        var d = makeDate( obsdData.tm );        //  mmrGlobal.js 에 위치하고 있다!!!!

        var html = "<tr>\n"

        html += '<th class="">' + d.getDate() + '<br />(' + convertWeekKo ( d.getDay() ) + ')</th>\n';

        html += shrtFirstDayBlankTdMake(7);

        var obsdIcone = getSkyClass(obsdData.pty, obsdData.sky);

        html += '<td class="">\n';
        html += '    <div class="sec_Rr"></div>\n';
        html += '    <div class="sec_weather"><img src="' + obsdIcone + '" /></div>\n';
        html += '    <div class="sec_tempor">' + obsdData.ta + '˚</div>\n';
        html += '</td>\n';
        html += "</tr>\n"

        return html;
    }
    //  동네예보 - 종료!!! ----------------------------------------------------------------->
}


//  중기 예보
function medmAmHtml(data) {


    //  중기예보 - 시작!!! ----------------------------------------------------------------->

    var medmTmFc = '';
    var medmTitlHtml = '';
    var medmAmHtml = '';
    var medmPmHtml = '';
    var medmLength = data.medm.length;

    for (var i = 0; i < medmLength; i++) {

        var medmData = data.medm[i];

        //  중기예보 발표 날자를 가지고 온다.
        //  중기예보 발표 시각은 06:00 과 18:00 두번이다!!!!
        if ( i == 0 ) {
            //  medmTmFc = medmData.tm_fc.substring(11,16);         //  17:00 을 생성
            medmTmFc = medmData.tm_fc.substring(11,13);

            if ( 06 <= medmTmFc && medmTmFc < 18 ) {
                medmTmFc = "06:00";
            } else {
                medmTmFc = "18:00";
            }
        }

        //  날자와 요일을 보여주는 th 부분을 만든다!!!
        if ( i == 0 ) {
            medmTitlHtml += '<tr>\n';
            medmTitlHtml += '<th class=""></th>\n';
        }

        var d = makeDate( medmData.tm_ef );        //  mmrGlobal.js 에 위치하고 있다!!!!

        medmTitlHtml += '<th class="">' + d.getDate() + '(' + convertWeekKo ( d.getDay() ) + ')</th>\n';

        if (i == (medmLength - 1)) {
            medmTitlHtml += '</tr>\n';
        }

        //  날씨를 보여주는 부분을 만든다!
        if( i == 0 ) {
            medmAmHtml += '<tr>\n';
            medmAmHtml += '<th class="">오전</th>';

            medmPmHtml += '<tr>\n';
            medmPmHtml += '<th class="">오후</th>';
        }

        //  오전
        if (medmData.ww1) {

            if( i > 4 ) {
                medmAmHtml += '<td rowspan="2" class="">\n';
                //medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
                if(medmData.ww1 == 'WB02'  ){
                  medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_03.png" /></div>\n';
                }else if(medmData.ww1 == 'WB03'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_05.png" /></div>\n';
                }else if(medmData.ww1 == 'WB09'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_10.png" /></div>\n';
                }else if(medmData.ww1 == 'WB11'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_13.png" /></div>\n';
                }else if(medmData.ww1 == 'WB12'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_11.png" /></div>\n';
                }else {
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
                }
                if (medmData.tmn != '') {
                    medmAmHtml += '    <div class="sec_tempor st_low">' + medmData.tmn + '˚</div>\n';
                }

                if (medmData.tmx != '') {
                    medmAmHtml += '    <div class="sec_tempor st_high">' + medmData.tmx + '˚</div>\n';
                }

                medmAmHtml += '</td>\n';
            } else {
                medmAmHtml += '<td class="">\n';
                //medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
                if(medmData.ww1 == 'WB01'  ){
                  medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
                }else if(medmData.ww1 == 'WB02'  ){
                  medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_03.png" /></div>\n';
                }else if(medmData.ww1 == 'WB03'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_05.png" /></div>\n';
                }else if(medmData.ww1 == 'WB09'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_10.png" /></div>\n';
                }else if(medmData.ww1 == 'WB11'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_13.png" /></div>\n';
                }else if(medmData.ww1 == 'WB12'){
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_11.png" /></div>\n';
                }else {
                   medmAmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
                }
                if(medmData.tmn != '') {
                    medmAmHtml += '    <div class="sec_tempor">' + medmData.tmn + '˚</div>\n';
                }

                medmAmHtml += '</td>\n';
            }

        }

        //  오후
        if( medmData.ww2 ) {
            medmPmHtml += '<td class="">\n';
           // medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
            if(medmData.ww2 == 'WB01'  ){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
            }else if(medmData.ww2 == 'WB02'  ){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_03.png" /></div>\n';
            }else if(medmData.ww2 == 'WB03'){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_05.png" /></div>\n';
            }else if(medmData.ww2 == 'WB09'){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_10.png" /></div>\n';
            }else if(medmData.ww2 == 'WB11'){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_13.png" /></div>\n';
            }else if(medmData.ww2 == 'WB12'){
              medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_11.png" /></div>\n';
            }else {
               medmPmHtml += '    <div class="sec_weather"><img src="/htdocs/images/mmr/ico_WF_01.png" /></div>\n';
            }
            if(medmData.tmx != '') {
                medmPmHtml += '    <div class="sec_tempor">' + medmData.tmx + '˚</div>\n';
            }

            medmPmHtml += '</td>\n';
        }

        if( i == ( medmLength - 1 )) {
            medmAmHtml += '</tr>\n';
            medmPmHtml += '</tr>\n';
        }
    }

    $("#medmTmFc").html( medmTmFc );
    $("#medmTitlHtml").html( medmTitlHtml );
    $("#medmHtml").html( medmAmHtml + medmPmHtml );

    //  중기예보 - 종료!!! ----------------------------------------------------------------->
}