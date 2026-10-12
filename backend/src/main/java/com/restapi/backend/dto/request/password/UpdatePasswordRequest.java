package com.restapi.backend.dto.request.password;

import java.util.UUID;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class UpdatePasswordRequest {
    @Size(max=Constants.TITLE_MAX_LENGTH)
    private String title;

    @Size(max=Constants.ACCOUNT_USERNAME_MAX_LENGTH)
    private String accountUsername;

    @Size(max=Constants.PASSWORD_ENTRY_MAX_LENGTH)
    private String password;

    @Size(max=Constants.URL_MAX_LENGTH)
    private String url;

    @Size(max=Constants.NOTES_MAX_LENGTH)
    private String notes;

    private UUID groupId;
}
