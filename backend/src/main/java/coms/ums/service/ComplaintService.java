package coms.ums.service;

import coms.ums.model.Complaint;
import coms.ums.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAllByOrderByComplaintDateDesc();
    }

    // Add this to handle the new POST requests
    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Transactional
    public Complaint updateStatus(Long id, String status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }
}