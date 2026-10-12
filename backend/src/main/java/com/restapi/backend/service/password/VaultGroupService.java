package com.restapi.backend.service.password;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.restapi.backend.dto.request.password.CreateVaultGroupRequest;
import com.restapi.backend.dto.request.password.UpdateVaultGroupRequest;
import com.restapi.backend.exception.EntryNotFoundException;
import com.restapi.backend.exception.GroupNotEmptyException;
import com.restapi.backend.exception.GroupNotFoundException;
import com.restapi.backend.model.User;
import com.restapi.backend.model.VaultGroup;
import com.restapi.backend.repository.EncryptedPasswordRepository;
import com.restapi.backend.repository.VaultGroupRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VaultGroupService {
    private final VaultGroupRepository vaultGroupRepository;
    private final EncryptedPasswordRepository encryptedPasswordRepository;

    @Transactional
    public VaultGroup create(User user ,CreateVaultGroupRequest request){
        VaultGroup group = new VaultGroup();
        group.setUser(user);
        group.setName(request.getName().trim());

        if(request.getParentId() != null){
            VaultGroup parent = vaultGroupRepository
            .findByIdAndUser(request.getParentId(), user)
            .orElseThrow(() -> new EntryNotFoundException("Entry not found"));
            
            group.setParentGroup(parent);
        }
        return vaultGroupRepository.save(group);
    }

    @Transactional(readOnly = true)
    public List<VaultGroup> findAll(User user){
        return vaultGroupRepository.findAllByUser(user);
    }

    public void delete(User user, UUID groupId){
        VaultGroup group = vaultGroupRepository
        .findByIdAndUser(groupId, user)
        .orElseThrow(() -> new EntryNotFoundException("Entry not found"));

        if(vaultGroupRepository.existsByParentGroup(group) || encryptedPasswordRepository.existsByGroup(group)){
            throw new GroupNotEmptyException("Group is not empty");
        }
        vaultGroupRepository.delete(group);
    }

    @Transactional
    public VaultGroup updateVaultGroup(User user, UUID id, UpdateVaultGroupRequest request){
        VaultGroup group = vaultGroupRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new GroupNotFoundException("Group not found"));
        group.setName(request.getName().trim());
        
        return group;
    }
}
