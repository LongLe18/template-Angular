package vn.iworkspace.core.exception;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class ErrorMessage {
  private int statusCode;
  private Date timestamp;
  private String message;
  private List<Map<String, Object>> error;

  public ErrorMessage(int statusCode, Date timestamp, String message, List<Map<String, Object>> error) {
    this.statusCode = statusCode;
    this.timestamp = timestamp;
    this.message = message;
    this.error = error;
  }

  public int getStatusCode() {
    return statusCode;
  }

  public Date getTimestamp() {
    return timestamp;
  }

  public String getMessage() {
    return message;
  }

  public List<Map<String, Object>> getError() {
    return error;
  }
}