<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<style>
img {
  vertical-align: middle;
}

.center {
    display: block;
    margin-left: 14%;
    margin-right: auto;
    width: 75%;
}

/* Position the image container (needed to position the left and right arrows) */
.container {
  position: relative;
  padding-top: 10px;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Add a pointer when hovering over the thumbnail images */
.cursor {
  cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 55%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Container for image text */
.caption-container {
  text-align: center;
  background-color: #222;
  color: white;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Six columns side by side */
.column {
  float: left;
  width: 16.66%;
}

.padding_0 {
  padding: 0px !important;
}

.bg_gray {
  background-color: #e5e5e5;
}

/* Add a transparency effect for thumnbail images */
.demo {
  opacity: 0.6;
}

.active,
.demo:hover {
  opacity: 1;
}
</style>


<!-- START CONTAINER -->


<div data-role="content">
	<div id="" data-role="" class="MapCtl_select">
		<div class="ui-select">
			<div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="arrow-d" data-iconpos="right" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-right ui-btn-up-c">
				<!-- select id="shrtKind" name="shrtKind">
					<option value="shrt_t3h">기온</option>
					<option value="shrt_max">최저최고</option>
					<option value="shrt_sky">하늘상태</option>
					<option value="shrt_pty">강수형태</option>
					<option value="shrt_pop">강수확률</option>
					<option value="shrt_r12">강수량</option>
					<option value="shrt_rac">누적강수량</option>
					<option value="shrt_s12">적설</option>
					<option value="shrt_vec">바람</option>
					<option value="shrt_wsd">풍속</option>
					<option value="shrt_reh">습도</option>
					<option value="shrt_wav">파고</option>
				</select -->

             	<select id="data1" name="data1">
             		<option value="T3H">기온</option>
					<option value="MAX">최저최고</option>
					<option value="SKY">하늘상태</option>
					<option value="PTY" selected="selected">강수형태</option>
					<option value="POP">강수확률</option>
					<option value="R12">강수량</option>
					<option value="RAC">누적강수량</option>
					<option value="S12">적설</option>
					<option value="VEC">바람</option>
					<option value="WSD">풍속</option>
					<option value="REH">습도</option>
					<option value="WAV">파고</option>
            	</select>
        	    				
			</div>
		</div>
    </div>

	<div class="container" >
	    <div id="shrtDiv1">
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709032100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040300&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040600&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040900&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041200&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041500&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041800&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709042100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050300&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050600&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050900&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051200&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051500&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051800&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709052100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		<div class="mySlides">
			<img src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709060000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=240&effect=N&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" class="center">
		</div>
		</div>
	    
		<a class="prev" onclick="plusSlides(-1)">❮</a>
		<a class="next" onclick="plusSlides(1)">❯</a>
	
		<div id="shrtTimeline" class="row" style="display: none; position: fixed; bottom: 64px;">
			<div class="FC_ALL_table fct_01" id="shrtDiv2">
		        <table>
		            <colgroup>
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
		                <col width="11.11%">
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
		            <tbody id="shrtHtml">
			            <tr style="display: none;">
							<th class="">3<br>(화)</th>
							<td class="Nodata">
							</td>
							<td class="Nodata">
							</td>
							<td class="Nodata">
							</td>
							<td class="Nodata">
							</td>
							<td class="Nodata">
							</td>
							<td class="Nodata">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709032100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(1)" alt="2017.09.03.21:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(2)" alt="2017.09.03.24:00">
							</td>
						</tr>
						<tr>
							<th class="">4<br>(수)</th>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040300&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(3)" alt="2017.09.04.03:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040600&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(4)" alt="2017.09.04.06:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709040900&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(5)" alt="2017.09.04.09:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041200&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(6)" alt="2017.09.04.12:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041500&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(7)" alt="2017.09.04.15:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709041800&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(8)" alt="2017.09.04.18:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709042100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(9)" alt="2017.09.04.21:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(10)" alt="2017.09.04.24:00">
							</td>
						</tr>
						<tr style="display: none;">
							<th class="">5<br>(목)</th>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050300&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(11)" alt="2017.09.05.03:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050600&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(12)" alt="2017.09.05.06:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709050900&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(13)" alt="2017.09.05.09:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051200&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(14)" alt="2017.09.05.12:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051500&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(15)" alt="2017.09.05.15:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709051800&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(16)" alt="2017.09.05.18:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709052100&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(17)" alt="2017.09.05.21:00">
							</td>
							<td class="bg_gray padding_0">
								<img class="demo cursor" src="/cgi/dfs/nph-dfs_shrt_ana?data0=GEMD&data1=T3H&tm_ef=201709060000&tm_fc=201709031700&dtm=H0&map=G1&mask=M&color=E&size=150&effect=NTL&overlay=S&zoom_rate=2&zoom_level=0&zoom_x=0000000&zoom_y=0000000&auto_man=m&mode=I&rand=1714" style="width:100%" onclick="currentSlide(18)" alt="2017.09.05.24:00">
							</td>
						</tr>
					</tbody>
		        </table>
		     </div>
		</div>
	</div>
</div>


<!-- END CONTAINER -->