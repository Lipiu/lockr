package com.restapi.backend.dto.request.password;

import java.util.UUID;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class CreatePasswordRequest {
    @NotBlank(message = "Title cannot be blank") 
    @Size(
        max = Constants.TITLE_MAX_LENGTH, 
        message = "Title max size: " + Constants.TITLE_MAX_LENGTH + " characters"
    )
    private String title;
    
    @NotBlank(message = "Username cannot be blank")
    @Size(
        max = Constants.ACCOUNT_USERNAME_MAX_LENGTH, 
        message = "Username max size: " + Constants.ACCOUNT_USERNAME_MAX_LENGTH + " characters"
    )
    private String accountUsername;

    @NotBlank(message = "Password cannot be blank")
    @Size(
        min = Constants.PASSWORD_ENTRY_MIN_LENGTH, 
        max = Constants.PASSWORD_ENTRY_MAX_LENGTH, 
        message = "Password minimum size: " + Constants.PASSWORD_ENTRY_MIN_LENGTH + " characters\nPassword max size: " + Constants.PASSWORD_ENTRY_MAX_LENGTH + " characters"
    )
    private String password;

    @Size(
        max = Constants.URL_MAX_LENGTH, message = "URL max size: " + Constants.URL_MAX_LENGTH + " characters"
    )
    private String url;

    @Size(
        max = Constants.NOTES_MAX_LENGTH, message = "Notes max size: " + Constants.NOTES_MAX_LENGTH + " characters"
    )
    private String notes;

    private UUID groupId;
}
