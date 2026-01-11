package coms.ums.dto;

import java.util.ArrayList;
import java.util.List;

public class ImportResult {
    private int totalRows;
    private int successCount;
    private int failureCount;
    private List<ImportRowResult> details = new ArrayList<>();

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }

    public int getFailureCount() {
        return failureCount;
    }

    public void setFailureCount(int failureCount) {
        this.failureCount = failureCount;
    }

    public List<ImportRowResult> getDetails() {
        return details;
    }

    public void setDetails(List<ImportRowResult> details) {
        this.details = details;
    }

    public void addDetail(ImportRowResult r) {
        this.details.add(r);
    }
}
