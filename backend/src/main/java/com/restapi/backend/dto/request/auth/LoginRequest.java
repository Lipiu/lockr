package com.restapi.backend.dto.request.auth;

import com.restapi.backend.constants.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class LoginRequest {
    @NotBlank(message = "Email must not be blank")
    @Size(max = Constants.EMAIL_MAX_LENGTH, message = "Email max allowed: 100")
    private String email;
    
    @NotBlank(message = "Password must not be blank")
    @Size(max = Constants.PASSWORD_MAX_LENGTH, message = "Password max allowed: " + Constants.PASSWORD_MAX_LENGTH)
    @ToString.Exclude
    private String password;
}
