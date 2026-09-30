package com.restapi.backend.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restapi.backend.auth.request.LoginRequest;
import com.restapi.backend.auth.request.RegisterRequest;
import com.restapi.backend.dto.UserDto;
import com.restapi.backend.mapper.UserMapper;
import com.restapi.backend.model.User;
import com.restapi.backend.service.RegisterService;
import com.restapi.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final RegisterService registerService;
    private final UserMapper userMapper;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody LoginRequest loginRequest,HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getEmail().toLowerCase().trim(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(token);

        if(request.getSession(false) != null){
            request.changeSessionId();
        }
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        securityContextRepository.saveContext(context, request, response);
        User user = userService.findByEmail(auth.getName());
        UserDto userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

    
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest registerRequest){
        User user = registerService.register(registerRequest);
        UserDto userDto = userMapper.toDto(user);        
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<UserDto> logout(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(Authentication auth){
        User user = userService.findByEmail(auth.getName());
        return ResponseEntity.ok(userMapper.toDto(user));
    }
}