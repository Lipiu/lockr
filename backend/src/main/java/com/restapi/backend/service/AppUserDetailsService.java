package com.restapi.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.restapi.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService{
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    com.restapi.backend.model.User user = userRepository.findByEmail(email.trim().toLowerCase())
       .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

       return User
       .withUsername(user.getEmail())
       .password(user.getPassword())
       .authorities("USER")
       .build();
    }
}
