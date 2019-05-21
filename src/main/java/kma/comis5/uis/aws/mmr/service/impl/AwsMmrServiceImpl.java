/*------------------------------------------------------------------------------
 * 프로젝트 : 선진예보시스템 - UIS
 * 소스정보 : $Id::                                                     $
 * 리비전   : $Rev::                           $
 * 변경일자 : $Date::                          $
 * 변경자   : $Author::                        $
 *
 * 2019. 4. 25.
 * Copyright 2015 LG CNS, All rights reserved
 *----------------------------------------------------------------------------*/
package kma.comis5.uis.aws.mmr.service.impl;

import java.awt.Color;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;
import java.util.StringTokenizer;

import kma.comis5.kaf.common.util.StringUtil;
import kma.comis5.uis.aws.mmr.service.AwsMmrService;
import kma.comis5.uis.aws.mmr.service.Config_ShrtSrv30;
import kma.comis5.uis.aws.mmr.service.DFSShrtTimeSequenceSrv30;
import kma.comis5.uis.common.util.DateUtil;
import kma.comis5.uis.common.util.UISMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;


import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * (여기에 클래스 설명을 기재합니다.)
 *
 * @author Royeon
 *
 */
@Service("awsMmrService")
public class AwsMmrServiceImpl extends EgovAbstractServiceImpl implements AwsMmrService {

	/** Log Info */
	private static final Logger log = LogManager.getLogger(AwsMmrServiceImpl.class);
	
	public UISMap retrieveData(UISMap reqData) throws Exception {

		UISMap rtnData = new UISMap();
		float[] floatData = null;
		floatData = retrieveSvcDstTplShrtData(reqData); // 수정대상

		if (floatData != null && floatData.length > 0) {
			String analTime = StringUtil.NVL(reqData.getString("tmFc"), DateUtil.getCurrentDateHourString());
			rtnData.setString("dateTime", analTime);
			rtnData.setBoolean("isExisted", true);
		} else {
			rtnData.setBoolean("isExisted", false);
		}
		rtnData.set("rtnData", floatData);

		return rtnData;
	}

	public float[] retrieveSvcDstTplShrtData(UISMap param) throws Exception {
		float[] convert = null;

		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmm", Locale.KOREAN);

		// GEMD
		/*
		 * @param tmFc KST
		 * 
		 * @return tm Calendar()
		 */
		DFSShrtTimeSequenceSrv30 tm = this.getNowTimeSequence(param.getString("tmFc"));

		// GEMD
		Calendar nowCal = (Calendar) tm.getUtcCal();
		String lastTm = df.format(nowCal.getTime());
		String yyyymm = lastTm.substring(0, 6);
		String dd = lastTm.substring(6, 8);

		// GEMD
		String basePath = "\\\\192.168.2.129\\data\\DFSD\\SHRT\\" + yyyymm + "\\" + dd + "/";

		log.debug(">>>>>>>>>" + basePath);

		try {
			tm = new DFSShrtTimeSequenceSrv30(nowCal);
			convert = getIfsSvrwShrtBinaryData(param.getString("readData"), tm, basePath, param.getString("dataType"));
		} catch (IOException e) {
			log.error(this.getClass().getName() + ".retrieveSvcTplShrtData() Error : " + e.toString());
		}

		return convert;
	}

	/**
	 * 동네예보 binary 파일 정보를 조회한다.
	 * 
	 * @param svrwCd
	 *            위험기상종류
	 * @param filePath
	 *            파일명
	 * @return 1차원 배열 데이터
	 * @throws DevonException
	 * @throws IOException
	 */
	public float[] getIfsSvrwShrtBinaryData(String readData, DFSShrtTimeSequenceSrv30 tm, String filePath,
			String shrtCd) throws IOException, Exception {
		File file = null;
		int width = Config_ShrtSrv30.GRID_WIDTH;
		int height = Config_ShrtSrv30.GRID_HEIGHT;
		// int[] type = Config_ShrtSrv30._iFct;

		float[] convert = null;
		byte[] b = new byte[width * height * 4];
		int read = Integer.parseInt(StringUtil.NVL(readData, "0"));

		String fileName = filePath + File.separator + Config_ShrtSrv30.DFS_PREFIX + shrtCd + "." + tm.getUtcTm();
		fileName = checkSafePath(fileName);
		file = new File(fileName);

		// 파일 존재시 데이터 조회
		if (!file.exists()) {
			return null;
		} else {
			RandomAccessFile ra = null;
			try {
				ra = new RandomAccessFile(file, "r");

				// read => from fctcnt => 발표시간별 예보 갯수
				int bufstr = 256 + read * (width * height * 4); // 256+read*(wid*hei*4)+(0*wid*4)+(0*4);
				// int bufend = 256+read*(width*height*4)+((height-1)*width*4)+(width*4);
				// byte[] buffer = new byte[bufend];

				ra.seek(bufstr);
				ra.read(b);

				int blength = b.length;
				int flength = blength / 4;
				byte[] buf = new byte[4];
				convert = new float[flength];
				for (int j = 0; j < blength; j += 4) {
					System.arraycopy(b, j, buf, 0, 4);

					convert[(int) (j / 4)] = Float.intBitsToFloat(((buf[3] << 24) & 0xFF000000)
							| ((buf[2] << 16) & 0xFF0000) | ((buf[1] << 8) & 0xFF00) | (buf[0] & 0xFF));
				}
			} catch (IOException e) {
				throw new IOException(e);
			} finally {
				// 버퍼를 닫는다.
				file = null;
				ra.close();
				ra = null;
			}
		}

		return convert;
	}

	/**
	 * GEMD
	 * 
	 * @author LG CNS
	 * @version 1.0 2011-03-14
	 * @param rptTm
	 * @return SHRT GEMD
	 * @throws Exception
	 */
	public DFSShrtTimeSequenceSrv30 getNowTimeSequence(String rptTm) throws Exception {
		String yyyy = rptTm.substring(0, 4);
		String mm = rptTm.substring(4, 6);
		String dd = rptTm.substring(6, 8);
		String hh = rptTm.substring(8, 10);

		Calendar tm = Calendar.getInstance();
		tm.set(Integer.parseInt(yyyy), Integer.parseInt(mm) - 1, Integer.parseInt(dd), Integer.parseInt(hh), 0, 0);

		// KST --> UTC
		tm.add(Calendar.HOUR_OF_DAY, -9);

		int adjust = tm.get(Calendar.HOUR_OF_DAY);
		tm.add(Calendar.HOUR_OF_DAY, (-1) * (adjust + 1) % 3);

		tm.set(Calendar.MINUTE, 0);
		tm.set(Calendar.SECOND, 0);
		tm.set(Calendar.MILLISECOND, 0);

		return new DFSShrtTimeSequenceSrv30(tm);
	} // end getNowTimeSequence

	public UISMap retrieveColor(UISMap param) throws FileNotFoundException, Exception {
		UISMap result = new UISMap();

		String fname = "";
		String unit = "";
		String dataType = param.getString("dataType");
		int MM = Integer.parseInt(param.getString("tmFc").substring(4, 6));
		int lvlCode = 0;
		int di = 0;

		// for pty & sky
		ArrayList<String> colorData = new ArrayList<String>();
		ArrayList<String> colorLvl = new ArrayList<String>();

		if (dataType.equals("PTY")) {
			colorData.add("#ffffff");
			colorData.add("#60d47e");
			colorData.add("#3dc4e6");
			colorData.add("#8e8ee9");
			for (int i = 0; i < 4; i++) {
				colorLvl.add("" + i);
			}
		} else if (dataType.equals("SKY")) {
			colorData.add("#fafafa");
			colorData.add("#b5d2e2");
			colorData.add("#6fa2bd");
			colorData.add("#3e7a9a");
			for (int i = 1; i <= 4; i++) {
				colorLvl.add("" + i);
			}
		} else if (dataType.equals("R06") || dataType.equals("R12")) {
			colorData.add("#eeeeee");
			colorData.add("#f9cd00");
			colorData.add("#00d500");
			colorData.add("#07abff");
			colorData.add("#4c4eb1");
			colorData.add("#ad07ff");
			colorData.add("#f63e3e");
			colorData.add("#333333");
			colorLvl.add("0");
			colorLvl.add("1");
			colorLvl.add("5");
			colorLvl.add("10");
			colorLvl.add("20");
			colorLvl.add("40");
			colorLvl.add("70");
			colorLvl.add("100");
		} else if (dataType.equals("S06") || dataType.equals("S12")) {
			colorData.add("#eeeeee");
			colorData.add("#f9cd00");
			colorData.add("#00d500");
			colorData.add("#07abff");
			colorData.add("#4c4eb1");
			colorData.add("#ad07ff");
			colorLvl.add("0");
			colorLvl.add("1");
			colorLvl.add("5");
			colorLvl.add("10");
			colorLvl.add("20");
			colorLvl.add("40");
		} else {
			if (dataType.equals("REH")) {
				fname = "color_hm.rgb";
				lvlCode = 0;
				unit = "%";
				di = 2;
			} else if (dataType.equals("WSD") || dataType.equals("VEC")) {
				fname = "color_ws.rgb";
				lvlCode = 9;
				unit = "m/s";
				di = 1;
			}
			// else if (dataType.equals("S06") || dataType.equals("S12")) {
			// fname = "color_sd.rgb";
			// lvlCode = 9;
			// unit = "cm";
			// di = 1;
			// }
			// else if (dataType.equals("R06") || dataType.equals("R12")) {
			// fname = "color_rn.rgb";
			// lvlCode = 9;
			// unit = "mm";
			// di = 1;
			// }
			else if (dataType.equals("RAC")) {
				fname = "color_rn_day.rgb";
				lvlCode = 0;
				unit = "mm";
				di = 1;
			} else if (dataType.equals("POP")) {
				fname = "color_pop.rgb";
				lvlCode = 0;
				unit = "%";
				di = 2;
			} else if (dataType.equals("T3H") || dataType.equals("TMX") || dataType.equals("TMN")) {
				fname = "color_ta.rgb";
				lvlCode = 8;
				unit = "C";
				di = 2;
			} else if (dataType.equals("WAV")) {
				fname = "color_wav.rgb";
				lvlCode = 1;
				unit = "m";
				di = 1;
			}

			UISMap list = getColorTable(fname, lvlCode, MM);
			ArrayList<String> tmpColorData = (ArrayList<String>) list.get("colorData");
			ArrayList<String> tmpColorLvl = (ArrayList<String>) list.get("colorLvl");
			int size = tmpColorLvl.size() - 1;
			for (int i = 0; i < size; i += di) {
				colorData.add(tmpColorData.get(i));
				colorLvl.add(tmpColorLvl.get(i));
			}
		}

		result.set("colorData", colorData);
		result.set("colorLvl", colorLvl);

		return result;
	}

	public UISMap getColorTable(String fileName, int lvl_code, int MM) {
		UISMap list = new UISMap();

		String path = "\\\\192.168.2.129\\data\\COLOR\\" + fileName;				
		
		int numOfColor = 0;
		String rgbStr = "";
		String v1 = "";
		int dv = 0;

		ArrayList<String> colorData = new ArrayList<String>();
		ArrayList<String> colorLvl = new ArrayList<String>();

		try {
			BufferedReader reader = new BufferedReader(new FileReader(path)); // 수정
			StringTokenizer st;
			String line;

			while ((line = reader.readLine()) != null) {
				if (line.length() < 10) {
					continue;
				}

				// colorData
				st = new StringTokenizer(line);
				Color c = new Color(Integer.parseInt(st.nextToken()), Integer.parseInt(st.nextToken()),
						Integer.parseInt(st.nextToken()));
				rgbStr = "#" + toLength2(Integer.toHexString(c.getRed())) + toLength2(Integer.toHexString(c.getGreen()))
						+ toLength2(Integer.toHexString(c.getBlue()));
				colorData.add(rgbStr);

				// colorLvl
				v1 = st.nextToken();
				if (lvl_code == 0) {
					colorLvl.add(String.format("%.0f", Float.parseFloat(v1)));
				} else if (lvl_code == 1) {
					colorLvl.add(String.format("%.1f", Float.parseFloat(v1)));
				} else if (lvl_code == 8) {
					switch (MM) {
					case 1:
						dv = -15;
						break;
					case 2:
						dv = -15;
						break;
					case 3:
						dv = -10;
						break;
					case 4:
						dv = -5;
						break;
					case 5:
						dv = 5;
						break;
					case 6:
						dv = 5;
						break;
					case 7:
						dv = 10;
						break;
					case 8:
						dv = 10;
						break;
					case 9:
						dv = 5;
						break;
					case 10:
						dv = 0;
						break;
					case 11:
						dv = -10;
						break;
					case 12:
						dv = -15;
						break;
					}
					colorLvl.add(String.format("%.0f", Float.parseFloat(v1) + dv));
				} else if (lvl_code == 9) {
					if (Float.parseFloat(v1) < 10) {
						colorLvl.add(String.format("%.1f", Float.parseFloat(v1)));
					} else {
						colorLvl.add(String.format("%.0f", Float.parseFloat(v1)));
					}
				}
			}
		} catch (FileNotFoundException fe) {
			fe.printStackTrace();
		} catch (IOException ie) {
			ie.printStackTrace();
		}

		list.set("colorData", colorData);
		list.set("colorLvl", colorLvl);

		return list;
	}

	/**
	 * SecurityUtil에서 DevonException 사용 파일 경로의 위험성을 점검한다. 파일 경로가 /로 시작하거나 ..를 포함하는
	 * 경우 Exception을 던진다.
	 *
	 * @param filePath
	 * @throws DevonException
	 */
	private String checkSafePath(String filePath) throws Exception {
		if (filePath.indexOf("..") >= 0
				|| filePath.matches("^\\/(bin|boot|dev|etc|home|misc|mnt|opt|proc|sbin|root|selinux|tmp|usr|var).*")) {
			// throw new DevonException("접근이 허용되지 않은 파일경로 : " + filePath);
			throw new Exception("접근이 허용되지 않은 파일경로 : " + filePath);
		}
		return filePath;
	}

	/**
	 * static --> XXX
	 * 
	 * @param String
	 *            iStr
	 * @return String
	 */
	public String toLength2(String num) {
		if (num.length() == 1) {
			num = "0" + num;
		}
		return num;
	}

}
