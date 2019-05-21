/**
 * ----------------------------------------------------------------------------
 * COMIS-4 Project : KAF.common
 * ----------------------------------------------------------------------------
 * Copyright (c) 2012 ���û, LG CNS ���ҽþ� All rights reserved.
 */

package kma.comis5.kaf.common.util;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.Vector;

import kma.comis5.kaf.dopen.core.exception.LException;

/**
 * <pre>
 * ���� StringUtil�� �̰�
 * @author �輺��
 * @since 2012. 9. 27.
 * @version 1.0
 * @Modification
 * ������          ������          ��������
 * ------------  ------  ------------------------------------------------------
 * 2012. 9. 27.  �輺��   ���� ����
 * </pre>
 */
public class StringUtil {
	/**
	 * Y / N �� ��/�ƴϿ��� �ٲپ� �ش�
	 * 
	 * @param ynStr
	 *            Y/N
	 * @return ��/�ƴϿ�
	 * @exception LException
	 */

	public static String convertYn(String ynStr) {
		if (ynStr == null) {
			return "";
		}
		if (ynStr.trim().toUpperCase().equals("Y")) {
			return "��";
		}
		if (ynStr.trim().toUpperCase().equals("N")) {
			return "�ƴϿ�";
		}
		return "";
	}

	/**
	 * ����ڿ�(strTarget)���� �������ڿ�(strDelete)�� ������ ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * @param strTarget
	 *            ����ڿ�
	 * @param strDelete
	 *            ������ ���ڿ�
	 * @exception LException
	 * @return �����Ϸ�� ���ڿ�
	 */
	public static String delete(String strTarget, String strDelete) {
		return replace(strTarget, strDelete, "");
	}

	/**
	 * ����ڿ�(strTarget)���� ���й��ڿ�(strDelim)�� �������� ���ڿ��� �и��Ͽ� �� �и��� ���ڿ��� �迭�� �Ҵ��Ͽ�
	 * ��ȯ�Ѵ�.
	 * 
	 * @param strTarget
	 *            �и� ��� ���ڿ�
	 * @param strDelim
	 *            ���н�ų ���ڿ��μ� ��� ���ڿ����� ���Ե��� �ʴ´�.
	 * @param bContainNull
	 *            ���еǾ��� ���ڿ��� ���鹮�ڿ��� ���Կ���. true : ����, false : �������� ����.
	 * @return �и��� ���ڿ��� ������� �迭�� �ݳ��Ͽ� ��ȯ�Ѵ�.
	 */
	public static String[] split(String strTarget, String strDelim,
			boolean bContainNull) {

		// StringTokenizer�� �����ڰ� �������� ��ø�Ǿ� ���� ��� ���� ���ڿ��� ��ȯ���� ����.
		// ���� �Ʒ��� ���� �ۼ���.
		int index = 0;
		String[] resultStrArray = null;

		resultStrArray = new String[search(strTarget, strDelim) + 1];
		String strCheck = new String(strTarget);
		while (strCheck.length() != 0) {
			int begin = strCheck.indexOf(strDelim);
			if (begin == -1) {
				resultStrArray[index] = strCheck;
				break;
			} else {
				int end = begin + strDelim.length();
				if (bContainNull) {
					resultStrArray[index++] = strCheck.substring(0, begin);
				}
				strCheck = strCheck.substring(end);
				if (strCheck.length() == 0 && bContainNull) {
					resultStrArray[index] = strCheck;
					break;
				}
			}
		}
		return resultStrArray;
	}

	public static String escapeDollarMarker(String str) {
		return StringUtil.replace(str, "$", "\\$");
	}

	/**
	 * �Է��� ���ڿ��� String�̸� true�� �ƴϸ� false�� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * [��� ����]
	 * isString("abc")  ===> true
	 * isString(new Integer(0)) ===> false
	 * </pre>
	 * 
	 * @param element
	 * @return boolean
	 */
	public static boolean isString(Object element) {
		return element instanceof String;
	}

	/**
	 * 
	 * �Է��� ���� null �Ǵ� null String �� ��� true�� return �Ѵ�.
	 * 
	 * <pre>
	 * [��� ����]
	 * isEmpty("")      ===> true
	 * isEmpty(null)    ===> true
	 * isEmpty("1")     ===> false
	 * </pre>
	 * 
	 * @param value
	 * @return boolean
	 */
	public static boolean isEmpty(String value) {
		if (value == null || "".equals(value.trim())) {
			return true;
		}
		return false;
	}

	/**
	 * �Է��� ���� null�� ��� null String�� return �Ѵ�.
	 * 
	 * <pre>
	 * [��� ����]
	 * NVL(null)        ===> ""
	 * NVL("abc  ")     ===> "abc"
	 * </pre>
	 * 
	 * @param value
	 * @return String
	 */
	public static String NVL(String value) {
		return (value == null ? "" : value.trim());
	}

	/**
	 * 
	 * �Է��� ���� null�� ��� null String�� return �Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * NVL(null)        ===> ""
	 * NVL("abc  ")     ===> "abc"
	 * 
	 * </pre>
	 * 
	 * @param value
	 * @return String
	 */
	public static String NVL(String value, String replace) {
		return (value == null || "".equals(value) ? replace : value.trim());
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� ��� space�� �����Ͽ� Return�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @return java.lang.String
	 */
	public static String compressString(String strTarget) {
		String resultStr = "";
		int index = 0;

		for (int strLen = strTarget.length(); index < strLen; index++) {
			if (strTarget.charAt(index) != ' ') {
				resultStr += strTarget.charAt(index);
			}
		}

		return resultStr;
	}

	/**
	 * 
	 * ���޹��� Object Array�� String���� ��ȯ�Ͽ� return�Ѵ�.
	 * 
	 * @param objArr
	 *            Object []
	 * @return java.lang.String
	 */
	public static String convertArrayToString(Object[] objArr) {
		if (objArr == null) {
			return "null";
		}
		String ret = "";
		for (int i = 0; i < objArr.length; i++) {
			if (i != 0) {
				ret += ",";
			}
			ret += objArr[i];
		}
		return ret;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� ������ ��ġ(index)�� �������ڿ�(strInsert)�� �߰��� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * insert("abcdefg",0,"11")     ===> 11abcdefg
	 * insert("abcdefg",3,"11")     ===> abc11defg
	 * insert("abcdefg",-1,"11")    ===> abcde11fg
	 * </pre>
	 * 
	 * @param strTarget
	 * @param index
	 *            �������ڿ��� �߰��� ��ġ, ����ڿ��� ù���� ��ġ�� 0 ���� ���� if ( index < 0 ) then
	 *            ����ڿ��� ���ڸ��� 0���� ������ ����� ��ġ
	 * @param strInsert
	 * @return java.lang.String
	 */
	public static String insert(String strTarget, int index, String strInsert) {
		String result = null;
		try {
			StringBuffer strBuf = new StringBuffer();
			String tempString = null;
			int lengthSize = strTarget.length();
			if (index >= 0) {
				if (lengthSize < index) {
					index = lengthSize;
				}
				strBuf.append(strTarget.substring(0, index));
				strBuf.append(strInsert);
				strBuf.append(strTarget.substring(index));

			} else {
				if (lengthSize < Math.abs(index)) {
					index = lengthSize * (-1);
				}
				tempString = strTarget.substring((lengthSize - 1) + index);
				strBuf.append(strTarget.substring(0, (lengthSize - 1) + index));
				strBuf.append(strInsert);
				strBuf.append(tempString);
			}
			result = strBuf.toString();
		} catch (Exception e) {
			return null;
		}
		return result;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� ������ ��ġ(index)�� �������ڿ�(strReplace)�� ��ü�� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * replace("abcdefg",0,"11")        ===> 11cdefg
	 * replace("abcdefg",-1,"11")   ===> abcde11
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param index
	 *            �������ڿ��� �߰��� ��ġ, ����ڿ��� ù���� ��ġ�� 0 ���� ���� if ( index < 0 ) then
	 *            ����ڿ��� ���ڸ��� 0���� ������ ����� ��ġ
	 * @param strReplace
	 * @return java.lang.String
	 */
	public static String replace(String strTarget, int index, String strReplace) {

		if (strTarget == null) {
			return strTarget;
		}

		String result = null;
		try {
			StringBuffer strBuf = new StringBuffer();
			int lengthSize = strTarget.length();
			if (index >= 0) {
				if (lengthSize < index) {
					index = lengthSize;
				}
				strBuf.append(strTarget.substring(0, index));
				strBuf.append(strReplace);
				strBuf.append(strTarget.substring(index + strReplace.length()));
			} else {
				if (lengthSize < Math.abs(index)) {
					index = lengthSize * (-1);
				}
				strBuf.append(strTarget.substring(0, (lengthSize - 1) + index));
				strBuf.append(strReplace);
				strBuf.append(strTarget.substring((lengthSize - 1) + index
						+ strReplace.length()));
			}
			result = strBuf.toString();
		} catch (Exception e) {
			return null;
		}
		return result;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� Ư�����ڿ�(from)�� ã�� �������ڿ�(strReplace)�� ��ü�� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * replace("abcdefgcd", "cd", "xx") ===> abxxefgxx
	 * replace("abcdefgcd","cd","")         ===> abefg
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param from
	 * @param strReplace
	 * @return ��ü�� ���ڿ�
	 */
	public static String replace(String strTarget, String from,
			String strReplace) {
		if (strTarget == null || from == null || strReplace == null) {
			return strTarget;
		}

		int i = strTarget.indexOf(from);
		int start = 0;
		while (i >= 0) {
			String h = strTarget.substring(0, i);
			String t = strTarget.substring(h.length() + from.length());
			strTarget = h + strReplace + t;
			start = h.length() + strReplace.length();
			i = strTarget.indexOf(from, start);
		}
		return strTarget;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� Ư�����ڿ� ���(from)�� ã�� �������ڿ�(strReplace)�� ��ü�� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * replace("abcdefgcd", "cd", "xx") ===> abxxefgxx
	 * replace("abcdefgcd","cd","")         ===> abefg
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param fromList
	 * @param strReplace
	 * @return java.lang.String
	 */
	public static String replace(String strTarget, String[] fromList,
			String strReplace) {

		if (strTarget == null || fromList == null || fromList.length == 0
				|| strReplace == null) {
			return strTarget;
		}

		try {

			for (int idx = 0; idx < fromList.length; idx++) {
				int i = strTarget.indexOf(fromList[idx]);
				int start = 0;
				while (i >= 0) {
					String h = strTarget.substring(0, i);
					String t = strTarget.substring(h.length()
							+ fromList[idx].length());
					strTarget = h + strReplace + t;
					start = h.length() + strReplace.length();
					i = strTarget.indexOf(fromList[idx], start);
				}
			}
			return strTarget;
		} catch (Exception e) {
			return null;
		}
	}

	// /**
	// * <xmp>�¶��� ������ ������ �� �ʿ��� �̹��� ������ ȭ�鿡 ���̵��� ó���ϱ� ����
	// * ����Ÿ������ Ư�� tag�� ������ �̸� <img src = "action">���� �������ش�.
	// * �� �� Ư�� tag�� ${img:����}�� ������ ������. ��) ${img:3}
	// * �� �޼ҵ�� �ٸ� �������� ������� �ʱ� �ٶ���.</xmp>
	// * @param action �¶��� ���� tag�� �����ϸ鼭 �߰��� action String
	// * @param strTarget �¶��� ������ ���� String
	// * @param imgSrcData ${img:����}�� ��ü�� tag������ ������ LMultiData
	// * @return tag���� ��ü�� ���ڿ� String
	// */
	// public static String changeToHelpImgTag(String action, String strTarget,
	// LMultiData imgSrcData){
	// /**
	// * �� util���� key�� ã������ ����ϴ� ���ڿ�
	// */
	// String keyIndentifier = "${img:";
	//
	// StringBuffer contentBuffer = new StringBuffer(strTarget);
	// StringBuffer setContentBuffer=null;
	// int loop = 0;
	// String value;
	// int paramIndex = 0;
	// while(true) {
	// paramIndex = contentBuffer.indexOf(keyIndentifier);
	// if(paramIndex == -1) {
	// if(loop==0) {
	// setContentBuffer = contentBuffer;
	// }
	// break;
	// }
	// setContentBuffer = null;
	// setContentBuffer = new StringBuffer();
	// setContentBuffer.append(contentBuffer.substring(0, paramIndex));
	// String tmp = contentBuffer.substring(paramIndex +
	// keyIndentifier.length()); // "${img:"�� ���� �� �� ���ڿ��� ���Ѵ�.
	// StringTokenizer st = new StringTokenizer(tmp, "}");
	// String key = st.nextToken();
	// if(imgSrcData.containsKey("helpId")){
	// setContentBuffer.append("<img src=\""+action+"?helpId=");
	// setContentBuffer.append(imgSrcData.getString("helpId",
	// Integer.parseInt(key)-1));
	// setContentBuffer.append("&fseq=");
	// setContentBuffer.append(imgSrcData.getString("fseq",
	// Integer.parseInt(key)-1));
	// setContentBuffer.append("\">").append(tmp.substring(key.length() + 1));
	// }else{
	// setContentBuffer.append("<img src=\""); // key�� ������ �׳� <img src="">��
	// �����Ѵ�.
	// setContentBuffer.append("\">").append(tmp.substring(key.length() + 1));
	// }
	// contentBuffer = new StringBuffer(setContentBuffer.toString());
	// loop++;
	// }
	// return setContentBuffer.toString();
	// }

	// /**
	// * <xmp>�¶��� ������ ������ �� �ʿ��� �̹��� ������ ȭ�鿡 ���̵��� ó���ϱ� ����
	// * ����Ÿ������ Ư�� tag�� ������ �̸� <img src = "action">���� �������ش�.
	// * �� �� Ư�� tag�� ${img:����}�� ������ ������. ��) ${img:3}
	// * �� �޼ҵ�� �ٸ� �������� ������� �ʱ� �ٶ���.</xmp>
	// * @param action �¶��� ���� tag�� �����ϸ鼭 �߰��� action String
	// * @param strTarget �¶��� ������ ���� String
	// * @param imgSrcData ${img:����}�� ��ü�� tag������ ������ LMultiData
	// * @return tag���� ��ü�� ���ڿ� String
	// */
	// public static String changeToOSSImgTag(String action, String strTarget,
	// LMultiData imgSrcData){
	// /**
	// * �� util���� key�� ã������ ����ϴ� ���ڿ�
	// */
	// String keyIndentifier = "${img:";
	//
	// StringBuffer contentBuffer = new StringBuffer(strTarget);
	// StringBuffer setContentBuffer=null;
	// int loop = 0;
	// String value;
	// int paramIndex = 0;
	// while(true) {
	// paramIndex = contentBuffer.indexOf(keyIndentifier);
	// if(paramIndex == -1) {
	// if(loop==0) {
	// setContentBuffer = contentBuffer;
	// }
	// break;
	// }
	// setContentBuffer = null;
	// setContentBuffer = new StringBuffer();
	// setContentBuffer.append(contentBuffer.substring(0, paramIndex));
	// String tmp = contentBuffer.substring(paramIndex +
	// keyIndentifier.length()); // "${img:"�� ���� �� �� ���ڿ��� ���Ѵ�.
	// StringTokenizer st = new StringTokenizer(tmp, "}");
	// String key = st.nextToken();
	// if(imgSrcData.containsKey("boardSeq")){
	// setContentBuffer.append("<img src=\""+action+"?boardSeq=");
	// setContentBuffer.append(imgSrcData.getString("boardSeq",
	// Integer.parseInt(key)-1));
	// setContentBuffer.append("&fileSeq=");
	// setContentBuffer.append(imgSrcData.getString("fileSeq",
	// Integer.parseInt(key)-1));
	// setContentBuffer.append("\">").append(tmp.substring(key.length() + 1));
	// }else{
	// setContentBuffer.append("<img src=\""); // key�� ������ �׳� <img src="">��
	// �����Ѵ�.
	// setContentBuffer.append("\">").append(tmp.substring(key.length() + 1));
	// }
	// contentBuffer = new StringBuffer(setContentBuffer.toString());
	// loop++;
	// }
	// return setContentBuffer.toString();
	// }

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� �������ڿ�(strSearch)�� �˻��� Ƚ���� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * search("abcdefd","d")        ===> 2
	 * search("abc1def2d","12") ===> 0
	 * </pre>
	 * 
	 * @param strTarget
	 * @param strSearch
	 * @return �������ڿ��� �˻��Ǿ����� �˻��� Ƚ����, �˻����� �ʾ����� 0 �� ��ȯ�Ѵ�.
	 */
	public static int search(String strTarget, String strSearch) {
		int result = 0;
		try {
			String strCheck = new String(strTarget);
			for (int i = 0; i < strTarget.length();) {
				int loc = strCheck.indexOf(strSearch);
				if (loc == -1) {
					break;
				} else {
					result++;
					i = loc + strSearch.length();
					strCheck = strCheck.substring(i);
				}
			}
		} catch (Exception e) {
			return 0;
		}
		return result;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ������ cutLength ��ŭ ���ڸ� �߶��ش�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * shortCutString("�ϳ��Ѽ³�",6)            ===> �ϳ���
	 * shortCutString("abcdefghijklmn",6)   ===> abcdef
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param cutLength
	 * @return java.lang.String
	 */
	public static String shortCutString(String strTarget, int cutLength) {
		try {
			// if (strTarget == null || limit < 4)
			if (strTarget == null) {
				return strTarget;
			}
			int len = strTarget.length();
			int cnt = 0, index = 0;
			while (index < len && cnt < cutLength) {
				if (strTarget.charAt(index++) < 256) {// 1����Ʈ ���ڶ��...
					cnt++; // ���� 1 ����
				} else {
					// 2����Ʈ ���ڶ��...
					cnt += 2; // ���� 2 ����
					// <gnoopy> �ֳ��ϸ� �ڹ��� String���� ��� ���ڴ� 2byteó���ϱ� ������.
				}
			}
			if (index < len) {
				strTarget = strTarget.substring(0, index);
			}
		} catch (Exception e) {
			return null;
		}
		return strTarget;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ������ ������ ����(elimination)�� ������ ��� ���ڸ� �����Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * split("02)2344-5555", "-# /)(:;")    ===> 0223445555
	 * split("ABCDEABCDE", "BE")        ===> ACDACD
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param elimination
	 * @return java.lang.String
	 */
	public static String split(String strTarget, String elimination) {
		if (strTarget == null || strTarget.length() == 0 || elimination == null) {
			return strTarget;
		}
		StringBuffer sb = new StringBuffer();
		StringTokenizer st = new StringTokenizer(strTarget, elimination);
		while (st.hasMoreTokens()) {
			sb.append(st.nextToken());
		}
		return sb.toString();
	}

	/**
	 * 
	 * �Էµ� ��Ʈ������ ������(delimiter)�� ������ ��� ���ڸ� �������� ���ڿ��� �и��ϰ� �и��� ���ڿ��� �迭�� �Ҵ��Ͽ�
	 * ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * split2Array("ABCDEABCDE", "BE")
	 * ===> A
	 *         CD
	 *         A
	 *         CD
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param delimiter
	 * @return java.lang.String[]
	 */
	public static String[] split2Array(String strTarget, String delimiter) {
		if (strTarget == null) {
			return null;
		}

		StringTokenizer st = new StringTokenizer(strTarget, delimiter);
		String[] names = new String[st.countTokens()];
		for (int i = 0; i < names.length; i++) {
			names[i] = st.nextToken().trim();
		}

		return names;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ������ ������(delimiter)�� �ϳ��� �ܾ�� �ν��ϰ� �� �ܾ �������� ���ڿ��� �и�, �и��� ���ڿ��� �迭��
	 * �Ҵ��Ͽ� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * split2Array("AA-BBB--DDDD", "-",true)
	 * ===> AA
	 *         BBB
	 * 
	 *         DDDD
	 * 
	 * split2Array("AA-BBB--DDDD", "-", false);
	 * ===> AA
	 *         BBB
	 *         DDDD
	 * 
	 * split2Array("ABCDEABCDE", "BE", true)
	 * ===> ABCDEABCDE
	 * 
	 * </pre>
	 * 
	 * @param strTarget
	 * @param delimiter
	 *            ������(delimiter)�� �ν��� �ܾ�μ� ��� ���ڿ����� ���Ե��� �ʴ´�.
	 * @param isIncludedNull
	 *            �����ڷ� ���е� ���ڿ��� Null�� ��� ������� ���Կ��� ( true : ����, false : �������� ����.
	 *            )
	 * @return java.lang.String[]
	 */
	public static String[] split2Array(String strTarget, String delimiter,
			boolean isIncludedNull) {

		String[] resultStrArray = null;

		try {
			Vector<String> v = new Vector<String>();

			String strCheck = new String(strTarget);
			while (strCheck.length() != 0) {
				int begin = strCheck.indexOf(delimiter);
				if (begin == -1) {
					v.add(strCheck);
					break;
				} else {
					int end = begin + delimiter.length();
					// StringTokenizer�� �����ڰ� �������� ��ø�Ǿ� ���� ��� ���� ���ڿ��� ��ȯ���� ����.
					// ���� �Ʒ��� ���� �ۼ���.
					if (isIncludedNull) {
						v.add(strCheck.substring(0, begin));
						strCheck = strCheck.substring(end);
						if (strCheck.length() == 0) {
							v.add(strCheck);
							break;
						}
					} else {
						if (!StringUtil.isEmpty(strCheck.substring(0, begin))) {
							v.add(strCheck.substring(0, begin));
						}
						strCheck = strCheck.substring(end);
					}

				}
			}

			String[] tempString = new String[0];
			resultStrArray = (String[]) v.toArray(tempString);

		} catch (Exception e) {
			return resultStrArray;
		}

		return resultStrArray;
	}

	/**
	 * 
	 * �Է��� ���ڿ� �յڿ� Ư�����ڸ� Left Padding�� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * padLeft("AAAAAA", 'Z', 10) ) ===> ZZZZAAAAAA
	 * 
	 * </pre>
	 * 
	 * @param value
	 * @param padValue
	 * @param length
	 * @return java.lang.String
	 */
	public static String padLeft(String value, char padValue, int length) {

		if (value == null) {
			value = "";
		}

		byte[] orgByte = value.getBytes();
		int orglength = orgByte.length;

		if (orglength < length) // add Padding character
		{
			byte[] paddedBytes = new byte[length];

			int padlength = length - orglength;

			for (int i = 0; i < padlength; i++) {
				paddedBytes[i] = (byte) padValue;
			}

			System.arraycopy(orgByte, 0, paddedBytes, padlength, orglength);

			return new String(paddedBytes);
		} else if (orglength > length) // �־��� ���̺��� ���´ٸ�, �־��� ���̸�ŭ�� �߸���.
		{
			byte[] paddedBytes = new byte[length];
			System.arraycopy(orgByte, 0, paddedBytes, 0, length);
			return new String(paddedBytes);
		}

		return new String(orgByte);
	}

	/**
	 * 
	 * �Է��� ���ڿ� �յڿ� Ư�����ڸ� Right Pading�� ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * padRight("AAAAAA", 'Z', 10) )    ===> AAAAAAZZZZ
	 * 
	 * </pre>
	 * 
	 * @param value
	 * @param padValue
	 * @param length
	 * @return java.lang.String
	 */
	public static String padRight(String value, char padValue, int length) {

		if (value == null) {
			value = "";
		}

		byte[] orgByte = value.getBytes();
		int orglength = orgByte.length;

		if (orglength < length) // add Padding character
		{
			byte[] paddedBytes = new byte[length];

			System.arraycopy(orgByte, 0, paddedBytes, 0, orglength);
			while (orglength < length) {
				paddedBytes[orglength++] = (byte) padValue;
			}
			return new String(paddedBytes);
		} else if (orglength > length) // �־��� ���̺��� ���´ٸ�, �־��� ���̸�ŭ�� �߸���
		{
			byte[] paddedBytes = new byte[length];
			System.arraycopy(orgByte, 0, paddedBytes, 0, length);
			return new String(paddedBytes);
		}

		return new String(orgByte);
	}

	/**
	 * 
	 * �Էµ� ��Ʈ������ space, carriage return, new line�� ������ ��Ʈ���� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * removeSpaceCRTab("ab\nc\td\r  ")     ===> abcd
	 * removeSpaceCRTab("")                 ===> ""
	 * removeSpaceCRTab(null)               ===> null
	 * 
	 * </pre>
	 * 
	 * @param value
	 * @return boolean
	 */
	public static String splitAll(String value) {
		String resultStr = "";
		if (value == null) {
			return value;
		} else if ("".equals(value.trim())) {
			return "";
		} else {
			resultStr = value.trim();
			resultStr = resultStr.replaceAll(" ", "");
			resultStr = resultStr.replaceAll("\n", "");
			resultStr = resultStr.replaceAll("\t", "");
			resultStr = resultStr.replaceAll("\r", "");
		}

		return resultStr;
	}

	/**
	 * 
	 * Object ��ü Element �� key�� ��ġ�ϴ� �׸��� Index�� return�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * simpleSearch(new String[] {"a", "b", "c"}, "b") ===> 1 (Index�� 0���� ����)
	 * simpleSearch(new String[] {"a", "b", "c"}, "c") ===> 2
	 * simpleSearch(new String[] {"a", "b", "c"}, "d") ===> -1 (������)
	 * 
	 * </pre>
	 * 
	 * @param a
	 * @param key
	 * @return boolean
	 */
	public static int simpleSearch(Object[] a, Object key) {
		if (key == null || a == null) {
			return -1;
		}
		for (int i = 0; i < a.length; i++) {
			if (key.equals(a[i])) {
				return i;
			}
		}
		return -1;

	}

	public static String fixStrLength(String msg, int length,
			boolean isPadRight, String padValue) {

		if (msg == null) {
			return null;
		}

		byte[] len = msg.getBytes();

		String result = null;

		if (len.length <= length) {
			if (isPadRight) {
				result = StringUtil.padRight(msg, padValue.charAt(0), length);
			} else {
				result = StringUtil.padLeft(msg, padValue.charAt(0), length);
			}
		} else {
			// Length ��ŭ �ڸ���
			result = StringUtil.shortCutString(msg, length);
		}
		return result;
	}

	public static String cutStrLength(String input, int cutSize) {

		byte[] temp = input.getBytes();

		int count = 0;

		for (int i = 0; i < cutSize; i++) {
			if (temp[i] < 0) {
				count++;
			}
		}

		// �ѱ��� ���ԵǸ� ���� ������ �ʵ��� 1�� ����
		return (count % 2 == 1) ? new String(temp, 0, cutSize + 1)
				: new String(temp, 0, cutSize);
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� �������ڿ�(strSearch)�� �����ϰ� �ִ����� üũ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * search("abcdefd","d")        ===> true
	 * search("abc1def2d","12")     ===> false
	 * </pre>
	 * 
	 * @param strTarget
	 * @param strSearch
	 * @return �������ڿ��� �˻��Ǿ����� true��, �˻����� �ʾ����� false�� ��ȯ�Ѵ�.
	 */
	public static boolean includeStr(String strTarget, String strSearch) {

		return search(strTarget, strSearch) > 0;
	}

	/**
	 * 
	 * substring�� byte ���� (�ѱ��� ���Ե� ��� subByte ���)
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * subByte(str.getBytes(), 10, str.getBytes().length);
	 * </pre>
	 * 
	 * @param byte[] b1
	 * @param int startPos
	 * @param int endPos
	 * @return byte[]
	 */
	public static byte[] subByte(byte[] b1, int startPos, int endPos) {
		if (b1 == null) {
			return null;
		}
		if (startPos > endPos || b1 == null || b1.length < endPos) {
			return null;
		}
		byte[] newByte = new byte[endPos - startPos];
		int j = 0;
		for (int i = startPos; i < endPos; i++) {
			newByte[j] = b1[i];
			j++;
		}
		return newByte;
	}

	/**
	 * 
	 * �Էµ� ��Ʈ��(strTarget)���� Ư�� ���ڸ� ã�� �ش� ���ڸ� ������ ���ڿ��� ��ȯ�Ѵ�.
	 * 
	 * <pre>
	 * 
	 * [��� ����]
	 * 
	 * removeFrontChar("00012345", "0") ===> 12345
	 * removeFrontChar("00123045", "=") ===> 123045
	 * 
	 * </pre>
	 * 
	 * @param String
	 *            strTarget
	 * @param String
	 *            ch
	 * @return java.lang.String
	 */
	public static String removeFrontChar(String strTarget, String ch) {

		if (strTarget == null) {
			return strTarget;
		}

		if (search(strTarget, ch) == strTarget.length()) {
			return "";
		}

		for (int i = 0; i < strTarget.length(); i++) {
			if (!String.valueOf(strTarget.charAt(i)).equals(ch)) {
				return strTarget.substring(i);
			}
		}

		return strTarget;

	}

	// /**
	// *
	// * �Էµ� ArrayList�� String[]�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
	// *
	// * @param ArrayList arrayList
	// * @return String[]
	// */
	// public static String[] convertToStringArray(ArrayList arrayList){
	//
	// arrayList.toArray(new String[]{});
	// if(arrayList == null || arrayList.size() == 0) {
	// return null;
	// }
	//
	// Object[] objArr = (Object[])arrayList.toArray();
	// String[] strArr = new String[arrayList.size()];
	//
	// for(int i = 0; i < objArr.length; i++){
	// strArr[i] = (String)objArr[i];
	// }
	//
	// return strArr;
	//
	// }

	/**
	 * 
	 * �Էµ� String�� Ư�� Delimiter�� �������� String[]�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
	 * 
	 * @param String
	 *            str, String delimiter
	 * @return String[]
	 */
	public static String[] convertToStringArrayByDel(String str,
			String delimiter) {

		if (StringUtil.isEmpty(str)) {
			return null;
		}
		StringTokenizer st = new StringTokenizer(str, delimiter, false);

		String[] result = new String[st.countTokens()];
		int i = 0;

		while (st.hasMoreTokens()) {
			result[i++] = (String) st.nextToken();
		}

		return result;
	}

	// /**
	// * LMultiData���� �ش� key�� Ư�� ��ġ�� ����Ÿ�� ������ double������ �����Ѵ�. �� ��
	// NumberFormatException��
	// * �߻��ϸ� LLog.err�� �̸� ����� -1�� �����Ѵ�.
	// * @param mData, LMultiData
	// * @param key, ���� �������� �ϴ� key String
	// * @param i, ���� �������� �ϴ� index int
	// * @return mData�� ����ִ� key�� i��° ����Ÿ double
	// */
	// public static double stringToDouble(LMultiData mData, String key, int i){
	// double returnValue = -1;
	// String doubleString = mData.getString(key, i);
	// try{
	// returnValue = Double.parseDouble(doubleString);
	// }catch(NumberFormatException e){
	// LLog.err.println(e);
	// }
	// return returnValue;
	// }

	/**
	 * DB�� Į���� naming�� �ڹ� naming���� �����ϴ� �޼ҵ�
	 * 
	 * @param calumn
	 *            DBĮ���� naming rule�� ������ String
	 * @return �ڹ� naming rule�� ������ String
	 */
	public static String convertDBToJava(String calumn) {
		if (isEmpty(calumn)) {
			return calumn;
		} else {
			calumn = calumn.toLowerCase(new Locale("EN")); // Į������ �ϴ� ��� �ҹ��ڷ�
															// �����Ѵ�.
			StringTokenizer st = new StringTokenizer(calumn, "_");
			StringBuffer sf = new StringBuffer();
			String tmp;
			String tmp1;
			String tmp2;
			sf.append(st.nextToken()); // ù ��ū�� �׳� �״�� ���δ�.
			while (st.hasMoreElements()) { // �ι�° ��ū���ʹ� ù ���ڸ� �빮�ڷ� �����Ѵ�.
				tmp = st.nextToken();
				tmp1 = tmp.substring(0, 1);
				tmp2 = tmp1.toUpperCase(new Locale("EN")) + tmp.substring(1);
				sf.append(tmp2);
			}
			return sf.toString();
		}
	}

	/**
	 * ���� ���� ��ȯ ���ڸ� ������ ��� �տ� 0�� ����
	 * 
	 * @param String
	 *            iStr
	 * @return String
	 */
	public static String toLength2(int nums) {
		String num = String.valueOf(nums).toString();
		if (num.length() == 1)
			num = "0" + num;
		return num;
	}

	/**
	 * ���ڿ��� �޾� charset�� �����ؼ� �����Ѵ�. UnsupportedEncodingException�� �߻��ϸ� ���� String��
	 * �ٽ� �����Ѵ�.
	 * 
	 * @param str
	 *            CharacterSet�� ������ ���ڿ�
	 * @param nowCharset
	 *            ���� charset
	 * @param newCharset
	 *            ������ charset
	 * @return charset�� ����� ���ڿ�
	 */
	public static String charsetConvert(String str, String nowCharset,
			String newCharset) {
		try {
			return new String(str.getBytes(nowCharset), newCharset);
		} catch (UnsupportedEncodingException e) {
			return str;
		}
	}

	/**
	 * text area�� td���� ����Ÿ�� ����� ���̵��� ���� �� ���
	 * 
	 * @param s
	 * @return
	 */
	public static String brToEnter(String s) {
		String value = StringUtil.replace(s, "<br>", "\n");
		return value;
	}

	/**
	 * text area�� td���� ����Ÿ�� ����� ���̵��� ���� �� ���
	 * 
	 * @param s
	 * @return
	 */
	public static String enterToBr(String s) {
		String value = StringUtil.replace(s, "\n", "<br>");
		return value;
	}

	/**
	 * <pre>
	 * �ý����� �޴��� ������ �� css�� ��Ÿ���� ���ϱ� ���� ���ڿ� ���� ������ �ѱ����� �ƴ����� Ȯ���Ѵ�.
	 * �ԷµǴ� ���ڿ��� �ѱ�, ����, ��ȣ, ���ڷ� �̷���� �ִٰ� �����ϰ�
	 * �ƽ�Ű �ڵ� ���� 127������ character�� ������ ���� �ѱ��� �ƴ� ������ �����Ѵ�.
	 * </pre>
	 * 
	 * @param str
	 *            ���ڿ�
	 * @return �����ѱ��̸� true, ��� ��ȣ, ���ڰ� ���ԵǾ� ������(�ƽ�Ű�ڵ� 127������ character) false
	 */
	public static boolean isPureKorean(String str) {
		for (int i = 0; i < str.length(); i++) {
			if (str.charAt(i) <= 127) {
				return false;
			}
		}
		return true;
	}
	
    /**
     * �Է°��� ������ ���θ� �˻��Ѵ�.
     * �� �⺻�� ""�� null�� ��� true�� �����Ѵ�.
     * ��� DB Access�޼ҵ�� nullüũ�� �ʿ��� ��쿡 �̰��� �̿��Ѵ�.
     * @param value
     * @return boolean
     */
    public static boolean isNull(String value) {
        //return value==null  ;
        return value == null ;
    }
    /**
     * �Է°��� ������ ���θ� �˻��Ѵ�.
     * �� �⺻�� ""�� null�� ��� true�� �����Ѵ�.
     * ��� DB Access�޼ҵ�� nullüũ�� �ʿ��� ��쿡 �̰��� �̿��Ѵ�.
     * @param value
     * @return boolean
     */
    public static boolean isNull(Object value) {
        return value == null;
    }
    public static String token(String value, String delim, int idx) {
        if (value == null)
            return null;
        StringTokenizer st = new StringTokenizer(value, delim);
        int i = 0;
        while (st.hasMoreTokens()) {
            if ((i++) == idx)
                return st.nextToken();
            else
                st.nextToken();
        }
        return null;
    }
    
    /**
     * ValueList�� ���̰ų� size()�� 0�̸� ���� true �׷��� ������ false
     * @param vl
     * @return boolean
     */
    public static boolean isNone(Object vl) {
        return (vl == null);
    }
    public static boolean isNone(String value) {
        return (value == null || value.length() == 0);
    }
    public static boolean isNone(Number value) {
        return (value == null );
    }
    public static boolean isNone(List value) {
        return (value == null || value.size() == 0);
    }
    public static boolean isNone(Object[] value) {
        return (value == null || value.length == 0);
    }
    public static boolean isNone(Map value) {
        return (value == null || value.size() == 0);
    }
    
    /**
     * �ϳ��� ���ڿ��� ���� ���ڿ��� ������ �ΰ��� �и��Ѵ�.
     * @param target
     * @param cut_str
     * @return String[]
     */
    public static String[] divide(String target, String cut_str) {
        if (target == null)
            return new String[] { "", "" };
        if (cut_str == null || cut_str.length() == 0)
            return new String[] { target, "" };
        int idx = target.indexOf(cut_str);
        if (idx < 0)
            return new String[] { target, "" };
        else
            return new String[] { target.substring(0, idx), target.substring(idx + cut_str.length())};
    }
    /**
      * �ϳ��� ���ڿ��� ���� ���ڿ��� �������� �и��Ѵ�.
      * @param target
      * @param cut_str
      * @return String[]
      */
    public static String[] cut(String target, String cut_str) {
        if (target == null)
            return new String[] {
        };
        if (cut_str == null || cut_str.length() == 0)
            return new String[] { target };
        int idx = target.indexOf(cut_str);
        if (idx < 0)
            return new String[] { target };
        List<String> arr = new ArrayList<String>();
        final int cut_str_len = cut_str.length();
        int next_idx = 0;
        while (idx >= 0) {
            arr.add(target.substring(next_idx, idx));
            next_idx = idx + cut_str_len;
            idx = target.indexOf(cut_str, next_idx);
            if (idx < 0) {
                arr.add(target.substring(next_idx));
                break;
            }
        }
        return (String[]) arr.toArray(new String[arr.size()]);
    }
    
    /**
     * ù ���ڸ� �ҹ��ڷ� �ٲ۴�.
     * @param str
     * @return
     */
    public static String lowerFirst(String str) {
        if (str == null || str.length() < 1)
            return str;
        return (str.substring(0, 1).toLowerCase() + str.substring(1));
    }
    
    /**
     * �Էµ� ��Ʈ������ Ư�� ���ڸ� ä���.
     */
     public static String fillLeft(String s, byte ch, int len) {
         if (s == null)
             s = "";
         byte[] ss;
         try {
             ss = s.getBytes("ksc5601");
         } catch (Exception e) {
             return s;
         }
         if (len <= ss.length)
             return s;
         byte[] chs = new byte[len];
         int j = len - 1;
         for (int i = ss.length - 1; i >= 0; i--)
             chs[j--] = ss[i];
         for (; j >= 0; j--)
             chs[j] = ch;
         try {
             return new String(chs, "ksc5601");
         } catch (Exception e) {
             return s;
         }
     }
     /**
     * �Էµ� ��Ʈ������ Ư�� ���ڸ� �߰��Ѵ�.
     */
     public static String fillRight(String s, byte ch, int len) {
         if (s == null)
             s = "";
         byte[] ss;
         try {
             ss = s.getBytes("ksc5601");
         } catch (Exception e) {
             return s;
         }
         if (len <= ss.length)
             return s;
         byte[] chs = new byte[len];
         int j = 0;
         for (int i = 0; i < ss.length; i++)
             chs[j++] = ss[i];
         for (; j < len; j++)
             chs[j] = ch;
         try {
             return new String(chs, "ksc5601");
         } catch (Exception e) {
             return s;
         }
     }
     /**
     * �Էµ� ��Ʈ������ Ư�� ���ڸ� �����Ѵ�.
     */
     public static String strip(String s, String delims) {
         if (s == null || s.length() == 0 || delims == null)
             return s;
         StringBuffer sb = new StringBuffer();
         StringTokenizer st = new StringTokenizer(s, delims);
         while (st.hasMoreTokens()) {
             sb.append(st.nextToken());
         }
         return sb.toString();
     }
     public static String upperFirst(String s) {
         if (s == null || s.length() < 1)
             return s;
         return (s.substring(0, 1).toUpperCase() + s.substring(1));
     }
     public static String arrayToString(String[] values, String gubun) {
         StringBuffer sb = new StringBuffer();
         if (values == null || values.length < 1)
             return "";
         sb.append(values[0]);
         for (int i = 1; i < values.length; i++) {
             sb.append(gubun).append(values[i]);
         }
         return sb.toString();
     }
     public static String[] stringToArray(String text, String gubun) {
         ArrayList<String> array = new ArrayList<String>();
         String cur = text;
         while (cur != null) {
             int i = cur.indexOf(gubun);
             if (i < 0) {
                 array.add(cur);
                 cur = null;
             } else {
                 array.add(cur.substring(0, i));
                 cur = cur.substring(i + gubun.length());
             }
         }
         return (String[]) array.toArray(new String[array.size()]);
     }
     public static String eng2kor(String s) {
         if (s == null)
             return s;
         try {
             return new String(s.getBytes("8859_1"), "ksc5601");
         } catch (Exception e) {
         }
         return s;
     }
     public static String kor2eng(String s) {
         if (s == null)
             return s;
         try {
             return new String(s.getBytes("ksc5601"), "8859_1");
         } catch (Exception e) {
         }
         return s;
     }    
     public static String str2alert(String s) {
         if (s == null)
             return null;
         StringBuffer buf = new StringBuffer();
         char[] c = s.toCharArray();
         int len = c.length;
         for (int i = 0; i < len; i++) {
             if (c[i] == '\n')
                 buf.append("\\n");
             else if (c[i] == '\t')
                 buf.append("\\t");
             else if (c[i] == '"')
                 buf.append("'");
             else
                 buf.append(c[i]);
         }
         return buf.toString();
     }
     public static String java2msg(String s) {
         if (s == null)
             return null;
         StringBuffer buf = new StringBuffer();
         char[] c = s.toCharArray();
         int len = c.length;
         for (int i = 0; i < len; i++) {
             if (c[i] == '\n')
                 buf.append("\\n");
             else if (c[i] == '\t')
                 buf.append("\\t");
             else
                 buf.append(c[i]);
         }
         return buf.toString();
     }
     public static String java2html(String s) {
         if (s == null)
             return null;
         StringBuffer buf = new StringBuffer();
         char[] c = s.toCharArray();
         int len = c.length;
         for (int i = 0; i < len; i++) {
             if (c[i] == '&')
                 buf.append("&amp;");
             else if (c[i] == '<')
                 buf.append("&lt;");
             else if (c[i] == '>')
                 buf.append("&gt;");
             else if (c[i] == '"')
                 buf.append("&quot;");
             else if (c[i] == '\'')
                 buf.append("&#039;");
             else
                 buf.append(c[i]);
         }
         return buf.toString();
     }
     public static String toOneLine(String string) {
         if (string == null)
             return null;
         else
             return string.replace('\n', ' ');
     }
     
     /**
      * LData �� ���� get ����� url ���Ͽ� �°� �Ķ���ͷ� �����Ѵ�.
      * @param input
      * @return
      */
     public static String convertMapToParameter (Map input) {
         if (input == null || input.size() <= 0) {
             return "";
         }else {
             String param = "";

             Iterator it = input.keySet().iterator();
             while (it.hasNext()) {
                 Object key = it.next();
                 if ("".equals (param)) {
                     param += key + "=" + input.get(key);
                 }else {
                     param += "&" + key + "=" + input.get(key);
                 }
             }
             return param;
         }
     }     
}
