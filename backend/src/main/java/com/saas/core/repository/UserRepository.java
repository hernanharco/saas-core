package com.saas.core.repository;

import com.saas.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmailAndTenantId(String email, UUID tenantId);
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.tenantId = :tenantId AND u.isActive = true")
    Optional<User> findActiveUserByEmailAndTenantId(@Param("email") String email, @Param("tenantId") UUID tenantId);
    
    boolean existsByEmailAndTenantId(String email, UUID tenantId);
}
