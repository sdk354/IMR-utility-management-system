package coms.ums.exception;

import java.time.Instant;
import java.util.List;
import java.util.Collections;

public class ApiError {
    private Instant timestamp = Instant.now();
    private int status;
    private String error;
    private String message;
    private String path;
    private List<String> details;

    // 1. ADD THIS: Default no-args constructor for lines 44 and 65
    public ApiError() {
        this.details = Collections.emptyList();
    }

    // 2. KEEP THIS: The 4-arg constructor for the other lines
    public ApiError(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.details = Collections.emptyList();
    }

    // --- Getters and setters remain the same ---
    public Instant getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public List<String> getDetails() { return details; }
    public void setDetails(List<String> details) { this.details = details; }
}