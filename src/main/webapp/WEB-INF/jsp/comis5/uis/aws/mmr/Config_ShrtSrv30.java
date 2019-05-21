package kma.comis5.uis.aws.mmr.service;

/*------------------------------------------------------------------------------
 * 프로젝트 : Advanced Forecast System - [프로젝트명]
 * 소스정보 : $Id: Config_ShrtSrv30.java 31613 2014-10-13 09:55:04Z shlee $$
 * 리비전   : $Rev:: 31613                 $
 * 변경일자 : $Date:: 2014-10-13 18:55:04 #$
 * 변경자   : $Author:: shlee                $
 *	수정 : 김로연 Config_Crpt
 * Copyright 2011 KMA and LG CNS All rights reserved
 *----------------------------------------------------------------------------*/

/**
 * 3시간 디지털 예보(동네 예보) 기본 설정 로드 및 상수 집합
 *
 * @author Seagull
 * @version 1.0
 */
public class Config_ShrtSrv30 {

	/**
	 * 격자 데이터 Width
	 */
	public static final int GRID_WIDTH = 149;

	/**
	 * 격자 데이터 Height
	 */
	public static final int GRID_HEIGHT = 253;

	/**
	 * 시계열3 시간별 최대 예보 갯수
	 */
	public static final int MAX_FCT_CNT = 22;  // 시간대별 최대 표출 판수

	/**
	 * 발표시간별 예보 갯수
	 * 0 : "T3H" 3시간별기온
	 * 1 : "TMX" 최고기온
	 * 2 : "TMN" 최저기온
	 * 3 : "REH" 습도
	 * 4 : "SKY" 하늘상태
	 * 5 : "PTY" 강수형태
	 * 6 : "POP" 강수확률
	 * 7 : "R12" 12시간누적강수량
	 * 8 : "S12" 12시간누적적설
	 * 9 : "UUU" 동서방향풍속
	 * 10 : "VVV" 남북방향풍속
	 * 11 : "WAV" 파고
	 * 12 : "R06" 6시간누적강수량
	 * 13 : "S06" 6시간누적적설
	 *
	 * x : 변수 형식 코드
	 * y : 시간 Seq
	 */
	public static final int[][] FCT_CNT = new int[][]{
	//	 2, 5, 8, 11,14,17,20,23

	    {16,23,22,21,20,19,18,17}, 	// 3시간별기온
		{ 2, 3, 3, 3, 3, 3, 3, 3},	// 최고기온
		{ 2, 3, 3, 3, 3, 3, 3, 3},	// 최저기온
		{16,23,22,21,20,19,18,17},	// 습도
		{16,23,22,21,20,19,18,17},	// 하늘 상태
		{16,23,22,21,20,19,18,17},	// 강수형태
		{16,23,22,21,20,19,18,17},	// 강수확률
		{16,23,22,21,20,19,18,17}, 	// 동서방향풍속
		{16,23,22,21,20,19,18,17},	// 남북방향풍속
		{16,23,22,21,20,19,18,17},  // 파고
		{ 8,11,11,11,10, 9, 9, 8},	// 6시간누적강수량 20130506
		{ 8,11,11,11,10, 9, 9, 8},	// 6시간누적적설   20130506
		{16,23,22,21,20,19,18,17}, 	// VEC풍향
		{16,23,22,21,20,19,18,17}	// WSD풍속

		};

    /**
     * DFS 데이터 디렉토리
     */
    //public static String DFS_DIR = Config_Crpt.DATA_ROOT + "/DATA/DFSD/SHRT/GEMD/";
//	public static String DFS_DIR = Config_Crpt.DATA_ROOT + "/DFSD/SHRT/GEMD/";
//	public static String DFS_DIR = Const.path.dataRoot + "/DFSD/SHRT/GEMD/";
	public static String DFS_DIR = "/AFS_OUT" + "/DFSD/SHRT/GEMD/";

	/**
	 * 파일명 Prefix (DFS_SHRT_GRD_GEMD_변수코드.년월일시분)
	 */
	public static final String DFS_PREFIX = "DFS_SHRT_GRD_GEMD_";   // 변경 단기 SHRT 사용 --> SHRN 사용안함 20100614
    public static final String DFS_TIME_PREFIX = "DFS_SHRT_STN_GEMD_TIME_";   // PIN 지점용 20110816

    /**
	 * 코드 : T3H(3시간별기온), TMX(최고기온), TMN(최저기온), REH(습도),
	 * SKY(하늘상태), PTY(강수형태), POP(강수확률), R12(12시간누적강수량), S12(12시간누적적설),
	 * UUU(동서방향풍속), VVV(남북방향풍속), WAV(파고)
	 */
	public static final String[] VCODE = new String[] {
		"T3H",//T3H:
		"TMX",//TMX:
		"TMN",//TMN:
		"REH",//REH:
		"SKY",//SKY:
		"PTY",//PTY:
		"POP",//POP:
		"UUU",//UUU
		"VVV",//VVV
		"WAV",//WAV:
		"R06",//R06:    // 6시간누적강수량 20130506
		"S06",//S06:    // 6시간누적적설   20130506
		"VEC",//VEC:풍향
		"WSD" //WSD:풍속
	};

    public static final int[] _iFct = new int[] {0,1,2,3,4,5,6,7,8,9,10,11,12,13}; // 20130506 , 차후 12시간 강수 적설 제외
	public static final int V_T3H = 0;
	public static final int V_TMX = 1;
	public static final int V_TMN = 2;
	public static final int V_REH = 3;
	public static final int V_SKY = 4;
	public static final int V_PTY = 5;
	public static final int V_POP = 6;
	public static final int V_UUU = 7;
	public static final int V_VVV = 8;
	public static final int V_WAV = 9;
	public static final int V_R06 = 10;  // 6시간누적강수량 20130506
	public static final int V_S06 = 11;  // 6시간누적적설   20130506

//	public static final String USE_T3H = Config_Crpt.USE_T3H;
//	public static final String USE_TMX = Config_Crpt.USE_TMX;
//	public static final String USE_TMN = Config_Crpt.USE_TMN;
//	public static final String USE_REH = Config_Crpt.USE_REH;
//	public static final String USE_SKY = Config_Crpt.USE_SKY;
//	public static final String USE_PTY = Config_Crpt.USE_PTY;
//	public static final String USE_POP = Config_Crpt.USE_POP;
//	public static final String USE_UUU = Config_Crpt.USE_UUU;
//	public static final String USE_VVV = Config_Crpt.USE_VVV;
//	public static final String USE_WAV = Config_Crpt.USE_WAV;
//	public static final String USE_R06 = Config_Crpt.USE_R06;  // 6시간누적강수량 20130506
//	public static final String USE_S06 = Config_Crpt.USE_S06;  // 6시간누적적설   20130506
	public static final String USE_T3H = "Y";
	public static final String USE_TMX = "Y";
	public static final String USE_TMN = "Y";
	public static final String USE_REH = "Y";
	public static final String USE_SKY = "Y";
	public static final String USE_PTY = "Y";
	public static final String USE_POP = "Y";
	public static final String USE_UUU = "Y";
	public static final String USE_VVV = "Y";
	public static final String USE_WAV = "Y";
	public static final String USE_R06 = "Y";  // 6시간누적강수량 20130506
	public static final String USE_S06 = "Y";  // 6시간누적적설   20130506

    /**
	 * 코드 : T3H(3시간별기온), TMX(최고기온), TMN(최저기온), REH(습도),
	 * SKY(하늘상태), PTY(강수형태), POP(강수확률), R06(6시간누적강수량), S06(6시간누적적설),
	 * UUU(동서방향풍속), VVV(남북방향풍속), WAV(파고)
	 */
	public static final String[] VCODE_TIME = new String[] {
		"T3H",
		"TMX",
		"TMN",
		"REH",
		"SKY",
		"PTY",
		"POP",
		"UUU",
		"VVV",
		"R06", // 6시간누적강수량 20130506
		"S06"  // 6시간누적적설   20130506
	};

	public static final int[] _iFctTime = new int[] {0,1,2,3,4,5,6,7,8,9,10}; // 파고 제외 20130506 12시간 삭제

	public static final String USE_TIME_T3H = "Y";
	public static final String USE_TIME_TMX = "Y";
	public static final String USE_TIME_TMN = "Y";
	public static final String USE_TIME_REH = "Y";
	public static final String USE_TIME_SKY = "Y";
	public static final String USE_TIME_PTY = "Y";
	public static final String USE_TIME_POP = "Y";
	public static final String USE_TIME_UUU = "Y";
	public static final String USE_TIME_VVV = "N";
	public static final String USE_TIME_R06 = "Y";  // 6시간누적강수량 20130506
	public static final String USE_TIME_S06 = "Y";  // 6시간누적적설량 20130506

	public static final int SHRT_TIME_LINE_START = 46;
	public static final int SHRT_TIME_LINE_DATA_LEN = 7;

	public static final int[][] FCT_CNT_TIME = new int[][]{
		//	 2, 5, 8, 11,14,17,20,23
		    {15,22,21,20,19,18,17,16}, 	// 3시간별기온
			{ 2, 3, 3, 3, 3, 3, 3, 3},	// 최고기온
			{ 2, 3, 3, 3, 3, 3, 3, 3},	// 최저기온
			{15,22,21,20,19,18,17,16},	// 습도
			{15,22,21,20,19,18,17,16},	// 하늘 상태
			{15,22,21,20,19,18,17,16},	// 강수형태
			{15,22,21,20,19,18,17,16},	// 강수확률
			{15,22,21,20,19,18,17,16}, 	// 동서방향풍속
			{15,22,21,20,19,18,17,16},	// 남북방향풍속
			{15,22,21,20,19,18,17,16},  // 파고
			{ 8,11,11,11,10, 9, 9, 8},	// 6시간누적강수량 20130506
			{ 8,11,11,11,10, 9, 9, 8}	// 6시간누적적설   20130506

			};
}
