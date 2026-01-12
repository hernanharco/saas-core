package com.saas.core.repository;

import com.saas.core.entity.Subscription;
import com.saas.core.entity.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    
    Optional<Subscription> findByTenantId(UUID tenantId);
    
    Optional<Subscription> findByTenantIdAndStatus(UUID tenantId, SubscriptionStatus status);
}
