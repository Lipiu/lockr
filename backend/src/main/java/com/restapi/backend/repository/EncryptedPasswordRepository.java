package com.restapi.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;
import com.restapi.backend.model.VaultGroup;

public interface EncryptedPasswordRepository extends JpaRepository<EncryptedPassword, UUID>{
    public List<EncryptedPassword> findAllByUser(User user);
    public Optional<EncryptedPassword> findByIdAndUser(UUID groupId, User user);
    boolean existsByGroup(VaultGroup group);
    List<EncryptedPassword> findAllByUserAndGroup(User user, VaultGroup group);
}
