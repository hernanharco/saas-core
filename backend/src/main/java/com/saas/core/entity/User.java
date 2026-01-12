package com.saas.core.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity
@Table(name = "users", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"tenant_id", "email"}))
public class User extends BaseEntity {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(name = "email", nullable = false)
    private String email;
    
    @NotBlank(message = "Password is required")
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    
    @Size(max = 100, message = "First name must not exceed 100 characters")
    @Column(name = "first_name")
    private String firstName;
    
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    @Column(name = "last_name")
    private String lastName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role = UserRole.USER;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Constructors
    public User() {
    }
    
    public User(UUID tenantId, String email, String passwordHash) {
        super(tenantId);
        this.email = email;
        this.passwordHash = passwordHash;
    }
    
    // Getters and Setters
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public UserRole getRole() {
        return role;
    }
    
    public void setRole(UserRole role) {
        this.role = role;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public String getFullName() {
        if (firstName != null && lastName != null) {
            return firstName + " " + lastName;
        }
        return email;
    }
}
