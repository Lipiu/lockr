package com.restapi.backend.service.password;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;
import com.restapi.backend.repository.EncryptedPasswordRepository;
import com.restapi.backend.request.password.CreatePasswordRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EncryptedPasswordService {
    private final EncryptedPasswordRepository encryptedPasswordRepository;
    
    
}
