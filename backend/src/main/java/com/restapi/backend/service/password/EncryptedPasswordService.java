package com.restapi.backend.service.password;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.restapi.backend.dto.request.password.CreatePasswordRequest;
import com.restapi.backend.dto.request.password.UpdatePasswordRequest;
import com.restapi.backend.exception.EntryNotFoundException;
import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;
import com.restapi.backend.model.VaultGroup;
import com.restapi.backend.repository.EncryptedPasswordRepository;
import com.restapi.backend.repository.VaultGroupRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EncryptedPasswordService {
    private final EncryptedPasswordRepository encryptedPasswordRepository;
    private final EncryptionService encryptionService;
    private final VaultGroupRepository vaultGroupRepository;

    @Transactional
    public EncryptedPassword createPassword(User user, CreatePasswordRequest request){
        EncryptedPassword entryPassword = new EncryptedPassword();
        if(request.getGroupId() != null){
            VaultGroup group = vaultGroupRepository
                .findByIdAndUser(request.getGroupId(), user)
                .orElseThrow(() -> new EntryNotFoundException("Entry not found"));
            entryPassword.setGroup(group);   
        }
        entryPassword.setUser(user);
        entryPassword.setTitle(request.getTitle());
        entryPassword.setAccountUsername(user.getFirstName() + " " + user.getLastName());
        entryPassword.setPasswordContent(encryptionService.encrypt(request.getPassword()));
        entryPassword.setUrl(request.getUrl());
        entryPassword.setNotes(request.getNotes());

        return encryptedPasswordRepository.save(entryPassword);
    }

    @Transactional(readOnly = true)
    public List<EncryptedPassword> findAll(User user, UUID groupId){
        if(groupId == null){
            return encryptedPasswordRepository.findAllByUser(user);
        }
        VaultGroup group = vaultGroupRepository
            .findByIdAndUser(groupId, user)
            .orElseThrow(() -> new EntryNotFoundException("Group not found"));

            return encryptedPasswordRepository.findAllByUserAndGroup(user, group);
    }

    @Transactional
    public void deletePassword(User user, UUID id){
        EncryptedPassword entry = encryptedPasswordRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new EntryNotFoundException("Entry not found"));
        encryptedPasswordRepository.delete(entry);
    }

    @Transactional(readOnly = true)
    public String revealPassword(User user, UUID id){
        EncryptedPassword entry = encryptedPasswordRepository
            .findByIdAndUser(id, user)
            .orElseThrow(() -> new EntryNotFoundException("Entry not found"));

        return encryptionService.decrypt(entry.getPasswordContent());
    }

    @Transactional
    public EncryptedPassword updatePassword(User user, UUID id, UpdatePasswordRequest request){
        EncryptedPassword entry = encryptedPasswordRepository
            .findByIdAndUser(id, user)
            .orElseThrow(() -> new EntryNotFoundException("Entry not found"));
        if(request.getGroupId() != null){
            VaultGroup group = vaultGroupRepository
                .findByIdAndUser(request.getGroupId(), user)
                .orElseThrow(() -> new EntryNotFoundException("Ground not found"));
            entry.setGroup(group);
        }
        else{
            entry.setGroup(null);
        }
        entry.setTitle(request.getTitle());
        entry.setAccountUsername(request.getAccountUsername());

        if(request.getPassword() != null && !request.getPassword().isBlank()){
            entry.setPasswordContent(encryptionService.encrypt(request.getPassword()));
        }
        entry.setUrl(request.getUrl());
        entry.setNotes(request.getNotes());
        entry.setUpdatedAt(LocalDateTime.now());

        return entry;
    }
}
