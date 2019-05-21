<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<!-- START CONTAINER -->

<div class="ui-panel-content-wrap ui-body-c ui-panel-animate ui-panel-content-wrap-closed">
<div data-role="content" id="page_contents" class="ui-content" role="main">

<div id="container">
<div class="contents"><!-- 외부컨텐츠 -->


<div class="forecast_total" style="float: none;">
<table id="cast_table" class="forecast_total" border="0">
    <!-- 상단 헤더 시작 -->
    <tr class="tbl_thh">
        <th colspan=3>예보구분/시각</th>
        <th style="width: 10%;">날씨</th>
        <th style="width: 10%;">강수 확률 (%)</th>
        <th>강수량 (적설)</th>
        <th><span class="low_deg">최저</span>/<span class="high_deg">최고</span> (℃)</th>
        <th style="width: 10%;">기온 (℃)</th>
        <th style="width: 10%;">풍향</th>
        <th style="width: 10%;">풍속 (m/s)</th>
    </tr>
    <!-- 상단 헤더 끝 -->
    <!-- 현황 시작 -->
    <tr class="odam">
        <th rowspan=3 class="type odam">현 황</th>
        <th rowspan=9 class="date date_text">0월 0일</th>
        <th class="date time at_line">
        <p>16시</p>
        </th>
        <td class=""></td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="odam">
        <th class="date time at_line">
        <p>17시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="odam">
        <th class="date time at_line">
        <p>18시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <!-- 현황 끝 -->
    <!-- 초단기 시작 -->
    <tr class="vsrt">
        <th rowspan=3 class="type vsrt">초단기</th>
        <th class="date time at_line">
        <p>19시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="vsrt">
        <th class="date time at_line">
        <p>20시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="vsrt">
        <th class="date time at_line">
        <p>21시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>&nbsp;</td>
        <td>-</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <!-- 초단기 끝 -->
    <!-- 동네예보 시작 -->
    <tr class="shrt">
        <th rowspan=19 class="type shrt">동 네 예 보</th>
        <th class="date time at_line">
        <p>18시</p>
        </th>
        <td>&nbsp;</td>
        <td></td>
        <td></td>
        <td rowspan=3><span class="low_deg">-</span>/<span class="high_deg">-</span></td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>21시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>10</td>
        <td rowspan=2></td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="shrt day_end">
        <th class="date time at_line">
        <p>24시</p>
        </th>
        <td class="">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="shrt">
        <th rowspan=8 class="date2 date_text">0월 0일</th>
        <th class="date time at_line">
        <p>03시</p>
        </th>
        <td class="">&nbsp;</td>
        <td></td>
        <td rowspan=2></td>
        <td rowspan=8><span class="low_deg"></span>/<span class="high_deg"></span></td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p></p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>06시</p>
        </th>
        <td class="">&nbsp;</td>
        <td></td>
        <td class="degree at_line">
        <p></p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>09시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>12시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>15시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>18시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>21시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt day_end">
        <th class="date time at_line">
        <p>24시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th rowspan=8 class="date date_text">9월 18일</th>
        <th class="date time at_line">
        <p>03시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td rowspan=8><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>06시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>09시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>12시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>15시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>18시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt">
        <th class="date time at_line">
        <p>21시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td rowspan=2>5~10 mm</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <tr class="shrt day_end">
        <th class="date time at_line">
        <p>24시</p>
        </th>
        <td class="db02">&nbsp;</td>
        <td>10</td>
        <td class="degree at_line">
        <p>27</p>
        </td>
        <td class="at_line"><img src="/htdocs/images/mmr/W.png" alt="W" /></td>
        <td class="wind_speed at_line">
        <p>4</p>
        </td>
    </tr>
    <!-- 동네예보 끝 -->
    <!-- 주간예보 시작 -->
    <tr class="week">
        <th rowspan=10 class="type week">주 간 예 보</th>
        <th rowspan=2 class="date2 date_text">0월 0일</th>
        <th class="date2">오전</th>
        <td class="nb01">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td rowspan=2><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week day_end">
        <th class="date2">오후</th>
        <td class="nb02">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week">
        <th rowspan=2 class="date date_text">9월 20일</th>
        <th class="date">오전</th>
        <td class="nb03">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td rowspan=2><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week day_end">
        <th class="date">오후</th>
        <td class="nb04">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week">
        <th rowspan=2 class="date2 date_text">9월 21일</th>
        <th class="date2">오전</th>
        <td class="nb07">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td rowspan=2><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week day_end">
        <th class="date2">오후</th>
        <td class="nb08">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week">
        <th rowspan=2 class="date date_text">9월 22일</th>
        <th class="date">오전</th>
        <td class="nb11">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td rowspan=2><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week day_end">
        <th class="date">오후</th>
        <td class="nb12">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week">
        <th rowspan=2 class="date2 date_text">9월 23일</th>
        <th class="date2">오전</th>
        <td class="nb13">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td rowspan=2><span class="low_deg">16</span>/<span class="high_deg">27</span></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <tr class="week day_end">
        <th class="date2">오후</th>
        <td class="nb14">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
    <!-- 주간예보 끝 -->
</table>

</div>
<!-- END CONTENTS --></div>
<!-- END CONTAINER --></div>
</div>
</div>

<!-- END CONTAINER -->
