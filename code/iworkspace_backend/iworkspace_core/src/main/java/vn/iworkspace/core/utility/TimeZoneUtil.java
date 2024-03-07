package vn.iworkspace.core.utility;

import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;

public class TimeZoneUtil {
	public static final TimeZone GMT = TimeZone.getTimeZone("GMT");

	public static TimeZoneUtil getInstance() {
		return new TimeZoneUtil();
	}

	public static TimeZone getTimeZone(String timeZoneId) {
		TimeZone timeZone = _timeZones.get(timeZoneId);

		if (timeZone == null) {
			timeZone = TimeZone.getTimeZone(timeZoneId);

			_timeZones.put(timeZoneId, timeZone);
		}

		return timeZone;
	}

	public static void setDefault(String timeZoneId) {
		if (Validator.isNotNull(timeZoneId)) {
			_timeZone = TimeZone.getTimeZone(timeZoneId);
		}
	}

	private TimeZoneUtil() {
	}

	private static volatile TimeZone _timeZone = TimeZone.getTimeZone(StringPool.UTC);
	private static final Map<String, TimeZone> _timeZones = new ConcurrentHashMap<>();
}
