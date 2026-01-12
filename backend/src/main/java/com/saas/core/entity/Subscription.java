package com.saas.core.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID; // <--- SOLUCIÓN: Importación necesaria para el tipo UUID

@Entity
@Table(name = "subscriptions")
public class Subscription extends BaseEntity {
    
    @NotNull(message = "Plan is required") // Corregido: @NotBlank es solo para Strings
    @Enumerated(EnumType.STRING)
    @Column(name = "plan", nullable = false)
    private SubscriptionPlan plan = SubscriptionPlan.FREE;
    
    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SubscriptionStatus status = SubscriptionStatus.ACTIVE;
    
    @Column(name = "starts_at")
    private LocalDateTime startsAt;
    
    @Column(name = "ends_at")
    private LocalDateTime endsAt;
    
    // Constructors
    public Subscription() {
    }
    
    public Subscription(UUID tenantId) {
        setTenantId(tenantId); // Asumiendo que BaseEntity tiene setTenantId
        this.startsAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public SubscriptionPlan getPlan() {
        return plan;
    }
    
    public void setPlan(SubscriptionPlan plan) {
        this.plan = plan;
    }
    
    public SubscriptionStatus getStatus() {
        return status;
    }
    
    public void setStatus(SubscriptionStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getStartsAt() {
        return startsAt;
    }
    
    public void setStartsAt(LocalDateTime startsAt) {
        this.startsAt = startsAt;
    }
    
    public LocalDateTime getEndsAt() {
        return endsAt;
    }
    
    public void setEndsAt(LocalDateTime endsAt) {
        this.endsAt = endsAt;
    }
}