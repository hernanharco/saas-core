package com.saas.core.security;

import java.util.UUID;

public class TenantContext {
    
    private static final ThreadLocal<UUID> tenantId = new ThreadLocal<>();
    private static final ThreadLocal<UUID> userId = new ThreadLocal<>();
    
    public static void setTenantId(UUID id) {
        tenantId.set(id);
    }
    
    public static UUID getTenantId() {
        return tenantId.get();
    }
    
    public static void setUserId(UUID id) {
        userId.set(id);
    }
    
    public static UUID getUserId() {
        return userId.get();
    }
    
    public static void clear() {
        tenantId.remove();
        userId.remove();
    }
}
