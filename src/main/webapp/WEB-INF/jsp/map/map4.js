// ���� �ʱ�ȭ
var map = L.map('map', {
    crs: L.Proj.CRS.Afs
});

// �߽���ǥ ���浵
var centerLat = 35.040182144806664;
var centerLng = 127.967968750000002;
// �ܷ��� �ʱⰪ
var initZoom = 10;

var dataParam = {
    tm: "201711221400",
    vars: "ta",
    colorObs: "ta",
    name: '���',
    layerType: "slider"
}

var mapParam = {
    mapCode: "D3",
    mapGrid: 1
}

// �� ��ġ �ʱ�ȭ
map.setView({
    lat: centerLat,
    lng: centerLng
}, initZoom);

// ����
L.control.scale().addTo(map);

// AWS ǥ��� pane �߰�
var mapPaneName = "aws";
map.createPane(mapPaneName);
map.getPane(mapPaneName).style.zIndex = 250;
// pane ���� layer���� ���콺 �� Ŭ�� �̺�Ʈ
map.getPane(mapPaneName).style.pointerEvents = 'none';

// �⺻ ���̾�
var baseLayers = [{
        active: true,
        name: '������(�⺻)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD')
    },
    {
        name: '������(���)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_YLW')
    },
    {
        name: '������(��ȫ)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_PNK')
    },
    {
        name: '������(ȸ��)',
        icon: '<i class="fa fa-globe"></i>',
        layer: L.tileLayer.afsMapProvider('AfsMap.GRP_LD_GRY')
    }
];


/*S[KHH:2019-06-18 PM0215]=======================================================================
 * ��� ������ ȣ�� �κ� �и�
 * */

function getDataLayer(dParams, mParams, _data_callback){
	// AWS ������(d3 ���)
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
	
    //mapPaneName�� param���� ������
    var fctAnaLayer = new afsAnaLayer(mapCode, mapGrid, mapPaneName);
    fctAnaLayer.setTm(tm);

    //���� �÷��� ����ų� ���ֱ�
    fctAnaLayer.setObs(colorObs);
    fctAnaLayer.setColorRange();
    fctAnaLayer.getLegendControl().addTo(map);
    
	 //ù�� ����
    var dataStr = data.substr(data.indexOf('\n'), data.length);
    var cgiData = dataStr.split(',');
    var width = fctAnaLayer.getMapConfig().getWidth();
    var height = fctAnaLayer.getMapConfig().getHeight();
    // y�� ������
    var values = new Array(width * height);
    for (var j = height - 1, k = 0; j >= 0; --j) {
        for (var i = 0; i < width; ++i, ++k) {
            values[k] = parseFloat(cgiData[(j * width) + i]);
        }
    }
    fctAnaLayer.setAnaData(values);

    //���� �ѹ��� ���ָ� �Ǵµ�
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
      //dataLayerControl.updateLayers("UM", "�ٶ�", windLayer);
      dataLayerControl.addOverlay({
          name: "�ٶ�",
          icon: '<i class="fas fa-wind"></i>',
          layer: windLayer,
          custom: {
              layerType: "WIND" // layer type ����
          },
      }, "�ٶ�", "UM");
  }
});

function getWindData(_wind_callback) {
    var tmFc = moment('2018-05-01 17:00').format('YYYYMMDDHH00')
    var readData = 1 //slider data
    var vec, wsd

    /* promise alló�� ���� Json ���� �ε�  */
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

    /* promise alló�� ���� ajax ���  */
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


// ǥ�� ���� ���� (d3 geoJson ���)
/*S[KHH:2019-06-17 PM0452]=======================================================================
 * mapAreaGridLayer  �Ű����� ����
 * */
var fctArea = new mapAreaGridLayer(mapParam.mapCode, mapParam.mapGrid, mapPaneName).getLayer();
fctArea.addTo(map);

// �������� ���̾� ����
var overlayLayers = [{
    group: "������",
    collapsed: true,
    layers: [{
            name: "���浵",
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
            name: "�ؾȼ�",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.GRP_SL', {
                pane: "overlayPane"
            }).addTo(map)
        },
        {
            name: "��������",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.GRP_SD_SGG', {
                pane: "overlayPane"
            }).addTo(map)
        },
        {
            name: "ǥ�⿵��",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: fctArea
        },

        /**** 190612 HH �߰� 
         * *******/
        {
            name: "��, ��õ",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.layerGroup([L.tileLayer.afsMapProvider('AfsMap.RIV', {
                    pane: "overlayPane"
                }),
                L.tileLayer.afsMapProvider('AfsMap.RIV_LBL', {
                    pane: "overlayPane"
                })
            ])
        },
        /***** 190612 �߰� 
         * 
         * ���� - KMA ��ǿ�, ��ǿ�, �߱ǿ�, ǥ������
         * 1) ��� �и��ؼ� üũ�ڽ� �߰�
         * 2) �õ�-�ñ���-���鵿�� ���� zoom level�� ���� �߰�
         * 
         * ********/
        {
            //TODO zoom level ���� �ʿ�
            name: "����(KMA ��ǿ�)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level ���� �ʿ�
            name: "����(��ǿ�)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_COV', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level ���� �ʿ�
            name: "����(�߱ǿ�)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_MID', {
                pane: "overlayPane"
            })
        },
        {
            //TODO zoom level ���� �ʿ�
            name: "����(ǥ������)",
            icon: '<i class="fa fa-layer-group"></i>',
            layer: L.tileLayer.afsMapProvider('AfsMap.BA_UNI', {
                pane: "overlayPane"
            })
        },
        /*S[KHH:2019-06-17 PM0630]=======================================================================*/
        {
            //TODO zoom level ���� �ʿ�
            name: "�ֿ䵵��",
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
            //TODO zoom level ���� �ʿ�
            name: "ö��",
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
// �ڷ� ���̾� ����
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

// �⺻ ���̾� & �������� ���̾� ��Ʈ�ѷ�
var baseLayerControl = L.control.panelLayers(baseLayers, overlayLayers, {
    title: "���� ����",
    compact: true,
}).addTo(map);

// �ڷ� ���̾� ��Ʈ�ѷ�
/*
var dataLayerControl = L.control.panelLayers(null, dataLayer, $.extend(defaultDataLayerOption, {title: "�ڷ� ���á���������������", 
                                                                                                                            compact: true, 	
                                                                                                                            position: 'topright'
                                                                                                                                })).addTo(map);

*/

var dataLayerControl = L.control.panelLayers(dataLayer, null, {
    title: "�ڷ� ���á���������������",
    compact: true,
    position: 'topright'
}).addTo(map);