package vn.iworkspace.core.exception.impl;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends BaseApiException {

	private static final long serialVersionUID = 1L;

	public String errorCode;

	public String messageCode;

	public ForbiddenException(String errorCode, String messageCode, String message) {
		super(message);
		this.errorCode = errorCode;
		this.messageCode = messageCode;
	}

	@Override
	public int code() {
		return HttpStatus.FORBIDDEN.value();
	}

}
