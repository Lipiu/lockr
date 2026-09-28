package com.restapi.backend.service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.restapi.backend.auth.request.RegisterRequest;
import com.restapi.backend.constants.Constants;
import com.restapi.backend.exception.DuplicateEmailException;
import com.restapi.backend.exception.InvalidPasswordException;
import com.restapi.backend.model.User;
import com.restapi.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User register(RegisterRequest registerRequest){
        String email = registerRequest.getEmail().toLowerCase().trim();
        if(userRepository.existsByEmail(email)){
            throw new DuplicateEmailException(Constants.DUPLICATE_EMAIL_MESSAGE);
        }
        if(registerRequest.getPassword().getBytes(StandardCharsets.UTF_8).length > Constants.PASSWORD_MAX_BYTES){
            throw new InvalidPasswordException("Password is too long");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        try{
            return userRepository.saveAndFlush(user);
        }
        catch(DataIntegrityViolationException d){
            throw new DuplicateEmailException(Constants.DUPLICATE_EMAIL_MESSAGE);
        }
    }
}