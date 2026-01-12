package com.saas.core.controller;

import com.saas.core.dto.AuthResponse;
import com.saas.core.dto.RegistrationRequest;
import com.saas.core.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegistrationRequest request) {
        AuthResponse response = authService.registerCompanyAndUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        UUID tenantId = UUID.fromString(loginRequest.get("tenantId"));
        
        AuthResponse response = authService.authenticate(email, password, tenantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, String>> validateToken() {
        return ResponseEntity.ok(Map.of("status", "valid"));
    }
}
