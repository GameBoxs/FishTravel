package com.carassius.fallenfish.config;

import com.carassius.fallenfish.common.dto.ErrorResponse;
import com.carassius.fallenfish.common.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestControllerExceptionHandler {

    /**
     * 요청이 잘못된 경우 예외 처리
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ErrorResponse resolveException(BadRequestException e) {
        return new ErrorResponse(e.getMessage());
    }

    /**
     * 데이터가 존재하지 않는 경우 예외 처리
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorResponse resolveException(ResourceNotFoundException e) {
        return new ErrorResponse(e.getMessage());
    }

    /**
     * 데이터에 접근 권한이 없는 경우 예외 처리
     */
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(ResourceForbiddenException.class)
    public ErrorResponse resolveException(ResourceForbiddenException e) {
        return new ErrorResponse(e.getMessage());
    }

    /**
     * 이미 존재하는 데이터인 경우 예외 처리
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ErrorResponse resolveException(ResourceAlreadyExistsException e) {
        return new ErrorResponse(e.getMessage());
    }

    /**
     * 인증받지 않은 사용자인 경우 예외 처리
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnAuthorizedException.class)
    public ErrorResponse resolveException(UnAuthorizedException e) {
        return new ErrorResponse(e.getMessage());
    }
}
