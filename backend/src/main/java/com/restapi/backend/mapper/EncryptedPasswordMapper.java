package com.restapi.backend.mapper;

import org.springframework.stereotype.Component;

import com.restapi.backend.dto.EncryptedPasswordDto;
import com.restapi.backend.model.EncryptedPassword;

@Component 
public class EncryptedPasswordMapper {
    public EncryptedPasswordDto toDto(EncryptedPassword encryptedPassword){
        return new EncryptedPasswordDto(
            encryptedPassword.getId(),
            encryptedPassword.getTitle(),
            encryptedPassword.getUrl(),
            encryptedPassword.getNotes(),
            encryptedPassword.getCreatedAt()
        );
    }
}
