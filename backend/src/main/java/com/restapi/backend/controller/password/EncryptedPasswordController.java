package com.restapi.backend.controller.password;

import com.restapi.backend.mapper.EncryptedPasswordMapper;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.backend.dto.EncryptedPasswordDto;
import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;
import com.restapi.backend.request.password.CreatePasswordRequest;
import com.restapi.backend.service.auth.UserService;
import com.restapi.backend.service.password.EncryptedPasswordService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/password-entry")
@RequiredArgsConstructor
public class EncryptedPasswordController {
    private final EncryptedPasswordMapper encryptedPasswordMapper;
    private final UserService userService;
    private final EncryptedPasswordService encryptedPasswordService;
    
    @PostMapping
    public ResponseEntity<EncryptedPasswordDto> create(@Valid @RequestBody CreatePasswordRequest request, Authentication auth){
        User user = userService.findByEmail(auth.getName());
        EncryptedPassword saved = encryptedPasswordService.createPassword(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(encryptedPasswordMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<EncryptedPasswordDto>> list(Authentication auth){
        User user = userService.findByEmail(auth.getName());
        List<EncryptedPasswordDto> res = encryptedPasswordService.findAll(user)
            .stream()
            .map(encryptedPasswordMapper::toDto)
            .toList();
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id, Authentication auth){
        User user = userService.findByEmail(auth.getName());
        encryptedPasswordService.deletePassword(user, id);
        return ResponseEntity.noContent().build();
    }
}