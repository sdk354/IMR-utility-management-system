/*
package coms.ums.service;

import coms.ums.dto.CustomerRequest;
import coms.ums.dto.CustomerResponse;
import coms.ums.exception.BadRequestException;
import coms.ums.exception.NotFoundException;
import coms.ums.model.Role;
import coms.ums.model.User;
import coms.ums.repository.RoleRepository;
import coms.ums.repository.UserRepository;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final String CUSTOMER_ROLE_NAME = "Customer";

    public CustomerService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private Integer getCustomerRoleId() {
        Role r = roleRepository.findByRoleName(CUSTOMER_ROLE_NAME)
                .orElseThrow(() -> new IllegalStateException("Customer role missing"));
        return r.getId();
    }

    public CustomerResponse create(CustomerRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) throw new BadRequestException("username already exists");
        if (req.getEmail() != null && userRepository.existsByEmail(req.getEmail())) throw new BadRequestException("email already exists");

        User u = new User();
        u.setUsername(req.getUsername());
        if (req.getPassword() != null) u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setEmail(req.getEmail());
        u.setContactNo(req.getContactNo());
        u.setAddress(req.getAddress());
        u.setStreet(req.getStreet());
        u.setStreetNo(req.getStreetNo());
        u.setCity(req.getCity());
        u.setStatus(req.getStatus() == null ? "Active" : req.getStatus());
        u.setRoleId(getCustomerRoleId());

        User saved = userRepository.save(u);
        return toResponse(saved);
    }

    public Page<CustomerResponse> list(int page, int size, String sortBy, String direction) {
        Integer roleId = getCustomerRoleId();
        Sort sort = Sort.by(sortBy == null ? "userID" : sortBy);
        sort = "desc".equalsIgnoreCase(direction) ? sort.descending() : sort.ascending();
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.min(Math.max(size,1),200), sort);
        return userRepository.findAllByRoleId(roleId, pageable).map(this::toResponse);
    }

    public CustomerResponse get(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Customer not found"));
        if (!u.getRoleId().equals(getCustomerRoleId())) throw new NotFoundException("Customer not found");
        return toResponse(u);
    }

    public CustomerResponse update(Long id, CustomerRequest req) {
        User u = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Customer not found"));
        if (!u.getRoleId().equals(getCustomerRoleId())) throw new NotFoundException("Customer not found");

        if (req.getUsername() != null && !req.getUsername().equals(u.getUsername())) {
            if (userRepository.existsByUsername(req.getUsername())) throw new BadRequestException("username already exists");
            u.setUsername(req.getUsername());
        }
        if (req.getEmail() != null && !req.getEmail().equals(u.getEmail())) {
            if (userRepository.existsByEmail(req.getEmail())) throw new BadRequestException("email already exists");
            u.setEmail(req.getEmail());
        }
        if (req.getPassword() != null) u.setPassword(passwordEncoder.encode(req.getPassword()));
        if (req.getContactNo() != null) u.setContactNo(req.getContactNo());
        if (req.getAddress() != null) u.setAddress(req.getAddress());
        if (req.getStreet() != null) u.setStreet(req.getStreet());
        if (req.getStreetNo() != null) u.setStreetNo(req.getStreetNo());
        if (req.getCity() != null) u.setCity(req.getCity());
        if (req.getStatus() != null) u.setStatus(req.getStatus());

        User saved = userRepository.save(u);
        return toResponse(saved);
    }

    public void delete(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Customer not found"));
        if (!u.getRoleId().equals(getCustomerRoleId())) throw new NotFoundException("Customer not found");
        userRepository.deleteById(id);
    }

    private CustomerResponse toResponse(User u) {
        CustomerResponse r = new CustomerResponse();
        r.setId(u.getId());
        r.setUsername(u.getUsername());
        r.setEmail(u.getEmail());
        r.setContactNo(u.getContactNo());
        r.setAddress(u.getAddress());
        r.setStreet(u.getStreet());
        r.setStreetNo(u.getStreetNo());
        r.setCity(u.getCity());
        r.setStatus(u.getStatus());
        return r;
    }
}
*/
