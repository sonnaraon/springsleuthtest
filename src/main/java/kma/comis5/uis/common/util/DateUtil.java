/**
 * ----------------------------------------------------------------------------
 * COMIS-4 Project : KAF.common
 * ----------------------------------------------------------------------------
 * Copyright (c) 2012 ���û, LG CNS ���ҽþ� All rights reserved.
 */

package kma.comis5.uis.common.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

/**
 * <pre>
 *
 *  ��뿹��
 *
 *     private void testDateUtil()
 *     throws Exception
 *     {
 *
 *     System.out.println( DateUtil.getCurrentDateString() ) ;                                        // 20020719                ���
 *     System.out.println( DateUtil.getCurrentDateString(&quot;yyyy/MM/dd&quot;) ) ;                  // 2002/07/19              ���
 *     System.out.println( DateUtil.getCurrentTimeString(&quot;yyyy.MM.dd.HH&quot;) ) ;                                        // 094837                  ���
 *     System.out.println( DateUtil.getCurrentDateHourString());                                      // 2002071909
 *     System.out.println( DateUtil.getCurrentDateString(&quot;HH:mm:ss&quot;) ) ;                    // 09:48:37                ���
 *     System.out.println( DateUtil.getCurrentDateString(&quot;hh:mm:ss&quot;) ) ;                    // 09:48:37                ���
 *     System.out.println( DateUtil.convertFormat(&quot;20020716&quot;) ) ;                           // 2002/07/16              ���
 *     System.out.println( DateUtil.convertFormat(&quot;20020716&quot;,&quot;yyyy��MM��dd��&quot;) ) ; // 2002��07��16��           ���
 *     System.out.println( DateUtil.convertToTimestamp(&quot;20020717&quot;) ) ;                      // 2002-07-17 09:48:37.459 ���
 *     System.out.println( DateUtil.convertToTimestampHMS(&quot;20020717123456&quot;) ) ;             // 2002-07-17 12:34:56.459 ���
 *
 *     String fromDateDash = &quot;2002-07-18&quot; ;
 *     String fromDate = &quot;20020718&quot; ;
 *
 *     String toDateDash = &quot;2001-05-15&quot; ;
 *     String toDate = &quot;20010515&quot; ;
 *
 *     System.out.println( DateUtil.addDays( fromDate , 3 ) ) ;                                          // 20020721                ���
 *     System.out.println( DateUtil.addDays( fromDateDash , 3  , &quot;yyyy-MM-dd&quot; ) ) ;                      // 2002-07-21              ���
 *
 *     System.out.println( DateUtil.addMonths( fromDate , 3 ) ) ;                                        // 20021018                ���
 *     System.out.println( DateUtil.addMonths( fromDateDash , 3  , &quot;yyyy-MM-dd&quot; ) ) ;                    // 2002-10-18              ���
 *
 *     System.out.println( DateUtil.addYears( fromDate , 3 ) ) ;                                         // 20050717                ���
 *     System.out.println( DateUtil.addYears( fromDateDash , 3  , &quot;yyyy-MM-dd&quot; ) ) ;                     // 2005-07-17              ���
 *
 *     System.out.println( DateUtil.yearsBetween( fromDate , toDate ) ) ;                                // -1                      ���
 *     System.out.println( DateUtil.yearsBetween( fromDateDash , toDateDash  , &quot;yyyy-MM-dd&quot; ) ) ;        // -1                      ���
 *
 *     System.out.println( DateUtil.daysBetween( fromDate , toDate ) ) ;                                 // -429                    ���
 *     System.out.println( DateUtil.daysBetween( fromDateDash , toDateDash  , &quot;yyyy-MM-dd&quot; ) ) ;         // -429                    ���
 *
 *     System.out.println( DateUtil.monthsBetween( fromDate , toDate ) ) ;                               // -14                     ���
 *     System.out.println( DateUtil.monthsBetween( fromDateDash , toDateDash  , &quot;yyyy-MM-dd&quot; ) ) ;       // -14                     ���
 *
 *     System.out.println( DateUtil.whichDay( fromDate  ) ) ;                                            // 5                       ���
 *     System.out.println( DateUtil.whichDay( fromDateDash  , &quot;yyyy-MM-dd&quot; ) ) ;                         // 5                       ���
 *
 *     System.out.println( DateUtil.lastDayOfMonth( fromDate  ) ) ;                                      // 20020731                ���
 *     System.out.println( DateUtil.lastDayOfMonth( fromDateDash  , &quot;yyyy-MM-dd&quot; ) ) ;                   // 2002-07-31              ���
 *
 *     }
 *
 * </pre>
 *
 * @since 2005. 6. 27.
 * @version 1.0
 * @author �ڼ���, shypark@lgcns.com <br>
 *         LG CNS Application Architecture <br>
 */
public class DateUtil {

	/**
	 *
	 * <pre>
	 *
	 *    ���� ��¥�� yyyyMMdd �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return String yyyyMMdd ������ ���糯¥
	 * @exception Exception
	 */
	public static String getCurrentDateString() throws Exception {
		return getCurrentDateString("yyyyMMdd");
	}

	/**
	 *
	 * <pre>
	 *
	 *    ���� �ð���  HHmmss �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return String HHmmss ������ ���� �ð�
	 * @exception Exception
	 */
	public static String getCurrentTimeString() throws Exception {
		return getCurrentDateString("HHmmss");
	}
	/**
	 *
	 * <pre>
	 *
	 *    ���� �ð���  yyyyMMddHHmm �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return String HHmmss ������ ���� �ð�
	 * @exception Exception
	 */
	public static String getCurrentDayString() throws Exception {
		return getCurrentDateString("dd");
	}
	
	/**
	 *
	 * <pre>
	 *
	 *    ���� �ð���  yyyyMMddHHmm �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return String HHmmss ������ ���� �ð�
	 * @exception Exception
	 */
	public static String getCurrentDateHourString() throws Exception {
		return getCurrentDateString("yyyyMMddHHmm");
	}
	
	/**
	 *
	 * <pre>
	 *
	 *    ���� �ð���  yyyyMMddHHmmss �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return String HHmmss ������ ���� �ð�
	 * @exception Exception
	 */
	public static String getCurrentDateTimeString() throws Exception {
		return getCurrentDateString("yyyyMMddHHmmss");
	}
	/**
	 *
	 * <pre>
	 *
	 *    ���糯¥�� �־��� pattern �� ���� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param pattern
	 *            SimpleDateFormat �� ������ pattern
	 * @return String pattern ������ ���糯¥
	 * @exception Exception
	 */
	public static String getCurrentDateString(String pattern) throws Exception {
		return convertToString(getCurrentTimeStamp(), pattern);
	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ ��¥�� yyyy/MM/dd �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            yyyyMMdd ������ ��¥
	 * @return String yyyy/MM/dd ������ �ش� ��¥
	 * @exception Exception
	 */
	public static String convertFormat(String dateData) throws Exception {
		return convertFormat(dateData, "yyyy/MM/dd");
	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ ��¥�� yyyy/MM/dd �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            yyyyMMdd ������ ��¥
	 * @param format
	 *            SimpleDateFormat �� ������ pattern
	 * @return String pattern ������ �ش� ��¥
	 * @exception Exception
	 */

	public static String convertFormat(String dateData, String format)
			throws Exception {

		return convertToString(convertToTimestamp(dateData), format);

	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ ��¥�� yyyy/MM/dd �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @return Timestamp ���� Timestamp ��
	 * @exception Exception
	 */

	public static Timestamp getCurrentTimeStamp() throws Exception {

		try {
			Calendar cal = new GregorianCalendar();
			Timestamp result = new Timestamp(cal.getTime().getTime());
			return result;
		} catch (Exception e) {
			throw new Exception("[DateUtil][getCurrentTimeStamp]"
					+ e.getMessage(), e);
		}

	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ Timestamp ��¥�� yyyy/MM/dd �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            Timestamp ������ ��¥
	 * @return String yyyy/MM/dd ������ Timestamp ��¥
	 * @exception Exception
	 */
	public static String convertToString(Timestamp dateData) throws Exception {

		return convertToString(dateData, "yyyy/MM/dd");

	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ Timestamp ��¥�� pattern �� ���� �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            Timestamp ������ ��¥
	 * @param pattern
	 *            SimpleDateFormat �� ������ pattern
	 * @return String yyyy/MM/dd ������ Timestamp ��¥
	 * @exception 
	 */
	public static String convertToString(Timestamp dateData, String pattern)
			throws Exception {
		return convertToString(dateData, pattern, java.util.Locale.KOREA);
	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������ Timestamp ��¥�� pattern �� locale  �� ���� �������� ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            Timestamp ������ ��¥
	 * @param pattern
	 *            SimpleDateFormat �� ������ pattern
	 * @param locale
	 *            ������ LOCALE
	 * @return String pattern ������ Timestamp ��¥
	 * @exception Exception
	 */
	public static String convertToString(Timestamp dateData, String pattern,
			java.util.Locale locale) throws Exception {
		try {

			if (dateData == null) {
				return null;
			}

			SimpleDateFormat formatter = new SimpleDateFormat(pattern, locale);
			//formatter.applyPattern( pattern );

			return formatter.format(dateData);
		} catch (Exception e) {
			throw new Exception("[DateUtil][convertToString]" + e.getMessage(), e);
		}

	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMdd ������  ��¥�� Timestamp ��  ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            yyyyMMdd ������ ��¥
	 * @return Timestamp ������ �ش� ��¥
	 * @exception Exception
	 */
	public static Timestamp convertToTimestamp(String dateData)
			throws Exception {

		try {

			if (dateData == null)
				return null;
			if (dateData.trim().equals(""))
				return null;

			int dateObjLength = dateData.length();

			String yearString = "2002";
			String monthString = "01";
			String dayString = "01";

			if (dateObjLength >= 4) {
				yearString = dateData.substring(0, 4);
			}
			if (dateObjLength >= 6) {
				monthString = dateData.substring(4, 6);
			}
			if (dateObjLength >= 8) {
				dayString = dateData.substring(6, 8);
			}

			int year = Integer.parseInt(yearString);
			int month = Integer.parseInt(monthString) - 1;
			int day = Integer.parseInt(dayString);

			Calendar cal = new GregorianCalendar();
			cal.set(year, month, day);
			//cal.getTime();
			return new Timestamp(cal.getTime().getTime());

		} catch (Exception e) {
			throw new Exception("[DateUtil][convertToTimestamp]"
					+ e.getMessage(), e);
		}

	}

	/**
	 *
	 * <pre>
	 *
	 *    yyyyMMddHHmmss ������  ��¥�ð��� Timestamp ��  ��ȯ�Ѵ�.
	 *
	 * </pre>
	 *
	 * @param dateData
	 *            yyyyMMddHHmmss ������ ��¥�ð�
	 * @return Timestamp ������ �ش� ��¥�ð�
	 * @exception Exception
	 */
	public static Timestamp convertToTimestampHMS(String dateData)
			throws Exception {
		try {

			if (dateData == null)
				return null;
			if (dateData.trim().equals(""))
				return null;

			String yearString = dateData.substring(0, 4);
			String monthString = dateData.substring(4, 6);
			String dayString = dateData.substring(6, 8);
			String hourString = dateData.substring(8, 10);
			String minString = dateData.substring(10, 12);
			String secString = dateData.substring(12, 14);

			int year = Integer.parseInt(yearString);
			int month = Integer.parseInt(monthString) - 1;
			int day = Integer.parseInt(dayString);
			int hour = Integer.parseInt(hourString);
			int min = Integer.parseInt(minString);
			int sec = Integer.parseInt(secString);

			Calendar cal = new GregorianCalendar();
			cal.set(year, month, day, hour, min, sec);

			return new Timestamp(cal.getTime().getTime());

		} catch (Exception e) {
			throw new Exception("[DateUtil][convertToTimestampHMS]"
					+ e.getMessage(), e);
		}

	}

	/**
	 * check date string validation with an user defined format.
	 *
	 * @param s
	 *            date string you want to check.
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return date java.util.Date
	 */
	private static java.util.Date check(String s, String format)
			throws java.text.ParseException {
		if (s == null)
			throw new java.text.ParseException("date string to check is null",
					0);
		if (format == null)
			throw new java.text.ParseException(
					"format string to check date is null", 0);

		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				format, java.util.Locale.KOREA);
		java.util.Date date = null;
		try {
			date = formatter.parse(s);
		} catch (java.text.ParseException e) {
			/*
			 * throw new java.text.ParseException( e.getMessage() + " with
			 * format \"" + format + "\"", e.getErrorOffset() );
			 */
			throw new java.text.ParseException(" wrong date:\"" + s
					+ "\" with format \"" + format + "\"", 0);
		}

		if (!formatter.format(date).equals(s))
			throw new java.text.ParseException("Out of bound date:\"" + s
					+ "\" with format \"" + format + "\"", 0);
		return date;
	}

	/**
	 * check date string validation with the default format "yyyyMMdd".
	 *
	 * @param s
	 *            date string you want to check with default format "yyyyMMdd"
	 * @return boolean true ��¥ ������ �°�, �����ϴ� ��¥�� �� false ��¥ ������ ���� �ʰų�, �������� �ʴ�
	 *         ��¥�� ��
	 * @exception Exception
	 */
	public static boolean isValid(String s) throws Exception {
		return DateUtil.isValid(s, "yyyyMMdd");
	}

	/**
	 * check date string validation with an user defined format.
	 *
	 * @param s
	 *            date string you want to check.
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return boolean true ��¥ ������ �°�, �����ϴ� ��¥�� �� false ��¥ ������ ���� �ʰų�, �������� �ʴ�
	 *         ��¥�� ��
	 * @exception Exception
	 */
	public static boolean isValid(String s, String format) throws Exception {
		/*
		 * if ( s == null ) throw new NullPointerException("date string to check
		 * is null"); if ( format == null ) throw new
		 * NullPointerException("format string to check date is null");
		 */
		try {

			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = null;
			try {
				date = formatter.parse(s);
			} catch (java.text.ParseException e) {
				return false;
			}

			if (!formatter.format(date).equals(s))
				return false;

			return true;

		} catch (Exception e) {
			throw new Exception("[DateUtil][isValid]" + e.getMessage(), e);
		}

	}

	/**
	 * return days between two date strings with default defined
	 * format.(yyyyMMdd)
	 *
	 * @param s
	 *            date string you want to check.
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� ������ ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻� 0: �Ͽ��� (java.util.Calendar.SUNDAY ��
	 *         ��) 1: ������ (java.util.Calendar.MONDAY �� ��) 2: ȭ����
	 *         (java.util.Calendar.TUESDAY �� ��) 3: ������
	 *         (java.util.Calendar.WENDESDAY �� ��) 4: �����
	 *         (java.util.Calendar.THURSDAY �� ��) 5: �ݿ���
	 *         (java.util.Calendar.FRIDAY �� ��) 6: �����
	 *         (java.util.Calendar.SATURDAY �� ��) ��) String s = "20000529"; int
	 *         dayOfWeek = whichDay(s, format); if (dayOfWeek ==
	 *         java.util.Calendar.MONDAY) System.out.println(" ������: " +
	 *         dayOfWeek); if (dayOfWeek == java.util.Calendar.TUESDAY)
	 *         System.out.println(" ȭ����: " + dayOfWeek);
	 * @exception Exception
	 */
	public static int whichDay(String s) throws Exception {
		return whichDay(s, "yyyyMMdd");
	}

	/**
	 * return days between two date strings with user defined format.
	 *
	 * @param s
	 *            date string you want to check.
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� ������ ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻� 0: �Ͽ��� (java.util.Calendar.SUNDAY ��
	 *         ��) 1: ������ (java.util.Calendar.MONDAY �� ��) 2: ȭ����
	 *         (java.util.Calendar.TUESDAY �� ��) 3: ������
	 *         (java.util.Calendar.WENDESDAY �� ��) 4: �����
	 *         (java.util.Calendar.THURSDAY �� ��) 5: �ݿ���
	 *         (java.util.Calendar.FRIDAY �� ��) 6: �����
	 *         (java.util.Calendar.SATURDAY �� ��) ��) String s = "2000-05-29";
	 *         int dayOfWeek = whichDay(s, "yyyy-MM-dd"); if (dayOfWeek ==
	 *         java.util.Calendar.MONDAY) System.out.println(" ������: " +
	 *         dayOfWeek); if (dayOfWeek == java.util.Calendar.TUESDAY)
	 *         System.out.println(" ȭ����: " + dayOfWeek);
	 * @exception Exception
	 */
	public static int whichDay(String s, String format) throws Exception {
		try {
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = check(s, format);

			java.util.Calendar calendar = formatter.getCalendar();
			calendar.setTime(date);
			return calendar.get(java.util.Calendar.DAY_OF_WEEK);
		} catch (Exception e) {
			throw new Exception("[DateUtil][whichDay]" + e.getMessage(), e);
		}
	}

	/**
	 * return days between two date strings with default defined
	 * format.("yyyyMMdd")
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int daysBetween(String from, String to) throws Exception {
		return daysBetween(from, to, "yyyyMMdd");
	}

	/**
	 * return days between two date strings with user defined format.
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int daysBetween(String from, String to, String format)
			throws Exception {
		// java.text.SimpleDateFormat formatter =
		// new java.text.SimpleDateFormat (format, java.util.Locale.KOREA);
		try {

			java.util.Date d1 = check(from, format);
			java.util.Date d2 = check(to, format);

			long duration = d2.getTime() - d1.getTime();

			return (int) (duration / (1000 * 60 * 60 * 24));
			// seconds in 1 day
		} catch (Exception e) {
			throw new Exception("[DateUtil][daysBetween]" + e.getMessage(),
					e);
		}
	}

	/**
	 * return years between two date strings with default defined
	 * format.("yyyyMMdd")
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int yearsBetween(String from, String to) throws Exception {
		return yearsBetween(from, to, "yyyyMMdd");
	}

	/**
	 * return years between two date strings with user defined format.
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int yearsBetween(String from, String to, String format)
			throws Exception {
		return (int) (daysBetween(from, to, format) / 365);
	}

	/**
	 * return add day to date strings
	 *
	 * @param String
	 *            date string
	 * @param int
	 *            ���� �ϼ�
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� �ϼ� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static String addDays(String s, int day) throws Exception {
		return addDays(s, day, "yyyyMMdd");
	}

	/**
	 * return add day to date strings with user defined format.
	 *
	 * @param String
	 *            date string
	 * @param String
	 *            ���� �ϼ�
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� �ϼ� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static String addDays(String s, int day, String format)
			throws Exception {
		try {

			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = check(s, format);

			date.setTime(date.getTime() + ((long) day * 1000 * 60 * 60 * 24));
			return formatter.format(date);
		} catch (Exception e) {
			throw new Exception("[DateUtil][addDays]" + e.getMessage(), e);
		}
	}

	/**
	 * return add month to date strings
	 *
	 * @param String
	 *            date string
	 * @param int
	 *            ���� ����
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� ���� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static String addMonths(String s, int month) throws Exception {
		return addMonths(s, month, "yyyyMMdd");
	}

	/**
	 * return add month to date strings with user defined format.
	 *
	 * @param String
	 *            date string
	 * @param int
	 *            ���� ����
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� ���� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static String addMonths(String s, int addMonth, String format)
			throws Exception {
		try {

			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = check(s, format);

			java.text.SimpleDateFormat yearFormat = new java.text.SimpleDateFormat(
					"yyyy", java.util.Locale.KOREA);
			java.text.SimpleDateFormat monthFormat = new java.text.SimpleDateFormat(
					"MM", java.util.Locale.KOREA);
			java.text.SimpleDateFormat dayFormat = new java.text.SimpleDateFormat(
					"dd", java.util.Locale.KOREA);
			int year = Integer.parseInt(yearFormat.format(date));
			int month = Integer.parseInt(monthFormat.format(date));
			int day = Integer.parseInt(dayFormat.format(date));

			month += addMonth;
			if (addMonth > 0) {
				while (month > 12) {
					month -= 12;
					year += 1;
				}
			} else {
				while (month <= 0) {
					month += 12;
					year -= 1;
				}
			}
			java.text.DecimalFormat fourDf = new java.text.DecimalFormat("0000");
			java.text.DecimalFormat twoDf = new java.text.DecimalFormat("00");
			String tempDate = String.valueOf(fourDf.format(year))
					+ String.valueOf(twoDf.format(month))
					+ String.valueOf(twoDf.format(day));
			java.util.Date targetDate = null;

			try {
				targetDate = check(tempDate, "yyyyMMdd");
			} catch (java.text.ParseException pe) {
				day = lastDay(year, month);
				tempDate = String.valueOf(fourDf.format(year))
						+ String.valueOf(twoDf.format(month))
						+ String.valueOf(twoDf.format(day));
				targetDate = check(tempDate, "yyyyMMdd");
			}

			return formatter.format(targetDate);
		} catch (Exception e) {
			throw new Exception("[DateUtil][addMonths]" + e.getMessage(), e);
		}
	}

	/**
	 * return add year to date strings
	 *
	 * @param String
	 *            s string
	 * @param int
	 *            ���� ���
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� ��� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */

	public static String addYears(String s, int year) throws Exception {
		return addYears(s, year, "yyyyMMdd");
	}

	/**
	 * return add year to date strings with user defined format.
	 *
	 * @param String
	 *            date string
	 * @param int
	 *            ���� ���
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� ��� ���ϱ� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static String addYears(String s, int year, String format)
			throws Exception {
		try {

			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = check(s, format);
			date.setTime(date.getTime()
					+ ((long) year * 1000 * 60 * 60 * 24 * (365)));
			return formatter.format(date);
		} catch (Exception e) {
			throw new Exception("[DateUtil][addYears]" + e.getMessage(), e);
		}
	}

	/**
	 * return months between two date strings
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� ������ ������ ���� ������ �߸� �Ǿ��ų� �������� �ʴ�
	 *         ��¥: java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int monthsBetween(String from, String to) throws Exception {
		return monthsBetween(from, to, "yyyyMMdd");
	}

	/**
	 * return months between two date strings with user defined format.
	 *
	 * @param String
	 *            from date string
	 * @param String
	 *            to date string
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� 2�� ���� �����ǰ����� ���� ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥:
	 *         java.text.ParseException �߻�
	 * @exception Exception
	 */
	public static int monthsBetween(String from, String to, String format)
			throws Exception {
		//java.text.SimpleDateFormat formatter =
		//    new java.text.SimpleDateFormat (format, java.util.Locale.KOREA);

		try {

			java.util.Date fromDate = check(from, format);
			java.util.Date toDate = check(to, format);

			// if two date are same, return 0.
			if (fromDate.compareTo(toDate) == 0)
				return 0;

			java.text.SimpleDateFormat yearFormat = new java.text.SimpleDateFormat(
					"yyyy", java.util.Locale.KOREA);
			java.text.SimpleDateFormat monthFormat = new java.text.SimpleDateFormat(
					"MM", java.util.Locale.KOREA);
			java.text.SimpleDateFormat dayFormat = new java.text.SimpleDateFormat(
					"dd", java.util.Locale.KOREA);

			int fromYear = Integer.parseInt(yearFormat.format(fromDate));
			int toYear = Integer.parseInt(yearFormat.format(toDate));
			int fromMonth = Integer.parseInt(monthFormat.format(fromDate));
			int toMonth = Integer.parseInt(monthFormat.format(toDate));
			int fromDay = Integer.parseInt(dayFormat.format(fromDate));
			int toDay = Integer.parseInt(dayFormat.format(toDate));

			int result = 0;
			result += ((toYear - fromYear) * 12);
			result += (toMonth - fromMonth);

			//        if (((toDay - fromDay) < 0) ) result +=
			// fromDate.compareTo(toDate);
			// ceil�� floor�� ȿ��
			if (((toDay - fromDay) > 0))
				result += toDate.compareTo(fromDate);

			return result;
		} catch (Exception e) {
			throw new Exception(
					"[DateUtil][monthsBetween]" + e.getMessage(), e);
		}
	}

	/**
	 * �״��� ������ ���� ����
	 *
	 * @param String
	 *            src string
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� �״��� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ�
	 *         ��¥: java.text.ParseException �߻�
	 * @exception Exception
	 */

	public static String lastDayOfMonth(String src) throws Exception {
		return lastDayOfMonth(src, "yyyyMMdd");
	}

	/**
	 * �״��� ������ ���� ����
	 *
	 * @param format
	 *            string representation of the date format. For example,
	 *            "yyyy-MM-dd".
	 * @return String ��¥ ������ �°�, �����ϴ� ��¥�� �� �״��� ������ ���� ���� ������ �߸� �Ǿ��ų� �������� �ʴ�
	 *         ��¥: java.text.ParseException �߻�
	 * @exception Exception
	 */

	public static String lastDayOfMonth(String src, String format)
			throws Exception {
		try {

			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					format, java.util.Locale.KOREA);
			java.util.Date date = check(src, format);

			java.text.SimpleDateFormat yearFormat = new java.text.SimpleDateFormat(
					"yyyy", java.util.Locale.KOREA);
			java.text.SimpleDateFormat monthFormat = new java.text.SimpleDateFormat(
					"MM", java.util.Locale.KOREA);

			int year = Integer.parseInt(yearFormat.format(date));
			int month = Integer.parseInt(monthFormat.format(date));
			int day = lastDay(year, month);

			java.text.DecimalFormat fourDf = new java.text.DecimalFormat("0000");
			java.text.DecimalFormat twoDf = new java.text.DecimalFormat("00");
			String tempDate = String.valueOf(fourDf.format(year))
					+ String.valueOf(twoDf.format(month))
					+ String.valueOf(twoDf.format(day));

			java.util.Date targetDate = check(tempDate, "yyyyMMdd");

			return formatter.format(targetDate);
		} catch (Exception e) {
			throw new Exception("[DateUtil][lastDayOfMonth]"
					+ e.getMessage(), e);
		}
	}

	private static int lastDay(int year, int month)
			throws java.text.ParseException {
		int day = 0;
		switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			day = 31;
			break;
		case 2:
			if ((year % 4) == 0) {
				if ((year % 100) == 0 && (year % 400) != 0) {
					day = 28;
				} else {
					day = 29;
				}
			} else {
				day = 28;
			}
			break;
		default:
			day = 30;
		}
		return day;
	}

	/**
	 * ���� ���ڸ� Date ������ �����Ѵ�.
	 * @return
	 */
	public static  Date getCurrentDate ()
	{
		try{
			TimeZone tz = new SimpleTimeZone( 9 * 60 * 60 * 1000, "KST" );
			TimeZone.setDefault(tz);
		}catch(Exception e){}
		return new Date();
	}

	public static Date getDate(String d, String format){
		java.util.Date ch = null;
		try{
			SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
			ch = sdf.parse(d);
		}catch(Exception dfdf){
		}
		return ch;
	}

	/**
	 * date �� pattern �������� ��ȯ�Ѵ�.
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String convertToString(Date date, String pattern){
		String dateStr = "";
		try{
			SimpleDateFormat sdf = new SimpleDateFormat(pattern, Locale.KOREAN);
			dateStr = sdf.format(date);
		}catch(Exception e){
		}
		return dateStr;
	}

	/**
	 * oldpattern ���� �־��� date ���ڿ��� newpattern �� ���ڿ��� ��ȯ�Ѵ�.
	 * @param date
	 * @param oldpattern
	 * @param newpattern
	 * @return
	 */
	public static String convertToString(String date, String oldpattern, String newpattern){
		Date d = null;
		try{
			SimpleDateFormat sdf = new SimpleDateFormat(oldpattern, Locale.KOREAN);
			d = sdf.parse(date);
		}catch(Exception e){
		}
		return convertToString(d, newpattern);
	}

	public static int daysBetween (Date from, Date to) {
		long duration = to.getTime() - from.getTime();
		return (int) (duration / (1000 * 60 * 60 * 24));
	}

	public static int HoursBetween (Date from, Date to) {
		long duration = to.getTime() - from.getTime();
		return (int) (duration / (1000 * 60 * 60));
	}

	public static int monthsBetween (Date from, Date to) {
		int fyear = Integer.parseInt(DateUtil.convertToString(from, "yyyy"));
		int tyear = Integer.parseInt(DateUtil.convertToString(to, "yyyy"));

		int fmonth = Integer.parseInt(DateUtil.convertToString(from, "MM"));
		int tmonth = Integer.parseInt(DateUtil.convertToString(to, "MM"));

		return tyear = Math.abs(tyear - fyear) * 12 + (tmonth - fmonth);
	}

	public static int HoursBetween (String from, String to, String pattern) {
		return HoursBetween(getDate(from, pattern), getDate(to, pattern));
	}

	public static int MinutesBetween (Date from, Date to) {
		long duration = to.getTime() - from.getTime();
		return (int) (duration / (1000 * 60));
	}

	public static int MinutesBetween (String from, String to, String pattern) {
		return MinutesBetween(getDate(from, pattern), getDate(to, pattern));
	}

	public static Date addHour(Date base, int hour){
		return addTickDate(base, Calendar.HOUR, hour);
	}

	public static Date addHour(String base, int hour, String pattern){
		return addTickDate(getDate(base, pattern), Calendar.HOUR, hour);
	}

	public static Date addMonth(String base, int month, String pattern){
		return addTickDate(getDate(base, pattern), Calendar.MONTH, month);
	}

	public static Date addMinute(Date base, int minute){
		return addTickDate(base, Calendar.MINUTE, minute);
	}

	public static Date addDay(Date base, int day){
		return addTickDate(base, Calendar.DAY_OF_MONTH, day);
	}

	public static Date addMonth(Date base, int month) {
		return addTickDate(base, Calendar.MONTH, month);
	}

	public static Date addYear(Date base, int year) {
		return addTickDate(base, Calendar.YEAR, year);
	}

	public static Date addTickDate(Date base, int field, int tick){
		Calendar calendar = Calendar.getInstance(Locale.KOREAN);
		calendar.setTime(base);
		calendar.add(field, tick);
		return calendar.getTime();
	}

	public static int dateBetween (Date from, Date to, int field) {
		int term = 0;
		switch (field) {
		case Calendar.DAY_OF_MONTH :
			term = DateUtil.daysBetween(from, to);
			break;
		}
		return term;
	}
	//    //---------------------------------------------------------------------------//
	//
	//    public static void main(String[] args) throws Exception {
		//        System.out.println(DateUtil.getCurrentDateString()); // 20020719 ���
	//        System.out.println(DateUtil.getCurrentDateString("yyyy/MM/dd")); // 2002/07/19
	//                                                                         // ���
	//        System.out.println(DateUtil.getCurrentTimeString()); // 094837 ���
	//
	//        System.out.println(DateUtil.getCurrentDateHourString());//2002071909 ���(YYYYMMDDhhmm)
	//        System.out.println(DateUtil.getCurrentDateTimeString());//200207190909���(YYYYMMDDhhmmss)
	//
	//        System.out.println(DateUtil.getCurrentDateString("HH:mm:ss")); // 09:48:37
	//                                                                       // ���
	//        System.out.println(DateUtil.getCurrentDateString("hh:mm:ss")); // 09:48:37
	//                                                                       // ���
	//        System.out.println(DateUtil.convertFormat("20020716")); // 2002/07/16 ���
	//        System.out.println(DateUtil.convertFormat("20020716", "yyyy��MM��dd��")); // 2002��07��16��
	//                                                                                 // ���
	//        System.out.println(DateUtil.convertToTimestamp("20020717")); // 2002-07-17
	//                                                                     // 09:48:37.459
	//                                                                     // ���
	//        System.out.println(DateUtil.convertToTimestampHMS("20020717123456")); // 2002-07-17
	//                                                                              // 12:34:56.459
	//                                                                              // ���
	//
	//        String fromDateDash = "2002-07-18";
	//        String fromDate = "20020718";
	//
	//        String toDateDash = "2001-05-15";
	//        String toDate = "20010515";
	//
	//        System.out.println(DateUtil.addDays(fromDate, 3)); // 20020721 ���
	//        System.out.println(DateUtil.addDays(fromDateDash, 3, "yyyy-MM-dd")); // 2002-07-21
	//                                                                             // ���
	//
	//        System.out.println(DateUtil.addMonths(fromDate, 3)); // 20021018 ���
	//        System.out.println(DateUtil.addMonths(fromDateDash, 3, "yyyy-MM-dd")); // 2002-10-18
	//                                                                               // ���
	//
	//        System.out.println(DateUtil.addYears(fromDate, 3)); // 20050717 ���
	//        System.out.println(DateUtil.addYears(fromDateDash, 3, "yyyy-MM-dd")); // 2005-07-17
	//                                                                              // ���
	//
	//        System.out.println(DateUtil.yearsBetween(fromDate, toDate)); // -1 ���
	//        System.out.println(DateUtil.yearsBetween(fromDateDash, toDateDash,
	//                "yyyy-MM-dd")); // -1 ���
	//
	//        System.out.println(DateUtil.daysBetween(fromDate, toDate)); // -429 ���
	//        System.out.println(DateUtil.daysBetween(fromDateDash, toDateDash,
	//                "yyyy-MM-dd")); // -429 ���
	//
	//        System.out.println(DateUtil.monthsBetween(fromDate, toDate)); // -14 ���
	//        System.out.println(DateUtil.monthsBetween(fromDateDash, toDateDash,
	//                "yyyy-MM-dd")); // -14 ���
	//
	//        System.out.println(DateUtil.whichDay(fromDate)); // 5 ���
	//        System.out.println(DateUtil.whichDay(fromDateDash, "yyyy-MM-dd")); // 5 ���
	//
	//        System.out.println(DateUtil.lastDayOfMonth(fromDate)); // 20020731 ���
	//        System.out.println(DateUtil.lastDayOfMonth(fromDateDash, "yyyy-MM-dd")); // 2002-07-31
	//                                                                                 // ���
	//
	//    }

}