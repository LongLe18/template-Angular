package vn.iworkspace.core.exception.impl;

import java.util.Collections;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(fluent = true, chain = true)
public class BaseApiException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private int code;

	private String message;

	private Object data = Collections.EMPTY_MAP;

	public BaseApiException() {
		super();
	}

	public BaseApiException(String message) {
		super(message);
	}

	public BaseApiException(String message, Object data) {
		super(message);
		this.message = message;
		this.data = data;
	}

}
