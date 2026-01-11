package coms.ums.dto;

public class ImportRowResult {
    private int row;
    private boolean success;
    private String message;

    public ImportRowResult() {}
    public ImportRowResult(int row, boolean success, String message) {
        this.row = row;
        this.success = success;
        this.message = message;
    }

    public int getRow() { return row; }
    public void setRow(int row) { this.row = row; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
