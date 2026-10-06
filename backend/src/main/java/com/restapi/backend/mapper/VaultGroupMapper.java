package com.restapi.backend.mapper;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.restapi.backend.dto.response.password.VaultGroupDto;
import com.restapi.backend.model.VaultGroup;

@Component
public class VaultGroupMapper {
    public VaultGroupDto toDto(VaultGroup vaultGroup){
        UUID parentId = null;
        if(vaultGroup.getParentGroup() != null){
            parentId = vaultGroup.getParentGroup().getId();
        }
        
        return new VaultGroupDto(
            vaultGroup.getId(),
            vaultGroup.getName(),
            parentId
        );
    }
}
