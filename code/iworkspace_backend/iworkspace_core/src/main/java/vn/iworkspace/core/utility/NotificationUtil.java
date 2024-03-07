package vn.iworkspace.core.utility;

public class NotificationUtil {

	public enum NotifyType {
		SMS, EMAIL, MSG;
	}

	public enum ActionType {
		CREATEED_ACCOUNT, RESET_PASSWORD, CHANGE_PASSWORD, LOCKED_ACCOUNT, DELETED_ACCOUNT, UNLOCKED_ACCOUNT,
		RESTORED_ACCOUNT, RANDOM_CODE;
	}

	public enum NotifyStatus {
		INIT_QUEUE, IN_QUEUE, NOTICE_SUCCESS, NOTICE_ERROR;
	}
}
