package com.restapi.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restapi.backend.model.User;

public interface UserRepository extends JpaRepository<User, UUID>{
    public Optional<User> findByEmail(String email);
    public boolean existsByEmail(String email);
}