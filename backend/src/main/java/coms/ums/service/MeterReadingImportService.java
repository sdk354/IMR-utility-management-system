package coms.ums.service;

import coms.ums.dto.ImportResult;
import coms.ums.dto.ImportRowResult;
import coms.ums.model.MeterReading;
import coms.ums.repository.MeterReadingRepository;
import coms.ums.repository.MeterRepository;
import coms.ums.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * meterId,readingValue,readingDate,remarks,userId
 */
@Service
public class MeterReadingImportService {

    private final MeterRepository meterRepo;
    private final MeterReadingRepository readingRepo;
    private final DateTimeFormatter[] acceptedDateFormats = new DateTimeFormatter[]{
            DateTimeFormatter.ISO_DATE_TIME,
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"),
            DateTimeFormatter.ISO_LOCAL_DATE_TIME
    };

    @Value("${import.reading.max-value:1000000}")
    private BigDecimal maxReadingValue;

    @Value("${import.reading.max-jump-percent:50}")
    private int maxJumpPercent;

    public MeterReadingImportService(MeterRepository meterRepo, MeterReadingRepository readingRepo) {
        this.meterRepo = meterRepo;
        this.readingRepo = readingRepo;
    }

    @Transactional
    public ImportResult importCsv(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new BadRequestException("File is empty");

        ImportResult result = new ImportResult();
        List<String> lines;
        try {
            lines = readLines(file.getInputStream());
        } catch (IOException e) {
            throw new BadRequestException("Cannot read uploaded file: " + e.getMessage());
        }

        if (lines.isEmpty()) throw new BadRequestException("CSV file contains no data");

        String header = lines.get(0);
        boolean hasHeader = header.toLowerCase().contains("meter") && header.toLowerCase().contains("reading");
        int rowNum = 0;
        for (String line : lines) {
            rowNum++;
            if (rowNum == 1 && hasHeader) continue;
            result.setTotalRows(result.getTotalRows() + 1);

            String[] cols = splitCsvLine(line);
            if (cols.length < 3) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Insufficient columns"));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            String meterIdS = cols[0].trim();
            String readingValueS = cols[1].trim();
            String readingDateS = cols[2].trim();
            String remarks = cols.length >= 4 ? cols[3].trim() : null;
            String userIdS = cols.length >= 5 ? cols[4].trim() : null;

            Long meterId;
            try { meterId = Long.valueOf(meterIdS); } catch (Exception ex) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Invalid meterId"));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            if (!meterRepo.existsById(meterId)) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Meter not found: " + meterId));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            BigDecimal readingValue;
            try { readingValue = new BigDecimal(readingValueS); } catch (Exception ex) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Invalid readingValue"));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            if (readingValue.compareTo(BigDecimal.ZERO) < 0 || readingValue.compareTo(maxReadingValue) > 0) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false,
                        "Reading out of allowed range [0," + maxReadingValue + "]"));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            LocalDateTime readingDate = parseDate(readingDateS);
            if (readingDate == null) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Invalid readingDate"));
                result.setFailureCount(result.getFailureCount() + 1);
                continue;
            }

            // fetch last reading (most recent) for this meter
            var lastPage = readingRepo.findAllByMeterId(meterId, PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "readingDate"))).getContent();
            Optional<MeterReading> last = lastPage.isEmpty() ? Optional.empty() : Optional.of(lastPage.get(0));

            if (last.isPresent()) {
                BigDecimal lastVal = last.get().getReadingValue();
                if (lastVal != null && lastVal.compareTo(BigDecimal.ZERO) >= 0) {
                    BigDecimal delta = readingValue.subtract(lastVal).max(BigDecimal.ZERO);
                    if (lastVal.compareTo(BigDecimal.ZERO) > 0) {
                        BigDecimal percent = delta.multiply(BigDecimal.valueOf(100))
                                .divide(lastVal, 2, RoundingMode.HALF_UP);
                        if (percent.compareTo(BigDecimal.valueOf(maxJumpPercent)) > 0) {
                            result.addDetail(new ImportRowResult(result.getTotalRows(), false,
                                    "Reading jump too large vs last reading: " + percent + "% (max " + maxJumpPercent + "%)"));
                            result.setFailureCount(result.getFailureCount() + 1);
                            continue;
                        }
                    } else {
                        if (readingValue.compareTo(maxReadingValue.divide(BigDecimal.valueOf(10), 2, RoundingMode.HALF_UP)) > 0) {
                            result.addDetail(new ImportRowResult(result.getTotalRows(), false,
                                    "Suspicious large reading compared to previous (previous 0)"));
                            result.setFailureCount(result.getFailureCount() + 1);
                            continue;
                        }
                    }
                }
            }

            Long userId = null;
            if (userIdS != null && !userIdS.isBlank()) {
                try { userId = Long.valueOf(userIdS); } catch (Exception ignore) {}
            }

            try {
                MeterReading r = new MeterReading();
                r.setMeterId(meterId);
                r.setReadingValue(readingValue);
                r.setReadingDate(readingDate);
                r.setRemarks(remarks);
                r.setUserId(userId);
                readingRepo.save(r);
                result.addDetail(new ImportRowResult(result.getTotalRows(), true, "Imported"));
                result.setSuccessCount(result.getSuccessCount() + 1);
            } catch (Exception ex) {
                result.addDetail(new ImportRowResult(result.getTotalRows(), false, "Save failed: " + ex.getMessage()));
                result.setFailureCount(result.getFailureCount() + 1);
            }
        }

        return result;
    }

    private List<String> readLines(InputStream in) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            List<String> lines = new ArrayList<>();
            String l;
            while ((l = br.readLine()) != null) {
                if (!l.trim().isEmpty()) lines.add(l);
            }
            return lines;
        }
    }

    private String[] splitCsvLine(String line) {
        List<String> cols = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                cols.add(sb.toString());
                sb.setLength(0);
            } else {
                sb.append(c);
            }
        }
        cols.add(sb.toString());
        return cols.toArray(new String[0]);
    }

    private LocalDateTime parseDate(String input) {
        if (input == null || input.isBlank()) return null;
        for (DateTimeFormatter f : acceptedDateFormats) {
            try {
                return LocalDateTime.parse(input, f);
            } catch (Exception ignore) {}
        }
        try {
            LocalDate d = LocalDate.parse(input, DateTimeFormatter.ISO_DATE);
            return d.atStartOfDay();
        } catch (Exception ignore) {}
        return null;
    }
}
