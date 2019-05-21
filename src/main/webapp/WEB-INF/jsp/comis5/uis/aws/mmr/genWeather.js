//  genWeather.js
$(document).ready( function() {
    //console.log("genWeather.js Ready!!!");
    genWeather( "108" );
});

$(document).on("vclick",".wGen",function(){

    var regionId = $(this).attr("val");

    $(".wGen").removeClass("active");
    $(this).addClass("active");

    genWeather( regionId )
});

//  예보 - 육상개황
function genWeather( regionId ) {


    ku.req.addParam("type", "forecast");
    ku.req.addParam("regionId", regionId);
    ku.req.addParam("_DT", "MMR:WEATHERMAN:GEN");
    ku.req.send("/afsOut/mmr/weatherman/retMmrWeathermanGen.kajx", function(data,err) {

        //  $.mobile.showPageLoadingMsg();

        if ( err ) {

        } else {

            var stn_id = data.stns.stn_id;
            var stn_ko = data.stns.stn_ko;
            var tm_mk  = data.stns.tm_mk;
            var retDateTmMk = tm_mk.substring(0,4)+"." +
                                tm_mk.substring(5,7)+"." +
                                tm_mk.substring(8,10)+" " +
                                tm_mk.substring(11,13)+":" +
                                tm_mk.substring(14,16);

            var dayTmfc  = data.fct_day.tm_fc;
            var fctDay1 = makeDate( dayTmfc );        //  mmrGlobal.js 에 위치하고 있다!!!!
            var fctYoil1 = convertWeekKo(fctDay1.getDay());
            var fctDayStr1= fctDay1.getDate()+'일('+fctYoil1+')';

            var fctDay2  = addDays(fctDay1, 1);
            var fctYoil2 = convertWeekKo(fctDay2.getDay());
            var fctDayStr2= fctDay2.getDate()+'일('+fctYoil2+')';

            var fctDay3  = addDays(fctDay1, 1);
            var fctYoil3 = convertWeekKo(fctDay3.getDay());
            var fctDayStr3= fctDay3.getDate()+'일('+fctYoil3+')';

            $('#fct_day1').html(fctDayStr1);
            $('#fct_day3').html(fctDayStr3);
            $('.Portlet.color_a').css('margin-bottom', '0');
            
            var dayRpt1 = data.fct_day.day_rpt1;
//            var dayRpt2 = data.fct_day.day_rpt2;
//            var dayRpt3 = data.fct_day.day_rpt3;

            var weekTmfc= data.fct_week.tm_fc;
            var weekRpt = data.fct_week.week_rpt;

            dayRpt1 = dayRpt1.replace(/₩n/g, "<br/>");
//            dayRpt2 = dayRpt2.replace(/₩n/g, "<br/>");
//            dayRpt3 = dayRpt3.replace(/₩n/g, "<br/>");
            weekRpt = weekRpt.replace(/₩n/g, "<br/>");

            $('#tm_day').html(dayTmfc);

            $('#fct_day1').html(fctDayStr1);
//            $('#fct_day2').html(fctDayStr2);
//            $('#fct_day3').html(fctDayStr3);

            $('#day_rpt1').html(dayRpt1);
//            $('#day_rpt2').html(dayRpt2);
//            $('#day_rpt3').html(dayRpt3);

            $('#tm_week').html(weekTmfc);
            $('#week_rpt').html(weekRpt);

            //console.log("------------------------------------------------------------------------------------------");
            //console.log("dayTmfc    : " , dayTmfc);
            //console.log("fctDayStr1 : " , fctDayStr1);
            //console.log("fctDayStr2 : " , fctDayStr2);
            //console.log("fctDayStr3 : " , fctDayStr3);
            //console.log("dayRpt1    : " , dayRpt1);
            //console.log("dayRpt2    : " , dayRpt2);
            //console.log("dayRpt3    : " , dayRpt3);
            //console.log("weekTmfc   : " , weekTmfc);
            //console.log("weekRpt    : " , weekRpt);
            //console.log("------------------------------------------------------------------------------------------");

        }

        //  $.mobile.hidePageLoadingMsg();
    });
}
