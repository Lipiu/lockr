package com.restapi.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restapi.backend.model.User;
import com.restapi.backend.model.VaultGroup;

public interface VaultGroupRepository extends JpaRepository<VaultGroup, UUID>{
    List<VaultGroup> findAllByUser(User user);
    Optional<VaultGroup> findByIdAndUser(UUID id, User user);
    boolean existsByParentGroup(VaultGroup parentGroup);
}