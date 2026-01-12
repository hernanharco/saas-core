package com.saas.core.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies")
@EntityListeners(AuditingEntityListener.class) // Necesario para que @CreatedDate funcione
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @NotBlank(message = "Company name is required")
    @Size(max = 255, message = "Company name must not exceed 255 characters")
    @Column(name = "name", nullable = false)
    private String name;
    
    @NotBlank(message = "Subdomain is required")
    @Size(max = 100, message = "Subdomain must not exceed 100 characters")
    @Column(name = "subdomain", nullable = false, unique = true)
    private String subdomain;
    
    @CreatedDate // Se llena automáticamente al insertar
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate // Se actualiza automáticamente al editar
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Company() {
    }
    
    public Company(String name, String subdomain) {
        this.name = name;
        this.subdomain = subdomain;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSubdomain() {
        return subdomain;
    }
    
    public void setSubdomain(String subdomain) {
        this.subdomain = subdomain;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Eliminamos el método @PrePersist manual para el ID ya que 
    // GenerationType.UUID se encarga de ello de forma más eficiente.
}