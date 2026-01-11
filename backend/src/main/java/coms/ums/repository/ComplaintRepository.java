package coms.ums.repository;

import coms.ums.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    // Matches the "Complaint Management" view requirement
    List<Complaint> findAllByOrderByComplaintDateDesc();
}