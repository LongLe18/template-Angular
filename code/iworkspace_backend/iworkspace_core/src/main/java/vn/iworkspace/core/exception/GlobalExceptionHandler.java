package vn.iworkspace.core.exception;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;
import vn.iworkspace.core.exception.impl.BadRequestException;
import vn.iworkspace.core.exception.impl.ConflicException;
import vn.iworkspace.core.exception.impl.ForbiddenException;
import vn.iworkspace.core.exception.impl.InternalServerException;
import vn.iworkspace.core.exception.impl.NotfoundException;
import vn.iworkspace.core.exception.impl.ServiceUnavailableException;
import vn.iworkspace.core.exception.impl.TokenRefreshException;
import vn.iworkspace.core.exception.impl.UnauthorizedException;

import org.springframework.beans.factory.annotation.Value;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Value("${application.minimize-stacktrace: true}")
    Boolean minimizeStacktrace;

    @ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleException(Exception ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) // Nếu validate fail thì trả về 400
    public ErrorMessage handleBindException(BindException e) {
        logError(e);
        String errorMessage = "Request không hợp lệ";
        List<Map<String, Object>> fieldErrors = new ArrayList<>();
        if (e.getBindingResult().hasErrors()) {
            for (FieldError fieldError : e.getFieldErrors()) {
                String fieldName = fieldError.getField();
                errorMessage = fieldError.getDefaultMessage();
                Map<String, Object> error = new HashMap<>();
                error.put("fieldName", fieldName);
                error.put("errorMessage", errorMessage);
                fieldErrors.add(error);
            }
        }

        return new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                e.getMessage(),
                fieldErrors);
    }

    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.FORBIDDEN.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleBadRequestException(BadRequestException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorMessage handleUnauthorizedException(UnauthorizedException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.UNAUTHORIZED.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleForbiddenException(ForbiddenException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.FORBIDDEN.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(NotfoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNotfoundException(NotfoundException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.NOT_FOUND.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(ConflicException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleConflicException(ConflicException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.CONFLICT.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(InternalServerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage handleInternalServerException(InternalServerException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(ServiceUnavailableException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public ErrorMessage handleServiceUnavailableException(ServiceUnavailableException ex, WebRequest request) {
        logError(ex);
        return new ErrorMessage(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                new Date(),
                ex.getMessage(),
                null);
    }

    private void minimizeStacktrace(Exception ex) {
        // Nếu last trace là code của project thì chỉ cần in vf package, còn không thì
        // in stacktrace
        // log dashboard đang ko hỗ trợ multiline.
        StackTraceElement last = ex.getStackTrace()[0];
        if (last.getClassName().contains("vn.iworkspace")) {
            StackTraceElement[] traces = ex.getStackTrace();
            StringBuilder error = new StringBuilder("error : ").append(ex.getMessage()).append(" at : ");
            for (StackTraceElement trace : traces) {
                if (trace.getClassName().contains("vn.iworkspace")) {
                    error
                            .append(trace.getClassName())
                            .append(".")
                            .append(trace.getMethodName())
                            .append(" line : ")
                            .append(trace.getLineNumber())
                            .append(";");
                }
            }
            log.error(error.toString());
        } else {
            log.error("Error : ", ex);
        }
    }

    private void logError(Exception ex) {
        if (minimizeStacktrace) {
            minimizeStacktrace(ex);
        } else {
            log.error("Error : ", ex);
        }
    }

    private void logError(String error) {
        log.error("Error : {}", error);
    }

}
