package com.restapi.backend.dto.request.password;

import java.util.UUID;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class CreateVaultGroupRequest {
    @NotBlank(message = "Group name cannot be blank.")
    @Size(max = Constants.TITLE_MAX_LENGTH, message = "Group name max length: " + Constants.TITLE_MAX_LENGTH + " characters")
    private String name;

    private UUID parentId;
}
