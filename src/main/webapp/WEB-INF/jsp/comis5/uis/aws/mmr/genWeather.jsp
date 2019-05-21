<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>


<!-- START CONTAINER -->

	<div data-role="content">


        <!-- portlet 시작-------------------------------------------------------------------------->
        <div class="Portlet">
            <div class="Portlet_Header kit_Lclear">
                  <div class="Portlet_Title kit_Lclear">단기(<span id="tm_day"></span> 발표)</div>
                  <div class="Portlet_Ctl"></div>
            </div>
          <div class="Portlet_Body" style="">
                <!-- 내부portlet 시작-------------------------------------------------------------------------->
                <div class="Portlet color_a">
                    <div class="Portlet_Header kit_Lclear">
                          <div class="Portlet_Title kit_Lclear">오늘<span id="fct_day1"></span>&nbsp; ~ &nbsp;모레<span id="fct_day3"></span></div>
                          <div class="Portlet_Ctl"></div>
                    </div>
                  <div id="day_rpt1" class="Portlet_Body" style=""></div>

                </div>
                <!-- 내부portlet 끝-------------------------------------------------------------------------->

                <!-- 내부portlet 시작-------------------------------------------------------------------------->
<!--                 <div class="Portlet color_b"> -->
<!--                     <div class="Portlet_Header kit_Lclear"> -->
<!--                           <div class="Portlet_Title kit_Lclear">내일&nbsp;&nbsp;<span id="fct_day2"></span></div> -->
<!--                           <div class="Portlet_Ctl"></div> -->
<!--                     </div> -->
<!--                   <div id="day_rpt2" class="Portlet_Body" style=""></div> -->
<!--                 </div> -->
                <!-- 내부portlet 끝-------------------------------------------------------------------------->

                <!-- 내부portlet 시작-------------------------------------------------------------------------->
<!--                 <div class="Portlet color_c"> -->
<!--                     <div class="Portlet_Header kit_Lclear"> -->
<!--                           <div class="Portlet_Title kit_Lclear">모레&nbsp;&nbsp;<span id="fct_day3"></span></div> -->
<!--                           <div class="Portlet_Ctl"></div> -->
<!--                     </div> -->
<!--                   <div id="day_rpt3" class="Portlet_Body" style=""></div> -->
<!--                 </div> -->
                <!-- 내부portlet 끝-------------------------------------------------------------------------->
          </div>
        </div>
        <!-- portlet 끝-------------------------------------------------------------------------->

        <!-- portlet 시작-------------------------------------------------------------------------->
        <div class="Portlet ">
            <div class="Portlet_Header kit_Lclear">
                  <div class="Portlet_Title kit_Lclear">중기(<span id="tm_week"></span> 발표)</div>
                  <div class="Portlet_Ctl"></div>
            </div>
          <div class="Portlet_Body" style="">
                <!-- 내부portlet 시작-------------------------------------------------------------------------->
                <div class="Portlet color_d">
                  <div id="week_rpt" class="Portlet_Body" style=""></div>
                </div>
                <!-- 내부portlet 끝-------------------------------------------------------------------------->
          </div>
        </div>
        <!-- portlet 끝-------------------------------------------------------------------------->
</div>

<!-- END CONTAINER -->