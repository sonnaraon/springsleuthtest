// 지도 설정
var AFSMAP_CONFIG = {
  TileMapBaseDomain: "192.168.2.129",
  TileMapBaseURL: "tile/1.0.0",
  WeatherMapBaseURL: "",
  TILE_MAP_DISPLAY_LEVEL: {
    BA: "{0-21}",
    BA_COV: "{0-21}", //폴더명과 같게 수정 BA_COV_KOR > BA_COV
    BA_MID: "{0-21}", //폴더명과 같게 수정 BA_MID_KOR > BA_MID
    BA_UNI: "{0-21}", //폴더명과 같게 수정 BA_UNI_KOR > BA_UNI
    IMG: "{0-13}",
    LD: "{0-11}",
    LD_EDT: "{12-21}",
    LD_YLW: "{2-8}",
    LD_YLW_EDT: "{9-16}",
    LD_PNK: "{2-8}",
    LD_PNK_EDT: "{9-16}",
    LD_GRY: "{2-8}",
    LD_GRY_EDT: "{9-16}",
    PN_MT: "{15-21}",
    PN_BC: "{15-21}",
    PK: "{12-21}",
    RAL: "{12-21}",
    RAL_LBL: "{12-21}",
    RIV: "{9-21}", //임의로 수정 12-21
    RIV_LBL: "{10-21}", //임의로 수정 12-21
    ROD: "{12-21}",
    ROD_LBL: "{12-21}",
    SD: "{0-21}",
    SGG_KOR: "{0-21}",
    EMD_KOR: "{0-21}",
    SL: "{0-21}",
    SL_EDT_1PX: "{9-11}",
    SL_EDT: "{12-21}",
    SL_SDW: "{2-8}",
    SL_SDW_EDT: "{9-16}",
    SRI: "{0-13}",
    SRI_KOR: "{9-20}",
    //WA: "{0-21}",
    //WA_EDT: "{0-21}",
    WC: "{0-11}",
    WC_EDT: "{12-21}",
    GRD10: "{0-10}",
    GRD5: "{0-21}",
    GRD3: "{17-21}",
    WRN_LINE: "{0-21}",
    FCT_AREA: "{0-21}",
    ICN_FIR: "{0-21}",
    ICN_FIR_SECTOR: "{0-21}",
    ICN_ADJ_FIR: "{0-21}",
    TCA: "{0-21}",
    SEA_COAST_PG: "{0-21}",
    SEA_COAST_PG_1: "{0-21}",
    SEA_IDXMAP_PG: "{0-21}"
  },
  TILE_MAP_DISPLAY_LEVEL_DESC: {
    BA: "수계(KMA대권역)",
    BA_COV_KOR: "수계(대권역)",
    BA_MID_KOR: "수계(중권역)",
    BA_UNI_KOR: "수계(표준유역)",
    IMG: "위성이미지",
    LD: "육지면",
    LD_EDT: "육지면 (상세)",
    LD_YLW: "육지면_노란색",
    LD_YLW_EDT: "육지면_노란색 (상세)",
    LD_PNK: "육지면_분홍색",
    LD_PNK_EDT: "육지면_분홍색 (상세)",
    LD_GRY: "육지면_회색",
    LD_GRY_EDT: "육지면_회색 (상세)",
    PN_MT: "산",
    PN_BC: "해수욕장",
    PK: "국립공원경계",
    RAL: "철도",
    RAL_LBL: "철도 라벨",
    RIV: "강,하천",
    RIV_LBL: "강,하천 라벨",
    ROD: "도로",
    ROD_LBL: "도로 라벨",
    SD: "도경계",
    SGG_KOR: "시군구경계",
    EMD_KOR: "행정동경계",
    SL: "해안선",
    SL_EDT_1PX: "해안선",
    SL_EDT: "해안선 (상세)",
    SL_SDW: "해안선 (그림자)",
    SL_SDW_EDT: "해안선 (그림자 상세)",
    SRI: "음영기복도",
    SRI_KOR: "음영기복도 한반도",
    //WA: "주요도시경계",
    //WA_EDT: "주요도시경계 (상세)",
    WC: "국경선",
    WC_EDT: "국경선 (상세)",
    GRD10: "그리드",
    GRD5: "그리드",
    GRD3: "그리드",
    WRN_LINE: "특보구역",
    FCT_AREA: "예보구역",
    ICN_FIR: "인천 FIR",
    ICN_FIR_SECTOR: "인천FIR Sector",
    ICN_ADJ_FIR: "인천 인접 FIR",
    TCA: "TCA",
    SEA_COAST_PG: "특정관리해역",
    SEA_COAST_PG_1: "특정관리해역면",
    SEA_IDXMAP_PG: "해구도"
  },
  TILE_MAP_LAYER_SET: {
    "GRP_SL": [{
        layerName: "SL",
        minZoomLevel: 0,
        maxZoomLevel: 8,
        desc: "해안선"
      },
      {
        layerName: "SL_EDT_1PX",
        minZoomLevel: 9,
        maxZoomLevel: 11
      },
      {
        layerName: "SL_EDT",
        minZoomLevel: 12,
        maxZoomLevel: 21
      }
    ],
    "GRP_SL_SDW": [{
        layerName: "SL_SDW",
        minZoomLevel: 2,
        maxZoomLevel: 8,
        desc: "해안선_그림자"
      },
      {
        layerName: "SL_SDW_EDT",
        minZoomLevel: 9,
        maxZoomLevel: 16
      }
    ],
    "GRP_WC": [{
        layerName: "WC",
        minZoomLevel: 0,
        maxZoomLevel: 11,
        desc: "국가경계"
      },
      {
        layerName: "WC_EDT",
        minZoomLevel: 12,
        maxZoomLevel: 21
      }
    ],
    "GRP_LD": [{
        layerName: "LD",
        minZoomLevel: 0,
        maxZoomLevel: 11,
        desc: "육지면"
      },
      {
        layerName: "LD_EDT",
        minZoomLevel: 12,
        maxZoomLevel: 21
      }
    ],
    "GRP_GRD": [{
        layerName: "GRD10",
        minZoomLevel: 0,
        maxZoomLevel: 10,
        desc: "그리드"
      },
      {
        layerName: "GRD5",
        minZoomLevel: 11,
        maxZoomLevel: 16
      },
      {
        layerName: "GRD3",
        minZoomLevel: 17,
        maxZoomLevel: 21
      }
    ],
    "GRP_SD_SGG": [
      /*** 줌레벨에 따라 시도, 시군구 표시 *
       * 190612 읍면동 추가
       * TODO 시군구가 조금 빨리 나와야 할 것 같은데 zoomlevel 세부조정 나중에 해보기
       * 순서대로 표출은 되는데 조금.... 그래
       * **/
      {
        layerName: "SD",
        minZoomLevel: 12,
        maxZoomLevel: 14,
        desc: "행정구역"
      },
      {
        layerName: "SGG_KOR",
        minZoomLevel: 15,
        maxZoomLevel: 17
      },
      {
        layerName: "EMD_KOR_2015",
        minZoomLevel: 18,
        maxZoomLevel: 21
      } //폴더명과 같게 수정
    ],
    "GRP_SEOUL": [{
        layerName: "SL",
        minZoomLevel: 0,
        maxZoomLevel: 8,
        desc: "서울(집중감시)"
      },
      {
        layerName: "RIV",
        minZoomLevel: 16,
        maxZoomLevel: 21
      },
      {
        layerName: "RIV_LBL",
        minZoomLevel: 18,
        maxZoomLevel: 21
      },
      {
        layerName: "ROD",
        minZoomLevel: 18,
        maxZoomLevel: 21
      },
      {
        layerName: "ROD_LBL",
        minZoomLevel: 19,
        maxZoomLevel: 21
      },
      {
        layerName: "SD",
        minZoomLevel: 12,
        maxZoomLevel: 21
      },
      {
        layerName: "SGG_KOR",
        minZoomLevel: 12,
        maxZoomLevel: 21
      },
      {
        layerName: "EMD_KOR",
        minZoomLevel: 18,
        maxZoomLevel: 21
      },
      {
        layerName: "SL_EDT_1PX",
        minZoomLevel: 9,
        maxZoomLevel: 11
      },
      {
        layerName: "SL_EDT",
        minZoomLevel: 12,
        maxZoomLevel: 21
      }
    ],
    "GRP_LD_YLW": [{
        layerName: "LD_YLW",
        minZoomLevel: 2,
        maxZoomLevel: 8,
        desc: "육지_노란색"
      },
      {
        layerName: "LD_YLW_EDT",
        minZoomLevel: 9,
        maxZoomLevel: 16
      }
    ],
    "GRP_LD_PNK": [{
        layerName: "LD_PNK",
        minZoomLevel: 2,
        maxZoomLevel: 8,
        desc: "육지_분홍색"
      },
      {
        layerName: "LD_PNK_EDT",
        minZoomLevel: 9,
        maxZoomLevel: 16
      }
    ],
    "GRP_LD_GRY": [{
        layerName: "LD_GRY",
        minZoomLevel: 2,
        maxZoomLevel: 8,
        desc: "육지_회색"
      },
      {
        layerName: "LD_GRY_EDT",
        minZoomLevel: 9,
        maxZoomLevel: 16
      }
    ],
    //강, 하천 추가 테스트
    //TODO map4.js 에서는 RIV, RIV_LBL을 grouplayer 로 합쳐서 넘겨주는데 여기서도 꼭 필요한가?
    "GRP_RIV": [{
        layerName: "RIV",
        minZoomLevel: 9,
        maxZoomLevel: 21,
        desc: "강, 하천"
      },
      {
        layerName: "RIV_LBL",
        minZoomLevel: 10,
        maxZoomLevel: 21
      }
    ],
  },
  MAP_AREA: {
    "A": {
      "NX": 576,
      "NY": 720,
      "SX": 144,
      "SY": 560,
      "DESC": "남한"
    },
    "B": {
      "NX": 1152,
      "NY": 1440,
      "SX": 560,
      "SY": 840,
      "DESC": "한반도"
    },
    "HM": {
      "NX": 9598,
      "NY": 7998,
      "SX": 4599,
      "SY": 5434,
      "DESC": "HIMA(NWPN)"
    },
    "CO": {
      "NX": 8840,
      "NY": 7792,
      "SX": 4248,
      "SY": 5304,
      "DESC": "COMS(NWPN)"
    },
    "CM": {
      "NX": 7495,
      "NY": 7495,
      "SX": 4248,
      "SY": 5007,
      "DESC": "COMS(MAPLE)"
    },
    "D": {
      "NX": 684,
      "NY": 684,
      "SX": 154,
      "SY": 581,
      "DESC": "남한(+독도)"
    },
    "D1": {
      "NX": 640,
      "NY": 640,
      "SX": 130,
      "SY": 570,
      "DESC": "남한S"
    },
    "D2": {
      "NX": 600,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "남한2"
    },
    "D3": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "남한2(+독도)"
    },
    "E": {
      "NX": 768,
      "NY": 768,
      "SX": 238,
      "SY": 665,
      "DESC": "남한(+독도,이어도)"
    },
    "F": {
      "NX": 1536,
      "NY": 1536,
      "SX": 720,
      "SY": 920,
      "DESC": "한반도(확장)"
    },
    "G": {
      "NX": 740,
      "NY": 1260,
      "SX": 210,
      "SY": 675,
      "DESC": "디지털"
    },
    "G_TEST": {
      "NX": (740 * 3),
      "NY": (1260 * 3),
      "SX": (210 * 3),
      "SY": (675 * 3),
      "DESC": "디지털"
    },
    "G1": {
      "NX": 720,
      "NY": 1240,
      "SX": 200,
      "SY": 665,
      "DESC": "디지털S"
    },
    "HR": {
      "NX": 1024,
      "NY": 1024,
      "SX": 440,
      "SY": 770,
      "DESC": "레이더"
    },
    "HB": {
      "NX": 1152,
      "NY": 1440,
      "SX": 560,
      "SY": 840,
      "DESC": "한반도"
    },
    "H1": {
      "NX": 2400,
      "NY": 2400,
      "SX": 1200,
      "SY": 1200,
      "DESC": "한반도(주변)"
    },
    "H2": {
      "NX": 4800,
      "NY": 4800,
      "SX": 2400,
      "SY": 2400,
      "DESC": "동북아시아"
    },
    "J": {
      "NX": 5700,
      "NY": 5100,
      "SX": 2850,
      "SY": 2550,
      "DESC": "한반도+일본"
    },
    "K": {
      "NX": 1170,
      "NY": 1410,
      "SX": 585,
      "SY": 705,
      "DESC": "KLAPS"
    },
    "M": {
      "NX": 4800,
      "NY": 4160,
      "SX": 2620,
      "SY": 1780,
      "DESC": "MM5동아시아"
    },
    "M1": {
      "NX": 1023,
      "NY": 1023,
      "SX": 426,
      "SY": 770,
      "DESC": "MAPLE"
    },
    "N": {
      "NX": 640,
      "NY": 640,
      "SX": 200,
      "SY": 65,
      "DESC": "북한"
    },
    "S": {
      "NX": 1024,
      "NY": 1024,
      "SX": 512,
      "SY": 512,
      "DESC": "MTSAT(아시아)"
    },
    "T": {
      "NX": 12000,
      "NY": 9000,
      "SX": 6000,
      "SY": 4500,
      "DESC": "MTSAT"
    },
    "V": {
      "NX": 795,
      "NY": 795,
      "SX": 310,
      "SY": 615,
      "DESC": "VSRF"
    },
    "W": {
      "NX": 900,
      "NY": 1050,
      "SX": 365,
      "SY": 770,
      "DESC": "WPMM"
    },
    "WS": {
      "NX": 2800,
      "NY": 3400,
      "SX": 1000,
      "SY": 2000,
      "DESC": "파랑모델(아시아)"
    },
    "SE": {
      "NX": 50,
      "NY": 50,
      "SX": -60,
      "SY": 70,
      "DESC": "서울"
    },
    "BS": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "부산"
    },
    "IC": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "인천"
    },
    "DG": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "대구"
    },
    "US": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "울산"
    },
    "GJ": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "광주"
    },
    "DJ": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "대전"
    },
    "SJ": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "세종"
    },
    "GG": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "경기도"
    },
    "GW": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "강원도"
    },
    "CB": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "충북"
    },
    "CN": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "충남"
    },
    "GB": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "경북"
    },
    "GN": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "경남"
    },
    "JB": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "전북"
    },
    "JN": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "전남"
    },
    "JJ": {
      "NX": 680,
      "NY": 680,
      "SX": 154,
      "SY": 580,
      "DESC": "제주"
    }
  },
  //controller에 들어갈 요소들
  ctrlElements: {
    "UM": [{
      name: "기온",
      code: "ta",
      icon: '<i class="fa fa-temperature-high"></i>',
      layer: null,
      custom: {
        layerType: "" // layer type 설정
      }
    }],
    "AWS": [{
        name: "기온",
        code: "ta",
        icon: '<i class="fa fa-temperature-high"></i>',
        layer: null,
        custom: {
          layerType: "" // layer type 설정
        }
      },
      // {
      //     name: "강수(15분)",
      //     code: "rn_15m",
      //     icon: '<i class="fa fa-temperature-high"></i>',
      //     layer: null,
      //     custom:{
      // 		  layerType: "" // layer type 설정
      //     }
      // },	  
      {
        name: "일조(60분)",
        code: "si_60m",
        icon: '<i class="fa fa-temperature-high"></i>',
        layer: null,
        custom: {
          layerType: "" // layer type 설정
        }
      },
      {
        name: "습도",
        code: "hm",
        icon: '<i class="fa fa-temperature-high"></i>',
        layer: null,
        custom: {
          layerType: "" // layer type 설정
        }
      }
    ]
  },
  // elements: [{
  //     name: "기온",
  //     code: "ta",
  //     icon: '<i class="fa fa-temperature-high"></i>',
  //     layer: null,
  //     custom: {
  //       layerType: "" // layer type 설정
  //     }
  //   },
  //   // {
  //   //     name: "강수(15분)",
  //   //     code: "rn_15m",
  //   //     icon: '<i class="fa fa-temperature-high"></i>',
  //   //     layer: null,
  //   //     custom:{
  //   // 		  layerType: "" // layer type 설정
  //   //     }
  //   // },	  
  //   {
  //     name: "일조(60분)",
  //     code: "si_60m",
  //     icon: '<i class="fa fa-temperature-high"></i>',
  //     layer: null,
  //     custom: {
  //       layerType: "" // layer type 설정
  //     }
  //   },
  //   {
  //     name: "습도",
  //     code: "hm",
  //     icon: '<i class="fa fa-temperature-high"></i>',
  //     layer: null,
  //     custom: {
  //       layerType: "" // layer type 설정
  //     }
  //   }
  // ]
};