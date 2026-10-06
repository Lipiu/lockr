package com.restapi.backend.mapper;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.restapi.backend.dto.response.password.EncryptedPasswordDto;
import com.restapi.backend.model.EncryptedPassword;

@Component 
public class EncryptedPasswordMapper {
    public EncryptedPasswordDto toDto(EncryptedPassword entry){
        UUID groupId = null;
        if(entry.getGroup() != null){
            groupId = entry.getGroup().getId();
        }
        return new EncryptedPasswordDto(
            entry.getId(),
            entry.getAccountUsername(),
            entry.getTitle(),
            entry.getUrl(),
            entry.getNotes(),
            groupId,
            entry.getCreatedAt(),
            entry.getUpdatedAt()
        );
    }
}
