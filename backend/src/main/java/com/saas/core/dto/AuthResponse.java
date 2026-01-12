package com.saas.core.dto;

import java.util.UUID;

public class AuthResponse {
    
    private String token;
    private String type = "Bearer";
    private UUID userId;
    private UUID tenantId;
    private String email;
    private String companyName;
    private String role;
    
    // Constructors
    public AuthResponse() {
    }
    
    public AuthResponse(String token, UUID userId, UUID tenantId, String email, String companyName, String role) {
        this.token = token;
        this.userId = userId;
        this.tenantId = tenantId;
        this.email = email;
        this.companyName = companyName;
        this.role = role;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public UUID getUserId() {
        return userId;
    }
    
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    
    public UUID getTenantId() {
        return tenantId;
    }
    
    public void setTenantId(UUID tenantId) {
        this.tenantId = tenantId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}
