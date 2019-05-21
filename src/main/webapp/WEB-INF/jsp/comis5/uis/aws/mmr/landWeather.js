//  fogInfo.js


 var wdkImgList =[
 'N.png', 'NE.png',
 'E.png', 'SE.png',
 'S.png', 'SW.png',
 'W.png', 'NW.png',
 'N.png', '-.png'
 ];

var pageDOMObj= null;
var lastTime= '';
var data= null;
var zoneList= [];
var crrMenu= null;

$(document).ready(function(){

    landWeatherInit();

    fctList();
});

$(document).on("vclick",".wLand",function(){
    var zoneCd = $(this).attr("val");
    var startTime;

    $(".wLand").removeClass("active");
    $(this).addClass("active");

    requestForecast(zoneCd, startTime);
});


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




function landWeatherInit(){

    this.pageDOMObj = $('#page_all');
    var $DOMObj = this.pageDOMObj;

    this.setLayout();
    //  this.setEvent();

    // 예보지역 선택 쿠키 불러오기
    var cookie = $.cookie("mmrFct");
;
    if (cookie == null) {
        var mrpt3 = $.cookie('mrpt3');
        this.zoneList = this.getDefaultZone(mrpt3);
    }
    else {

        var tempCookie = [];
        for (var i = 0; i < cookie.length; i++) {
            var item = cookie[i];
            if (item && item.zoneCd && item.zoneCd.length && item.zoneCd.length == 8) {
                tempCookie.push(item);
            }
        }
        if (tempCookie.length == 0) {
            this.zoneList = this.getDefaultZone(mrpt3);
        }
        else {
            this.zoneList = tempCookie;
        }
    }
    //  this.makeZoneUi();

    if (crrMenu) {
        this.requestForecast(crrMenu);
        $('#subnav_forecast a').removeClass('on');
        $("#subnav_forecast").children("[value='" + crrMenu + "']").addClass("on");
    }
    else {

        this.requestForecast();
    }
}

function requestForecast(zoneCd, startTime){

    //console.log("---------------------------------------------------------");
    //console.log("requestForecast(zoneCd, startTime)");
    //console.log("---------------------------------------------------------");
    //console.log("zoneCd    : " , zoneCd);
    //console.log("startTime : " , startTime);
    //console.log("---------------------------------------------------------");

    if (!zoneCd) zoneCd = this.zoneList[0].zoneCd;
    if (!startTime) startTime = getCrrBaseTime(10, 60);

    $.mobile.showPageLoadingMsg();

    //console.log("this.zoneList : " , this.zoneList );
    //console.log("zoneCd        : " , zoneCd);
    //console.log("---------------------------------------------------------");

    ku.req.addParam("type", "forecast");
    ku.req.addParam("regionId", zoneCd);

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

function getSkyClass(pty, sky){
    if (pty == 1) {
        return "DB05";
    }
    else if (pty == 2) {
        return "DB06";
    }
    else if (pty == 3) {
        return "DB08";
    }
    else { // pty == 0
        if (sky == 1) {
            return "DB01";
        }
        else if (sky == 2) {
            return "DB02";
        }
        else if (sky == 3) {
            return "DB03";
        }
        else if (sky == 4) {
            return "DB04";
        }
        else {
            return "-";
        }
    }

    return skyClass;
}

function getRainStr(rain, snow){
    if (!rain) rain = "";
    if (!snow) snow = "";

    var retStr = rain;
    if (retStr == "") retStr = "-";
    else
        retStr += " mm";
    if (snow != "") {
        if (retStr == "-") retStr = "";
        retStr += " (" + snow + "cm)";
    }

    return retStr;
}

function getWindDirImage(val){
    if (!val || val == "") return wdkImgList[wdkImgList.length - 1];
    var wndIndex = Math.floor((parseFloat(val) + 22.5) % 360 / 45.0);
    if (wndIndex >= 8) wndIndex = 0;

    return wdkImgList[wndIndex];
}

function formatDate(date){
    if (!date.getDay) return "00월 00일 (X)";

    var ret = (date.getMonth() + 1) + "월 " + date.getDate() + "일 ";
    switch (date.getDay()) {
        case 0:
            ret += "(일)";
            break;
        case 1:
            ret += "(월)";
            break;
        case 2:
            ret += "(화)";
            break;
        case 3:
            ret += "(수)";
            break;
        case 4:
            ret += "(목)";
            break;
        case 5:
            ret += "(금)";
            break;
        case 6:
            ret += "(토)";
            break;
        default:
            ret += "(X)";
            break;
    }

    return ret;
}

function makeHtml(data){

      var $DOMObj = pageDOMObj;
      var castDate = new Date(data.obsd[data.obsd.length-1].tm.substring(0,4)
                              , parseInt(data.obsd[data.obsd.length-1].tm.substring(5,7),10)-1
                              , data.obsd[data.obsd.length-1].tm.substring(8,10)
                              , data.obsd[data.obsd.length-1].tm.substring(11,13)
                              , data.obsd[data.obsd.length-1].tm.substring(14,16));
 //     var castDate = new Date(2014,(7-1),30,17,25);

      if (castDate.getHours() == 0)
        castDate = new Date(castDate.setDate(castDate.getDate()-1));

      var dateRowSpan = 1;
      var numDate = 0;
      var numRow = 0;
      var flagDateStart = true;
      var flagDateEnd = false;
      var flagDateEven = true;
      var lastVsrt;
      var lastShrt;

      var html = '';
      html+='<!-- 상단 헤더 시작 -->';
      html+=' <tr class="tbl_thh">';
      html+='  <th colspan=3>예보구분/시각</th>';
      html+='  <th style="width: 10%;">날씨</th>';
      html+='  <th style="width: 10%;">강수<br/>확률</th>';
      html+='  <th>강수량<br/>(적설)</th>';
      html+='  <th><span class="low_deg">최저</span><br/><span class="high_deg">최고</span></th>';
      html+='  <th style="width: 10%;">기온 (℃)</th>';
      html+='  <th>습도</th>';
      html+='  <th>풍향</th>';
      html+='  <th>풍속<br/>(m/s)</th>';
      html+=' </tr>';
      html+='<!-- 상단 헤더 끝 -->';

      var preDate = null;
      var crrDate = null;

      // 현황 채우기
      html+='<!-- 현황 시작 -->';

      for (var i=0; i<data.obsd.length; i++) {
        var date = data.obsd[i].tm.substring(0,10);
        crrDate = new Date(date.substring(0,4), parseFloat(date.substring(5,7))-1, date.substring(8,10));
        if (preDate == null)
          preDate = crrDate;
        if (crrDate.getDate() != preDate.getDate()) {
           flagDateEnd = true;
           preDate = crrDate;
        }

        var time = data.obsd[i].tm.substring(11,13);
        if (time == "00" || time == "24") {
          time = "24";
        }

        html+=' <tr class="odam' + (flagDateEnd ? ' day_end">' : '">');
        if (i == 0) {
          html+='  <th rowspan='+data.obsd.length+' class="type odam">현 황</th>';
        }
        if (flagDateStart == true) {
          // 현황에서 날짜가 변하면 1일 전부터 날짜 시작
          html = html.replace("{rowspan}", dateRowSpan).replace("{date}", this.formatDate(new Date(preDate.getYear(), preDate.getMonth(), preDate.getDate()-1)));
          flagDateEven = !flagDateEven;
          html+='  <th rowspan={rowspan} class="'+(flagDateEven?'date2':'date')+'">{date}</th>';
          dateRowSpan = 0;
          flagDateStart = false;
        }
        var sky = data.obsd[i].sky;
        var rn1 = data.obsd[i].rn1;
        var sn3 = data.obsd[i].sn3;
        var ta = data.obsd[i].ta;
        var wd = data.obsd[i].wd;
        var ws = data.obsd[i].ws;
        var rh = data.obsd[i].rh;
        var vec = data.obsd[i].vec;
        var pty = data.obsd[i].pty;

        html+='  <th class="'+(flagDateEven?'date2':'date')+' time at_line"><p>'+time+'시</p></th>';
        html+='  <td class="'+getSkyClass(pty, sky)+'"> sssss '+getSkyClass(pty, sky)+' </td>';
        html+='  <td>&nbsp;</td>';
        html+='  <td>'+getRainStr(rn1,sn3)+'</td>';
        html+='  <td>&nbsp;</td>';
        html+='  <td class="degree at_line"><p>'+this.nvl(ta)+'</p></td>';
        html+='  <td class="mos at_line"><p>'+this.nvl(rh)+'</p></td>';
        if (!ws || ws == "" || ws=="0" || !wd || wd=="")
          html+='  <td class="at_line">-</td>';
        else
          html+='  <td class="at_line"><img src="/htdocs/images/mmr/'+getWindDirImage(wd)+'" alt="'+this.nvl(wd)+'"/></td>';
        html+='  <td class="wind_speed at_line"><p>'+this.nvl(ws)+'</p></td>';
        html+=' </tr>';

        if (flagDateEnd) {
          flagDateEnd = false;
          flagDateStart = true;
        }
        dateRowSpan++;
      }
      html+='<!-- 현황 끝 -->';

      html+='<!-- 초단기 시작 -->';

      for (var i=0; i<data.vsrt.length; i++) {
        var date = data.vsrt[i].tm_ef.substring(0,10);
        crrDate = new Date(date.substring(0,4), parseFloat(date.substring(5,7))-1, date.substring(8,10));
        if (preDate == null)
          preDate = crrDate;
        if (crrDate.getDate() != preDate.getDate()) {
           flagDateEnd = true;
           preDate = crrDate;
        }

        var time = data.vsrt[i].tm_ef.substring(11,13);
        if (time == "00" || time == "24") {
          time = "24";
        }
        lastVsrt = time;

        var sky = data.vsrt[i].sky;
        var pty = data.vsrt[i].pty;
        var rn1 = data.vsrt[i].rn1;

        html+=' <tr class="vsrt' + (flagDateEnd ? ' day_end">' : '">');
        if (i==0)
          html+='  <th rowspan='+data.vsrt.length+' class="type vsrt">초단기</th>';
        if (flagDateStart == true) {
          html = html.replace("{rowspan}", dateRowSpan).replace("{date}", this.formatDate(new Date(preDate.getYear(), preDate.getMonth(), preDate.getDate()-1)));
          castDate = new Date(castDate.setDate(castDate.getDate()+1));
          flagDateEven = !flagDateEven;
          html+='  <th rowspan={rowspan} class="'+(flagDateEven?'date2':'date')+'">{date}</th>';
          dateRowSpan = 0;
          flagDateStart = false;
        }
        html+='  <th class="'+(flagDateEven?'date2':'date')+' time at_line"><p>'+time+'시</p></th>';
        html+='  <td class="'+getSkyClass(pty,sky)+'">'+getSkyClass(pty,sky)+'</td>';
        html+='  <td>&nbsp;</td>';
        html+='  <td>'+getRainStr(rn1,"")+'</td>';
        html+='  <td>&nbsp;</td>';
        // 초단기 마지막 행에 단기 첫항 넣기
        if (i != data.vsrt.length - 1) {
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
        }
        else {
          html+='  <td class="degree at_line"><p>{2}</p></td>';
          html+='  <td class="mos at_line"><p>{mos}</p></td>';
          html+='  <td class="at_line"><img src="/htdocs/images/mmr/{3}" alt="{3}"/></td>';
          html+='  <td class="wind_speed at_line"><p>{4}</p></td>';
        }
        html+=' </tr>';

        if (flagDateEnd) {
          flagDateEnd = false;
          flagDateStart = true;
        }
        dateRowSpan++;
      }
      html+='<!-- 초단기 끝 -->';

      var crrShrtTime;
      html+='<!-- 동네예보 시작 -->';
      var flagShrtStart = false;
      var shortSkip = null;
      var iTmp = 0;
      for (var i=0; i<data.shrt.length; i++) {
        var date = data.shrt[i].tm_ef.substring(0,10);
        crrDate = new Date(date.substring(0,4), parseFloat(date.substring(5,7))-1, date.substring(8,10));
        if (preDate == null)
          preDate = crrDate;
        if (crrDate.getDate() != preDate.getDate()) {
           flagDateEnd = true;
           preDate = crrDate;
        }

        crrShrtTime = new Date(data.shrt[i].tm_ef);
        var time = data.shrt[i].tm_ef.substring(11,13);
        if (time == "00" || time == "24") {
          time = "24";
        }
        // 동네예보 첫 데이터의 시점값을 초단기 마지막에 기입
        if (shortSkip==null && !flagShrtStart) {
          shortSkip = i + 1;
          flagShrtStart = true;
          html = html.replace('{2}', this.nvl(data.shrt[i].ta)).replace('{3}',getWindDirImage(data.shrt[i].wd))
            .replace('{4}', data.shrt[i].ws==""?"-":Math.round(data.shrt[i].ws)).replace("{mos}", this.nvl(data.shrt[i].rh));
          continue;
        }
        lastShrt = time;
        if (time == "24")
          flagDateEnd = true;

        // 강수량 표시해야 하는지 판단
        var rnRowSpan = 0;
        if (flagShrtStart) {
          if (time=="03" || time=="09"  || time=="15" || time=="21")
            rnRowSpan = 2;
          else
            rnRowSpan = 1;
        }
        else {
          if (time=="03" || time=="09"  || time=="15" || time=="21")
            rnRowSpan = 2;
          else
            rnRowSpan = 0;
        }
        // 최저/최고 표시해야 하는지 판단
        var tmRowSpan = 0;
        if (flagShrtStart) {
          tmRowSpan = (27 - parseInt(time,10)) / 3;
        }
        else {
          if (time == "03") {
            if (data.shrt.length - i == 4)
              tmRowSpan = 4;
            else
              tmRowSpan = 8;

              html = html.replace("{tmn}", "-").replace("{tmx}", "-");
          }
        }

        var sky = data.shrt[i].sky;
        var pty = data.shrt[i].pty;
        var pop = data.shrt[i].pop;
        var rh = data.shrt[i].rh;
        var rn = data.shrt[i].rn;
        var sn = data.shrt[i].sn;
        var tmn = data.shrt[i].tmn;
        if (!tmn) tmn = "-";
        else if (tmn == "") tmn = "-";
        var tmx = data.shrt[i].tmx;
        if (!tmx) tmx = "-";
        else if (tmx == "") tmx = "-";
        var ta = data.shrt[i].ta;
        var wd = data.shrt[i].wd;
        var ws = data.shrt[i].ws;
        if (ws == "") ws = "-"; else ws = Math.round(ws);
        var vec = data.shrt[i].vec;

        html+=' <tr class="shrt' + (flagDateEnd ? ' day_end">' : '">');
        if (flagShrtStart) {
          html+='  <th rowspan="'+(data.shrt.length-shortSkip)+'" class="type shrt">동 네 예 보</th>';
          flagShrtStart = false;
        }
        if (flagDateStart == true) {
          html = html.replace("{rowspan}", dateRowSpan).replace("{date}", this.formatDate(castDate));
          castDate = new Date(castDate.setDate(castDate.getDate()+1));
          flagDateEven = !flagDateEven;
          html+='  <th rowspan={rowspan} class="'+(flagDateEven?'date2':'date')+'">{date}</th>';
          dateRowSpan = 0;
          flagDateStart = false;
        }
        html+='  <th class="'+(flagDateEven?'date2':'date')+' time at_line"><p>'+time+'시</p></th>';
        html+='  <td class="'+getSkyClass(pty,sky)+'">'+getSkyClass(pty,sky)+'</td>';
        html+='  <td>'+this.nvl(pop)+'%</td>';
        if (rnRowSpan != 0)
          html+='  <td rowspan='+rnRowSpan+'>'+getRainStr(rn,sn)+'</td>';
        if (tmRowSpan != 0) {
          html+='  <td rowspan='+tmRowSpan+'><span class="low_deg">{tmn}</span><br/><span class="high_deg">{tmx}</span></td>';
          iTmp++;
        }
        html+='  <td class="degree at_line"><p>'+this.nvl(ta)+'</p></td>';
        html+='  <td class="mos at_line"><p>'+this.nvl(rh)+'</p></td>';
        html+='  <td class="at_line"><img src="/htdocs/images/mmr/'+getWindDirImage(wd)+'" alt="'+wd+'"/></td>';
        html+='  <td class="wind_speed at_line"><p>'+ws+'</p></td>';
        html+=' </tr>';

        if (flagDateEnd) {
          flagDateEnd = false;
          flagDateStart = true;
        }
        dateRowSpan++;

        if (time == "06")
          html = html.replace("{tmn}", tmn);
        else if (time == "15")
          html = html.replace("{tmx}", tmx);
      }
      html = html.replace("{tmn}", "-").replace("{tmx}", "-");
      html+='<!-- 동네예보 끝 -->';

      html+='<!-- 중기예보 시작 -->';
      var flagWeekStart = true;
      var weekRowSpan = 0;
      var shrtEndDate = new Date(crrShrtTime.getFullYear().toString(), crrShrtTime.getMonth(), crrShrtTime.getDate());
      for (var i=0; i<data.medm.length; i++) {
        var medmDate = new Date(data.medm[i].tm_ef.substring(0,4)
                              , parseInt(data.medm[i].tm_ef.substring(5,7),10)-1
                              , data.medm[i].tm_ef.substring(8,10));

        // 겹치는 부분 필터링
        if (lastShrt != "12") // 동네예보가 자정에 끝난 경우 --> 다음날 자료부터 유효
        {
          if (medmDate < shrtEndDate)
            continue;
        }
        else // 동네예보가 정오에 끝난 경우 --> 동일 일 오후부터 유효
        {
          if (medmDate < shrtEndDate)
            continue;
        }

        var mon = parseInt(data.medm[i].tm_ef.substring(5,7),10);
        var day = parseInt(data.medm[i].tm_ef.substring(8,10),10);
        var date = new Date(data.medm[i].tm_ef.substring(0,4),mon-1,day);
        var ap = data.medm[i].ap;
        var ww1 = data.medm[i].ww1;
        var ww2 = data.medm[i].ww2;
        var tmn = data.medm[i].tmn;
        var tmx = data.medm[i].tmx;

        if (flagWeekStart) {
          if (lastShrt != "12") {
            html = html.replace("{rowspan}", dateRowSpan).replace("{date}", this.formatDate(castDate));
            castDate = new Date(castDate.setDate(castDate.getDate()+1));
            html+=' <tr class="week">';
            html+='  <th rowspan={rowspan} class="type week">중 기 예 보</th>';
            flagDateEven = !flagDateEven;
            html+='  <th rowspan=2 class="'+(flagDateEven?'date2':'date')+' date_text">'+this.formatDate(date)+"</th>";
            castDate = new Date(castDate.setDate(castDate.getDate()+1));
            html+='  <th class="'+(flagDateEven?'date2':'date')+'">오전</th>';
            html+='  <td class="'+ww1+'">'+ww1+'</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td rowspan=2><span class="low_deg">'+tmn+'</span><br/><span class="high_deg">'+tmx+'</span></td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+=' </tr>';
            html+=' <tr class="week day_end">';
            html+='  <th class="'+(flagDateEven?'date2':'date')+'">오후</th>';
            html+='  <td class="'+ww2+'">'+ww2+'</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+=' </tr>';
            weekRowSpan += 2;
          }
          else {
            html = html.replace("{rowspan}", dateRowSpan+1).replace("{date}", this.formatDate(castDate));
            castDate = new Date(castDate.setDate(castDate.getDate()+1));
            html+=' <tr class="week day_end">';
            html+='  <th rowspan={rowspan} class="type week">중 기 예 보</th>';
            html+='  <th class="'+(flagDateEven?'date2':'date')+'">오후</th>';
            html+='  <td class="'+ww2+'">'+ww2+'</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td><span class="low_deg">'+tmn+'</span><br/><span class="high_deg">'+tmx+'</span></td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+='  <td>&nbsp;</td>';
            html+=' </tr>';
            weekRowSpan += 1;
          }

          flagWeekStart = false;
          continue;
        }

        if (ap != "20") {
          html+=' <tr class="week">';
          flagDateEven = !flagDateEven;
          html+='  <th rowspan=2 class="'+(flagDateEven?'date2':'date')+' date_text">'+this.formatDate(date)+"</th>";
          castDate = new Date(castDate.setDate(castDate.getDate()+1));
          html+='  <th class="'+(flagDateEven?'date2':'date')+'">오전</th>';
          html+='  <td class="'+ww1+'">'+ww1+'</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td rowspan=2><span class="low_deg">'+tmn+'</span><br/><span class="high_deg">'+tmx+'</span></td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+=' </tr>';
          html+=' <tr class="week day_end">';
          html+='  <th class="'+(flagDateEven?'date2':'date')+'">오후</th>';
          html+='  <td class="'+ww2+'">'+ww2+'</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+=' </tr>';
          weekRowSpan += 2;
        } else {
          html+=' <tr class="week day_end">';
          flagDateEven = !flagDateEven;
          html+='  <th colspan=2 class="'+(flagDateEven?'date2':'date')+' date_text">'+this.formatDate(date)+"</th>";
          castDate = new Date(castDate.setDate(castDate.getDate()+1));
          //html+='  <th class="'+(flagDateEven?'date2':'date')+'">전일</th>';
          html+='  <td class="'+ww1+'">'+ww1+'</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td><span class="low_deg">'+tmn+'</span><br/><span class="high_deg">'+tmx+'</span></td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+='  <td>&nbsp;</td>';
          html+=' </tr>';
          weekRowSpan += 1;
        }
      }
      html = html.replace("{rowspan}", weekRowSpan);
      html+='<!-- 중기예보 끝 -->';

      $("#cast_table").html(html);

      windowSetup();
    }


function setLayout(){
    $('#forecast_region').html('');
    $('#forecast_contents').html('');

    $("div [id^='subnav_']").hide();
    $("#subnav_forecast").show();
    $("[data-role='footer']").hide();
}





// 기본 예보지역 선택
function getDefaultZone(regionCd){
    if (!regionCd) regionCd = "";

    var retZoneList;
    switch (regionCd) {
        case "":
            retZoneList = [{
                zoneCd: "11B10101",
                zoneName: "서울"
            }, {
                zoneCd: "11D20501",
                zoneName: "강릉"
            }, {
                zoneCd: "11C20401",
                zoneName: "대전"
            }, {
                zoneCd: "11F20501",
                zoneName: "광주"
            }, {
                zoneCd: "11H20201",
                zoneName: "부산"
            }, {
                zoneCd: "11G00201",
                zoneName: "제주"
            }];
            break;
        case 11:
        case '11':
        case '11000':
            retZoneList = [{
                zoneCd: "11B10101",
                zoneName: "서울"
            }, {
                zoneCd: "11B20302",
                zoneName: "고양"
            }, {
                zoneCd: "11B20605",
                zoneName: "성남"
            }];
            break;
        case 26:
        case '26':
        case '26000':
            retZoneList = [{
                zoneCd: "11H20201",
                zoneName: "부산"
            }, {
                zoneCd: "11H20101",
                zoneName: "울산"
            }, {
                zoneCd: "11H20102",
                zoneName: "양산"
            }];
            break;
        case 27:
        case '27':
        case '27000':
            retZoneList = [{
                zoneCd: "11H10701",
                zoneName: "대구"
            }, {
                zoneCd: "11H10201",
                zoneName: "포항"
            }, {
                zoneCd: "11H10202",
                zoneName: "경주"
            }];
            break;
        case 28:
        case '28':
        case '28000':
            retZoneList = [{
                zoneCd: "11B20201",
                zoneName: "인천"
            }, {
                zoneCd: "11B20204",
                zoneName: "부천"
            }, {
                zoneCd: "11B20203",
                zoneName: "안산"
            }];
            break;
        case 29:
        case '29':
        case '29000':
            retZoneList = [{
                zoneCd: "11F20501",
                zoneName: "광주"
            }, {
                zoneCd: "11F20503",
                zoneName: "나주"
            }, {
                zoneCd: "11F20504",
                zoneName: "담양"
            }];
            break;
        case 30:
        case '30':
        case '30000':
            retZoneList = [{
                zoneCd: "11C20401",
                zoneName: "대전"
            }, {
                zoneCd: "11C20404",
                zoneName: "세종"
            }, {
                zoneCd: "11C20403",
                zoneName: "계룡"
            }];
            break;
        case 31:
        case '31':
        case '31000':
            retZoneList = [{
                zoneCd: "11H20101",
                zoneName: "울산"
            }, {
                zoneCd: "11H10202",
                zoneName: "경주"
            }, {
                zoneCd: "11H10201",
                zoneName: "포항"
            }];
            break;
        case 41:
        case '41':
            retZoneList = [{
                zoneCd: "11B20601",
                zoneName: "수원"
            }, {
                zoneCd: "11B20605",
                zoneName: "성남"
            }, {
                zoneCd: "11B20301",
                zoneName: "의정부"
            }];
            break;
        case 42:
        case '42':
            retZoneList = [{
                zoneCd: "11D10301",
                zoneName: "춘천"
            }, {
                zoneCd: "11D10401",
                zoneName: "원주"
            }, {
                zoneCd: "11D20501",
                zoneName: "강릉"
            }];
            break;
        case 43:
        case '43':
            retZoneList = [{
                zoneCd: "11C10301",
                zoneName: "청주"
            }, {
                zoneCd: "11C10101",
                zoneName: "충주"
            }, {
                zoneCd: "11C10201",
                zoneName: "제천"
            }];
            break;
        case 44:
        case '44':
            retZoneList = [{
                zoneCd: "11C20401",
                zoneName: "대전"
            }, {
                zoneCd: "11C20301",
                zoneName: "천안"
            }, {
                zoneCd: "11C20402",
                zoneName: "공주"
            }];
            break;
        case 45:
        case '45':
            retZoneList = [{
                zoneCd: "11F10201",
                zoneName: "전주"
            }, {
                zoneCd: "21F10501",
                zoneName: "군산"
            }, {
                zoneCd: "11F10202",
                zoneName: "익산"
            }];
            break;
        case 46:
        case '46':
            retZoneList = [{
                zoneCd: "11F20501",
                zoneName: "광주"
            }, {
                zoneCd: "21F20801",
                zoneName: "목포"
            }, {
                zoneCd: "11F20401",
                zoneName: "여수"
            }];
            break;
        case 47:
        case '47':
            retZoneList = [{
                zoneCd: "11H10701",
                zoneName: "대구"
            }, {
                zoneCd: "11H10201",
                zoneName: "포항"
            }, {
                zoneCd: "11H10202",
                zoneName: "경주"
            }];
            break;
        case 48:
        case '48':
            retZoneList = [{
                zoneCd: "11H20201",
                zoneName: "부산"
            }, {
                zoneCd: "11H20101",
                zoneName: "울산"
            }, {
                zoneCd: "11H20301",
                zoneName: "창원"
            }];
            break;
        case 50:
        case '50':
            retZoneList = [{
                zoneCd: "11G00201",
                zoneName: "제주"
            }, {
                zoneCd: "11G00401",
                zoneName: "서귀포"
            }];
            break;
        default:
            // 시군 해당 예보코드 조회
            var regionCd;
            var zoneName;

            $.ajax({
                url: '/afsOut/mmr/adm/retAdmReginMatchCmd.kajx',
                dataType: "json",
                async: false,
                data: {
                    regionCd: regionCd
                }
            }).done(function(resp2){
                regionCd = resp2.data.regionId;
                zoneName = resp2.data.regionName;
            });

            retZoneList = [{
                zoneCd: regionCd,
                zoneName: zoneName
            }];
            break;
    }

    return retZoneList;
}
