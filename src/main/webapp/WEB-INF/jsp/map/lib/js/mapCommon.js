/**
 * 기능 : 맵 설정을 위한 함수
 */
var afsMapConfig = (function () {
  function afsMapConfig_(mapCode, grid) {
    this.mapCode;
    this.mapDesc;
    this.NX;
    this.NY;
    this.SX;
    this.SY;
    this.width;
    this.height;
    this.grid = grid || 1;
    this.setMapCode(mapCode);
  };

  /**
   * 기능 : 맵 코드
   */
  afsMapConfig_.prototype.setMapCode = function (mapCode) {
    if (AFSMAP_CONFIG.MAP_AREA[mapCode] === undefined) {
      console.error("Not Found Map Config : " + mapCode);
    } else {
      this.mapCode = mapCode;
      this.mapDesc = AFSMAP_CONFIG.MAP_AREA[mapCode].DESC;
      this.NX = AFSMAP_CONFIG.MAP_AREA[mapCode].NX / this.grid;
      this.NY = AFSMAP_CONFIG.MAP_AREA[mapCode].NY / this.grid;
      this.SX = AFSMAP_CONFIG.MAP_AREA[mapCode].SX / this.grid;
      this.SY = AFSMAP_CONFIG.MAP_AREA[mapCode].SY / this.grid;
      this.width = this.NX + 1;
      this.height = this.NY + 1;
    }
  };

  /**
   * 기능 : 맵 코드
   */
  afsMapConfig_.prototype.getMapCode = function () {
    return this.mapCode;
  };

  /**
   * 기능 : 맵 격자크기
   */
  afsMapConfig_.prototype.setGrid = function (grid) {
    this.grid = grid;
  };

  /**
   * 기능 : 맵 격자크기
   */
  afsMapConfig_.prototype.getGrid = function () {
    return this.grid;
  };

  /**
   * 기능 : NX
   */
  afsMapConfig_.prototype.getNX = function () {
    return this.NX;
  };

  /**
   * 기능 : NY
   */
  afsMapConfig_.prototype.getNY = function () {
    return this.NY;
  };

  /**
   * 기능 : SX
   */
  afsMapConfig_.prototype.getSX = function () {
    return this.SX;
  };

  /**
   * 기능 : SY
   */
  afsMapConfig_.prototype.getSY = function () {
    return this.SY;
  };

  /**
   * 기능 : width
   */
  afsMapConfig_.prototype.getWidth = function () {
    return this.width;
  };

  /**
   * 기능 : height
   */
  afsMapConfig_.prototype.getHeight = function () {
    return this.height;
  };

  /**
   * 기능 : LeftBottom
   */
  afsMapConfig_.prototype.getLeftBottom = function () {
    return this.lamcproj(this.mapCode, 1, 0, 0);
  };

  /**
   * 기능 : RightBottom
   */
  afsMapConfig_.prototype.getRightBottom = function () {
    return this.lamcproj(this.mapCode, 1, this.NX, 0);
  };

  /**
   * 기능 : LeftTop
   */
  afsMapConfig_.prototype.getLeftTop = function () {
    return this.lamcproj(this.mapCode, 1, 0, this.NY);
  };

  /**
   * 기능 : RightTop
   */
  afsMapConfig_.prototype.getRightTop = function () {
    return this.lamcproj(this.mapCode, 1, this.NX, this.NY);
  };

  /**
   * 기능 : 격자 LeftBottom 위경도
   */
  afsMapConfig_.prototype.getGridLatLon = function (x, y) {
    return this.lamcproj(this.mapCode, 1, x, y);
  };

  /////////////////////////////////////////////////////////////////////
  //
  //  Lambert Conformal Conic Projection
  //     o lon, lat : (longitude,latitude) at earth  [degree]
  //     o x, y     : (x,y) cordinate in map  [grid]
  //     o code = 0 : (lon,lat) --> (x,y)
  //              1 : (x,y) --> (lon,lat)
  //
  afsMapConfig_.prototype.lamcproj = function (map, code, v1, v2) {
    var RE = 6371.00877; // 지구 반경(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)

    var XO = this.SX; // 기준점 X좌표(GRID)
    var YO = this.SY; // 기준점 Y좌표(GRID)
    // console.log("XO" + XO);
    // console.log("YO" + YO);
    var GRID = this.grid; // 격자 간격(km)

    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};
    if (code == 0) {
      rs['lat'] = v1;
      rs['lng'] = v2;
      var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
      ra = re * sf / Math.pow(ra, sn);
      var theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs['x'] = v1;
      rs['y'] = v2;
      var xn = v1 - XO;
      var yn = ro - v2 + YO;
      ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) - ra;
      var alat = Math.pow((re * sf / ra), (1.0 / sn));
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) - theta;
        } else theta = Math.atan2(xn, yn);
      }
      var alon = theta / sn + olon;
      rs['lat'] = alat * RADDEG;
      rs['lng'] = alon * RADDEG;
    }
    return rs;
  };

  return afsMapConfig_;
})();

/////////////////////////////////////////////////////////////////////////////////////////////
//                               구  분  선
/////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 기능 : 레이어 투명도 컨트롤을 위한 옵션 정의
 */
var defaultDataLayerOption = {
  buildItem: function (item) {
    var layerType = "";
    if (item.custom != undefined) {
      layerType = item.custom.layerType !== undefined ? item.custom.layerType : "";
    }

    switch (layerType) {
      case "slider":
        console.log("AWS buildItem")
        var $slider = $('<div class="layer-slider">');
        var $input = $('<input type="text" value="' + 1 + '" />');
        $slider.append($input);
        $input.ionRangeSlider({
          skin: "flat", //defualt: flat / other: big / modern / sharp / round / square
          min: 0,
          max: 1,
          step: 0.01,
          hide_min_max: false,
          hide_from_to: true,
          from: 1,
          onChange: function (o) {
            if (item.layer.selection !== undefined) {
              item.layer.selection.selectAll("path")
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("opacity", o.from);
            } else {
              item.layer.setStyle({
                "opacity": o.from
              });
            }
          }
        });

        return $slider[0];
        break
      default:

        return $('<span></span>')[0]
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////
//                               구  분  선
/////////////////////////////////////////////////////////////////////////////////////////////

// 표출 영역 확인용
var mapAreaGridLayer = (function () {
  function mapAreaGridLayer_(mapCode, grid, pane) {
    this.mapCode = mapCode || "G";
    this.grid = grid || 1;
    this.pane = pane || "overlayPane";
    this.layer;
    this.mapConfig;
    this.setMapCode(this.mapCode);
    this.initMapConfig();
    this.initLayer();
  };

  /**
   * 기능 : 맵 코드
   */
  mapAreaGridLayer_.prototype.setMapCode = function (mapCode) {
    if (AFSMAP_CONFIG.MAP_AREA[mapCode] === undefined) {
      console.error("Not Found Map Config : " + mapCode);
    } else {
      this.mapCode = mapCode;
    }
  };

  /**
   * 기능 : 레이어
   */
  mapAreaGridLayer_.prototype.getLayer = function () {
    return this.layer;
  };

  /**
   * 기능 : 맵 설정
   */
  mapAreaGridLayer_.prototype.setMapConfig = function (mapCode) {
    this.setMapCode(mapCode);
    this.initMapConfig();
    this.initLayer();
  };

  /**
   * 기능 : 맵 설정
   */
  mapAreaGridLayer_.prototype.getMapConfig = function () {
    return this.mapConfig;
  };

  /**
   * 기능 : 맵 설정 초기화
   */
  mapAreaGridLayer_.prototype.initMapConfig = function () {
    this.mapConfig = new afsMapConfig(this.mapCode, this.grid);
  };

  /**
   * 기능 : 레이어 초기화
   */
  mapAreaGridLayer_.prototype.initLayer = function () {
    var _geoJson = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": {
          "name": "Area"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [this.mapConfig.getLeftBottom().lng, this.mapConfig.getLeftBottom().lat],
              [this.mapConfig.getRightBottom().lng, this.mapConfig.getRightBottom().lat],
              [this.mapConfig.getRightTop().lng, this.mapConfig.getRightTop().lat],
              [this.mapConfig.getLeftTop().lng, this.mapConfig.getLeftTop().lat],
              [this.mapConfig.getLeftBottom().lng, this.mapConfig.getLeftBottom().lat]
            ]
          ]
        }
      }]
    };
    // console.log("=========================")
    // console.log("this.mapConfig.getLeftBottom().lng:" + this.mapConfig.getLeftBottom().lng);
    // console.log("this.mapConfig.getLeftBottom().lat:" + this.mapConfig.getLeftBottom().lat);
    // console.log("this.mapConfig.getRightBottom().lng:" + this.mapConfig.getRightBottom().lng);
    // console.log("this.mapConfig.getRightBottom().lat:" + this.mapConfig.getRightBottom().lat);
    // console.log("this.mapConfig.getRightTop().lng:" + this.mapConfig.getRightTop().lng);
    // console.log("this.mapConfig.getRightTop().lat:" + this.mapConfig.getRightTop().lat);
    // console.log("this.mapConfig.getLeftTop().lng:" + this.mapConfig.getLeftTop().lng);
    // console.log("this.mapConfig.getLeftTop().lat:" + this.mapConfig.getLeftTop().lat);

    _geoJson.features = new Array();
    var NX = this.mapConfig.getNX();
    var NY = this.mapConfig.getNY();
    var stLatLon, edLatLon, line;
    var simpleLine = {
      "type": "Feature",
      "properties": {
        "name": "Line"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
    //가로
    for (var j = 0; j <= NY; j++) {
      stLatLon = this.mapConfig.getGridLatLon(0, j);
      edLatLon = this.mapConfig.getGridLatLon(NX, j);
      var line = $.extend(true, {}, simpleLine);
      line.geometry.coordinates = [
        [stLatLon.lng, stLatLon.lat],
        [edLatLon.lng, edLatLon.lat]
      ];
      _geoJson.features.push(line);
    }
    //세로
    for (var i = 0; i <= NX; i++) {
      stLatLon = this.mapConfig.getGridLatLon(i, 0);
      edLatLon = this.mapConfig.getGridLatLon(i, NY);
      var line = $.extend(true, {}, simpleLine);
      line.geometry.coordinates = [
        [stLatLon.lng, stLatLon.lat],
        [edLatLon.lng, edLatLon.lat]
      ];
      _geoJson.features.push(line);
    }


    // 표출영역? 격자 부분
    this.layer = L.d3SvgOverlay(function (sel, proj) {
      var u = sel.selectAll('path').data(_geoJson.features);
      u.enter()
        .append('path')
        .attr('d', proj.pathFromGeojson)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        //   .attr('stroke-width', 1 / (proj.scale*3));
        .attr('stroke-width', 0.01);
    }, {
      pane: this.pane
    });
  };

  return mapAreaGridLayer_;
})();

/////////////////////////////////////////////////////////////////////////////////////////////
//                               구  분  선
/////////////////////////////////////////////////////////////////////////////////////////////

// 동네예보 표출용
var afsAnaLayer = (function () {

  function afsAnaLayer_(mapCode, grid, pane) {
    this.afsAnaData;
    this.color;
    this.values;
    this.obs = "ta";
    this.tm = new Date().YYYYMMDDHHMI();
    this.mapCode = mapCode || "G";
    this.grid = grid || 1;
    this.pane = pane || "overlayPane";
    mapAreaGridLayer.call(this, mapCode, grid, pane);
  };

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  afsAnaLayer_.prototype = extend(mapAreaGridLayer, {
    /**
     * 기능 : obs
     */
    setObs: function (obs) {
      this.obs = obs;
    },

    /**
     * 기능 : tm(YYYYMMDDHHMI)
     */
    setTm: function (tm) {
      this.tm = tm;
    },

    /**
     * 기능 : grid
     */
    setGrid: function (grid) {
      this.grid = grid;
    },

    /**
     * 기능 : 레이어 초기화
     */
    initLayer: function () {
      var _this = this;
      this.layer = L.d3SvgOverlay(function (sel, proj) {
        console.log("d3SvgOverlay CallBack : " + new Date());
        var leftTop = proj.latLngToLayerPoint(new L.LatLng(_this.mapConfig.getLeftTop().lat, _this.mapConfig.getLeftTop().lng)),
          rightBottom = proj.latLngToLayerPoint(new L.LatLng(_this.mapConfig.getRightBottom().lat, _this.mapConfig.getRightBottom().lng));
        var svgWidth = rightBottom.x - leftTop.x;
        var width = _this.mapConfig.getWidth();
        var upd = sel.selectAll("path").data(_this.afsAnaData);
        var path = upd.enter().append("path")
          .attr("d", d3.geoPath(d3.geoIdentity().scale(svgWidth / width).translate([leftTop.x, leftTop.y])))
          .attr("fill", function (d) {
            return _this.color(d.value);
          })
          .attr("stroke-width", function (d) {
            return 0;
          });
        //.transition()
        //.duration(1500)
        //.on("start", function repeat() {
        //  d3.active(this)
        //    .attr("opacity", 0)
        //    .transition()
        //    .attr("opacity", 1)
        //    .transition()
        //    .on("start", repeat);
        //});
      }, {
        pane: _this.pane
      });

      return this.layer;
    },

    /**
     * 기능 : color bar 범위 설정
     */
    setColorRange: function () {
      var _this = this;
      $.ajax({
        url: '/aws/alwais_afs_lvl.php?obs=' + _this.obs + '&tm=' + _this.tm,
        async: false,
        success: function (cdata) {
          var color_arr = cdata.split('\n');
          var domain_arr = new Array();
          var range_arr = new Array();

          var tmp = 0.5;

          if (_this.obs != "ta")
            tmp = 0;

          $.each(color_arr, function (i, e) {
            if (e != "") {
              // 양쪽 TRIM, 중복 공백제거
              var _e = e.replace(/(^ *)|( *$)/g, '').replace(/\s\s+/g, ' ').split(' ');
              range_arr.push(d3.rgb(_e[0], _e[1], _e[2]).toString());
              domain_arr.push(Number(_e[3]) - tmp);
            }
          });
          _this.color = d3.scaleLinear().domain(domain_arr).range(range_arr);
          _this.range_arr = range_arr;
          _this.domain_arr = domain_arr;
        }
      });
    },

    /**
     * 기능 : color bar legend
     */
    getLegendControl: function () {
      var _this = this;
      var legend = L.control({
        position: 'bottomleft'
      });
      legend.onAdd = function (map) {


        //TODO domutil 쓰고싶은데 난 모르겠다.. 나중에 수정
        $("div.info.legend").remove();

        var div = L.DomUtil.create('div', 'info legend');


        var grades = _this.domain_arr;
        var labels = [];

        for (var i = grades.length - 1; i > 0; i--) {

          //기온일때 colorbar 설정
          if (_this.obs == "ta" && grades[i] % 1 != 0) continue;
          labels.push('<i style="background:' + _this.color(grades[i]) + '"></i> ' + grades[i]);
        }
        div.innerHTML = labels.join('<br>');
        return div;
      };
      return legend;
    },

    /**
     * 기능 : 격자 자료( Array( NX x NY ) )
     */
    setAnaData: function (values) {
      this.values = values;
      // create path elements for each of the features
      this.afsAnaData = d3.contours().size([this.mapConfig.getWidth(), this.mapConfig.getHeight()]).thresholds(this.domain_arr)(this.values);
    },


    /**
     * 기능 : 레이어 존재여부 
     */
    setIsLayerExist: function (flag) {
      if (this.layer.isLayerExist) {
        this.layer.isLayerExist = false;
      } else {
        this.layer.isLayerExist = true;
      }

      this.layer.isLayerExist = flag;
    }

  });

  return afsAnaLayer_;
})();


//바람장 표출용
var afsWindLayer = (function () {
  function afsWindLayer_(mapCode, grid, pane) {
    this.afsAnaData;
    this.isLayerExist = false;
    this.isOverlay = false;
    this.color;
    this.values;
    this.obs = "ta";
    this.tm = new Date().YYYYMMDDHHMI();
    this.mapCode = mapCode || "G";
    this.grid = grid || 1;
    this.pane = pane || "overlayPane";
    this.windData;
    this.FIELD = {
      x: 0,
      y: 0
    }
    this.COORDS = [];
    this.GRID = 5,
    this.MAP_AREA;
    mapAreaGridLayer.call(this, mapCode, grid, pane);
  };

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  afsWindLayer_.prototype = extend(mapAreaGridLayer, {
    /**
     * 기능 : obs
     */
    setObs: function (obs) {
      this.obs = obs;
    },

    /**
     * 기능 : tm(YYYYMMDDHHMI)
     */
    setTm: function (tm) {
      this.tm = tm;
    },

    /**
     * 기능 : grid
     */
    setGrid: function (grid) {
      this.grid = grid;
    },

    setMapInfo: function (mapInfo) {
      this.FIELD = mapInfo.FIELD;
      this.COORDS = mapInfo.COORDS;
      this.COLOR_INDEX_POSITION = mapInfo.COLOR_INDEX_POSITION;
      this.UNITS = mapInfo.UNITS;
      this.GRID = mapInfo.GRID,
      this.MAP_AREA = mapInfo.MAP_AREA;
      this.ZOOM = mapInfo.ZOOM;

      //todo: 영역 COORDS를 만들어야 한다.
      if (mapInfo.MAP_CODE) {
        this.MAP_CODE = mapInfo.MAP_CODE;
        var mapCfg = new afsMapConfig(mapInfo.MAP_CODE, mapInfo.GRID);
      }
    },

    setWindData: function (windData) {
      this.windData = windData;
    },

    /**
     * 기능 : 레이어 초기화
     */
    initLayer: function () {
      var _this = this;
      if (_this.windData === undefined) {
        return;
      }

      if (this.layer) {
        this.layer.setData(_this.windData, _this.isOverlay)
        return this.layer
      }
      this.layer = L.windLayer({
        data: _this.windData,
        isOverlay: _this.isOverlay,
        frameRate: 20,
        velocityScale: 0.2,
        // particleAge: 3,
        // x: 0.005,
        FIELD: _this.FIELD,
        COORDS: _this.COORDS,
        GRID: _this.GRID,
        MAP_AREA: _this.MAP_AREA,
        COLOR_INDEX_POSITION: _this.COLOR_INDEX_POSITION,
        UNITS: _this.UNITS,
        ZOOM: _this.ZOOM
      })
      return this.layer
    },


    /**
     * 기능 : 격자 자료( Array( NX x NY ) )
     */
    setAnaData: function (values) {
      this.values = values;
      // create path elements for each of the features
      this.afsAnaData = d3.contours().size([this.mapConfig.getWidth(), this.mapConfig.getHeight()]).thresholds(this.domain_arr)(this.values);
    },

    /**
     * 기능 : 레이어 존재여부 
     */
    setIsLayerExist: function (flag) {
      if (this.isLayerExist) {
        this.isLayerExist = false;
      } else {
        this.isLayerExist = true;
      }

      this.isLayerExist = flag;
    }

  });

  return afsWindLayer_;
})();

Date.prototype.YYYYMMDDHHMI = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);
  var mi = pad(this.getMinutes(), 2)
  var ss = pad(this.getSeconds(), 2)

  return yyyy + MM + dd + hh + mi;
};

function getDate() {
  d = new Date();
  alert(d.YYYYMMDDHHMI());
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return str;

}


function getWindLayerInfo(_config) {
  var info = _.clone(_config)
  var mapCfg = new afsMapConfig(info.MAP_CODE, info.GRID);

  var COORDS = []
  var x = 0,
    y = 0

  for (var i = 1; i <= mapCfg.width; i++) {
    x++
    if (x > mapCfg.width) {
      x = 1
    }
    for (var j = mapCfg.height; j >= 1; j--) {
      y++
      if (y > mapCfg.height) {
        y = 1
      }
      var pinfo = mapCfg.getGridLatLon(i - 1, j - 1)
      COORDS.push({
        "x": x,
        "y": y,
        "lat": Number(pinfo.lat.toFixed(8)),
        "lng": Number(pinfo.lng.toFixed(8))
      })
    }
  }

  info['COORDS'] = COORDS
  info['FIELD'] = {
    x: mapCfg.width,
    y: mapCfg.height,
  }

  // console.log("FIELD:", info.FIELD )
  // console.log("COORDS:", JSON.stringify( info.COORDS ) )
  // console.log("info",info)
  return info
}