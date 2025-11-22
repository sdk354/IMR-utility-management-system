package coms.ums.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Tells Spring to return an HTTP 400 Bad Request status code when this exception is thrown
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TransactionFailedException extends RuntimeException {

    public TransactionFailedException(String message) {
        super(message);
    }

    public TransactionFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}