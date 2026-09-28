package com.restapi.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.backend.auth.request.RegisterRequest;
import com.restapi.backend.dto.UserDto;
import com.restapi.backend.mapper.UserMapper;
import com.restapi.backend.model.User;
import com.restapi.backend.service.RegisterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final RegisterService registerService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest registerRequest){
        User user = registerService.register(registerRequest);
        UserDto userDto = userMapper.toDto(user);        
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @GetMapping("/me")
    public String messageAuth(){
        return "You successfully authenticated";
    }
}