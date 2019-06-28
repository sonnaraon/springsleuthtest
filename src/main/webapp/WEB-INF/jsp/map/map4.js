// 지도 초기화
var map = L.map('map', {
    crs: L.Proj.CRS.Afs
});

// 중심좌표 위경도
var centerLat = 35.040182144806664;
var centerLng = 127.967968750000002;
// 줌레벨 초기값
var initZoom = 10;

var dataParam = {
    tm: "201711221400",
    vars: "ta",
    colorObs: "ta",
    name: '기온',
    layerType: "slider"
}

var mapParam = {
    mapCode: "D3",
    mapGrid: 1
}

// 맵 위치 초기화
map.setView({
    lat: centerLat,
    lng: centerLng
}, initZoom);

// 범례
L.control.scale().addTo(map);

// AWS 표출용 pane 추가
var mapPaneName = "aws";
map.createPane(mapPaneName);
map.getPane(mapPaneName).style.zIndex = 250;
// pane 내의 layer들의 마우스 및 클릭 이벤트
map.getPane(mapPaneName).style.pointerEvents = 'none';

// 기본 레이어
var baseLayers = [{
        active: true,
        name: '육지면(기본)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD')
    },
    {
        name: '육지면(노랑)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_YLW')
    },
    {
        name: '육지면(분홍)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_PNK')
    },
    {
        name: '육지면(회색)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_GRY')
    }
];


/*S[KHH:2019-06-18 PM0215]=======================================================================
 * 요소 데이터 호출 부분 분리
 * */

function getDataLayer(dParams, mParams, _data_callback){
	// AWS 분포도(d3 방식)
    var tm = dParams.tm;
    var vars = dParams.vars;
    var colorObs = dParams.colorObs;
    var mapCode = mParams.mapCode;
    var mapGrid = mParams.mapGrid;
    var name = dParams.name;
    var layerType = dParams.layerType;

    function getData(){
    	return  $.ajax({
            url: 'http://192.168.2.129:8090/cgi-bin/test/aws/nph-aws_min_obj?obs=' + vars + '&tm=' + tm + '&obj=mq&map=' + mapCode + '&grid=' + mapGrid + '&stn=0&gov='
    	});
    }
    
    $.when(getData()).done(function (result) {
    	_data_callback(result, dParams, mParams)
    })
    return;
}

function data_callback(data, dParam, mParam){
	var tm = dParam.tm;
	var colorObs = dParam.colorObs;
    var mapCode = mParam.mapCode;
    var mapGrid = mParam.mapGrid;
	
    //mapPaneName도 param으로 넣을까
    var fctAnaLayer = new afsAnaLayer(mapCode, mapGrid, mapPaneName);
    fctAnaLayer.setTm(tm);

    //기존 컬러바 숨기거나 없애기
    fctAnaLayer.setObs(colorObs);
    fctAnaLayer.setColorRange();
    fctAnaLayer.getLegendControl().addTo(map);
    
	 //첫줄 제외
    var dataStr = data.substr(data.indexOf('\n'), data.length);
    var cgiData = dataStr.split(',');
    var width = fctAnaLayer.getMapConfig().getWidth();
    var height = fctAnaLayer.getMapConfig().getHeight();
    // y축 뒤집기
    var values = new Array(width * height);
    for (var j = height - 1, k = 0; j >= 0; --j) {
        for (var i = 0; i < width; ++i, ++k) {
            values[k] = parseFloat(cgiData[(j * width) + i]);
        }
    }
    fctAnaLayer.setAnaData(values);

    //최초 한번만 해주면 되는데
    fctAnaLayer.setIsLayerExist(true);

    var fctAna = fctAnaLayer.initLayer();
    fctAna.addTo(map);

    dataLayerControl.updateLayers("AWS", dParam.name, fctAna);
}

getDataLayer(dataParam, mapParam, data_callback);

	
/*E[KHH:2019-06-18 PM0215]=======================================================================*/




var fctWindLayer = new afsWindLayer("M", WIND_INFO_TYPE1.GRID, mapPaneName);
fctWindLayer.setTm(dataParam.tm);
fctWindLayer.setMapInfo(getWindLayerInfo(WIND_INFO_TYPE1));

getWindData(function (vec, wsd) {
  var data = {
      vec: vec.data,
      wsd: wsd.data
  	}
  fctWindLayer.setWindData(data);
  var windLayer = fctWindLayer.initLayer();
  if (windLayer) {
      windLayer.addTo(map);
      //dataLayerControl.updateLayers("UM", "바람", windLayer);
      dataLayerControl.addOverlay({
          name: "바람",
          icon: '<i class="fas fa-wind"></i>',
          layer: windLayer,
          custom: {
              layerType: "WIND" // layer type 설정
          },
      }, "바람", "UM");
  }
});

function getWindData(_wind_callback) {
    var tmFc = moment('2018-05-01 17:00').format('YYYYMMDDHH00')
    var readData = 1 //slider data
    var vec, wsd

    /* promise all처럼 구현 Json 파일 로딩  */
    /*
    function getVecData() {
      return $.getJSON('vec.json')
    }
  
    function getWsdData() {
      return $.getJSON('wsd.json')
    }
  
    $.when(getVecData(), getWsdData()).done(function (result_vec, result_wsd) {
      _wind_callback(result_vec[0], result_wsd[0])
    })
    return;
    */

    /* promise all처럼 구현 ajax 통신  */
    function getVecData() {
        return $.ajax({
            url: '/comis4/uis/aws/mmr/retMmrWeathermanTest.kajx?tmFc=' + tmFc + "&readData=" + readData + "&dataType=VEC",
        })
    }

    function getWsdData() {
        return $.ajax({
            url: '/comis4/uis/aws/mmr/retMmrWeathermanTest.kajx?tmFc=' + tmFc + "&readData=" + readData + "&dataType=WSD",
        })
    }

    $.when(getVecData(), getWsdData()).done(function (result_vec, result_wsd) {
        _wind_callback(result_vec[0], result_wsd[0])
    })
    return;
}


/*S[JSK:2019-06-14 PM0523]=======================================================================*/

/*E[JSK:2019-06-14 PM0523]=======================================================================*/


// 표출 영역 라인 (d3 geoJson 방식)
/*S[KHH:2019-06-17 PM0452]=======================================================================
 * mapAreaGridLayer  매개변수 수정
 * */
var fctArea = new mapAreaGridLayer(mapParam.mapCode, mapParam.mapGrid, mapPaneName).getLayer();
fctArea.addTo(map);

// 오버레이 레이어 정의
var overlayLayers = [{
    group: "주제도",
    collapsed: true,
    layers: [{
            name: "위경도",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.graticule({
                interval: 5,
                style: {
                    dashArray: 4,
                    color: '#333',
                    weight: 1
                }
            }).addTo(map)
        },
        {
            name: "해안선",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.GRP_SL', {
                pane: "overlayPane"
            }).addTo(map)
        },
        {
            name: "행정구역",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.GRP_SD_SGG', {
                pane: "overlayPane"
            }).addTo(map)
        },
        {
            name: "표출영역",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: fctArea
        },

        /**** 190612 HH 추가 
         * *******/
        {
            name: "강, 하천",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.layerGroup([L.tileLayer.afsMapProvider('AfsMap.RIV', {
                    pane: "overlayPane"
                }),
                L.tileLayer.afsMapProvider('AfsMap.RIV_LBL', {
                    pane: "overlayPane"
                })
            ])
        },
        /***** 190612 추가 
         * 
         * 수계 - KMA 대권역, 대권역, 중권역, 표준유역
         * 1) 모두 분리해서 체크박스 추가
         * 2) 시도-시군구-읍면동과 같이 zoom level에 따라 추가
         * 
         * ********/
        {
            //TODO zoom level 조정 필요
            name: "수계(KMA 대권역)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level 조정 필요
            name: "수계(대권역)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_COV', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level 조정 필요
            name: "수계(중권역)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_MID', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level 조정 필요
            name: "수계(표준유역)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_UNI', {
                pane: "overlayPane"
            })
        },
        /*S[KHH:2019-06-17 PM0630]=======================================================================*/
        {
            //TODO zoom level 조정 필요
            name: "주요도로",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.layerGroup([L.tileLayer.afsMapProvider('AfsMap.ROD', {
                pane: "overlayPane"
            }),
            L.tileLayer.afsMapProvider('AfsMap.ROD_LBL', {
                pane: "overlayPane"
            })
        ])
        },
        {
            //TODO zoom level 조정 필요
            name: "철도",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.layerGroup([L.tileLayer.afsMapProvider('AfsMap.RAL', {
                pane: "overlayPane"
            }),
            L.tileLayer.afsMapProvider('AfsMap.RAL_LBL', {
                pane: "overlayPane"
            })
        ])
        }
        /*E[KHH:2019-06-17 PM0630]=======================================================================*/
    ]
}];

var nullLayer = new afsAnaLayer(mapParam.mapCode, mapParam.mapGrid, mapPaneName);
var tempLayer = nullLayer.initLayer();
// 자료 레이어 정의
// var els = AFSMAP_CONFIG.elements;
var els = AFSMAP_CONFIG.ctrlElements.AWS;
var umEls = AFSMAP_CONFIG.ctrlElements.UM;


$(els).each(function () {
    this.layer = tempLayer;
    this.isLayerExist = false;
})

var dataLayer = [{
    group: "AWS",
    collapsed: true,
    layers: els
}]

// var dataLayer = [{
//     group: "AWS",
//     collapsed: true,
//     layers: els
// },{
//     group: "UM",
//     collapsed: true,
//     layers: umEls
// }];

// 기본 레이어 & 오버레이 레이어 컨트롤러
var baseLayerControl = L.control.panelLayers(baseLayers, overlayLayers, {
    title: "지도 선택",
    compact: true,
}).addTo(map);

// 자료 레이어 컨트롤러
/*
var dataLayerControl = L.control.panelLayers(null, dataLayer, $.extend(defaultDataLayerOption, {title: "자료 선택　　　　　　　　", 
                                                                                                                            compact: true, 	
                                                                                                                            position: 'topright'
                                                                                                                                })).addTo(map);

*/

var dataLayerControl = L.control.panelLayers(dataLayer, null, {
    title: "자료 선택　　　　　　　　",
    compact: true,
    position: 'topright'
}).addTo(map);