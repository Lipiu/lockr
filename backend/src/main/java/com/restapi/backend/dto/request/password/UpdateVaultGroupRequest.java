package com.restapi.backend.dto.request.password;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class UpdateVaultGroupRequest {
    @Size(max=Constants.TITLE_MAX_LENGTH)
    private String name;
}
