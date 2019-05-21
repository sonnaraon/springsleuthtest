<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>



<!-- START CONTAINER -->


	<div data-role="content">

<div class="Portlet">
	    <div id="seaWeatehrInfo">
	        <div data-role="content" id="fctrpt_content">


            <div class="Portlet_Header kit_Lclear">

                  <div id="fctday_title"  class="Portlet_Title kit_Lclear">
                      타이틀 영역
                  </div>

                  <div class="Portlet_Ctl">
                  </div>

            </div>


	            <div id="fctsea_table" class="weather_table">

	                <table id="tbl_fctday" border="0" summary="해상예보">
	                    <thead id="tbl_fctday_head">
	                  </thead>
	                    <tbody id="tbl_fctday_body">
	                    </tbody>
	                </table>


	                <br>


	                <center>
	                    <span id="fctweek_title" class="Portlet_Title kit_Lclear"></span>
	                </center>

	                <table id="tbl_fctweek" border="0" summary="해상예보">
	                </table>

	                <table id="tbl_fctweek2" border="0" summary="해상예보" style="margin-top:3px">
	                </table>
	            </div>
	        </div>
	    </div>

        <div id="seaWeatehrInfoNo" style="width: auto; height: 300px; text-align: center;">
        <h3>자료를 가져오지 못하였습니다.</h3>
        </div>
</div>

	</div>

<!-- END CONTAINER -->

