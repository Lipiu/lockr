package com.restapi.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;

public interface EncryptedPasswordRepository extends JpaRepository<EncryptedPassword, UUID>{
    public Optional<EncryptedPassword> findByUser(User user);
    public Optional<EncryptedPassword> findByIdAndUser(UUID groupId, User user);
}
