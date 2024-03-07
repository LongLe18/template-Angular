package vn.iworkspace.core.utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateTimeUtils {

	public static final String _VN_TIME_ZONE = "Asia/Ho_Chi_Minh";
	public static final String _GLOBAL_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

	public static Date stringToDate(String strDate, String pattern) throws ParseException {

		return new SimpleDateFormat(pattern).parse(strDate);

	}

	public static String dateToString(Date date, String pattern) {
		DateFormat dateFormat = new SimpleDateFormat(pattern);

		if (Validator.isNull(date) || Validator.isNull(pattern)) {
			return StringPool.BLANK;
		}

		dateFormat.setTimeZone(TimeZoneUtil.getTimeZone(_VN_TIME_ZONE));

		Calendar calendar = Calendar.getInstance();

		calendar.setTime(date);

		return dateFormat.format(calendar.getTime());
	}

	public static Date defaultBirthdate() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, 1990);
		calendar.set(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	public static Date defaultNgayTuyenDung() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, 2020);
		calendar.set(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}

	public static int getDayFromDate(Date date) {

		int day = 0;

		if (date != null) {
			Calendar calendar = Calendar.getInstance();

			calendar.setTime(date);
			day += calendar.get(Calendar.DAY_OF_MONTH);

		} else {
			day += 1;
		}

		return day;
	}

	public static int getMonthFromDate(Date date) {

		int month = 0;

		if (date != null) {
			Calendar calendar = Calendar.getInstance();

			calendar.setTime(date);
			month += calendar.get(Calendar.MONTH);

		} else {
			month += 1;
		}

		return month;
	}

	public static int getYearFromDate(Date date) {

		int year = 0;

		if (date != null) {
			Calendar calendar = Calendar.getInstance();

			calendar.setTime(date);
			year += calendar.get(Calendar.YEAR);

		} else {
			year += 1990;
		}

		return year;
	}

}