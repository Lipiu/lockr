package com.restapi.backend.service.password;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.restapi.backend.exception.EntryNotFoundException;
import com.restapi.backend.model.EncryptedPassword;
import com.restapi.backend.model.User;
import com.restapi.backend.repository.EncryptedPasswordRepository;
import com.restapi.backend.request.password.CreatePasswordRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EncryptedPasswordService {
    private final EncryptedPasswordRepository encryptedPasswordRepository;
    private final EncryptionService encryptionService;

    @Transactional
    public EncryptedPassword createPassword(User user, CreatePasswordRequest request){
        EncryptedPassword entryPassword = new EncryptedPassword();
        entryPassword.setUser(user);
        entryPassword.setTitle(request.getTitle());
        entryPassword.setAccountUsername(user.getFirstName() + " " + user.getLastName());
        entryPassword.setPasswordContent(encryptionService.encrypt(request.getPassword()));
        entryPassword.setUrl(request.getUrl());
        entryPassword.setNotes(request.getNotes());

        return encryptedPasswordRepository.save(entryPassword);
    }

    @Transactional 
    public List<EncryptedPassword> findAll(User user){
        return encryptedPasswordRepository.findAllByUser(user);
    }

    @Transactional
    public void deletePassword(User user, UUID id){
        EncryptedPassword entry = encryptedPasswordRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new EntryNotFoundException("Entry not found"));
        encryptedPasswordRepository.delete(entry);
    }
}
