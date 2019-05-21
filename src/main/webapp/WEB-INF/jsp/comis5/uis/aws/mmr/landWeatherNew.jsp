<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>


<!-- START CONTAINER -->


<div data-role="content">


<!-- 그룹 시작-------------------------------------------------------------------------->

    <p id="obsdTitle" class="FC_ALL_title">05시 현재날씨(14:30 발표)</p>
    <div class="FC_ALL_table fct_00 ">
        <table>
            <colgroup>
                <col width="70%"/>
                <col width="30%"/>

            </colgroup>

            <tbody>

            <tr>
                <td>
                <div id="FC_ALL_today" class="FC_ALL_today"><!-- 예보 현황 --></div>
                </td>

                <td>
                <div id="FC_ALL_today2" class="FC_ALL_today2"><!-- 초단기 예보 --></div>
                </td>
            </tr>

            </tbody>
        </table>
    </div>

    <p id="shrtTitle" class="FC_ALL_title">동네예보(<span id="shrtTmFc">00:00</span>발표)</p>
    <div class="FC_ALL_table fct_01">
        <table>
            <colgroup>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
            </colgroup>
            <thead>
                <tr>
                    <th class=""></th>
                    <th class="">03시</th>
                    <th class="">06시</th>
                    <th class="">09시</th>
                    <th class="">12시</th>
                    <th class="">15시</th>
                    <th class="">18시</th>
                    <th class="">21시</th>
                    <th class="">24시</th>
                </tr>
            </thead>
            <tbody id="shrtHtml"><!-- 동네 예보 --></tbody>
        </table>
     </div>

    <p class="FC_ALL_title">중기예보(<span id="medmTmFc">00:00</span>발표)</p>
    <div class="FC_ALL_table fct_02">
        <table>
            <colgroup>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
                <col width="11.11%"/>
            </colgroup>
            <thead id="medmTitlHtml">
            </thead>
            <tbody id="medmHtml">
            </tbody>
        </table>
     </div>


</div>


<!-- END CONTAINER -->