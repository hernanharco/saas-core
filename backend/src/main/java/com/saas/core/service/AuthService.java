package com.saas.core.service;

import com.saas.core.dto.AuthResponse;
import com.saas.core.dto.RegistrationRequest;
import com.saas.core.entity.Company;
import com.saas.core.entity.Subscription;
import com.saas.core.entity.SubscriptionPlan;
import com.saas.core.entity.SubscriptionStatus;
import com.saas.core.entity.User;
import com.saas.core.entity.UserRole;
import com.saas.core.repository.CompanyRepository;
import com.saas.core.repository.SubscriptionRepository;
import com.saas.core.repository.UserRepository;
import com.saas.core.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Transactional
    public AuthResponse registerCompanyAndUser(RegistrationRequest request) {
        // Check if subdomain already exists
        if (companyRepository.existsBySubdomain(request.getSubdomain())) {
            throw new RuntimeException("Subdomain already exists");
        }

        // Create company
        Company company = new Company();
        company.setName(request.getCompanyName());
        company.setSubdomain(request.getSubdomain());
        company = companyRepository.save(company);

        // Create admin user for the company
        User user = new User();
        user.setTenantId(company.getId());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(UserRole.ADMIN);
        user.setIsActive(true);
        user = userRepository.save(user);

        // Create default subscription for the company
        Subscription subscription = new Subscription(company.getId());
        subscription.setPlan(SubscriptionPlan.FREE);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscriptionRepository.save(subscription);

        // Generate JWT token
        String token = jwtService.generateToken(user.getEmail(), user.getId(), company.getId(), user.getRole().name());

        // Build and return auth response
        return new AuthResponse(
            token,
            user.getId(),
            company.getId(),
            user.getEmail(),
            company.getName(),
            user.getRole().name()
        );
    }

    public AuthResponse authenticate(String email, String password, UUID tenantId) {
        // Find user by email and tenant
        User user = userRepository.findActiveUserByEmailAndTenantId(email, tenantId)
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Get company info
        Company company = companyRepository.findById(user.getTenantId())
            .orElseThrow(() -> new RuntimeException("Company not found"));

        // Generate JWT token
        String token = jwtService.generateToken(user.getEmail(), user.getId(), company.getId(), user.getRole().name());

        return new AuthResponse(
            token,
            user.getId(),
            company.getId(),
            user.getEmail(),
            company.getName(),
            user.getRole().name()
        );
    }
}
